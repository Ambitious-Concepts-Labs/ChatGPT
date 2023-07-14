import { addDoc, collection, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import initializeStripe from "./initializeStripe";

export async function createCheckoutSession(email: string, planId) {
  console.log(planId)
  let priceId = ''
  console.log(planId == 1)

  if (planId == 1) {
    priceId = null
    return
  } else if (planId == 2) {
    priceId = 'price_1NS5QqDl9zzW61N7gNRwAE5S'
  } else if (planId == 3) {
    priceId = 'price_1NS5RoDl9zzW61N7KMH5X5IL'
  }

  console.log('there')
  console.log(priceId)
  if (!priceId) return
  console.log('here')
  // Create a new checkout session in the subollection inside this users document
  const checkoutSessionRef = await addDoc(collection(db, "users", email, "checkout_sessions"), { 
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    createdAt: serverTimestamp(),
  })
  
  console.log(checkoutSessionRef)
       
  
  const stripeCollection = query(collection(db, "users", email, "checkout_sessions"));
  onSnapshot(stripeCollection, async (querySnapshot) => {
    console.log(querySnapshot.docs.map(msg => msg.data()), 'duh')
    querySnapshot.docs.map(async msg  => {
      console.log("Current data: ", msg.data());
      const { sessionId } = msg.data();
      console.log(sessionId)
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        console.log('hereeeeee')
        const stripe = await initializeStripe();
        stripe.redirectToCheckout({ sessionId });
      }

    })
  },
  (error) => {
    console.log(error)
  });
}

// @ts-nocheck

import { addDoc, collection, getDoc, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import initializeStripe from "./initializeStripe";
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth";

export async function createCheckoutSession(planId) {

  const auth = getAuth();
  const user = auth.currentUser;
  
  let priceId = ''
  
  if (planId == 1) {
    priceId = null
  } else if (planId == 2) {
    priceId = 'price_1NS5QqDl9zzW61N7gNRwAE5S'
  } else if (planId == 3) {
    priceId = 'price_1NS5RoDl9zzW61N7KMH5X5IL'
  }

  if (!priceId) return

  // Create a new checkout session in the subollection inside this users document
  // const checkoutSessionRef = await addDoc(collection(db, "users", email, "checkout_sessions"), { 
  const checkoutSessionRef = await addDoc(collection(db, "users", user.uid, "checkout_sessions"), { 
    id: uuidv4(),
    price: priceId,
    success_url: window.location.origin + "/dashboard/billing",
    cancel_url: window.location.origin + "/dashboard/billing",
    createdAt: serverTimestamp(),
  })

  // const stripeCollection = await query(collection(db, "users", email, "checkout_sessions"));
  const stripeCollection = await query(collection(db, "users", user.uid, "checkout_sessions"));
  const sessionRef = await getDoc(checkoutSessionRef);
  const data = sessionRef.data()

  await onSnapshot(stripeCollection, async (querySnapshot) => {
    let currentData
    querySnapshot.docs.map(async msg  => {
      currentData = msg.data()
      if (data.id === currentData.id) {        
        const { sessionId } = msg.data();
        if (sessionId) {
          // We have a session, let's redirect to Checkout
          // Init Stripe
          const stripe = await initializeStripe();
          await stripe.redirectToCheckout({ sessionId });
         }
      }
    })
  },
  (error) => {
    console.log(error)
  });
}
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    // stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_SECRET_KEY);
    stripePromise = await loadStripe('pk_test_51MBv0yDl9zzW61N7Ko1ZTN4JXRAR84ndYeI4pY2e1JwdqGbb8jvqUvuHukGFojCUgbs7rA35JJX3VKgWAMoWSgps00zsHqS7XL');
  }
  return stripePromise;
};

export default initializeStripe;
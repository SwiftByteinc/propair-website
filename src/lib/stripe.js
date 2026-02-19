import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

export function getStripe() {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key || key === 'pk_live_your_key_here') {
      if (import.meta.env.DEV) console.warn('Stripe publishable key missing — check .env.local');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

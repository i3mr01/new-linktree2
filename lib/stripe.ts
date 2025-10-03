import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

export function getStripe() {
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_", {
      apiVersion: "2024-06-20",
    });
  }
  return stripeSingleton;
}



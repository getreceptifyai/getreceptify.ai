import Stripe from "stripe";
import { getEnv } from "@/lib/env";

const env = getEnv();

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
});

export const PRO_PRICE_ID = env.STRIPE_PRICE_PRO;

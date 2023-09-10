import { ProductSubscription } from "../types"
import NextAuth, { DefaultSession } from "next-auth"

enum Role {
  "ADMIN",
  "USER"
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      onboarded: boolean,
      subscriptions: ProductSubscription[],
      role: Role,
      stripe_customer_id: string
    } & DefaultSession["user"]
  }
}
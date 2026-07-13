"use server";

import prisma from "@/lib/db-export/prisma-client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripe } from "../stripe";

export async function createCheckoutSession(tierId: string) {
  const { userId: clerkUserId } = await auth();
  const stripe = getStripe();

  if (!clerkUserId) {
    throw new Error("Unauthorized");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUserId,
    },
    include: {
      UserBilling: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const tier = await prisma.tier.findUnique({
    where: {
      id: tierId,
    },
  });

  if (!tier) {
    throw new Error("Tier not found");
  }

  if (!tier.stripePriceId) {
    throw new Error("Selected tier does not have a Stripe price");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: user.UserBilling?.stripeCustomerId ?? undefined,
    customer_email: user.UserBilling?.stripeCustomerId ? undefined : user.email,

    line_items: [
      {
        price: tier.stripePriceId,
        quantity: 1,
      },
    ],

    success_url: `${appUrl}/dashboard?success=true`,
    cancel_url: `${appUrl}/dashboard?canceled=true`,

    metadata: {
      app: "charityquery",
      userId: user.id,
      clerkId: user.clerkId,
      tierId: tier.id,
    },

    subscription_data: {
      metadata: {
        app: "charityquery",
        userId: user.id,
        clerkId: user.clerkId,
        tierId: tier.id,
      },
    },
  });

  if (!session.url) {
    throw new Error("Stripe checkout session URL was not created");
  }

  redirect(session.url);
}
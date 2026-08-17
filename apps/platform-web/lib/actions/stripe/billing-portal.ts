"use server";

import prisma from "@/lib/db-export/prisma-client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripe } from "../stripe";

export async function createBillingPortalSession() {
  const { userId: clerkUserId } = await auth();
  const stripe = getStripe()

  if (!clerkUserId) {
    throw new Error("Unauthorized");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    include: { 
      billing: true,
      tier: {
        select: { stripePriceId: true}
      }
    },
  });

  if (!user?.tier.stripePriceId) {
    throw new Error("Invalid tier");
  }

  if (!user?.billing?.stripeCustomerId) {
    throw new Error("No Stripe customer found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.billing.stripeCustomerId,
    return_url: `${appUrl}/dashboard`,
  });

  redirect(session.url);
}

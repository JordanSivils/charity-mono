"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db-export/prisma-client";
import { getStripe } from "../stripe";

export const deleteUser = async () => {
    const stripe = getStripe()
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error("You must be logged in to perform this action");
  }

  console.log("🗑️ Starting user deletion:", { clerkUserId });

  // 1. Find user in your DB
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    include: { UserBilling: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("📦 Found user in DB:", {
    userId: user.id,
    email: user.email,
    hasBilling: !!user.UserBilling,
  });

  // 2. Cancel Stripe subscription if it exists
  if (user.UserBilling?.stripeSubscriptionId) {
    console.log("💳 Canceling Stripe subscription:", {
      subscriptionId: user.UserBilling.stripeSubscriptionId,
    });

    try {
      await stripe.subscriptions.cancel(
        user.UserBilling.stripeSubscriptionId
      );

      console.log("✅ Stripe subscription canceled");
    } catch (err) {
      console.error("❌ Failed to cancel Stripe subscription:", err);
      // optional: throw err;
    }
  } else {
    console.log("ℹ️ No Stripe subscription found, skipping cancel");
  }

  // 3. Delete from your DB
  await prisma.user.delete({
    where: { id: user.id },
  });

  console.log("🧹 User deleted from DB");

  // 4. Delete from Clerk
  const client = await clerkClient();
  await client.users.deleteUser(clerkUserId);

  console.log("👤 User deleted from Clerk");

  console.log("🎉 User deletion complete");

  return { success: true };
};
import prisma from "@/lib/db-export/prisma-client";
import Stripe from "stripe";

export const handleSubscriptionCreatedOrUpdated = async (
  subscription: Stripe.Subscription
) => {
  const subscriptionItem = subscription.items.data[0];

  const userId = subscription.metadata.userId;
  const tierId = subscription.metadata.tierId;

  if (!userId || !tierId) {
    throw new Error("Missing subscription metadata");
  }

  if (!subscriptionItem) {
    throw new Error("Missing subscription item");
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const currentPeriodStart = new Date(
    subscriptionItem.current_period_start * 1000
  );

  const currentPeriodEnd = new Date(
    subscriptionItem.current_period_end * 1000
  );

  const isScheduledToCancel =
    subscription.cancel_at_period_end || subscription.cancel_at !== null;

  // 🔥 NEW: determine if user should actually have paid access
  const hasPaidAccess =
    subscription.status === "active" || subscription.status === "trialing";

  let resolvedTierId = tierId;

  if (!hasPaidAccess) {
    const freeTier = await prisma.tier.findUnique({
      where: { name: "FREE" },
    });

    if (!freeTier) {
      throw new Error("FREE tier not found");
    }

    resolvedTierId = freeTier.id;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tierId: resolvedTierId,
    },
  });

  await prisma.userBilling.upsert({
    where: {
      userId,
    },
    update: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: isScheduledToCancel,
    },
    create: {
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: isScheduledToCancel,
    },
  });

  console.log("Subscription synced:", {
    subscriptionId: subscription.id,
    userId,
    originalTierId: tierId,
    resolvedTierId,
    status: subscription.status,
    cancelAtPeriodEnd: isScheduledToCancel,
  });
};

export const handleSubscriptionDeleted = async (
  subscription: Stripe.Subscription
) => {
  const userId = subscription.metadata.userId;

  if (!userId) {
    console.log("Missing userId in subscription metadata, skipping delete sync");
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    console.log("User already deleted, skipping subscription deleted sync:", {
      userId,
      subscriptionId: subscription.id,
    });

    return;
  }

  const freeTier = await prisma.tier.findUnique({
    where: {
      name: "FREE",
    },
  });

  if (!freeTier) {
    throw new Error("FREE tier not found");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tierId: freeTier.id,
    },
  });

  await prisma.userBilling.updateMany({
    where: {
      userId,
    },
    data: {
      status: "canceled",
      cancelAtPeriodEnd: false,
    },
  });

  console.log("User downgraded to FREE:", {
    subscriptionId: subscription.id,
    userId,
  });
};
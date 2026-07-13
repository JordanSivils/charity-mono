"use server"
import prisma from "@/lib/db-export/prisma-client";
import { auth, currentUser } from "@clerk/nextjs/server"
import { getUtcDayKeyAndTtl } from "@/lib/db-export/redis-utils";
import { getRedisClient } from "@/lib/db-export/redis-client";


export const getOrCreateUser = async () => {

  const redisClient = await getRedisClient()
  const { userId } = await auth();
  if (!userId) throw new Error("No Clerk user id found");

   const clerkUser = await currentUser();
    if (!clerkUser?.id) {
        throw new Error("Missing Clerk user");
    }

    const primaryEmail =
        clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId
        )?.emailAddress;

    if (!primaryEmail) {
        throw new Error("Missing primary email");
    }

  const baseTier = await prisma.tier.findUnique({
    where: {
        name: "FREE"
    },
    select: {
        id: true
    }
  })

  if (!baseTier) {
    throw new Error("Base tier missing")
  }

  const user = await prisma.user.upsert({
    where: {
      clerkId: clerkUser.id,
    },
    update: {
      email: primaryEmail,
      name: clerkUser.fullName ?? undefined,
    },
    create: {
      clerkId: clerkUser.id,
      email: primaryEmail,
      name: clerkUser.fullName ?? undefined,
      tierId: baseTier.id,
    },
    include: {
      tier: true,
      UserBilling: true,
      apiKeys: {
        where: {
            isActive: true
        },
        select: { id: true }
      }
    },
  });

    const { utcDateKey } = getUtcDayKeyAndTtl();

    const key = `rl:day:user:${user.id}:${utcDateKey}`;

    const limitUsed = await redisClient.get(key)

    const dailyUsed = Number(limitUsed ?? 0);

    return {
      data: user,
      userBilling: user.UserBilling
        ? {
            status: user.UserBilling.status,
            cancelAtPeriodEnd: user.UserBilling.cancelAtPeriodEnd,
            currentPeriodEnd: user.UserBilling.currentPeriodEnd,
          }
        : null,

      usage: {
        limit: {
          used: dailyUsed,
          limit: user.tier?.dailyLimit ?? 0,
          remaining: Math.max((user.tier?.dailyLimit ?? 0) - dailyUsed, 0),
        },
      },
    };
};
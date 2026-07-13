"use server"

import prisma from "@/lib/db-export/prisma-client"

export const getTiers = async () => {
    const tiers = await prisma.tier.findMany({
        where: {
            name: {
                not: "INTERNAL",
            }
        },
        orderBy: { dailyLimit: "asc"}
    })

    return tiers
}
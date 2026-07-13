"use server"

import prisma from "@/lib/db-export/prisma-client"
import { CreateTier } from "./tier-types"

export const createTier = async (fd: CreateTier) => {
    return await prisma.tier.create({
        data: {...fd}
    })
}
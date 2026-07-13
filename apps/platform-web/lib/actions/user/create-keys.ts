"use server"
import prisma from "@/lib/db-export/prisma-client";
import { auth } from "@clerk/nextjs/server";
import crypto from "node:crypto";

const pepper = process.env.API_KEY_PEPPER

export const createKeys = async () => {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Identifier not found")

        const dbUser = await prisma.user.findUnique({ 
            where: { clerkId: userId }, 
            select: { id: true }
        });
        if (!dbUser) throw new Error("Identifier not found")

        const cooldown = 120_000
        const lastKey = await prisma.apiKey.findFirst({
            where: { userId: dbUser.id, environment: "LIVE" },
            orderBy: { createdAt: "desc"},
            select: { createdAt: true} 
        })

        if (lastKey && Date.now() - lastKey.createdAt.getTime() < cooldown) {
            throw new Error("Please wait before regenerating keys")
        }

        const devPre = "ca_dev_"
        const rawDev =  crypto.randomBytes(32).toString("base64url")

        const prodPre = "ca_prod_"
        const rawProd = crypto.randomBytes(32).toString("base64url")

        const devKey = `${devPre}${rawDev}`
        const prodKey = `${prodPre}${rawProd}`
        if (!pepper) throw new Error("missing essential env")

        const hashedDev = (key: string): string => {
            return crypto
                .createHmac("sha256", pepper)
                .update(key)
                .digest("hex");
        }


        const hashedProd = (key: string): string => {
            return crypto
                .createHmac("sha256", pepper)
                .update(key)
                .digest("hex");
        }


        await prisma.$transaction(async (p) => {
            await p.apiKey.updateMany({
                where: { userId: dbUser.id, isActive: true },
                data: {
                    isActive: false,
                    revokedAt: new Date()
                }
            })

            await p.apiKey.createMany({
            data: [
                {
                    environment: "DEV",
                    keyHash: hashedDev(devKey),
                    keyPrefix: devKey.slice(0, 12),
                    isActive: true,
                    userId: dbUser.id
                },
                {
                    environment: "LIVE",
                    keyHash: hashedProd(prodKey),
                    keyPrefix: prodKey.slice(0,12),
                    isActive: true,
                    userId: dbUser.id
                }
            ]
            })
        })

        return { 
            usableKeys: { devKey, prodKey },
        }
            
    } catch (error) {
        console.error(error)
        throw error instanceof Error ? error : new Error("Failed to generate keys")
    }
}
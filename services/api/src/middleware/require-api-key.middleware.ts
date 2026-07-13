import { NextFunction, Request, Response } from "express";
import { hashApiKey } from "../utils/decrypt.js";
import { prisma } from "../config/prisma.js";
import { ApiError } from "./error-handler.middleware.js";

export const requireApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rawKey = req.header("x-api-key")?.trim();
        if (!rawKey) {
            throw new ApiError(401, "missing_api_key", "An API Key is required. Provide it in the 'x-api-key' header");
        }

        const keyHash = hashApiKey(rawKey);

        const thisRecord = await prisma.apiKey.findUnique({
            where: { keyHash },
            select: {
                id: true,
                isActive: true,
                revokedAt: true,
                environment: true,
                user: {
                    select: { 
                        id: true,
                        tier: {
                            select: {
                                id: true,
                                name: true,
                                dailyLimit: true,
                                resultLimit: true,
                                nearbyRadiusMaxMiles: true,
                                nearbyResultLimit: true
                            }
                        }
                    }
                    
                },

            }
        })

        if (!thisRecord || !thisRecord.isActive) {
            throw new ApiError(401, "invalid_api_key", "This API Key is invalid or has been revoked")
        }

        if (!thisRecord.user.tier) {
            return res.status(401).json({
                error: "no_tier",
                message: "there is no tier set for this account"
            })
        }

        req.ctx.auth = {
            apiKeyId: thisRecord.id,
            userId: thisRecord.user.id,
            environment: thisRecord.environment,
            tier: {
                id: thisRecord.user.tier.id,
                name: thisRecord.user.tier.name,
                dailyLimit: thisRecord.user.tier.dailyLimit,
                resultLimit: thisRecord.user.tier.resultLimit,
                nearbyRadiusMaxMiles: thisRecord.user.tier.nearbyRadiusMaxMiles,
                nearbyResultLimit: thisRecord.user.tier.nearbyResultLimit,
            }
        }

        next()
} catch(err) {
    return next(err)
}
}
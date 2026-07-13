import { NextFunction, Request, Response } from "express";
import { ApiError } from "./error-handler.middleware.js";
import { setBurstRateLimit } from "../utils/redis-rate-limit.js";

export const rateLimitBurst = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKeyId = req.ctx.auth.apiKeyId
        const environment = req.ctx.auth.environment

        if (!apiKeyId || !environment) {
            throw new ApiError(500, "internal_error", "Internal Context Error")
        }

        const { used, limit, timeRemaining } = await setBurstRateLimit(apiKeyId, environment)

        res.set({
        "X-BurstLimit-Limit": String(limit),
        "X-BurstLimit-Remaining": String(Math.max(limit - used, 0)),
        "X-BurstLimit-Reset": String(Math.floor(Date.now() / 1000) + timeRemaining),
        })

        if (used > limit) {
        throw new ApiError(
            429,
            "rate_limited",
            "Too many requests in a short time window"
        )
        }

        return next()
    } catch (error) {
        return next(error)
    }
}
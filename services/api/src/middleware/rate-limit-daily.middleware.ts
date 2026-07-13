import { NextFunction, Request, Response } from "express"
import { ApiError } from "./error-handler.middleware.js"
import { setRateLimits } from "../utils/redis-rate-limit.js"

export const rateLimitDaily = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.ctx.auth.userId
        const tier = req.ctx.auth.tier

        const limit = tier?.dailyLimit
        if (!userId || limit === undefined) {
            throw new ApiError(500, "internal_error", "Internal Context Error.")
        }
        // fix this
        const { used, timeRemaining } = await setRateLimits(userId)
        const remaining = limit - used

       req.ctx.rateLimit = { daily: { used, limit, timeRemaining, remaining }}

       res.set({
        "X-RateLimit-Limit": limit,
        "X-RateLimit-Remaining": remaining,
        "X-RateLimit-Used": used,
        "X-RateLimit-Reset": Math.floor(Date.now() / 1000) + timeRemaining,

       })

        if (used > limit) {
            throw new ApiError(429, "rate_limited", `Met daily limit for this tier, time until reset ${timeRemaining}`)
        }

        return next()
        } catch (error) {
            return next(error)
    }
}
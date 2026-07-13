import { NextFunction, Request, Response } from "express"
import { nearbyCharityQuerySchema } from "../api/nearby/types/nearby.request.types.js"
import { ApiError } from "./error-handler.middleware.js"

export const parseNearbyQuery = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.nearbyQuery = nearbyCharityQuerySchema.parse(req.query)
    next()
  } catch (err) {
    next(err)
  }
}

export const enforceNearbyTierLimits = (req: Request, _res: Response, next: NextFunction) => {
    const tier = req.ctx.auth.tier;
    const  q = req.nearbyQuery;

    if (!tier || !q) return next();

    if (q.radius > tier.nearbyRadiusMaxMiles) {
        throw new ApiError(403, "radius_not_allowed", "Radius exceeds tier limit")
    }

    if (q.limit > tier.nearbyResultLimit) {
        throw new ApiError(403, "limit_not_allowed", "Limit exceeds tier limit")
    }
    
    next()
}
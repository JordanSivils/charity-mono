import { NextFunction, Request, Response } from "express"
import { ApiError } from "./error-handler.middleware.js"
import { charityQuerySchema } from "../api/charity/types/charity.request.types.js"

export const parseCharityQuery = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.charityQuery = charityQuerySchema.parse(req.query)
    next()
  } catch (err) {
    next(err)
  }
}

export const enforceCharityTierLimits = (req: Request, _res: Response, next: NextFunction) => {
    const tier = req.ctx.auth.tier;
    const  q = req.charityQuery;

    if (!tier || !q) return next();

    if (q.limit > tier.resultLimit) {
        throw new ApiError(403, "limit_not_allowed", "Limit exceeds tier limit")
    }
    
    next()
}
import { Router } from "express";
import { requireApiKey } from "../../middleware/require-api-key.middleware.js";
import { rateLimitBurst } from "../../middleware/rate-limit-burst.js";
import { rateLimitDaily } from "../../middleware/rate-limit-daily.middleware.js";
import { getNearbyCharitiesHandler } from "./nearby.controller.js";
import { enforceNearbyTierLimits, parseNearbyQuery } from "../../middleware/parse-nearby-query.js";

const router = Router();

router.get(
    "/nearby", 
    requireApiKey, 
    rateLimitBurst, 
    rateLimitDaily, 
    parseNearbyQuery,
    enforceNearbyTierLimits,
    getNearbyCharitiesHandler
);

export default router
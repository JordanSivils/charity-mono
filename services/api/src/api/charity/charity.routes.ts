import { Router } from "express";
import { requireApiKey } from "../../middleware/require-api-key.middleware.js";
import { rateLimitDaily } from "../../middleware/rate-limit-daily.middleware.js";
import { getAllCharitiesHandler, getCharityByEinHandler } from "./charity.controller.js";
import { rateLimitBurst } from "../../middleware/rate-limit-burst.js";
import { enforceCharityTierLimits, parseCharityQuery } from "../../middleware/parse-charity-query.js";

const router = Router();

router.get(
    "/charities", 
    requireApiKey, 
    rateLimitBurst, 
    rateLimitDaily, 
    parseCharityQuery,
    enforceCharityTierLimits,
    getAllCharitiesHandler
);

router.get("/charities/:ein", requireApiKey, rateLimitBurst, rateLimitDaily, getCharityByEinHandler);

export default router
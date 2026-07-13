import { CharityQuery } from "../api/charity/types/charity.request.types.ts";
import { NearbyCharityQuery } from "../api/nearby/types/nearby.request.types.ts";
import { RequestContext } from "./request-context.ts";

declare global {
    namespace Express {
        interface Request {
            ctx: RequestContext,
            nearbyQuery?: NearbyCharityQuery,
            charityQuery?: CharityQuery
        }
    }
}
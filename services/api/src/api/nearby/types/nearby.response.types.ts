import z from "../../../utils/zod-openapi.js";
import { charityListResponseSchema } from "../../charity/types/charity.response.schema.js";

export const nearbyOriginSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    source: z.string()
})

export const nearbyCharityListResponseSchema = charityListResponseSchema.extend({
    origin: nearbyOriginSchema
})
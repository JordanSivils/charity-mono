import z from "zod";

export const tierSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    dailyLimit: z.coerce.number(),
    nearbyRadiusMaxMiles: z.coerce.number(),
    nearbyResultLimit: z.coerce.number(),
    resultLimit: z.coerce.number(),
})

export type TierType = z.infer<typeof tierSchema>


export const createTierSchema = z.object({
  name: z.string().min(1),
  dailyLimit: z.number(),
  nearbyRadiusMaxMiles: z.number(),
  nearbyResultLimit: z.number(),
  resultLimit: z.number(),
});

export type CreateTier = z.output<typeof createTierSchema>;
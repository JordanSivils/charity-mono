import z from "zod";
import { tierSchema } from "../tier/tier-types";

export const apiKeysSchema = z.object({
    id: z.uuid(),
})

export const redisUserEnrichmentSchema = z.object({
    used: z.coerce.number(),
    limit: z.coerce.number(),
    remaining: z.coerce.number()
})

export const userBillingDashboardSchema = z.object({
  status: z.string().nullable(),
  cancelAtPeriodEnd: z.boolean(),
  currentPeriodEnd: z.coerce.date().nullable(),
});

export const userDashboardSchema = z.object({
    username: z.string().min(5).max(20),
    name: z.string().nullable().optional(),
    tier: tierSchema,
    apiKeys: z.array(apiKeysSchema),
    usage: redisUserEnrichmentSchema,
    billing: userBillingDashboardSchema.nullable()
})

export type DashboardUser = z.infer<typeof userDashboardSchema>

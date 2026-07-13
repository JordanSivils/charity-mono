import { z } from "zod"

// ---------- reusable response pieces ----------

export const codedValueResponseSchema = z.object({
  code: z.string(),
  description: z.string(),
})

export const subsectionClassificationResponseSchema = z.object({
  subsection: z.string(),
  classification: z.string(),
  description: z.string(),
})

// ---------- main response shape ----------

export const charityBaseResponseSchema = z.object({
  ein: z.string().min(1),
  name: z.string().min(1),

  ico: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),

  ntee_code: codedValueResponseSchema.nullable().optional(),
  ntee_group: codedValueResponseSchema.nullable().optional(),

  affiliation: codedValueResponseSchema.nullable().optional(),
  deductibility: codedValueResponseSchema.nullable().optional(),
  foundation: codedValueResponseSchema.nullable().optional(),
  organization: codedValueResponseSchema.nullable().optional(),
  status: codedValueResponseSchema.nullable().optional(),
  filing_req_code: codedValueResponseSchema.nullable().optional(),
  pf_filing_req_code: codedValueResponseSchema.nullable().optional(),
  account_paid: codedValueResponseSchema.nullable().optional(),
  geocode_status: codedValueResponseSchema.nullable().optional(),

  subsection_classification:
    subsectionClassificationResponseSchema.nullable().optional(),

  group: z.string().nullable().optional(),
  ruling: z.string().nullable().optional(),
  activity: z.string().nullable().optional(),
  tax_period: z.string().nullable().optional(),

  asset_amount: z.number().nullable().optional(),
  income_amount: z.number().nullable().optional(),
  revenue_amount: z.number().nullable().optional(),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
})

// ---------- list wrapper ----------

export const charityListResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  next: z.number().nullable(),
  prev: z.number().nullable(),
  charities: z.array(charityBaseResponseSchema),
})

// ---------- single response ----------

export const singleCharityResponseSchema = z.object({
  charity: charityBaseResponseSchema,
})

// ---------- params ----------

export const singleCharityParamsSchema = z.object({
  ein: z.string().min(1),
})
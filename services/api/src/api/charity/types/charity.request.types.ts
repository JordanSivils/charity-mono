import z from "../../../utils/zod-openapi.js";
import { accountPaidSet, affiliationSet, classificationSet, deductibilitySet, filingRequiredCodesSet, foundationSet, geocodeStatusSet, nteeCodesSet, nteeGroupsSet, organizationSet, pfFilingSet, statusCodeSet, subsectionSet } from "../../meta-data/utils/exportMeta.js";
import { charityFields, sortableCharityFields } from "../utils/response-builder.js";

export const CharityFieldEnum = z.enum(charityFields);
export const SortableCharityFieldEnum = z.enum(sortableCharityFields);

export const fieldsQuerySchema = z.preprocess(
  (val) => {
    if (val == null || val === "") return undefined;

    if (typeof val === "string") {
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (Array.isArray(val)) {
      return val
        .map(String)
        .flatMap((s) => s.split(","))
        .map((s) => s.trim())
        .filter(Boolean);
    }

    return val;
  },
  z.array(CharityFieldEnum).min(1).optional()
);

export const arrayOpt = z
  .union([z.string(), z.array(z.string())])
  .transform((val) => Array.isArray(val) ? val : [val])

export  const numArr = z
  .union([z.coerce.number(), z.array(z.coerce.number())])
  .transform((val) => Array.isArray(val) ? val : [val])

export const charityQuerySchema = z
  .object({
    name: z.string().min(1).optional(),
    ico: z.string().min(1).optional(),
    street: z.string().optional(),
    city: arrayOpt.optional(),
    state: arrayOpt.optional(),
    zip: arrayOpt.optional(),
    group: z.string().optional(),
    ruling: z.string().optional(),
    tax_period: z.string().optional(),
    activity: z.string().optional(),

    pf_filing_req_code: z
      .string()
      .optional()
      .refine((val) => val === undefined || pfFilingSet.has(val), {
        message: "Invalid PF Required Code",
      }),

    affiliation: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => affiliationSet.has(val)) , {
        message: "Invalid Affiliation Code",
      }),
    deductibility: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => deductibilitySet.has(val)) , {
        message: "Invalid Deductibility Value",
      }),
    foundation: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => foundationSet.has(val)) , {
        message: "Invalid Foundation Value",
      }),
    organization: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => organizationSet.has(val)) , {
        message: "Invalid Organization Value",
      }),
    status: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => statusCodeSet.has(val)) , {
        message: "Invalid Status Value",
      }),
    filing_req_code: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => filingRequiredCodesSet.has(val)) , {
        message: "Invalid Filing Required Value",
      }),
    account_paid: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => accountPaidSet.has(val)) , {
        message: "Invalid Account Paid Value",
      }),
    geocode_status: numArr
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => geocodeStatusSet.has(val)) , {
        message: "Invalid Geocoded Status Value",
      }),
    ntee_code: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => nteeCodesSet.has(val)) , {
        message: "Invalid Ntee Code Value",
      }),
    ntee_group: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => nteeGroupsSet.has(val)) , {
        message: "Invalid Ntee Group Value",
      }),

    subsection: z
      .string()
      .optional()
      .refine((val) => val === undefined || subsectionSet.has(val), {
        message: "Invalid Subsection Code",
      }),
      classification: z
      .string()
      .optional()
      .refine((val) => val === undefined || classificationSet.has(val), {
        message: "Invalid Classification Code",
      }),

    asset_amount_gte: z.coerce.number().optional(),
    asset_amount_lte: z.coerce.number().optional(),
    income_amount_gte: z.coerce.number().optional(),
    income_amount_lte: z.coerce.number().optional(),
    revenue_amount_gte: z.coerce.number().optional(),
    revenue_amount_lte: z.coerce.number().optional(),
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),

    fields: fieldsQuerySchema,
    
    sortBy: SortableCharityFieldEnum.optional().default("name"),
    sortDir: z.enum(["asc", "desc"]).optional().default("asc"),

    limit: z.coerce.number().int().min(1).max(100).optional().default(25),
    page: z.coerce.number().int().min(1).optional().default(1),
  })
  .strict()
  .superRefine((data, ctx) => {
    const hasSub = data.subsection !== undefined;
    const hasClass = data.classification !== undefined;

    if (hasSub !== hasClass) {
      ctx.addIssue({
        code: "custom",
        path: ["subsection"],
        message: "subsection and classification must be provided together",
      });

      ctx.addIssue({
        code: "custom",
        path: ["classification"],
        message: "subsection and classification must be provided together",
      });
    }
  });

export const singleCharityQuerySchema = z.object({
  fields: fieldsQuerySchema,
});

export type CharityQuery = z.infer<typeof charityQuerySchema>;
export type SingleCharityQuery = z.infer<typeof singleCharityQuerySchema>;
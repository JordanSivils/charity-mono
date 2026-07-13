import z from "../../../utils/zod-openapi.js";
import { arrayOpt,  numArr } from "../../charity/types/charity.request.types.js";
import { nearbySortableCharityFields } from "../../charity/utils/response-builder.js";
import { accountPaidSet, affiliationSet, classificationSet, deductibilitySet, filingRequiredCodesSet, foundationSet, geocodeStatusSet, nteeCodesSet, nteeGroupsSet, organizationSet, pfFilingSet, statusCodeSet, subsectionSet } from "../../meta-data/utils/exportMeta.js";
import { nearbyFieldsQuerySchema } from "../utils/nearby-response-builder.js";

const NearbySortableCharityFieldEnum = z.enum(nearbySortableCharityFields);


export const nearbyCharityQuerySchema = z
  .object({
    lat: z.coerce.number().min(18).max(72).optional(),
    lng: z.coerce.number().min(-180).max(-60).optional(),
    radius: z.coerce.number().positive().max(250).optional().default(10),
    origin_zip: z.string().regex(/^\d{5}$/).optional().openapi({
        description: "5-digit US ZIP code",
        example: "28403",
    }),

    state: arrayOpt.optional(),
    name: z.string().min(1).optional(),
    ico: z.string().min(1).optional(),
    group: z.string().optional(),
    tax_period: z.string().optional(),
    activity: z.string().optional(),
    ruling: z.string().optional(),

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
      .refine((vals) => vals === undefined || vals.every((val) => nteeCodesSet.has(val)), {
        message: "Invalid Ntee Code",
      }),
    ntee_group: arrayOpt
      .optional()
      .refine((vals) => vals === undefined || vals.every((val) => nteeGroupsSet.has(val)), {
        message: "Invalid Ntee Group",
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

    fields: nearbyFieldsQuerySchema,

    sortBy: NearbySortableCharityFieldEnum.optional().default("distance_miles"),
    sortDir: z.enum(["asc", "desc"]).optional().default("asc"),

    limit: z.coerce.number().int().min(1).max(500).optional().default(25),
    page: z.coerce.number().int().min(1).optional().default(1),
  })
  .strict()
  .superRefine((data, ctx) => {
    const hasLat = data.lat !== undefined && data.lat !== null;
    const hasLng = data.lng !== undefined && data.lng !== null;
    const hasZip = data.origin_zip !== undefined && data.origin_zip !== null && data.origin_zip !== "";

    if (hasLat !== hasLng) {
        ctx.addIssue({
        code: "custom",
        path: ["lat"],
        message: "lat and lng must be provided together",
        });

        ctx.addIssue({
        code: "custom",
        path: ["lng"],
        message: "lat and lng must be provided together",
        });
    }

    if (!hasZip && !(hasLat && hasLng)) {
        ctx.addIssue({
        code: "custom",
        path: ["origin_zip"],
        message: "Provide either origin_zip or both lat and lng",
        });
    }

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

export type NearbyCharityQuery = z.infer<typeof nearbyCharityQuerySchema>;
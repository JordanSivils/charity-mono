import { Prisma } from "../../../generated/prisma/client.js"

export const charityFields = [
  "ein",
  "name",
  "ico",
  "street",
  "city",
  "state",
  "zip",
  "group",
  "subsection_classification",
  "affiliation",
  "ruling",
  "deductibility",
  "foundation",
  "activity",
  "organization",
  "status",
  "tax_period",
  "filing_req_code",
  "pf_filing_req_code",
  "account_paid",
  "asset_amount",
  "income_amount",
  "revenue_amount",
  "ntee_code",
  "ntee_group",
  "lat",
  "lng",
  "geocode_status",
] as const

export type CharityField = (typeof charityFields)[number]

export const sortableCharityFields = [
  "ein",
  "name",
  "ico",
  "street",
  "city",
  "state",
  "zip",
  "group",
  "subsection",
  "classification",
  "affiliation",
  "ruling",
  "deductibility",
  "foundation",
  "activity",
  "organization",
  "status",
  "tax_period",
  "filing_req_code",
  "pf_filing_req_code",
  "account_paid",
  "asset_amount",
  "income_amount",
  "revenue_amount",
  "ntee_code",
  "ntee_group",
  "lat",
  "lng",
  "geocode_status",
] as const

export const nearbySortableCharityFields = [
  ...sortableCharityFields,
  "distance_miles",
] as const;

export type SortableCharityField = (typeof sortableCharityFields)[number]

export const charityDbFields = [
  "ein",
  "name",
  "ico",
  "street",
  "city",
  "state",
  "zip",
  "group",
  "subsection",
  "classification",
  "affiliation",
  "ruling",
  "deductibility",
  "foundation",
  "activity",
  "organization",
  "status",
  "tax_period",
  "filing_req_code",
  "pf_filing_req_code",
  "account_paid",
  "asset_amount",
  "income_amount",
  "revenue_amount",
  "ntee_code",
  "ntee_group",
  "lat",
  "lng",
  "geocode_status",
] as const

export type CharityDbField = (typeof charityDbFields)[number]

export const charityFieldDependencies: Record<CharityField, CharityDbField[]> = {
  ein: ["ein"],
  name: ["name"],
  ico: ["ico"],
  street: ["street"],
  city: ["city"],
  state: ["state"],
  zip: ["zip"],
  group: ["group"],
  subsection_classification: ["subsection", "classification"],
  affiliation: ["affiliation"],
  ruling: ["ruling"],
  deductibility: ["deductibility"],
  foundation: ["foundation"],
  activity: ["activity"],
  organization: ["organization"],
  status: ["status"],
  tax_period: ["tax_period"],
  filing_req_code: ["filing_req_code"],
  pf_filing_req_code: ["pf_filing_req_code"],
  account_paid: ["account_paid"],
  asset_amount: ["asset_amount"],
  income_amount: ["income_amount"],
  revenue_amount: ["revenue_amount"],
  ntee_code: ["ntee_code"],
  ntee_group: ["ntee_group"],
  lat: ["lat"],
  lng: ["lng"],
  geocode_status: ["geocode_status"],
}

export const defaultCharityFields: CharityField[] = [
  "ein",
  "name",
  "city",
  "state",
  "ntee_group",
]

export function resolveSelectedFields(fields?: CharityField[]): CharityField[] {
  if (!fields || fields.length === 0) {
    return defaultCharityFields
  }

  return fields
}

export function buildCharitySelect(
  fields?: CharityField[]
): Prisma.CharitySelect {
  const selectedFields = resolveSelectedFields(fields)
  const dbFields = new Set<CharityDbField>()

  for (const field of selectedFields) {
    const dependencies = charityFieldDependencies[field]

    for (const dependency of dependencies) {
      dbFields.add(dependency)
    }
  }

  const select: Prisma.CharitySelect = {}

  for (const field of dbFields) {
    select[field] = true
  }

  return select
}
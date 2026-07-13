import { charityFields, sortableCharityFields } from "../../charity/utils/response-builder.js"
import { AccountsPaidCodes, AffiliationCodes, DeductibilityCodes, FilingRequiredCodes, FoundationCodes, GeocodeStatusCodes, NteeCodes, NteeGroups, OrganizationCodes, PfFilingRequiredCodes, StatusCodes, SubsectionAndClassificationCodes } from "../../meta-data/utils/exportMeta.js"
import type { CharityDtoSource } from "../../charity/utils/charity.dto.js"

export const nearbyCharityFields = [
  ...charityFields,
  "distance_miles",
] as const

export type NearbyCharityField = (typeof nearbyCharityFields)[number]

export const nearbySortableCharityFields = [
  ...sortableCharityFields,
  "distance_miles",
] as const

export type NearbySortableCharityField =
  (typeof nearbySortableCharityFields)[number]

export const defaultNearbyCharityFields: NearbyCharityField[] = [
  "ein",
  "name",
  "city",
  "state",
  "ntee_group",
  "lat",
  "lng",
  "distance_miles",
]

type CharityDto = Record<string, unknown>

type CodeDescriptionItem = {
  code: string | number
  description: string
}

export type NearbyCharityDtoSource = CharityDtoSource & {
  distance_miles?: number | string | null
}


type SubsectionClassificationItem = {
  subsection: string
  classification: string
  description: string
}

function parseSelectedFields(fields?: string[]): string[] {
  if (!fields || fields.length === 0) return defaultNearbyCharityFields
  return fields
}



export function buildCodeLookup(items: CodeDescriptionItem[]): Record<string, string> {
  return items.reduce<Record<string, string>>((acc, item) => {
    acc[item.code] = item.description
    return acc
  }, {})
}


function mapCodedValue(
  code: string | number | null | undefined,
  lookup: Record<string, string>
) {
  if (code === null || code === undefined) return null

  return {
    code,
    description: lookup[String(code)] ?? "Unknown code",
  }
}



function buildSubsectionClassificationLookup(
  items: SubsectionClassificationItem[]
): Record<string, string> {
  return items.reduce<Record<string, string>>((acc, item) => {
    const key = `${item.subsection}:${item.classification}`
    acc[key] = item.description
    return acc
  }, {})
}

const nteeCodeLookup = buildCodeLookup(NteeCodes)
const nteeGroupLookup = buildCodeLookup(NteeGroups)
const affiliationLookup = buildCodeLookup(AffiliationCodes)
const deductibilityLookup = buildCodeLookup(DeductibilityCodes)
const foundationLookup = buildCodeLookup(FoundationCodes)
const organizationLookup = buildCodeLookup(OrganizationCodes)
const statusLookup = buildCodeLookup(StatusCodes)
const pfReqcodeLookup = buildCodeLookup(PfFilingRequiredCodes)
const filingReqLookup = buildCodeLookup(FilingRequiredCodes)
const accountPaidLookup = buildCodeLookup(AccountsPaidCodes)
const subsectionClassificationLookup = buildSubsectionClassificationLookup(SubsectionAndClassificationCodes)
const geocodeStatusLookup = buildCodeLookup(GeocodeStatusCodes)

function mapSubsectionClassification(
  subsection: string | null | undefined,
  classification: string | null | undefined,
  lookup: Record<string, string>
) {
  if (!subsection || !classification) return null

  const key = `${subsection}:${classification}`
  const description = lookup[key]

  if (!description) return null

  return {
    subsection,
    classification,
    description,
  }
}

const charityDtoFieldMap: Record<string, (charity: NearbyCharityDtoSource) => unknown> = {
    ein: (charity) => charity.ein,
    name: (charity) => charity.name,
    ico: (charity) => charity.ico,
    street: (charity) => charity.street,
    city: (charity) => charity.city,
    state: (charity) => charity.state,
    zip: (charity) => charity.zip,

    ntee_code: (charity) => mapCodedValue(charity.ntee_code, nteeCodeLookup),
    ntee_group: (charity) => mapCodedValue(charity.ntee_group, nteeGroupLookup),
    affiliation: (charity) => mapCodedValue(charity.affiliation, affiliationLookup),
    deductibility: (charity) => mapCodedValue(charity.deductibility, deductibilityLookup),
    foundation: (charity) => mapCodedValue(charity.foundation, foundationLookup),
    organization: (charity) => mapCodedValue(charity.organization, organizationLookup),
    status: (charity) => mapCodedValue(charity.status, statusLookup),
    filing_req_code: (charity) => mapCodedValue(charity.filing_req_code, filingReqLookup),
    pf_filing_req_code: (charity) => mapCodedValue(charity.pf_filing_req_code, pfReqcodeLookup),
    account_paid: (charity) => mapCodedValue(charity.account_paid, accountPaidLookup),
    geocode_status: (charity) => mapCodedValue(charity.geocode_status, geocodeStatusLookup),

    subsection_classification: (charity) =>mapSubsectionClassification(
        charity.subsection,
        charity.classification,
        subsectionClassificationLookup
    ),
    ruling: (charity) => charity.ruling,
    group: (charity) => charity.group,
    activity: (charity) => charity.activity,
    tax_period: (charity) => charity.tax_period,
    asset_amount: (charity) => charity.asset_amount,
    income_amount: (charity) => charity.income_amount,
    revenue_amount: (charity) => charity.revenue_amount,
    lat: (charity) => charity.lat,
    lng: (charity) => charity.lng,
    distance_miles: (charity) => charity.distance_miles == null ? null : Number(charity.distance_miles),
}




export function toCharityDto(charity: NearbyCharityDtoSource, fields?: string[]): CharityDto {
  const selectedFields = parseSelectedFields(fields)
  const dto: CharityDto = {}

  for (const field of selectedFields) {
    const mapper = charityDtoFieldMap[field]
    if (!mapper) continue

    dto[field] = mapper(charity)
  }

  return dto
}

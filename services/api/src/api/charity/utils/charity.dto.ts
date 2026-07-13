import { AccountsPaidCodes, AffiliationCodes, DeductibilityCodes, FilingRequiredCodes, FoundationCodes, GeocodeStatusCodes, NteeCodes, NteeGroups, OrganizationCodes, PfFilingRequiredCodes, StatusCodes, SubsectionAndClassificationCodes } from "../../meta-data/utils/exportMeta.js"

const DEFAULT_CHARITY_FIELDS = [
    "ein",
    "name",
    "city",
    "state",
    "ntee_group"
]

type CharityDto = Record<string, unknown>

type CodeDescriptionItem = {
  code: string | number
  description: string
}


type SubsectionClassificationItem = {
  subsection: string
  classification: string
  description: string
}

export type CharityDtoSource = {
  ein?: string | null
  name?: string | null
  ico?: string | null
  street?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  group?: string | null
  subsection?: string | null
  classification?: string | null
  affiliation?: string | null
  ruling?: string | null
  deductibility?: string | null
  foundation?: string | null
  activity?: string | null
  organization?: string | null
  status?: string | null
  tax_period?: string | null
  filing_req_code?: string | null
  pf_filing_req_code?: string | null
  account_paid?: string | null
  asset_amount?: unknown
  income_amount?: unknown
  revenue_amount?: unknown
  ntee_code?: string | null
  ntee_group?: string | null
  lat?: unknown
  lng?: unknown
  geocode_status?: number | null
}

function parseSelectedFields(fields?: string[]): string[] {
  if (!fields || fields.length === 0) return DEFAULT_CHARITY_FIELDS
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
const deductivilityLookup = buildCodeLookup(DeductibilityCodes)
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

const charityDtoFieldMap: Record<string, (charity: CharityDtoSource) => unknown> = {
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
    deductibility: (charity) => mapCodedValue(charity.deductibility, deductivilityLookup),
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
}




export function toCharityDto(charity: CharityDtoSource, fields?: string[]): CharityDto {
  const selectedFields = parseSelectedFields(fields)
  const dto: CharityDto = {}

  for (const field of selectedFields) {
    const mapper = charityDtoFieldMap[field]
    if (!mapper) continue

    dto[field] = mapper(charity)
  }

  return dto
}

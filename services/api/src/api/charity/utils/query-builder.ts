import { Prisma } from "../../../generated/prisma/client.js";
import { CharityQuery } from "../types/charity.request.types.js";

export const charityFilterFields = [
  // "zip",
  "group",
  "subsection",
  // "affiliation",
  "classification",
  "ruling",
  // "deductibility",
  // "foundation",
  "activity",
  // "organization",
  // "status",
  "tax_period",
  "lat",
  "lng",
  // "filing_req_code",
  "pf_filing_req_code",
  // "account_paid",
  // "ntee_code",
  // "ntee_group"
] as const

export const buildCharityWhere = (q: CharityQuery): Prisma.CharityWhereInput => {
    const where: Prisma.CharityWhereInput = {}

   if (q.name) {
      where.name = { 
        equals: q.name, 
        mode: "insensitive" 
      }
    }

    if (q.ico) {
      where.ico = { 
        equals: q.ico, 
        mode: "insensitive" 
      }
    }

    if (q.street) {
      where.street = { 
        equals: q.street, 
        mode: "insensitive" 
      }
    }

    if (q.asset_amount_gte || q.asset_amount_lte) {
      where.asset_amount = {
        ...(q.asset_amount_gte && { gte: q.asset_amount_gte}),
        ...(q.asset_amount_lte && { lte: q.asset_amount_lte}),
      }
    }

    if (q.income_amount_gte || q.income_amount_lte) {
      where.income_amount = {
        ...(q.income_amount_gte && { gte: q.income_amount_gte}),
        ...(q.income_amount_lte && { lte: q.income_amount_lte}),
      }
    }

    if (q.revenue_amount_gte || q.revenue_amount_lte) {
      where.revenue_amount = {
        ...(q.revenue_amount_gte && { gte: q.revenue_amount_gte}),
        ...(q.revenue_amount_lte && { lte: q.revenue_amount_lte}),
      }
    }

    if (q.zip?.length) {
      where.zip = { in: q.zip }
    }

    if (q.geocode_status?.length) {
      where.geocode_status = { in: q.geocode_status }
    }

    if (q.state?.length) {
      where.OR = q.state.map((state) => ({
        state: {
          equals: state,
          mode: "insensitive",
        },
      }));
    }

    if (q.city?.length) {
      where.OR = q.city.map((city) => ({
        city: {
          equals: city,
          mode: "insensitive",
        },
      }));
    }

    

    if (q.status?.length) {
      where.status = { in: q.status }
    }

    if (q.foundation?.length) {
      where.foundation = { in: q.foundation }
    }

    if (q.filing_req_code?.length) {
      where.filing_req_code = { in: q.filing_req_code }
    }

    if (q.organization?.length) {
      where.organization = { in: q.organization }
    }

    if (q.affiliation?.length) {
      where.affiliation = { in: q.affiliation }
    }

    if (q.ntee_code?.length) {
      where.ntee_code = { in: q.ntee_code}
    }

    if (q.account_paid?.length) {
      where.account_paid = { in: q.account_paid}
    }

    if (q.ntee_group?.length) {
      where.ntee_group = { in: q.ntee_group}
    }

    if (q.deductibility?.length) {
      where.deductibility = { in: q.deductibility }
    }

    for (const key of charityFilterFields) {
      const val = q[key];

      if (val !== undefined) {
        where[key] = val
      }
    }

    return where
}
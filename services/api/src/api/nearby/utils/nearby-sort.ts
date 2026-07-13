import { Prisma } from "../../../generated/prisma/client.js";
import { NearbyCharityQuery } from "../types/nearby.request.types.js";

const nearbySortableColumnMap = {
  ein: Prisma.sql`"ein"`,
  name: Prisma.sql`"name"`,
  ico: Prisma.sql`"ico"`,
  street: Prisma.sql`"street"`,
  city: Prisma.sql`"city"`,
  state: Prisma.sql`"state"`,
  zip: Prisma.sql`"zip"`,
  group: Prisma.sql`"group"`,
  subsection: Prisma.sql`"subsection"`,
  classification: Prisma.sql`"classification"`,
  affiliation: Prisma.sql`"affiliation"`,
  ruling: Prisma.sql`"ruling"`,
  deductibility: Prisma.sql`"deductibility"`,
  foundation: Prisma.sql`"foundation"`,
  activity: Prisma.sql`"activity"`,
  organization: Prisma.sql`"organization"`,
  status: Prisma.sql`"status"`,
  tax_period: Prisma.sql`"tax_period"`,
  filing_req_code: Prisma.sql`"filing_req_code"`,
  pf_filing_req_code: Prisma.sql`"pf_filing_req_code"`,
  account_paid: Prisma.sql`"account_paid"`,
  asset_amount: Prisma.sql`"asset_amount"`,
  income_amount: Prisma.sql`"income_amount"`,
  revenue_amount: Prisma.sql`"revenue_amount"`,
  ntee_code: Prisma.sql`"ntee_code"`,
  ntee_group: Prisma.sql`"ntee_group"`,
  lat: Prisma.sql`"lat"`,
  lng: Prisma.sql`"lng"`,
  geocode_status: Prisma.sql`"geocode_status"`,
  distance_miles: Prisma.sql`"distance_miles"`,
} as const;

export function buildNearbyOrderBySql(q: NearbyCharityQuery): Prisma.Sql {
  const sortColumn =
    nearbySortableColumnMap[q.sortBy] ?? nearbySortableColumnMap.distance_miles;

  const sortDir = q.sortDir === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`;

  return Prisma.sql`ORDER BY ${sortColumn} ${sortDir}, "name" ASC`;
}
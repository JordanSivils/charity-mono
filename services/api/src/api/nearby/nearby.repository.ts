import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { NearbyCharityQuery } from "./types/nearby.request.types.js";
import { resolveNearbyOrigin } from "./utils/nearby-resolver.js";
import { buildNearbyWhereSql } from "./utils/nearby-query-builder.js";
import { buildNearbyOrderBySql } from "./utils/nearby-sort.js";



type NearbyCharityRow = {
  id: string;
  ein: string;
  name: string | null;
  ico: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  group: string | null;
  subsection: string | null;
  affiliation: string | null;
  classification: string | null;
  ruling: string | null;
  deductibility: string | null;
  foundation: string | null;
  activity: string | null;
  organization: string | null;
  status: string | null;
  tax_period: string | null;
  filing_req_code: string | null;
  pf_filing_req_code: string | null;
  account_paid: string | null;
  asset_amount: Prisma.Decimal | null;
  income_amount: Prisma.Decimal | null;
  revenue_amount: Prisma.Decimal | null;
  ntee_code: string | null; 
  ntee_group: string | null;
  lat: Prisma.Decimal | null;
  lng: Prisma.Decimal | null;
  geocode_status: number | null;
  distance_miles: number | string;
  hash_value: string | null;
geocoded_at: Date | null;
};

type CountRow = {
  count: bigint;
};

export async function getNearbyCharities(q: NearbyCharityQuery) {
  const origin = await resolveNearbyOrigin(q);

  const radiusMeters = q.radius * 1609.344;
  const offset = (q.page - 1) * q.limit;

  const whereSql = buildNearbyWhereSql(q);
  const orderBySql = buildNearbyOrderBySql(q);

  const originPointSql = Prisma.sql`
    ST_SetSRID(ST_MakePoint(${origin.lng}, ${origin.lat}), 4326)::geography
  `;

  const distanceSql = Prisma.sql`
    ST_Distance("location", ${originPointSql}) / 1609.344
  `;

  const distanceFilterSql = Prisma.sql`
    ST_DWithin("location", ${originPointSql}, ${radiusMeters})
  `;

  const charities = await prisma.$queryRaw<NearbyCharityRow[]>`
    SELECT
      "id",
      "ein",
      "name",
      "ico",
      "street",
      "city",
      "state",
      "zip",
      "group",
      "subsection",
      "affiliation",
      "classification",
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
      "hash_value",
      "geocoded_at",
      ${distanceSql} AS "distance_miles"
    FROM "Charity"
    ${whereSql}
      AND ${distanceFilterSql}
    ${orderBySql}
    LIMIT ${q.limit}
    OFFSET ${offset}
  `;

  const countRows = await prisma.$queryRaw<CountRow[]>`
    SELECT COUNT(*)::bigint AS "count"
    FROM "Charity"
    ${whereSql}
      AND ${distanceFilterSql}
  `;

  const total = Number(countRows[0]?.count ?? 0);

  return {
    charities,
    total,
    origin,
  };
}
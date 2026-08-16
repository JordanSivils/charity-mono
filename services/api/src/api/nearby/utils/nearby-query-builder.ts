import { NearbyCharityQuery } from "../types/nearby.request.types.js";
import { Prisma } from "@charity-mono/database/client";

export function buildNearbyWhereSql(q: NearbyCharityQuery): Prisma.Sql {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`"location" IS NOT NULL`,
  ];

  // exact string filters, case-insensitive
  if (q.name) {
    conditions.push(Prisma.sql`LOWER("name") = LOWER(${q.name})`);
  }

  if (q.ico) {
    conditions.push(Prisma.sql`LOWER("ico") = LOWER(${q.ico})`);
  }

  if (q.state?.length) {
    conditions.push(
        Prisma.sql`LOWER("state") IN (${Prisma.join(
            q.state.map((state) => state.toLowerCase())
        )
    })`
  );
}

  // numeric ranges
  if (q.asset_amount_gte !== undefined) {
    conditions.push(Prisma.sql`"asset_amount" >= ${q.asset_amount_gte}`);
  }

  if (q.asset_amount_lte !== undefined) {
    conditions.push(Prisma.sql`"asset_amount" <= ${q.asset_amount_lte}`);
  }

  if (q.income_amount_gte !== undefined) {
    conditions.push(Prisma.sql`"income_amount" >= ${q.income_amount_gte}`);
  }

  if (q.income_amount_lte !== undefined) {
    conditions.push(Prisma.sql`"income_amount" <= ${q.income_amount_lte}`);
  }

  if (q.revenue_amount_gte !== undefined) {
    conditions.push(Prisma.sql`"revenue_amount" >= ${q.revenue_amount_gte}`);
  }

  if (q.revenue_amount_lte !== undefined) {
    conditions.push(Prisma.sql`"revenue_amount" <= ${q.revenue_amount_lte}`);
  }

  // multi-select numeric
  if (q.geocode_status?.length) {
    conditions.push(
      Prisma.sql`"geocode_status" IN (${Prisma.join(q.geocode_status)})`
    );
  }

  // multi-select string filters
  if (q.status?.length) {
    conditions.push(Prisma.sql`"status" IN (${Prisma.join(q.status)})`);
  }

  if (q.foundation?.length) {
    conditions.push(Prisma.sql`"foundation" IN (${Prisma.join(q.foundation)})`);
  }

  if (q.filing_req_code?.length) {
    conditions.push(
      Prisma.sql`"filing_req_code" IN (${Prisma.join(q.filing_req_code)})`
    );
  }

  if (q.organization?.length) {
    conditions.push(
      Prisma.sql`"organization" IN (${Prisma.join(q.organization)})`
    );
  }

  if (q.affiliation?.length) {
    conditions.push(
      Prisma.sql`"affiliation" IN (${Prisma.join(q.affiliation)})`
    );
  }

  if (q.ntee_code?.length) {
    conditions.push(Prisma.sql`"ntee_code" IN (${Prisma.join(q.ntee_code)})`);
  }

  if (q.ntee_group?.length) {
    conditions.push(Prisma.sql`"ntee_group" IN (${Prisma.join(q.ntee_group)})`);
  }

  if (q.account_paid?.length) {
    conditions.push(
      Prisma.sql`"account_paid" IN (${Prisma.join(q.account_paid)})`
    );
  }

  if (q.deductibility?.length) {
    conditions.push(
      Prisma.sql`"deductibility" IN (${Prisma.join(q.deductibility)})`
    );
  }

  // scalar filters
  if (q.group !== undefined) {
    conditions.push(Prisma.sql`"group" = ${q.group}`);
  }

  if (q.subsection !== undefined) {
    conditions.push(Prisma.sql`"subsection" = ${q.subsection}`);
  }

  if (q.classification !== undefined) {
    conditions.push(Prisma.sql`"classification" = ${q.classification}`);
  }

  if (q.ruling !== undefined) {
    conditions.push(Prisma.sql`"ruling" = ${q.ruling}`);
  }

  if (q.activity !== undefined) {
    conditions.push(Prisma.sql`"activity" = ${q.activity}`);
  }

  if (q.tax_period !== undefined) {
    conditions.push(Prisma.sql`"tax_period" = ${q.tax_period}`);
  }

  if (q.pf_filing_req_code !== undefined) {
    conditions.push(
      Prisma.sql`"pf_filing_req_code" = ${q.pf_filing_req_code}`
    );
  }

  return Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`;
}

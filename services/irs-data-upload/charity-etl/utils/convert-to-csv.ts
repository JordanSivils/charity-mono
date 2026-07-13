import { Transform } from "stream";

const csvEscape = (v: any) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const toCsvLine = (val: any) => {
  return val.map(csvEscape).join(",") + "\n";
}

export const convertToCsv = () => {
    return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
        const line = toCsvLine([
        row.ein,
        row.name,
        row.ico,
        row.street,
        row.city,
        row.state,
        row.zip,
        row.group,
        row.subsection,
        row.affiliation,
        row.classification,
        row.ruling,
        row.deductibility,
        row.foundation,
        row.activity,
        row.organization,
        row.status,
        row.tax_period,
        row.filing_req_code,
        row.pf_filing_req_code,
        row.account_paid,
        row.asset_amount,
        row.income_amount,
        row.revenue_amount,
        row.ntee_code,
        row.ntee_group,
        row.hash_value,
        row.address_hash,
        row.lat,
        row.lng,
        row.geocode_status,
        row.geocoded_at
        ])
        cb(null, line)
    }
})
}

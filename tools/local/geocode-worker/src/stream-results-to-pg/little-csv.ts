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

export const convertToLittleCsv = () => {
    return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
        const line = toCsvLine([
        row.ein,
        row.zip,
        row.lat,
        row.lng,
        row.match_status
        ])
        cb(null, line)
    }
})
}
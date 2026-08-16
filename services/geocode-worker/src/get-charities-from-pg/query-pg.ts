import { to as copyTo } from "pg-copy-streams";
import fs from "fs";
import path from "node:path";
import { pipeline } from "stream/promises";
import pool from "../pg/pg-config.js";
import type { Readable } from "stream";

const OUTPUT_FILE = "src/exported-csv-from-pg/geocode_batch.csv";

const QUERY = `
  COPY (
    SELECT
      ein,
      street,
      city,
      state,
      zip
    FROM "Charity"
    WHERE geocode_status = 11
    ORDER BY ein
    LIMIT 5999
  ) TO STDOUT WITH CSV HEADER
`;

export const exportBatch = async () => {
  const pgClient = await pool.connect();

  try {
    await fs.promises.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    const fileStream = fs.createWriteStream(OUTPUT_FILE);
    const dbStream = pgClient.query(copyTo(QUERY)) as unknown as Readable;

    await pipeline(dbStream, fileStream);

    console.log("✅ Batch exported");
  } catch (err) {
    console.error("❌ Export failed", err);
    throw err;
  } finally {
    pgClient.release();
  }
};

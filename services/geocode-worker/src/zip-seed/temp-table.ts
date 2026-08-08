import pool from "../pg/pg-config.js";
import { from as copyFrom } from "pg-copy-streams";
import { pipeline, Transform } from "stream";
import { parse } from "fast-csv";
import fs from "fs";
import path from "node:path";

const toZipSnapshot = () => {
  return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
      try {
        const zip = String(row.zip ?? "").trim();
        const latRaw = String(row.lat ?? "").trim();
        const lngRaw = String(row.lng ?? "").trim();

        if (!zip || !latRaw || !lngRaw) {
          return cb();
        }

        const lat = Number(latRaw);
        const lng = Number(lngRaw);

        if (Number.isNaN(lat) || Number.isNaN(lng)) {
          return cb();
        }

        cb(null, { zip, lat, lng });
      } catch (err) {
        cb(err as Error);
      }
    },
  });
};

const toCsvLine = (values: Array<string | number | null>) => {
  return (
    values
      .map((value) => {
        if (value === null || value === undefined) return "";
        const str = String(value);
        if (str.includes('"') || str.includes(",") || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(",") + "\n"
  );
};

const convertToCsv = () => {
  return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
      cb(null, toCsvLine([row.zip, row.lat, row.lng]));
    },
  });
};

export const refreshFallbackGeocodes = async () => {
  const db = await pool.connect();

  try {
    await db.query(`DROP TABLE IF EXISTS zip_stage`);
    
    await db.query(`
      CREATE TEMP TABLE zip_stage (
        zip TEXT,
        lat DECIMAL(9,6),
        lng DECIMAL(9,6)
      );
    `);

    await new Promise<void>((resolve, reject) => {
      const copySql = `
        COPY zip_stage (zip, lat, lng)
        FROM STDIN WITH (FORMAT csv)
      `;

      const streamToPg = db.query(copyFrom(copySql));
      const filePath = path.resolve("src/zip-geo-file/geonames_zip_centroids.csv");
      const fileStream = fs.createReadStream(filePath);

      fileStream.on("error", reject);
      streamToPg.on("error", reject);

      pipeline(
        fileStream,
        parse({ headers: true }),
        toZipSnapshot(),
        convertToCsv(),
        streamToPg,
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });

    const result = await db.query(`
      INSERT INTO "FallbackGeocodes" ("zip", "lat", "lng", "location")
      SELECT
        zs.zip,
        zs.lat,
        zs.lng,
        ST_SetSRID(ST_MakePoint(zs.lng::double precision, zs.lat::double precision), 4326)::geography
      FROM zip_stage zs
      ON CONFLICT ("zip")
      DO UPDATE SET
        "lat" = EXCLUDED."lat",
        "lng" = EXCLUDED."lng",
        "location" = EXCLUDED."location"
    `);

    console.log("✅ FallbackGeocodes refreshed");
    console.log(`Rows affected: ${result.rowCount ?? 0}`);
  } finally {
    db.release();
  }
};

refreshFallbackGeocodes().catch((err) => {
  console.error("❌ refreshFallbackGeocodes failed");
  console.error(err);
  process.exit(1);
});
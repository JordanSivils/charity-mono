import { to as copyTo } from "pg-copy-streams"
import fs from "fs"
import { pipeline } from "stream/promises"
import pool from "../pg/pg-config.js"
import type { Readable } from "stream"

const QUERY = `
  COPY (
    SELECT
      ein,
      street,
      city,
      state,
      zip
    FROM "Charity"
    ORDER BY ein
    LIMIT 9999
  ) TO STDOUT WITH CSV HEADER
`

export const exportBatch = async () => {
  const pgClient = await pool.connect()

  const fileStream = fs.createWriteStream(
    "src/from-stream/exported-csv/geocode_batch_01.csv"
  )

  try {
    const dbStream = pgClient.query(copyTo(QUERY)) as unknown as Readable

    await pipeline(dbStream, fileStream)

    console.log("✅ Batch exported")
  } catch (err) {
    console.error("❌ Export failed", err)
  } finally {
    pgClient.release()
    await pool.end()
  }
}

exportBatch()
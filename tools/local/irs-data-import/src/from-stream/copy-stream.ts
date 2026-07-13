import client from "../pg/pg-config.js"
import { from as copyFrom } from "pg-copy-streams"
import { pipeline, Transform } from "stream"
import { parse } from "fast-csv"
import { cleanString } from "../utils/clean-values.js"
import fs from "fs"
import { convertToLittleCsv } from "./little-csv.js"
import path from "node:path"

const toSnapshot = () => {
  return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
      try {
        if (row[0] === "ein") {
          return cb()
        }

        const ein = cleanString(row[0])
        const matchStatus = row[2].trim().toLowerCase()
        const zip = cleanString(row[1].slice(-5))

        let lat: number | null = null
        let lng: number | null = null

        if (matchStatus === "match" && row.length >= 6 && row[5]) {
          const [lngRaw, latRaw] = row[5].split(",")

          lng = lngRaw ? Number(lngRaw.trim()) : null
          lat = latRaw ? Number(latRaw.trim()) : null
        }

        cb(null, {
          ein,
          zip,
          lat,
          lng,
          match_status: matchStatus,
        })
      } catch (err) {
        cb(err as Error)
      }
    },
  })
}

export const streamData = async (filePath: string) => {
  const db = await client.connect()

  try {
    await new Promise<void>((resolve, reject) => {
      const copySql = `COPY "GeocodeStaging" (
        ein,
        zip,
        lat,
        lng,
        match_status
      ) FROM STDIN WITH (FORMAT csv)`

      const streamToPg = db.query(copyFrom(copySql))
      const fileStream = fs.createReadStream(filePath)

      fileStream.on("error", reject)
      streamToPg.on("error", reject)

      pipeline(
        fileStream,
        parse({ headers: false }),
        toSnapshot(),
        convertToLittleCsv(),
        streamToPg,
        (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        }
      )
    })
  } finally {
    db.release()
  }
}

const filePlace = path.resolve("src/from-stream/geocoded-results/geocode_result_01.csv")
await streamData(filePlace)
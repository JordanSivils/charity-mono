import fs from "node:fs"
import path from "node:path"

const INPUT_FILE = "src/from-stream/exported-csv/geocode_batch_01.csv"
const OUTPUT_FILE = "src/from-stream/geocoded-results/geocode_result_01.csv"

export const submitBatch = async () => {
  const form = new FormData()

  form.append("benchmark", "4")
  form.append(
    "addressFile",
    new Blob([fs.readFileSync(INPUT_FILE)], { type: "text/csv" }),
    path.basename(INPUT_FILE)
  )

  console.log("Submitting to Census...")

  const response = await fetch(
    "https://geocoding.geo.census.gov/geocoder/locations/addressbatch",
    {
      method: "POST",
      body: form,
    }
  )

  console.log("Status:", response.status, response.statusText)

  const bodyText = await response.text()
  console.log("Response preview:", bodyText.slice(0, 1000))

  if (!response.ok) {
    throw new Error(`Census request failed: ${response.status}`)
  }

  fs.mkdirSync("src/from-stream/geocoded-results", { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, bodyText, "utf8")

  console.log("✅ Geocoded CSV saved:", OUTPUT_FILE)
}

submitBatch().catch((err) => {
  console.error(err)
  process.exit(1)
})
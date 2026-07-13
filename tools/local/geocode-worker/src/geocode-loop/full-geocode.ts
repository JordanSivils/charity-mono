import pool from "../pg/pg-config.js";
import path from "node:path";
import fs from "node:fs/promises";
import { submitBatch } from "../fetch-census-geocoder/geocode.js";
import { exportBatch } from "../get-charities-from-pg/query-pg.js";
import { streamData } from "../stream-results-to-pg/copy-stream.js";

// import your existing functions

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_INPUT_PATH = path.resolve("src/exported-csv-from-pg/geocode_batch.csv");
const BATCH_OUTPUT_PATH = path.resolve("src/geocoded-results-csv/geocode_results.csv");

async function getRemainingCount() {
  const db = await pool.connect();
  try {
    const result = await db.query(`
      SELECT COUNT(*)::int AS count
      FROM "Charity"
      WHERE geocode_status = 11
    `);
    return result.rows[0].count as number;
  } finally {
    db.release();
  }
}

async function cleanupBatchFiles() {
  await Promise.all([
    fs.unlink(BATCH_INPUT_PATH).catch(() => {}),
    fs.unlink(BATCH_OUTPUT_PATH).catch(() => {}),
  ]);
}

async function runOneBatch(batchNumber: number) {
  console.log(`\n=== Batch ${batchNumber} ===`);

  await cleanupBatchFiles();

  console.log("1) Exporting next batch...");
   await exportBatch();

  const stats = await fs.stat(BATCH_INPUT_PATH).catch(() => null);
  if (!stats || stats.size === 0) {
    throw new Error("❌ Export file missing or empty");
  }

  console.log("2) Submitting batch to Census...");
  await submitBatch();

  console.log("3) Loading Census results into staging and merging...");
  await streamData(BATCH_OUTPUT_PATH);

  console.log(`✅ Batch ${batchNumber} complete`);

  return true;
}

async function runGeocodePipeline() {
  let batchNumber = 1;

  while (true) {
    const remaining = await getRemainingCount();
    console.log(`Remaining with geocode_status = 11: ${remaining}`);

    if (remaining === 0) {
      console.log("✅ All pending Census geocodes are complete.");
      break;
    }

    try {
      await runOneBatch(batchNumber);
      batchNumber += 1;

      // gentle pause between batches
      await sleep(2000);
    } catch (err) {
      console.error(`❌ Batch ${batchNumber} failed`);
      console.error(err);
      process.exit(1);
    }
  }
}

runGeocodePipeline().catch((err) => {
  console.error("❌ Pipeline failed");
  console.error(err);
  process.exit(1);
});
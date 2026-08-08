import pool from "../pg/pg-config.js";

const runZipFallback = async () => {
  const db = await pool.connect();

  try {
    await db.query(`SELECT public.apply_zip_fallback_geocodes();`);
    console.log("✅ ZIP fallback geocoding applied");
  } finally {
    db.release();
  }
};

runZipFallback().catch((err) => {
  console.error("❌ ZIP fallback failed");
  console.error(err);
  process.exit(1);
});
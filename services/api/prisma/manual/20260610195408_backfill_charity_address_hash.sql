-- Manual operational backfill for Charity.address_hash.
-- Do not place this file under prisma/migrations; prisma migrate deploy must not
-- run this full-table operation automatically.
--
-- Preconditions:
-- - The 20260610195408_add_address_hash migration has already been applied.
-- - Run during a quiet database window.
-- - Monitor locks, WAL/disk usage, CPU, and application latency.
--
-- The hash algorithm must match the migration/function and ETL:
-- md5(concat(
--   COALESCE(length(street)::text, '-1'), ':', COALESCE(street, ''), '|',
--   COALESCE(length(city)::text, '-1'), ':', COALESCE(city, ''), '|',
--   COALESCE(length(state)::text, '-1'), ':', COALESCE(state, ''), '|',
--   COALESCE(length(zip)::text, '-1'), ':', COALESCE(zip, '')
-- ))
--
-- Simple one-shot version. Use only if the database can comfortably handle
-- updating all remaining null rows in one transaction:
--
-- UPDATE "Charity"
-- SET address_hash = md5(
--     concat(
--         COALESCE(length(street)::text, '-1'), ':', COALESCE(street, ''), '|',
--         COALESCE(length(city)::text, '-1'), ':', COALESCE(city, ''), '|',
--         COALESCE(length(state)::text, '-1'), ':', COALESCE(state, ''), '|',
--         COALESCE(length(zip)::text, '-1'), ':', COALESCE(zip, '')
--     )
-- )
-- WHERE address_hash IS NULL;
--
-- Safer batched version. Run repeatedly until it updates 0 rows.
-- Each execution commits one batch when autocommit is enabled.
WITH batch AS (
    SELECT id
    FROM "Charity"
    WHERE address_hash IS NULL
    ORDER BY id
    LIMIT 10000
)
UPDATE "Charity" AS c
SET address_hash = md5(
    concat(
        COALESCE(length(c.street)::text, '-1'), ':', COALESCE(c.street, ''), '|',
        COALESCE(length(c.city)::text, '-1'), ':', COALESCE(c.city, ''), '|',
        COALESCE(length(c.state)::text, '-1'), ':', COALESCE(c.state, ''), '|',
        COALESCE(length(c.zip)::text, '-1'), ':', COALESCE(c.zip, '')
    )
)
FROM batch
WHERE c.id = batch.id;

-- Progress check:
-- SELECT count(*) AS remaining FROM "Charity" WHERE address_hash IS NULL;

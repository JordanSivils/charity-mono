CREATE INDEX IF NOT EXISTS "Charity_location_gist_idx"
ON "Charity" USING GIST ("location");

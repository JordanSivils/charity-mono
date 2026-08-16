CREATE EXTENSION IF NOT EXISTS postgis;
-- AlterTable
ALTER TABLE "Charity" ADD COLUMN     "geocode_status" INTEGER,
ADD COLUMN     "geocoded_at" TIMESTAMPTZ(6),
ADD COLUMN     "lat" DECIMAL(9,6),
ADD COLUMN     "lng" DECIMAL(9,6),
ADD COLUMN     "location" geography(Point,4326);

-- AlterTable
ALTER TABLE "CharityStaging" ADD COLUMN     "geocode_status" INTEGER,
ADD COLUMN     "geocoded_at" TIMESTAMPTZ(6),
ADD COLUMN     "lat" DECIMAL(9,6),
ADD COLUMN     "lng" DECIMAL(9,6);

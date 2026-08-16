-- CreateTable
CREATE TABLE "FallbackGeocodes" (
    "zip" VARCHAR(10) NOT NULL,
    "lat" DECIMAL(9,6) NOT NULL,
    "lng" DECIMAL(9,6) NOT NULL,
    "location" geography(Point,4326),

    CONSTRAINT "FallbackGeocodes_pkey" PRIMARY KEY ("zip")
);

-- CreateIndex
CREATE INDEX "FallbackGeocodes_location_idx" ON "FallbackGeocodes" USING GIST ("location");

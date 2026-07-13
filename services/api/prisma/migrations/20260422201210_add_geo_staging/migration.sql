-- CreateTable
CREATE TABLE "GeocodeStaging" (
    "ein" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),
    "match_status" TEXT NOT NULL,

    CONSTRAINT "GeocodeStaging_pkey" PRIMARY KEY ("ein")
);

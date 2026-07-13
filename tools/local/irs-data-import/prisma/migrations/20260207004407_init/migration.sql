-- CreateTable
CREATE TABLE "Charity" (
    "id" TEXT NOT NULL,
    "ein" TEXT NOT NULL,
    "name" TEXT,
    "ico" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "group" INTEGER,
    "subsection" INTEGER,
    "affiliation" INTEGER,
    "classification" INTEGER,
    "ruling" INTEGER,
    "deductibility" INTEGER,
    "foundation" INTEGER,
    "activity" INTEGER,
    "organization" INTEGER,
    "status" INTEGER,
    "tax_period" INTEGER,
    "filing_req_code" INTEGER,
    "pf_filing_req_code" INTEGER,
    "acct_pd" INTEGER,
    "asset_amt" DECIMAL(14,2) NOT NULL,
    "income_amt" DECIMAL(14,2),
    "revenue_amt" DECIMAL(14,2),
    "ntee_code" TEXT,
    "ntee_group" TEXT,
    "hash_value" TEXT,

    CONSTRAINT "Charity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharityStaging" (
    "id" TEXT NOT NULL,
    "ein" TEXT NOT NULL,
    "name" TEXT,
    "ico" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "group" INTEGER,
    "subsection" INTEGER,
    "affiliation" INTEGER,
    "classification" INTEGER,
    "ruling" INTEGER,
    "deductibility" INTEGER,
    "foundation" INTEGER,
    "activity" INTEGER,
    "organization" INTEGER,
    "status" INTEGER,
    "tax_period" INTEGER,
    "filing_req_code" INTEGER,
    "pf_filing_req_code" INTEGER,
    "acct_pd" INTEGER,
    "asset_amt" DECIMAL(14,2) NOT NULL,
    "income_amt" DECIMAL(14,2),
    "revenue_amt" DECIMAL(14,2),
    "ntee_code" TEXT,
    "ntee_group" TEXT,
    "hash_value" TEXT,

    CONSTRAINT "CharityStaging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Charity_ein_key" ON "Charity"("ein");

-- CreateIndex
CREATE INDEX "Charity_zip_idx" ON "Charity"("zip");

-- CreateIndex
CREATE INDEX "Charity_state_city_idx" ON "Charity"("state", "city");

-- CreateIndex
CREATE INDEX "Charity_ntee_group_idx" ON "Charity"("ntee_group");

-- CreateIndex
CREATE INDEX "Charity_status_idx" ON "Charity"("status");

-- CreateIndex
CREATE INDEX "Charity_deductibility_idx" ON "Charity"("deductibility");

-- CreateIndex
CREATE UNIQUE INDEX "CharityStaging_ein_key" ON "CharityStaging"("ein");

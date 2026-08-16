-- CreateEnum
CREATE TYPE "ApiKeyEnv" AS ENUM ('LIVE', 'DEV');

-- CreateTable
CREATE TABLE "Charity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ein" TEXT NOT NULL,
    "name" TEXT,
    "ico" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "group" TEXT,
    "subsection" TEXT,
    "affiliation" TEXT,
    "classification" TEXT,
    "ruling" TEXT,
    "deductibility" TEXT,
    "foundation" TEXT,
    "activity" TEXT,
    "organization" TEXT,
    "status" TEXT,
    "tax_period" TEXT,
    "filing_req_code" TEXT,
    "pf_filing_req_code" TEXT,
    "account_paid" TEXT,
    "asset_amount" DECIMAL(14,2),
    "income_amount" DECIMAL(14,2),
    "revenue_amount" DECIMAL(14,2),
    "ntee_code" TEXT,
    "ntee_code_valid" BOOLEAN,
    "ntee_group" TEXT,
    "hash_value" TEXT,

    CONSTRAINT "Charity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharityStaging" (
    "ein" TEXT NOT NULL,
    "name" TEXT,
    "ico" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "group" TEXT,
    "subsection" TEXT,
    "affiliation" TEXT,
    "classification" TEXT,
    "ruling" TEXT,
    "deductibility" TEXT,
    "foundation" TEXT,
    "activity" TEXT,
    "organization" TEXT,
    "status" TEXT,
    "tax_period" TEXT,
    "filing_req_code" TEXT,
    "pf_filing_req_code" TEXT,
    "account_paid" TEXT,
    "asset_amount" DECIMAL(14,2),
    "income_amount" DECIMAL(14,2),
    "revenue_amount" DECIMAL(14,2),
    "ntee_code" TEXT,
    "ntee_code_valid" BOOLEAN,
    "ntee_group" TEXT,
    "hash_value" TEXT
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "environment" "ApiKeyEnv" NOT NULL,
    "keyHash" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "tierId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dailyLimit" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE INDEX "CharityStaging_ein_idx" ON "CharityStaging"("ein");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiKey_userId_environment_idx" ON "ApiKey"("userId", "environment");

-- CreateIndex
CREATE INDEX "ApiKey_userId_environment_isActive_idx" ON "ApiKey"("userId", "environment", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Tier_name_key" ON "Tier"("name");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

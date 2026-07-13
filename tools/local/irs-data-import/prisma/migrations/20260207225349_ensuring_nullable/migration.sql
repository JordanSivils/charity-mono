-- AlterTable
ALTER TABLE "Charity" ALTER COLUMN "asset_amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CharityStaging" ALTER COLUMN "asset_amount" DROP NOT NULL;

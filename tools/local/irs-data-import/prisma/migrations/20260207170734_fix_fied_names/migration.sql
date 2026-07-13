/*
  Warnings:

  - You are about to drop the column `acct_pd` on the `Charity` table. All the data in the column will be lost.
  - You are about to drop the column `asset_amt` on the `Charity` table. All the data in the column will be lost.
  - You are about to drop the column `income_amt` on the `Charity` table. All the data in the column will be lost.
  - You are about to drop the column `revenue_amt` on the `Charity` table. All the data in the column will be lost.
  - You are about to drop the column `acct_pd` on the `CharityStaging` table. All the data in the column will be lost.
  - You are about to drop the column `asset_amt` on the `CharityStaging` table. All the data in the column will be lost.
  - You are about to drop the column `income_amt` on the `CharityStaging` table. All the data in the column will be lost.
  - You are about to drop the column `revenue_amt` on the `CharityStaging` table. All the data in the column will be lost.
  - Added the required column `asset_amount` to the `Charity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asset_amount` to the `CharityStaging` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Charity" DROP COLUMN "acct_pd",
DROP COLUMN "asset_amt",
DROP COLUMN "income_amt",
DROP COLUMN "revenue_amt",
ADD COLUMN     "account_paid" INTEGER,
ADD COLUMN     "asset_amount" DECIMAL(14,2) NOT NULL,
ADD COLUMN     "income_amount" DECIMAL(14,2),
ADD COLUMN     "revenue_amount" DECIMAL(14,2);

-- AlterTable
ALTER TABLE "CharityStaging" DROP COLUMN "acct_pd",
DROP COLUMN "asset_amt",
DROP COLUMN "income_amt",
DROP COLUMN "revenue_amt",
ADD COLUMN     "account_paid" INTEGER,
ADD COLUMN     "asset_amount" DECIMAL(14,2) NOT NULL,
ADD COLUMN     "income_amount" DECIMAL(14,2),
ADD COLUMN     "revenue_amount" DECIMAL(14,2);

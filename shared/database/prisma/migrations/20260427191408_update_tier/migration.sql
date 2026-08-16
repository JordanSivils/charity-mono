/*
  Warnings:

  - You are about to drop the column `devDailyLimit` on the `Tier` table. All the data in the column will be lost.
  - You are about to drop the column `liveDailyLimit` on the `Tier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Tier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dailyLimit` to the `Tier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nearbyRadiusMaxMiles` to the `Tier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nearbyResultLimit` to the `Tier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultLimit` to the `Tier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tier` table without a default value. This is not possible if the table is not empty.
  - Made the column `tierId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ApiKey" DROP CONSTRAINT "ApiKey_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tierId_fkey";

-- AlterTable
ALTER TABLE "Tier" DROP COLUMN "devDailyLimit",
DROP COLUMN "liveDailyLimit",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dailyLimit" INTEGER NOT NULL,
ADD COLUMN     "nearbyRadiusMaxMiles" INTEGER NOT NULL,
ADD COLUMN     "nearbyResultLimit" INTEGER NOT NULL,
ADD COLUMN     "resultLimit" INTEGER NOT NULL,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tierId" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserBilling" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" TEXT,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBilling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBilling_userId_key" ON "UserBilling"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBilling_stripeCustomerId_key" ON "UserBilling"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBilling_stripeSubscriptionId_key" ON "UserBilling"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Tier_stripePriceId_key" ON "Tier"("stripePriceId");

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBilling" ADD CONSTRAINT "UserBilling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

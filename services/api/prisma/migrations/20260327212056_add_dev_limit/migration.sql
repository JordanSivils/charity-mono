/*
  Warnings:

  - You are about to drop the column `dailyLimit` on the `Tier` table. All the data in the column will be lost.
  - Added the required column `devDailyLimit` to the `Tier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tier" DROP COLUMN "dailyLimit",
ADD COLUMN     "devDailyLimit" INTEGER NOT NULL,
ADD COLUMN     "liveDailyLimit" INTEGER NOT NULL DEFAULT 100;

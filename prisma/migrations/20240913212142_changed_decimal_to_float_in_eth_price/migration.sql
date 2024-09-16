/*
  Warnings:

  - You are about to alter the column `eth_price` on the `Card_Packs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Card_Packs" ALTER COLUMN "eth_price" SET DATA TYPE DOUBLE PRECISION;

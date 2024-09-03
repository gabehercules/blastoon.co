/*
  Warnings:

  - You are about to alter the column `eth_price` on the `Card_Packs` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Card_Packs" ALTER COLUMN "eth_price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Card_Packs" ADD COLUMN     "super_cheese_price" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "cheese_price" SET DEFAULT 0,
ALTER COLUMN "eth_price" SET DEFAULT 0;

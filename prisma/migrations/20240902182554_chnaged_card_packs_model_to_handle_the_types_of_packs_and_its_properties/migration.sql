/*
  Warnings:

  - The primary key for the `Card_Packs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address_id` on the `Card_Packs` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Card_Packs` table. All the data in the column will be lost.
  - Added the required column `cheese_price` to the `Card_Packs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eth_price` to the `Card_Packs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card_Packs" DROP CONSTRAINT "Card_Packs_address_id_fkey";

-- DropIndex
DROP INDEX "Card_Packs_id_key";

-- AlterTable
ALTER TABLE "Card_Packs" DROP CONSTRAINT "Card_Packs_pkey",
DROP COLUMN "address_id",
DROP COLUMN "id",
ADD COLUMN     "cheese_price" INTEGER NOT NULL,
ADD COLUMN     "eth_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pack_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_Packs_pkey" PRIMARY KEY ("pack_id");

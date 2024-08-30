/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Blast_Toon_NFTs" DROP CONSTRAINT "Blast_Toon_NFTs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Card_Packs" DROP CONSTRAINT "Card_Packs_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Cheese" DROP CONSTRAINT "Cheese_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Super_Cheese" DROP CONSTRAINT "Super_Cheese_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Cheese_Tx" DROP CONSTRAINT "User_Cheese_Tx_address_id_fkey";

-- DropIndex
DROP INDEX "User_uuid_key";

-- AlterTable
ALTER TABLE "Blast_Toon_NFTs" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Card_Packs" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Cheese" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Super_Cheese" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "uuid",
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "User_Cheese_Tx" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- AddForeignKey
ALTER TABLE "Cheese" ADD CONSTRAINT "Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Super_Cheese" ADD CONSTRAINT "Super_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Packs" ADD CONSTRAINT "Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Cheese_Tx" ADD CONSTRAINT "User_Cheese_Tx_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blast_Toon_NFTs" ADD CONSTRAINT "Blast_Toon_NFTs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

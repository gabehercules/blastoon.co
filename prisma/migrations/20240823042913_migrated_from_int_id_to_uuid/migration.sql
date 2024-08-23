/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Made the column `uuid` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blast_Toon_NFTs" DROP CONSTRAINT "Blast_Toon_NFTs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Card_Packs" DROP CONSTRAINT "User_Card_Packs_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Cheese" DROP CONSTRAINT "User_Cheese_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Cheese_Tx" DROP CONSTRAINT "User_Cheese_Tx_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Super_Cheese" DROP CONSTRAINT "User_Super_Cheese_address_id_fkey";

-- AlterTable
ALTER TABLE "Blast_Toon_NFTs" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ALTER COLUMN "uuid" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "User_Card_Packs" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User_Cheese" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User_Cheese_Tx" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User_Super_Cheese" ALTER COLUMN "address_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User_Cheese" ADD CONSTRAINT "User_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Super_Cheese" ADD CONSTRAINT "User_Super_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Card_Packs" ADD CONSTRAINT "User_Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Cheese_Tx" ADD CONSTRAINT "User_Cheese_Tx_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blast_Toon_NFTs" ADD CONSTRAINT "Blast_Toon_NFTs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `user_id` on the `Blast_Toon_NFTs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blast_Toon_NFTs" DROP CONSTRAINT "Blast_Toon_NFTs_user_id_fkey";

-- AlterTable
ALTER TABLE "Blast_Toon_NFTs" DROP COLUMN "user_id",
ADD COLUMN     "address_id" TEXT;

-- AddForeignKey
ALTER TABLE "Blast_Toon_NFTs" ADD CONSTRAINT "Blast_Toon_NFTs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "User_Card_Packs" DROP CONSTRAINT "User_Card_Packs_address_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified_upgrade" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "User_Card_Packs" ADD CONSTRAINT "User_Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

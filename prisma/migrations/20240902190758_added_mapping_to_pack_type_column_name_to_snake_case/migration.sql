/*
  Warnings:

  - You are about to drop the column `packType` on the `Card_Packs` table. All the data in the column will be lost.
  - Added the required column `pack_type` to the `Card_Packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card_Packs" DROP COLUMN "packType",
ADD COLUMN     "pack_type" "PackType" NOT NULL;

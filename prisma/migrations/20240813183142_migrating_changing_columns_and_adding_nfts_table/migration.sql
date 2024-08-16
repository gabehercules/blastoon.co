/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `holdingNFTS` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `upgradedNFTs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "holdingNFTS",
DROP COLUMN "upgradedNFTs",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "holding_NFTs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upgraded_NFTs" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "NFTs" (
    "token_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "image_uri" TEXT NOT NULL,
    "user_id" INTEGER,
    "owner_since" INTEGER NOT NULL,

    CONSTRAINT "NFTs_pkey" PRIMARY KEY ("token_id")
);

-- AddForeignKey
ALTER TABLE "NFTs" ADD CONSTRAINT "NFTs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

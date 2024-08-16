/*
  Warnings:

  - You are about to drop the column `address_id` on the `NFTs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NFTs" DROP COLUMN "address_id",
ALTER COLUMN "image_uri" DROP NOT NULL,
ALTER COLUMN "owner_since" DROP NOT NULL;

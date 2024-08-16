/*
  Warnings:

  - You are about to drop the `NFTs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NFTs" DROP CONSTRAINT "NFTs_user_id_fkey";

-- DropTable
DROP TABLE "NFTs";

-- CreateTable
CREATE TABLE "Nfts" (
    "token_id" INTEGER NOT NULL,
    "image_uri" TEXT,
    "user_id" INTEGER,
    "owner_since" BIGINT,
    "upgraded" BOOLEAN NOT NULL DEFAULT false,
    "last_upgraded_by" TEXT,

    CONSTRAINT "Nfts_pkey" PRIMARY KEY ("token_id")
);

-- AddForeignKey
ALTER TABLE "Nfts" ADD CONSTRAINT "Nfts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

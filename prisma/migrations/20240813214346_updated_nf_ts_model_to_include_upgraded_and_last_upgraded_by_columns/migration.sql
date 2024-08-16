-- AlterTable
ALTER TABLE "NFTs" ADD COLUMN     "last_upgraded_by" TEXT,
ADD COLUMN     "upgraded" BOOLEAN NOT NULL DEFAULT false;

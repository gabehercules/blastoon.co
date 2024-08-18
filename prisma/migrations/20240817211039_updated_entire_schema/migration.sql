/*
  Warnings:

  - You are about to drop the column `cheese_amount` on the `User_Cheese` table. All the data in the column will be lost.
  - You are about to drop the `Nfts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Cheese_Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PackType" AS ENUM ('commom', 'rare', 'epic');

-- DropForeignKey
ALTER TABLE "Nfts" DROP CONSTRAINT "Nfts_user_id_fkey";

-- AlterTable
ALTER TABLE "User_Cheese" DROP COLUMN "cheese_amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type_name" TEXT NOT NULL DEFAULT '$CHEESE Points';

-- DropTable
DROP TABLE "Nfts";

-- DropTable
DROP TABLE "User_Cheese_Transaction";

-- CreateTable
CREATE TABLE "User_Super_Cheese" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL DEFAULT 'Super $CHEESE',
    "address_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_Super_Cheese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Card_Packs" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "packType" "PackType" NOT NULL,

    CONSTRAINT "User_Card_Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Cheese_Tx" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "cheese_amount" INTEGER NOT NULL,
    "cheese_type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Cheese_Tx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blast_Toon_NFTs" (
    "token_id" INTEGER NOT NULL,
    "image_uri" TEXT,
    "user_id" INTEGER,
    "owner_since" BIGINT,
    "upgraded" BOOLEAN NOT NULL DEFAULT false,
    "last_upgraded_by" TEXT,

    CONSTRAINT "Blast_Toon_NFTs_pkey" PRIMARY KEY ("token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Super_Cheese_address_id_key" ON "User_Super_Cheese"("address_id");

-- AddForeignKey
ALTER TABLE "User_Super_Cheese" ADD CONSTRAINT "User_Super_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Card_Packs" ADD CONSTRAINT "User_Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Cheese_Tx" ADD CONSTRAINT "User_Cheese_Tx_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blast_Toon_NFTs" ADD CONSTRAINT "Blast_Toon_NFTs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

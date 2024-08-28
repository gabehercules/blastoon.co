/*
  Warnings:

  - You are about to drop the `User_Card_Packs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Cheese` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Super_Cheese` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User_Card_Packs" DROP CONSTRAINT "User_Card_Packs_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Cheese" DROP CONSTRAINT "User_Cheese_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Super_Cheese" DROP CONSTRAINT "User_Super_Cheese_address_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uuid" TEXT;

-- DropTable
DROP TABLE "User_Card_Packs";

-- DropTable
DROP TABLE "User_Cheese";

-- DropTable
DROP TABLE "User_Super_Cheese";

-- CreateTable
CREATE TABLE "Cheese" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cheese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Super_Cheese" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Super_Cheese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card_Packs" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "packType" "PackType" NOT NULL,

    CONSTRAINT "Card_Packs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cheese_address_id_key" ON "Cheese"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Super_Cheese_address_id_key" ON "Super_Cheese"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Cheese" ADD CONSTRAINT "Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Super_Cheese" ADD CONSTRAINT "Super_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card_Packs" ADD CONSTRAINT "Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

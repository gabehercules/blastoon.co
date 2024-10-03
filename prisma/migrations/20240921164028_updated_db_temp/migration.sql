/*
  Warnings:

  - You are about to drop the column `ens_domain` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Inventory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DraftAndPublished" AS ENUM ('DRAFT', 'PUBLISHED');

-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Achievements" DROP CONSTRAINT "User_Achievements_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Inventory" DROP CONSTRAINT "User_Inventory_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Inventory" DROP CONSTRAINT "User_Inventory_item_id_fkey";

-- DropIndex
DROP INDEX "User_ens_domain_key";

-- AlterTable
ALTER TABLE "Market_Items" ADD COLUMN     "cheese_price" INTEGER,
ADD COLUMN     "eth_price" DOUBLE PRECISION,
ADD COLUMN     "status" "DraftAndPublished" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "supercheese_price" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ens_domain",
ADD COLUMN     "id" TEXT;

-- DropTable
DROP TABLE "Players";

-- DropTable
DROP TABLE "User_Inventory";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "cheese" INTEGER NOT NULL DEFAULT 0,
    "super_cheese" INTEGER NOT NULL DEFAULT 0,
    "badge" "Badge",

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player_Inventory" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "aquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_listed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_address_id_key" ON "Player"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Player_Inventory_id_key" ON "Player_Inventory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_Inventory" ADD CONSTRAINT "Player_Inventory_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_Inventory" ADD CONSTRAINT "Player_Inventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Market_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Achievements" ADD CONSTRAINT "User_Achievements_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Player"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

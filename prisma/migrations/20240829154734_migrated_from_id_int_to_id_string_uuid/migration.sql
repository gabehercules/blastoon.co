/*
  Warnings:

  - The primary key for the `Card_Packs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTemp` on the `Card_Packs` table. All the data in the column will be lost.
  - The primary key for the `Cheese` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTemp` on the `Cheese` table. All the data in the column will be lost.
  - The primary key for the `Super_Cheese` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTemp` on the `Super_Cheese` table. All the data in the column will be lost.
  - The primary key for the `User_Cheese_Tx` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Card_Packs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Cheese` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Super_Cheese` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User_Cheese_Tx` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Card_Packs" DROP CONSTRAINT "Card_Packs_pkey",
DROP COLUMN "idTemp",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_Packs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Card_Packs_id_seq";

-- AlterTable
ALTER TABLE "Cheese" DROP CONSTRAINT "Cheese_pkey",
DROP COLUMN "idTemp",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cheese_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cheese_id_seq";

-- AlterTable
ALTER TABLE "Super_Cheese" DROP CONSTRAINT "Super_Cheese_pkey",
DROP COLUMN "idTemp",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Super_Cheese_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Super_Cheese_id_seq";

-- AlterTable
ALTER TABLE "User_Cheese_Tx" DROP CONSTRAINT "User_Cheese_Tx_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_Cheese_Tx_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_Cheese_Tx_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Card_Packs_id_key" ON "Card_Packs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cheese_id_key" ON "Cheese"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Super_Cheese_id_key" ON "Super_Cheese"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Cheese_Tx_id_key" ON "User_Cheese_Tx"("id");

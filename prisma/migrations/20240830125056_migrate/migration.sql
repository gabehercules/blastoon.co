/*
  Warnings:

  - You are about to drop the `User_Cheese_Tx` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CheeseLogEvent" AS ENUM ('deposit', 'withdraw', 'upgrade', 'buy', 'sell', 'gift', 'dayli');

-- DropForeignKey
ALTER TABLE "User_Cheese_Tx" DROP CONSTRAINT "User_Cheese_Tx_address_id_fkey";

-- DropTable
DROP TABLE "User_Cheese_Tx";

-- CreateTable
CREATE TABLE "Cheese_Logs" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "cheese_amount" INTEGER NOT NULL,
    "cheese_type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" "CheeseLogEvent" NOT NULL,

    CONSTRAINT "Cheese_Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cheese_Logs_id_key" ON "Cheese_Logs"("id");

-- AddForeignKey
ALTER TABLE "Cheese_Logs" ADD CONSTRAINT "Cheese_Logs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `value` to the `Player_Item_Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player_Item_Transactions" ADD COLUMN     "value" INTEGER NOT NULL;

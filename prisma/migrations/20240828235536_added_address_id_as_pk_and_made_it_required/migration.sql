/*
  Warnings:

  - Made the column `address_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address_id" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("address_id");

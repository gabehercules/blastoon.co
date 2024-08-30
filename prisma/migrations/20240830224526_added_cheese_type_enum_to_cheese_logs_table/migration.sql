/*
  Warnings:

  - Changed the type of `cheese_type` on the `Cheese_Logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CheeseType" AS ENUM ('cheese', 'superCheese');

-- AlterTable
ALTER TABLE "Cheese_Logs" DROP COLUMN "cheese_type",
ADD COLUMN     "cheese_type" "CheeseType" NOT NULL;

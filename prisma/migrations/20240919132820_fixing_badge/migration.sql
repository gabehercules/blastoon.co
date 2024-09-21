/*
  Warnings:

  - The `badge` column on the `Players` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Players" DROP COLUMN "badge",
ADD COLUMN     "badge" "Badge";

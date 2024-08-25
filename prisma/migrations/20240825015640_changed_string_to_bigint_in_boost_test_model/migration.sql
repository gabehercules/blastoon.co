/*
  Warnings:

  - Changed the type of `quantity` on the `Boosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `Boosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Boosts" DROP COLUMN "quantity",
ADD COLUMN     "quantity" BIGINT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" BIGINT NOT NULL;

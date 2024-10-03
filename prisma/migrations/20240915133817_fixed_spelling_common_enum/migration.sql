/*
  Warnings:

  - The values [commom] on the enum `PackType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PackType_new" AS ENUM ('common', 'rare', 'epic');
ALTER TABLE "Card_Packs" ALTER COLUMN "pack_type" TYPE "PackType_new" USING ("pack_type"::text::"PackType_new");
ALTER TYPE "PackType" RENAME TO "PackType_old";
ALTER TYPE "PackType_new" RENAME TO "PackType";
DROP TYPE "PackType_old";
COMMIT;

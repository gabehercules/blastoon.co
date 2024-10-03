-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('PLAYER', 'INFLUENCER', 'TOON_FRIEND');

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Market_Items" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Players" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "badge" TEXT NOT NULL,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Achievements" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,

    CONSTRAINT "User_Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "level_reward" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_id_key" ON "Players"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_address_id_key" ON "Players"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_username_key" ON "Players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Achievements_id_key" ON "User_Achievements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_id_key" ON "Achievements"("id");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Achievements" ADD CONSTRAINT "User_Achievements_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Players"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Achievements" ADD CONSTRAINT "User_Achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

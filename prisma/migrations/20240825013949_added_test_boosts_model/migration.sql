-- CreateTable
CREATE TABLE "Boosts" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Boosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token_Transfers" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Token_Transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_Transfers_id_key" ON "Token_Transfers"("id");

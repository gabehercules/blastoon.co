-- CreateTable
CREATE TABLE "User_Card_Packs" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "pack_id" TEXT NOT NULL,

    CONSTRAINT "User_Card_Packs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Card_Packs_id_key" ON "User_Card_Packs"("id");

-- AddForeignKey
ALTER TABLE "User_Card_Packs" ADD CONSTRAINT "User_Card_Packs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Card_Packs" ADD CONSTRAINT "User_Card_Packs_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "Card_Packs"("pack_id") ON DELETE RESTRICT ON UPDATE CASCADE;

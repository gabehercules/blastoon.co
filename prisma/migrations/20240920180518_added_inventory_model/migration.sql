-- CreateTable
CREATE TABLE "User_Inventory" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "aquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_listed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Inventory_id_key" ON "User_Inventory"("id");

-- AddForeignKey
ALTER TABLE "User_Inventory" ADD CONSTRAINT "User_Inventory_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Inventory" ADD CONSTRAINT "User_Inventory_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Market_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

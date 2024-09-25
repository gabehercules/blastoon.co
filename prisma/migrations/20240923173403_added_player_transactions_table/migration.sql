-- CreateTable
CREATE TABLE "Marketplace_Cart" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Marketplace_Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player_Item_Transactions" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_Item_Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marketplace_Cart_id_key" ON "Marketplace_Cart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_Item_Transactions_id_key" ON "Player_Item_Transactions"("id");

-- AddForeignKey
ALTER TABLE "Marketplace_Cart" ADD CONSTRAINT "Marketplace_Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketplace_Cart" ADD CONSTRAINT "Marketplace_Cart_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Market_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_Item_Transactions" ADD CONSTRAINT "Player_Item_Transactions_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_Item_Transactions" ADD CONSTRAINT "Player_Item_Transactions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Market_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

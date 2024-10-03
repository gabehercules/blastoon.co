/*
  Warnings:

  - A unique constraint covering the columns `[address_id,item_id]` on the table `Player_Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_Inventory_address_id_item_id_key" ON "Player_Inventory"("address_id", "item_id");

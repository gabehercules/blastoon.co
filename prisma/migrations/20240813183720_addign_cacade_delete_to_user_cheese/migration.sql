-- DropForeignKey
ALTER TABLE "User_Cheese" DROP CONSTRAINT "User_Cheese_address_id_fkey";

-- AddForeignKey
ALTER TABLE "User_Cheese" ADD CONSTRAINT "User_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

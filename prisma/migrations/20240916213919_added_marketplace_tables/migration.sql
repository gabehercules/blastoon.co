-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('CHEESE', 'SUPER_CHEESE', 'ETH');

-- CreateTable
CREATE TABLE "Market_Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_asset" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Market_Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_Price" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "currencyType" "CurrencyType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_Items_id_key" ON "Market_Items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Market_Items_slug_key" ON "Market_Items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_id_key" ON "Categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Item_Price_id_key" ON "Item_Price"("id");

-- AddForeignKey
ALTER TABLE "Market_Items" ADD CONSTRAINT "Market_Items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Price" ADD CONSTRAINT "Item_Price_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Market_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

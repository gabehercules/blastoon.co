-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "ens_domain" TEXT,
    "signature" TEXT NOT NULL,
    "slug" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Cheese" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "cheese_amount" INTEGER NOT NULL,

    CONSTRAINT "User_Cheese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Cheese_Transaction" (
    "id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "cheese_amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Cheese_Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_ens_domain_key" ON "User"("ens_domain");

-- CreateIndex
CREATE UNIQUE INDEX "User_signature_key" ON "User"("signature");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Cheese_address_id_key" ON "User_Cheese"("address_id");

-- AddForeignKey
ALTER TABLE "User_Cheese" ADD CONSTRAINT "User_Cheese_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

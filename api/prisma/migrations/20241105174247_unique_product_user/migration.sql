/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `ProductUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductUser_productId_userId_key" ON "ProductUser"("productId", "userId");

/*
  Warnings:

  - You are about to drop the column `interval` on the `ProductUser` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `ProductUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductUser" DROP COLUMN "interval",
DROP COLUMN "unit";

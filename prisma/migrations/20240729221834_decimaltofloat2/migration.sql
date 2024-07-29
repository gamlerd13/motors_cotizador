/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `Cotizacion` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Cotizacion" ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION;

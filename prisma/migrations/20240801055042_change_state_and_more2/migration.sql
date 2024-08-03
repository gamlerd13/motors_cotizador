/*
  Warnings:

  - You are about to drop the column `isFather` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Cotizacion` table. All the data in the column will be lost.
  - You are about to drop the `LastCodeFhaterCotizacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cotizacion" DROP CONSTRAINT "Cotizacion_parentId_fkey";

-- AlterTable
ALTER TABLE "Cotizacion" DROP COLUMN "isFather",
DROP COLUMN "parentId",
ADD COLUMN     "isEdit" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "LastCodeFhaterCotizacion";

-- CreateTable
CREATE TABLE "LastCodeCotizacion" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "nextCode" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LastCodeCotizacion_pkey" PRIMARY KEY ("id")
);

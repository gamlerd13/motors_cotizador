/*
  Warnings:

  - The values [DRAFT,SENT,ACCEPTED,REJECTED,EXPIRED] on the enum `CotizacionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CotizacionStatus_new" AS ENUM ('ESTADO1', 'ESTADO2', 'ESTADO3', 'ESTADO4', 'ESTADO5', 'ESTADO6');
ALTER TABLE "Cotizacion" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Cotizacion" ALTER COLUMN "status" TYPE "CotizacionStatus_new" USING ("status"::text::"CotizacionStatus_new");
ALTER TYPE "CotizacionStatus" RENAME TO "CotizacionStatus_old";
ALTER TYPE "CotizacionStatus_new" RENAME TO "CotizacionStatus";
DROP TYPE "CotizacionStatus_old";
ALTER TABLE "Cotizacion" ALTER COLUMN "status" SET DEFAULT 'ESTADO1';
COMMIT;

-- AlterTable
ALTER TABLE "Cotizacion" ADD COLUMN     "isFather" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'ESTADO1';

-- CreateTable
CREATE TABLE "LastCodeFhaterCotizacion" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "nextCode" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LastCodeFhaterCotizacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

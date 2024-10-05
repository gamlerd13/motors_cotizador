-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('CREATED', 'TO_CREATE', 'NONE');

-- AlterTable
ALTER TABLE "Cotizacion" ADD COLUMN     "saleStatus" "SaleStatus" NOT NULL DEFAULT 'NONE';

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "customerOrderDate" TIMESTAMP(3),
    "customerOrder" TEXT,
    "line" TEXT,
    "deliveryTime" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "invoiceNumber" TEXT,
    "paymentType" TEXT,
    "observation" TEXT,
    "paymentMethod" TEXT,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "withoutTax" DOUBLE PRECISION,
    "withTax" DOUBLE PRECISION,
    "detraction" DOUBLE PRECISION,
    "netPayable" DOUBLE PRECISION,
    "paidAmount" DOUBLE PRECISION,
    "totalSalePrice" DOUBLE PRECISION,
    "status" TEXT,
    "outstandingAmount" DOUBLE PRECISION,
    "supplierOrder" TEXT,
    "advancePayment" DOUBLE PRECISION,
    "advanceDate" TIMESTAMP(3),
    "balance" DOUBLE PRECISION,
    "balanceDate" TIMESTAMP(3),
    "totalCost" DOUBLE PRECISION,
    "supplierInvoice" TEXT,
    "supplierShipment" TEXT,
    "value" DOUBLE PRECISION,
    "percentage" DOUBLE PRECISION,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_cotizacionId_key" ON "Sale"("cotizacionId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

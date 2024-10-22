/*
  Warnings:

  - You are about to drop the column `advanceDate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `advancePayment` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `balanceDate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `detraction` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNumber` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `netPayable` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `outstandingAmount` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `paidAmount` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `supplierInvoice` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `supplierOrder` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `supplierShipment` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `totalSalePrice` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `withTax` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `withoutTax` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "advanceDate",
DROP COLUMN "advancePayment",
DROP COLUMN "balance",
DROP COLUMN "balanceDate",
DROP COLUMN "detraction",
DROP COLUMN "dueDate",
DROP COLUMN "invoiceNumber",
DROP COLUMN "netPayable",
DROP COLUMN "observation",
DROP COLUMN "outstandingAmount",
DROP COLUMN "paidAmount",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentType",
DROP COLUMN "percentage",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "supplierInvoice",
DROP COLUMN "supplierOrder",
DROP COLUMN "supplierShipment",
DROP COLUMN "totalCost",
DROP COLUMN "totalSalePrice",
DROP COLUMN "value",
DROP COLUMN "withTax",
DROP COLUMN "withoutTax",
ADD COLUMN     "advanceDate1" TIMESTAMP(3),
ADD COLUMN     "advanceDate2" TIMESTAMP(3),
ADD COLUMN     "advanceDate3" TIMESTAMP(3),
ADD COLUMN     "advanceInvoiceDate" TIMESTAMP(3),
ADD COLUMN     "advanceInvoiceNumber" TEXT,
ADD COLUMN     "advancePaymentDate" TIMESTAMP(3),
ADD COLUMN     "advanceValuePen1" DOUBLE PRECISION,
ADD COLUMN     "advanceValuePen2" DOUBLE PRECISION,
ADD COLUMN     "advanceValuePen3" DOUBLE PRECISION,
ADD COLUMN     "advanceValuePenClient" DOUBLE PRECISION,
ADD COLUMN     "advanceValueUsd1" DOUBLE PRECISION,
ADD COLUMN     "advanceValueUsd2" DOUBLE PRECISION,
ADD COLUMN     "advanceValueUsd3" DOUBLE PRECISION,
ADD COLUMN     "advanceValueUsdClient" DOUBLE PRECISION,
ADD COLUMN     "balanceDate1" TIMESTAMP(3),
ADD COLUMN     "balanceDate2" TIMESTAMP(3),
ADD COLUMN     "balanceDate3" TIMESTAMP(3),
ADD COLUMN     "balanceInvoice1" TEXT,
ADD COLUMN     "balanceInvoice2" TEXT,
ADD COLUMN     "balanceInvoice3" TEXT,
ADD COLUMN     "balanceInvoiceDate1" TIMESTAMP(3),
ADD COLUMN     "balanceInvoiceDate2" TIMESTAMP(3),
ADD COLUMN     "balanceInvoiceDate3" TIMESTAMP(3),
ADD COLUMN     "balanceValuePen1" DOUBLE PRECISION,
ADD COLUMN     "balanceValuePen2" DOUBLE PRECISION,
ADD COLUMN     "balanceValuePen3" DOUBLE PRECISION,
ADD COLUMN     "balanceValueUsd1" DOUBLE PRECISION,
ADD COLUMN     "balanceValueUsd2" DOUBLE PRECISION,
ADD COLUMN     "balanceValueUsd3" DOUBLE PRECISION,
ADD COLUMN     "clientInvoiceDate" TIMESTAMP(3),
ADD COLUMN     "clientInvoiceDueDate" TIMESTAMP(3),
ADD COLUMN     "clientInvoiceNumber" TEXT,
ADD COLUMN     "factoringPaymentAmountPen" DOUBLE PRECISION,
ADD COLUMN     "factoringPaymentAmountUsd" DOUBLE PRECISION,
ADD COLUMN     "invoiceDate1" TIMESTAMP(3),
ADD COLUMN     "invoiceDate2" TIMESTAMP(3),
ADD COLUMN     "invoiceDate3" TIMESTAMP(3),
ADD COLUMN     "isPaidByClient" BOOLEAN,
ADD COLUMN     "isPaidByFactoring" BOOLEAN,
ADD COLUMN     "percentagePen" DOUBLE PRECISION,
ADD COLUMN     "percentageUsd" DOUBLE PRECISION,
ADD COLUMN     "secondInvoiceDate" TIMESTAMP(3),
ADD COLUMN     "secondInvoiceNumber" TEXT,
ADD COLUMN     "secondPaymentDate" TIMESTAMP(3),
ADD COLUMN     "secondPaymentPenClient" DOUBLE PRECISION,
ADD COLUMN     "secondPaymentUsdClient" DOUBLE PRECISION,
ADD COLUMN     "shipmentDate1" TIMESTAMP(3),
ADD COLUMN     "shipmentDate2" TIMESTAMP(3),
ADD COLUMN     "shipmentDate3" TIMESTAMP(3),
ADD COLUMN     "supplierInvoice1" TEXT,
ADD COLUMN     "supplierInvoice2" TEXT,
ADD COLUMN     "supplierInvoice3" TEXT,
ADD COLUMN     "supplierOrder1" TEXT,
ADD COLUMN     "supplierOrder2" TEXT,
ADD COLUMN     "supplierOrder3" TEXT,
ADD COLUMN     "supplierShipment1" TEXT,
ADD COLUMN     "supplierShipment2" TEXT,
ADD COLUMN     "supplierShipment3" TEXT,
ADD COLUMN     "thirdInvoiceDate" TIMESTAMP(3),
ADD COLUMN     "thirdInvoiceNumber" TEXT,
ADD COLUMN     "thirdPaymentDate" TIMESTAMP(3),
ADD COLUMN     "thirdPaymentPenClient" DOUBLE PRECISION,
ADD COLUMN     "thirdPaymentUsdClient" DOUBLE PRECISION,
ADD COLUMN     "totalCostPen1" DOUBLE PRECISION,
ADD COLUMN     "totalCostPen2" DOUBLE PRECISION,
ADD COLUMN     "totalCostPen3" DOUBLE PRECISION,
ADD COLUMN     "totalCostUsd1" DOUBLE PRECISION,
ADD COLUMN     "totalCostUsd2" DOUBLE PRECISION,
ADD COLUMN     "totalCostUsd3" DOUBLE PRECISION,
ADD COLUMN     "totalSaleCostPen" DOUBLE PRECISION,
ADD COLUMN     "totalSaleCostUsd" DOUBLE PRECISION,
ADD COLUMN     "totalSalePen" DOUBLE PRECISION,
ADD COLUMN     "totalSaleUsd" DOUBLE PRECISION,
ADD COLUMN     "valuePen" DOUBLE PRECISION,
ADD COLUMN     "valueUsd" DOUBLE PRECISION;

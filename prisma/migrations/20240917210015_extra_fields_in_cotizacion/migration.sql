-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('SOLES', 'DOLARES');

-- AlterTable
ALTER TABLE "Cotizacion" ADD COLUMN     "bankAccountNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "companyEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "companyPhone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "currencyType" "CurrencyType" NOT NULL DEFAULT 'SOLES',
ADD COLUMN     "offerValidity" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "warranty" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "paymentCondition" SET DEFAULT '';

-- CreateEnum
CREATE TYPE "SaleStatusV2" AS ENUM ('CREATED', 'UPDATED', 'FINISHED');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" "SaleStatusV2" NOT NULL DEFAULT 'CREATED';

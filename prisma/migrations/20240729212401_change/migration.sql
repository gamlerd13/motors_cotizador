/*
  Warnings:

  - Made the column `contact` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reference` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ruc` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "reference" SET NOT NULL,
ALTER COLUMN "ruc" SET NOT NULL;

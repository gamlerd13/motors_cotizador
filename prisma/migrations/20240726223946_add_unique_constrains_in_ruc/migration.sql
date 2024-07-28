/*
  Warnings:

  - A unique constraint covering the columns `[ruc]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_ruc_key" ON "Client"("ruc");

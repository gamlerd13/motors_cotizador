-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "status" "CotizacionStatus" NOT NULL DEFAULT 'DRAFT',
    "code" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "clientRuc" TEXT NOT NULL,
    "clientReference" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "deliverTime" TEXT NOT NULL,
    "paymentCondition" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

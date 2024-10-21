import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(req: NextRequest, { params }: { params: { idCotizacion: string } }) {
  try {
    const cotizacionId = params.idCotizacion;
    if (!cotizacionId) {
      return NextResponse.json({ error: "idCotizacion es requerido" }, { status: 400 });
    }

    const sale = await prisma.sale.findMany({
      where: {
        cotizacionId: parseInt(cotizacionId),
      },
      include: {
        cotizacion: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!sale.length) {
      return NextResponse.json({ error: "No se encontraron ventas" }, { status: 404 });
    }

    const saleCotizacion = sale.map((saleItem) => ({
      id: saleItem.id,
      cotizacionId: saleItem.cotizacionId,
      customerOrderDate: saleItem.customerOrderDate,
      customerOrder: saleItem.customerOrder,
      quoteCode: saleItem.cotizacion.code,
      companyName: saleItem.cotizacion.client?.name,
      line: saleItem.line,
      companyRuc: saleItem.cotizacion.client?.ruc,
      deliveryTime: saleItem.deliveryTime,
      deliveryDate: saleItem.deliveryDate,

      // Cuentas por cobrar - Cliente
      clientInvoiceNumber: saleItem.clientInvoiceNumber,
      clientInvoiceDate: saleItem.clientInvoiceDate,
      clientInvoiceDueDate: saleItem.clientInvoiceDueDate,
      isPaidByClient: saleItem.isPaidByClient,
      isPaidByFactoring: saleItem.isPaidByFactoring,
      factoringPaymentAmountUsd: saleItem.factoringPaymentAmountUsd,
      factoringPaymentAmountPen: saleItem.factoringPaymentAmountPen,
      // Adelanto
      advanceValueUsdClient: saleItem.advanceValueUsdClient,
      advanceValuePenClient: saleItem.advanceValuePenClient,
      advancePaymentDate: saleItem.advancePaymentDate,
      advanceInvoiceNumber: saleItem.advanceInvoiceNumber,
      advanceInvoiceDate: saleItem.advanceInvoiceDate,
      // Segundo Pago
      secondPaymentUsdClient: saleItem.secondPaymentUsdClient,
      secondPaymentPenClient: saleItem.secondPaymentPenClient,
      secondPaymentDate: saleItem.secondPaymentDate,
      secondInvoiceNumber: saleItem.secondInvoiceNumber,
      secondInvoiceDate: saleItem.secondInvoiceDate,
      // Tercer Pago
      thirdPaymentUsdClient: saleItem.thirdPaymentUsdClient,
      thirdPaymentPenClient: saleItem.thirdPaymentPenClient,
      thirdPaymentDate: saleItem.thirdPaymentDate,
      thirdInvoiceNumber: saleItem.thirdInvoiceNumber,
      thirdInvoiceDate: saleItem.thirdInvoiceDate,
      // Total Venta
      totalSaleUsd: saleItem.totalSaleUsd,
      totalSalePen: saleItem.totalSalePen,

      supplierOrder1: saleItem.supplierOrder1,
      advanceValueUsd1: saleItem.advanceValueUsd1,
      balanceValueUsd1: saleItem.balanceValueUsd1,
      totalCostUsd1: saleItem.totalCostUsd1,
      advanceValuePen1: saleItem.advanceValuePen1,
      balanceValuePen1: saleItem.balanceValuePen1,
      totalCostPen1: saleItem.totalCostPen1,
      advanceDate1: saleItem.advanceDate1,
      balanceDate1: saleItem.balanceDate1,
      supplierInvoice1: saleItem.supplierInvoice1,
      balanceInvoice1: saleItem.balanceInvoice1,
      supplierShipment1: saleItem.supplierShipment1,
      invoiceDate1: saleItem.invoiceDate1,
      balanceInvoiceDate1: saleItem.balanceInvoiceDate1,
      shipmentDate1: saleItem.shipmentDate1,

      supplierOrder2: saleItem.supplierOrder2,
      advanceValueUsd2: saleItem.advanceValueUsd2,
      balanceValueUsd2: saleItem.balanceValueUsd2,
      totalCostUsd2: saleItem.totalCostUsd2,
      advanceValuePen2: saleItem.advanceValuePen2,
      balanceValuePen2: saleItem.balanceValuePen2,
      totalCostPen2: saleItem.totalCostPen2,
      advanceDate2: saleItem.advanceDate2,
      balanceDate2: saleItem.balanceDate2,
      supplierInvoice2: saleItem.supplierInvoice2,
      balanceInvoice2: saleItem.balanceInvoice2,
      supplierShipment2: saleItem.supplierShipment2,
      invoiceDate2: saleItem.invoiceDate2,
      balanceInvoiceDate2: saleItem.balanceInvoiceDate2,
      shipmentDate2: saleItem.shipmentDate2,

      supplierOrder3: saleItem.supplierOrder3,
      advanceValueUsd3: saleItem.advanceValueUsd3,
      balanceValueUsd3: saleItem.balanceValueUsd3,
      totalCostUsd3: saleItem.totalCostUsd3,
      advanceValuePen3: saleItem.advanceValuePen3,
      balanceValuePen3: saleItem.balanceValuePen3,
      totalCostPen3: saleItem.totalCostPen3,
      advanceDate3: saleItem.advanceDate3,
      balanceDate3: saleItem.balanceDate3,
      supplierInvoice3: saleItem.supplierInvoice3,
      balanceInvoice3: saleItem.balanceInvoice3,
      supplierShipment3: saleItem.supplierShipment3,
      invoiceDate3: saleItem.invoiceDate3,
      balanceInvoiceDate3: saleItem.balanceInvoiceDate3,
      shipmentDate3: saleItem.shipmentDate3,

      totalSaleCostUsd: saleItem.totalSaleCostUsd,
      totalSaleCostPen: saleItem.totalSaleCostPen,

      valueUsd: saleItem.valueUsd,
      percentageUsd: saleItem.percentageUsd,
      valuePen: saleItem.valuePen,
      percentagePen: saleItem.percentagePen,
    }));
    
    return NextResponse.json(saleCotizacion, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
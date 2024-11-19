import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        cotizacion: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!sales.length) {
      return NextResponse.json({ error: "No sales found" }, { status: 404 });
    }

    const formattedSales = sales.map((sale) => ({
      customerOrderDate: sale.customerOrderDate,
      customerOrder: sale.customerOrder,
      quoteCode: sale.cotizacion.code,
      companyName: sale.cotizacion.client?.name,
      line: sale.line,
      companyRuc: sale.cotizacion.client?.ruc,
      deliveryTime: sale.deliveryTime,
      deliveryDate: sale.deliveryDate,

      // Cuentas por cobrar - Cliente
      clientInvoiceNumber: sale.clientInvoiceNumber,
      clientInvoiceDate: sale.clientInvoiceDate,
      clientInvoiceDueDate: sale.clientInvoiceDueDate,
      isPaidByClient: sale.isPaidByClient,
      isPaidByFactoring: sale.isPaidByFactoring,
      factoringPaymentAmountUsd: sale.factoringPaymentAmountUsd,
      factoringPaymentAmountPen: sale.factoringPaymentAmountPen,
      // Adelanto
      advanceValueUsdClient: sale.advanceValueUsdClient,
      advanceValuePenClient: sale.advanceValuePenClient,
      advancePaymentDate: sale.advancePaymentDate,
      advanceInvoiceNumber: sale.advanceInvoiceNumber,
      advanceInvoiceDate: sale.advanceInvoiceDate,
      // Segundo Pago
      secondPaymentUsdClient: sale.secondPaymentUsdClient,
      secondPaymentPenClient: sale.secondPaymentPenClient,
      secondPaymentDate: sale.secondPaymentDate,
      secondInvoiceNumber: sale.secondInvoiceNumber,
      secondInvoiceDate: sale.secondInvoiceDate,
      // Tercer Pago
      thirdPaymentUsdClient: sale.thirdPaymentUsdClient,
      thirdPaymentPenClient: sale.thirdPaymentPenClient,
      thirdPaymentDate: sale.thirdPaymentDate,
      thirdInvoiceNumber: sale.thirdInvoiceNumber,
      thirdInvoiceDate: sale.thirdInvoiceDate,
      // Total Venta
      totalSaleUsd: sale.totalSaleUsd,
      totalSalePen: sale.totalSalePen,

      supplierOrder1: sale.supplierOrder1,
      advanceValueUsd1: sale.advanceValueUsd1,
      balanceValueUsd1: sale.balanceValueUsd1,
      totalCostUsd1: sale.totalCostUsd1,
      advanceValuePen1: sale.advanceValuePen1,
      balanceValuePen1: sale.balanceValuePen1,
      totalCostPen1: sale.totalCostPen1,
      advanceDate1: sale.advanceDate1,
      balanceDate1: sale.balanceDate1,
      supplierInvoice1: sale.supplierInvoice1,
      balanceInvoice1: sale.balanceInvoice1,
      supplierShipment1: sale.supplierShipment1,
      invoiceDate1: sale.invoiceDate1,
      balanceInvoiceDate1: sale.balanceInvoiceDate1,
      shipmentDate1: sale.shipmentDate1,

      supplierOrder2: sale.supplierOrder2,
      advanceValueUsd2: sale.advanceValueUsd2,
      balanceValueUsd2: sale.balanceValueUsd2,
      totalCostUsd2: sale.totalCostUsd2,
      advanceValuePen2: sale.advanceValuePen2,
      balanceValuePen2: sale.balanceValuePen2,
      totalCostPen2: sale.totalCostPen2,
      advanceDate2: sale.advanceDate2,
      balanceDate2: sale.balanceDate2,
      supplierInvoice2: sale.supplierInvoice2,
      balanceInvoice2: sale.balanceInvoice2,
      supplierShipment2: sale.supplierShipment2,
      invoiceDate2: sale.invoiceDate2,
      balanceInvoiceDate2: sale.balanceInvoiceDate2,
      shipmentDate2: sale.shipmentDate2,

      supplierOrder3: sale.supplierOrder3,
      advanceValueUsd3: sale.advanceValueUsd3,
      balanceValueUsd3: sale.balanceValueUsd3,
      totalCostUsd3: sale.totalCostUsd3,
      advanceValuePen3: sale.advanceValuePen3,
      balanceValuePen3: sale.balanceValuePen3,
      totalCostPen3: sale.totalCostPen3,
      advanceDate3: sale.advanceDate3,
      balanceDate3: sale.balanceDate3,
      supplierInvoice3: sale.supplierInvoice3,
      balanceInvoice3: sale.balanceInvoice3,
      supplierShipment3: sale.supplierShipment3,
      invoiceDate3: sale.invoiceDate3,
      balanceInvoiceDate3: sale.balanceInvoiceDate3,
      shipmentDate3: sale.shipmentDate3,

      totalSaleCostUsd: sale.totalSaleCostUsd,
      totalSaleCostPen: sale.totalSaleCostPen,

      valueUsd: sale.valueUsd,
      percentageUsd: sale.percentageUsd,
      valuePen: sale.valuePen,
      percentagePen: sale.percentagePen,
    }));

    return NextResponse.json(formattedSales, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

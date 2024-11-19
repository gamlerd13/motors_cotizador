import prisma from "@/libs/db";
import { SalePost } from "@/models/sale";
import { NextRequest, NextResponse } from "next/server";
import { SaleStatusV2 } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: SalePost = await req.json();
    console.log("Body start", body);
    const {
      cotizacionId,
      customerOrderDate,
      customerOrder,
      line,
      deliveryTime,
      deliveryDate,

      // Cuentas por cobrar - Cliente
      clientInvoiceNumber,
      clientInvoiceDate,
      clientInvoiceDueDate,
      isPaidByClient,
      isPaidByFactoring,
      factoringPaymentAmountUsd,
      factoringPaymentAmountPen,
      // Adelanto
      advanceValueUsdClient,
      advanceValuePenClient,
      advancePaymentDate,
      advanceInvoiceNumber,
      advanceInvoiceDate,
      // Segundo Pago
      secondPaymentUsdClient,
      secondPaymentPenClient,
      secondPaymentDate,
      secondInvoiceNumber,
      secondInvoiceDate,
      // Tercer Pago
      thirdPaymentUsdClient,
      thirdPaymentPenClient,
      thirdPaymentDate,
      thirdInvoiceNumber,
      thirdInvoiceDate,
      // Total Venta
      totalSaleUsd,
      totalSalePen,

      // Proveedor 1
      supplierOrder1,
      advanceValueUsd1,
      balanceValueUsd1,
      totalCostUsd1,
      advanceValuePen1,
      balanceValuePen1,
      totalCostPen1,
      advanceDate1,
      balanceDate1,
      supplierInvoice1,
      balanceInvoice1,
      supplierShipment1,
      invoiceDate1,
      balanceInvoiceDate1,
      shipmentDate1,

      // Proveedor 2
      supplierOrder2,
      advanceValueUsd2,
      balanceValueUsd2,
      totalCostUsd2,
      advanceValuePen2,
      balanceValuePen2,
      totalCostPen2,
      advanceDate2,
      balanceDate2,
      supplierInvoice2,
      balanceInvoice2,
      supplierShipment2,
      invoiceDate2,
      balanceInvoiceDate2,
      shipmentDate2,

      // Proveedor 3
      supplierOrder3,
      advanceValueUsd3,
      balanceValueUsd3,
      totalCostUsd3,
      advanceValuePen3,
      balanceValuePen3,
      totalCostPen3,
      advanceDate3,
      balanceDate3,
      supplierInvoice3,
      balanceInvoice3,
      supplierShipment3,
      invoiceDate3,
      balanceInvoiceDate3,
      shipmentDate3,

      totalSaleCostUsd,
      totalSaleCostPen,

      valueUsd,
      percentageUsd,
      valuePen,
      percentagePen,
      ...resto
    } = body;
    const customerOrderDateString = customerOrderDate
      ? new Date(customerOrderDate)
      : null;
    const deliveryDateString = deliveryDate ? new Date(deliveryDate) : null;

    const clientInvoiceDateString = clientInvoiceDate
      ? new Date(clientInvoiceDate)
      : null;
    const clientInvoiceDueDateString = clientInvoiceDueDate
      ? new Date(clientInvoiceDueDate)
      : null;
    const advancePaymentDateString = advancePaymentDate
      ? new Date(advancePaymentDate)
      : null;
    const advanceInvoiceDateString = advanceInvoiceDate
      ? new Date(advanceInvoiceDate)
      : null;
    const secondPaymentDateString = secondPaymentDate
      ? new Date(secondPaymentDate)
      : null;
    const secondInvoiceDateString = secondInvoiceDate
      ? new Date(secondInvoiceDate)
      : null;
    const thirdPaymentDateString = thirdPaymentDate
      ? new Date(thirdPaymentDate)
      : null;
    const thirdInvoiceDateString = thirdInvoiceDate
      ? new Date(thirdInvoiceDate)
      : null;

    const advanceDate1String = advanceDate1 ? new Date(advanceDate1) : null;
    const balanceDate1String = balanceDate1 ? new Date(balanceDate1) : null;
    const invoiceDate1String = invoiceDate1 ? new Date(invoiceDate1) : null;
    const balanceInvoiceDate1String = balanceInvoiceDate1
      ? new Date(balanceInvoiceDate1)
      : null;
    const shipmentDate1String = shipmentDate1 ? new Date(shipmentDate1) : null;

    const advanceDate2String = advanceDate2 ? new Date(advanceDate2) : null;
    const balanceDate2String = balanceDate2 ? new Date(balanceDate2) : null;
    const invoiceDate2String = invoiceDate2 ? new Date(invoiceDate2) : null;
    const balanceInvoiceDate2String = balanceInvoiceDate2
      ? new Date(balanceInvoiceDate2)
      : null;
    const shipmentDate2String = shipmentDate2 ? new Date(shipmentDate2) : null;

    const advanceDate3String = advanceDate3 ? new Date(advanceDate3) : null;
    const balanceDate3String = balanceDate3 ? new Date(balanceDate3) : null;
    const invoiceDate3String = invoiceDate3 ? new Date(invoiceDate3) : null;
    const balanceInvoiceDate3String = balanceInvoiceDate3
      ? new Date(balanceInvoiceDate3)
      : null;
    const shipmentDate3String = shipmentDate3 ? new Date(shipmentDate3) : null;

    let newSale = null;
    const commonData = {
      cotizacionId: parseInt(cotizacionId),
      customerOrderDate: customerOrderDateString,
      customerOrder: customerOrder,
      line: line,
      deliveryTime: deliveryTime,
      deliveryDate: deliveryDateString,

      clientInvoiceNumber: clientInvoiceNumber,
      clientInvoiceDate: clientInvoiceDateString,
      clientInvoiceDueDate: clientInvoiceDueDateString,
      isPaidByClient: isPaidByClient === "true",
      isPaidByFactoring: isPaidByFactoring === "true",
      factoringPaymentAmountUsd: parseFloat(factoringPaymentAmountUsd),
      factoringPaymentAmountPen: parseFloat(factoringPaymentAmountPen),

      advanceValueUsdClient: parseFloat(advanceValueUsdClient),
      advanceValuePenClient: parseFloat(advanceValuePenClient),
      advancePaymentDate: advancePaymentDateString,
      advanceInvoiceNumber: advanceInvoiceNumber,
      advanceInvoiceDate: advanceInvoiceDateString,

      secondPaymentUsdClient: parseFloat(secondPaymentUsdClient),
      secondPaymentPenClient: parseFloat(secondPaymentPenClient),
      secondPaymentDate: secondPaymentDateString,
      secondInvoiceNumber: secondInvoiceNumber,
      secondInvoiceDate: secondInvoiceDateString,

      thirdPaymentUsdClient: parseFloat(thirdPaymentUsdClient),
      thirdPaymentPenClient: parseFloat(thirdPaymentPenClient),
      thirdPaymentDate: thirdPaymentDateString,
      thirdInvoiceNumber: thirdInvoiceNumber,
      thirdInvoiceDate: thirdInvoiceDateString,

      totalSaleUsd: parseFloat(totalSaleUsd),
      totalSalePen: parseFloat(totalSalePen),

      supplierOrder1: supplierOrder1,
      advanceValueUsd1: parseFloat(advanceValueUsd1),
      balanceValueUsd1: parseFloat(balanceValueUsd1),
      totalCostUsd1: parseFloat(totalCostUsd1),
      advanceValuePen1: parseFloat(advanceValuePen1),
      balanceValuePen1: parseFloat(balanceValuePen1),
      totalCostPen1: parseFloat(totalCostPen1),
      advanceDate1: advanceDate1String,
      balanceDate1: balanceDate1String,
      supplierInvoice1: supplierInvoice1,
      balanceInvoice1: balanceInvoice1,
      supplierShipment1: supplierShipment1,
      invoiceDate1: invoiceDate1String,
      balanceInvoiceDate1: balanceInvoiceDate1String,
      shipmentDate1: shipmentDate1String,

      supplierOrder2: supplierOrder2,
      advanceValueUsd2: parseFloat(advanceValueUsd2),
      balanceValueUsd2: parseFloat(balanceValueUsd2),
      totalCostUsd2: parseFloat(totalCostUsd2),
      advanceValuePen2: parseFloat(advanceValuePen2),
      balanceValuePen2: parseFloat(balanceValuePen2),
      totalCostPen2: parseFloat(totalCostPen2),
      advanceDate2: advanceDate2String,
      balanceDate2: balanceDate2String,
      supplierInvoice2: supplierInvoice2,
      balanceInvoice2: balanceInvoice2,
      supplierShipment2: supplierShipment2,
      invoiceDate2: invoiceDate2String,
      balanceInvoiceDate2: balanceInvoiceDate2String,
      shipmentDate2: shipmentDate2String,

      supplierOrder3: supplierOrder3,
      advanceValueUsd3: parseFloat(advanceValueUsd3),
      balanceValueUsd3: parseFloat(balanceValueUsd3),
      totalCostUsd3: parseFloat(totalCostUsd3),
      advanceValuePen3: parseFloat(advanceValuePen3),
      balanceValuePen3: parseFloat(balanceValuePen3),
      totalCostPen3: parseFloat(totalCostPen3),
      advanceDate3: advanceDate3String,
      balanceDate3: balanceDate3String,
      supplierInvoice3: supplierInvoice3,
      balanceInvoice3: balanceInvoice3,
      supplierShipment3: supplierShipment3,
      invoiceDate3: invoiceDate3String,
      balanceInvoiceDate3: balanceInvoiceDate3String,
      shipmentDate3: shipmentDate3String,

      totalSaleCostUsd: parseFloat(totalSaleCostUsd),
      totalSaleCostPen: parseFloat(totalSaleCostPen),

      valueUsd: parseFloat(valueUsd),
      percentageUsd: parseFloat(percentageUsd),
      valuePen: parseFloat(valuePen),
      percentagePen: parseFloat(percentagePen),
    };

    newSale = await prisma.sale.create({
      data: {
        ...commonData,
      },
    });
    await prisma.cotizacion.update({
      where: { id: parseInt(cotizacionId) },
      data: { saleStatus: "CREATED" },
    });
    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    console.error("Error creando la venta:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const seeAll = searchParams.get("seeAll") === "true";

  try {
    const sales = await prisma.sale.findMany({
      where: {
        status: seeAll ? undefined : { not: SaleStatusV2.FINISHED },
      },
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

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

import prisma from "@/libs/db";
import { SalePut } from "@/models/sale";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body: SalePut = await req.json();
    const id = params.id;


    const {
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
    } = body;

    const customerOrderDateString = customerOrderDate ? new Date(customerOrderDate) : null;
    const deliveryDateString = deliveryDate ? new Date(deliveryDate) : null;

    const clientInvoiceDateString = clientInvoiceDate ? new Date(clientInvoiceDate) : null;
    const clientInvoiceDueDateString = clientInvoiceDueDate ? new Date(clientInvoiceDueDate) : null;
    const advancePaymentDateString = advancePaymentDate ? new Date(advancePaymentDate) : null;
    const advanceInvoiceDateString = advanceInvoiceDate ? new Date(advanceInvoiceDate) : null;
    const secondPaymentDateString = secondPaymentDate ? new Date(secondPaymentDate) : null;
    const secondInvoiceDateString = secondInvoiceDate ? new Date(secondInvoiceDate) : null;
    const thirdPaymentDateString = thirdPaymentDate ? new Date(thirdPaymentDate) : null;
    const thirdInvoiceDateString = thirdInvoiceDate ? new Date(thirdInvoiceDate) : null;
    
    const advanceDate1String = advanceDate1 ? new Date(advanceDate1): null;
    const balanceDate1String = balanceDate1 ? new Date(balanceDate1): null;
    const invoiceDate1String = invoiceDate1 ? new Date(invoiceDate1): null;
    const balanceInvoiceDate1String = balanceInvoiceDate1 ? new Date(balanceInvoiceDate1): null;
    const shipmentDate1String = shipmentDate1 ? new Date(shipmentDate1): null;

    const advanceDate2String = advanceDate2 ? new Date(advanceDate2): null;
    const balanceDate2String = balanceDate2 ? new Date(balanceDate2): null;
    const invoiceDate2String = invoiceDate2 ? new Date(invoiceDate2): null;
    const balanceInvoiceDate2String = balanceInvoiceDate2 ? new Date(balanceInvoiceDate2): null;
    const shipmentDate2String = shipmentDate2 ? new Date(shipmentDate2): null;

    const advanceDate3String = advanceDate3 ? new Date(advanceDate3): null;
    const balanceDate3String = balanceDate3 ? new Date(balanceDate3): null;
    const invoiceDate3String = invoiceDate3 ? new Date(invoiceDate3): null;
    const balanceInvoiceDate3String = balanceInvoiceDate3 ? new Date(balanceInvoiceDate3): null;
    const shipmentDate3String = shipmentDate3 ? new Date(shipmentDate3): null;

    const commonData = {
      customerOrderDate: customerOrderDateString,
      customerOrder,
      line,
      deliveryTime,
      deliveryDate: deliveryDateString,

      clientInvoiceNumber,
      clientInvoiceDate: clientInvoiceDateString,
      clientInvoiceDueDate: clientInvoiceDueDateString,
      isPaidByClient: isPaidByClient === 'true',
      isPaidByFactoring: isPaidByFactoring === 'true',
      factoringPaymentAmountUsd: parseFloat(factoringPaymentAmountUsd) || 0,
      factoringPaymentAmountPen: parseFloat(factoringPaymentAmountPen) || 0,
      
      advanceValueUsdClient: parseFloat(advanceValueUsdClient) || 0,
      advanceValuePenClient: parseFloat(advanceValuePenClient) || 0,
      advancePaymentDate: advancePaymentDateString,
      advanceInvoiceNumber,
      advanceInvoiceDate: advanceInvoiceDateString,
      
      secondPaymentUsdClient: parseFloat(secondPaymentUsdClient) || 0,
      secondPaymentPenClient: parseFloat(secondPaymentPenClient) || 0,
      secondPaymentDate: secondPaymentDateString,
      secondInvoiceNumber,
      secondInvoiceDate: secondInvoiceDateString,
      
      thirdPaymentUsdClient: parseFloat(thirdPaymentUsdClient) || 0,
      thirdPaymentPenClient: parseFloat(thirdPaymentPenClient) || 0,
      thirdPaymentDate: thirdPaymentDateString,
      thirdInvoiceNumber,
      thirdInvoiceDate: thirdInvoiceDateString,
      
      totalSaleUsd: parseFloat(totalSaleUsd) || 0,
      totalSalePen: parseFloat(totalSalePen) || 0,

      supplierOrder1,
      advanceValueUsd1: parseFloat(advanceValueUsd1) || 0,
      balanceValueUsd1: parseFloat(balanceValueUsd1) || 0,
      totalCostUsd1: parseFloat(totalCostUsd1) || 0,
      advanceValuePen1: parseFloat(advanceValuePen1) || 0,
      balanceValuePen1: parseFloat(balanceValuePen1) || 0,
      totalCostPen1: parseFloat(totalCostPen1) || 0,
      advanceDate1: advanceDate1String,
      balanceDate1: balanceDate1String,
      supplierInvoice1,
      balanceInvoice1,
      supplierShipment1,
      invoiceDate1: invoiceDate1String,
      balanceInvoiceDate1: balanceInvoiceDate1String,
      shipmentDate1: shipmentDate1String, 

      supplierOrder2,
      advanceValueUsd2: parseFloat(advanceValueUsd2) || 0,
      balanceValueUsd2: parseFloat(balanceValueUsd2) || 0,
      totalCostUsd2: parseFloat(totalCostUsd2) || 0,
      advanceValuePen2: parseFloat(advanceValuePen2) || 0,
      balanceValuePen2: parseFloat(balanceValuePen2) || 0,
      totalCostPen2: parseFloat(totalCostPen2) || 0,
      advanceDate2: advanceDate2String,
      balanceDate2: balanceDate2String,
      supplierInvoice2,
      balanceInvoice2,
      supplierShipment2,
      invoiceDate2: invoiceDate2String,
      balanceInvoiceDate2: balanceInvoiceDate2String,
      shipmentDate2: shipmentDate2String, 

      supplierOrder3,
      advanceValueUsd3: parseFloat(advanceValueUsd3) || 0,
      balanceValueUsd3: parseFloat(balanceValueUsd3) || 0,
      totalCostUsd3: parseFloat(totalCostUsd3) || 0,
      advanceValuePen3: parseFloat(advanceValuePen3) || 0,
      balanceValuePen3: parseFloat(balanceValuePen3) || 0,
      totalCostPen3: parseFloat(totalCostPen3) || 0,
      advanceDate3: advanceDate3String,
      balanceDate3: balanceDate3String,
      supplierInvoice3,
      balanceInvoice3,
      supplierShipment3,
      invoiceDate3: invoiceDate3String,
      balanceInvoiceDate3: balanceInvoiceDate3String,
      shipmentDate3: shipmentDate3String, 

      totalSaleCostUsd: parseFloat(totalSaleCostUsd) || 0,
      totalSaleCostPen: parseFloat(totalSaleCostPen) || 0,

      valueUsd: parseFloat(valueUsd) || 0,
      percentageUsd: parseFloat(percentageUsd) || 0,
      valuePen: parseFloat(valuePen) || 0,
      percentagePen: parseFloat(percentagePen) || 0,
    };

    const updatedSale = await prisma.sale.update({
      where: {
        id: parseInt(id),
      },
      data: commonData,
    });

    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const saleId = parseInt(params.id);

    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
      select: { cotizacionId: true }
    });

    if (!sale) {
      return new NextResponse("No sale found", { status: 404 });
    }

    await prisma.cotizacion.update({
      where: { id: sale.cotizacionId },
      data: { saleStatus: "TO_CREATE" },
    });

    // Ahora eliminamos la venta
    const deletedSale = await prisma.sale.delete({
      where: { id: saleId },
    });

    return NextResponse.json(deletedSale);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
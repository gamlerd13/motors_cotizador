import prisma from "@/libs/db";
import { SalePost } from "@/models/sale";
import { NextRequest, NextResponse } from "next/server";

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
      invoiceNumber,
      paymentType,
      observation,
      paymentMethod,
      startDate,
      dueDate,
      withoutTax,
      withTax,
      detraction,
      netPayable,
      paidAmount,
      totalSalePrice,
      status,
      outstandingAmount,
      supplierOrder,
      advancePayment,
      advanceDate,
      balance,
      balanceDate,
      totalCost,
      supplierInvoice,
      supplierShipment,
      value,
      percentage,
      ...resto
    } = body;
    const customerOrderDateString = customerOrderDate ? new Date(customerOrderDate) : null;
    const deliveryDateString = deliveryDate ? new Date(deliveryDate) : null;
    const startDateString = startDate ? new Date(startDate) : null;
    const dueDateString = dueDate ? new Date(dueDate) : null;
    const advanceDateString = advanceDate ? new Date(advanceDate) : null;
    const balanceDateString = balanceDate ? new Date(balanceDate) : null;
    

    let newSale = null;
    const commonData = {
      cotizacionId: parseInt(cotizacionId),
      customerOrderDate: customerOrderDateString,
      customerOrder: customerOrder,
      line: line,
      deliveryTime: deliveryTime,
      deliveryDate: deliveryDateString,
      invoiceNumber: invoiceNumber,
      paymentType: paymentType,
      observation: observation,
      paymentMethod: paymentMethod,
      startDate: startDateString,
      dueDate: dueDateString,
      withoutTax: parseFloat(withoutTax),
      withTax: parseFloat(withTax),
      detraction: parseFloat(detraction),
      netPayable: parseFloat(netPayable),
      paidAmount: parseFloat(paidAmount),
      totalSalePrice: parseFloat(totalSalePrice),
      status: status,
      outstandingAmount: parseFloat(outstandingAmount),
      supplierOrder: supplierOrder,
      advancePayment: parseFloat(advancePayment),
      advanceDate: advanceDateString,
      balance: parseFloat(balance),
      balanceDate: balanceDateString,
      totalCost: parseFloat(totalCost),
      supplierInvoice: supplierInvoice,
      supplierShipment: supplierShipment,
      value: parseFloat(value),
      percentage: parseFloat(percentage),
    };
    
    newSale = await prisma.sale.create({
      data:{
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
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 500 });
  }
}

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
      invoiceNumber: sale.invoiceNumber,
      currencyType: sale.cotizacion.currencyType,
      paymentType: sale.paymentType,
      observation: sale.observation,
      paymentMethod: sale.paymentMethod,
      period: sale.cotizacion.deliverTime,
      startDate: sale.startDate,
      dueDate: sale.dueDate,
      withoutTax: sale.withoutTax,
      withTax: sale.withTax,
      detraction: sale.detraction,
      netPayable: sale.netPayable,
      paidAmount: sale.paidAmount,
      totalSalePrice: sale.totalSalePrice,
      status: sale.status,
      outstandingAmount: sale.outstandingAmount,
      supplierOrder: sale.supplierOrder,
      advancePayment: sale.advancePayment,
      advanceDate: sale.advanceDate,
      balance: sale.balance,
      balanceDate: sale.balanceDate,
      totalCost: sale.totalCost,
      supplierInvoice: sale.supplierInvoice,
      supplierShipment: sale.supplierShipment,
      value: sale.value,
      percentage: sale.percentage,
    }));

    return NextResponse.json(formattedSales, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
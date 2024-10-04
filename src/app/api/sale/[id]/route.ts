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
    } = body;

    const customerOrderDateString = customerOrderDate ? new Date(customerOrderDate) : null;
    const deliveryDateString = deliveryDate ? new Date(deliveryDate) : null;
    const startDateString = startDate ? new Date(startDate) : null;
    const dueDateString = dueDate ? new Date(dueDate) : null;
    const advanceDateString = advanceDate ? new Date(advanceDate) : null;
    const balanceDateString = balanceDate ? new Date(balanceDate) : null;

    const commonData = {
      customerOrderDate: customerOrderDateString,
      customerOrder,
      line,
      deliveryTime,
      deliveryDate: deliveryDateString,
      invoiceNumber,
      paymentType,
      observation,
      paymentMethod,
      startDate: startDateString,
      dueDate: dueDateString,
      withoutTax: parseFloat(withoutTax) || 0,
      withTax: parseFloat(withTax) || 0,
      detraction: parseFloat(detraction) || 0,
      netPayable: parseFloat(netPayable) || 0,
      paidAmount: parseFloat(paidAmount) || 0,
      totalSalePrice: parseFloat(totalSalePrice) || 0,
      status,
      outstandingAmount: parseFloat(outstandingAmount) || 0,
      supplierOrder,
      advancePayment: parseFloat(advancePayment) || 0,
      advanceDate: advanceDateString,
      balance: parseFloat(balance) || 0,
      balanceDate: balanceDateString,
      totalCost: parseFloat(totalCost) || 0,
      supplierInvoice,
      supplierShipment,
      value: parseFloat(value) || 0,
      percentage: parseFloat(percentage) || 0,
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
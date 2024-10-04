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
      invoiceNumber: saleItem.invoiceNumber,
      currencyType: saleItem.cotizacion.currencyType,
      paymentType: saleItem.paymentType,
      observation: saleItem.observation,
      paymentMethod: saleItem.paymentMethod,
      period: saleItem.cotizacion.deliverTime,
      startDate: saleItem.startDate,
      dueDate: saleItem.dueDate,
      withoutTax: saleItem.withoutTax,
      withTax: saleItem.withTax,
      detraction: saleItem.detraction,
      netPayable: saleItem.netPayable,
      paidAmount: saleItem.paidAmount,
      totalSalePrice: saleItem.totalSalePrice,
      status: saleItem.status,
      outstandingAmount: saleItem.outstandingAmount,
      supplierOrder: saleItem.supplierOrder,
      advancePayment: saleItem.advancePayment,
      advanceDate: saleItem.advanceDate,
      balance: saleItem.balance,
      balanceDate: saleItem.balanceDate,
      totalCost: saleItem.totalCost,
      supplierInvoice: saleItem.supplierInvoice,
      supplierShipment: saleItem.supplierShipment,
      value: saleItem.value,
      percentage: saleItem.percentage,
    }));
    
    return NextResponse.json(saleCotizacion, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
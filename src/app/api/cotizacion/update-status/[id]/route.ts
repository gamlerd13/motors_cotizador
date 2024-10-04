import { CotizacionStatus, SaleStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const typeEnding: CotizacionStatus = await req.json();

    const cotizacionActual = await prisma.cotizacion.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!cotizacionActual) {
      return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
    }

    if (typeEnding === CotizacionStatus.ESTADO5) {
      const cotizacionUpdated = await prisma.cotizacion.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          status: typeEnding,
          saleStatus: SaleStatus.TO_CREATE,
        },
      });

      return NextResponse.json(cotizacionUpdated, { status: 201 });
    }

    if (cotizacionActual.status === CotizacionStatus.ESTADO5) {
      if (cotizacionActual.saleStatus === SaleStatus.CREATED) {
        return NextResponse.json(
          { error: "No puedes cambiar el estado de una cotización con venta creada." },
          { status: 400 }
        );
      } else if (cotizacionActual.saleStatus === SaleStatus.TO_CREATE) {
        const cotizacionUpdated = await prisma.cotizacion.update({
          where: {
            id: parseInt(params.id),
          },
          data: {
            status: typeEnding,
            saleStatus: SaleStatus.NONE,
          },
        });

        return NextResponse.json(cotizacionUpdated, { status: 201 });
      }
    }

    const cotizacionUpdated = await prisma.cotizacion.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        status: typeEnding,
      },
    });

    return NextResponse.json(cotizacionUpdated, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

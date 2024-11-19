import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { SaleStatusV2 } from "@prisma/client";
interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const sale = await prisma.sale.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: SaleStatusV2.FINISHED,
      },
    });

    if (!sale) new Error("No encontrado");

    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

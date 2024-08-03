import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { ProductItemType } from "../route";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const cotizacionId = params.id;
    console.log(cotizacionId, "entro al get");
    const cotizacion = await prisma.cotizacion.findFirst({
      where: {
        id: parseInt(cotizacionId),
      },
    });

    if (!cotizacion) throw new Error("No existe cotizacion");

    const { items, ...resto } = cotizacion;

    //Asegurar que items tenga key correlativos desde 1 a ...
    const itemsObject = JSON.parse(items as string).map(
      (item: ProductItemType, index: number) => ({
        ...item,
        key: index + 1,
      })
    );

    const cotizacionItemsObject = {
      items: itemsObject,
      ...resto,
    };

    return NextResponse.json(cotizacionItemsObject, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

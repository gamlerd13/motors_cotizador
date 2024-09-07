import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(req: NextRequest) {
  try {
    const dateStart = new Date(req.nextUrl.searchParams.get("dateStart") || "");
    const dateEnd = new Date(req.nextUrl.searchParams.get("dateEnd") || "");

    if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
      return new Response("Invalid dates", { status: 400 });
    }

    const cotizaciones = await prisma.cotizacion.findMany({
      where: {
        date: {
          gte: new Date(dateStart),
          lte: new Date(dateEnd),
        },
      },
      include: {
        client: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const cotizacionesMap = await cotizaciones.map((coti) => {
      const { items, ...todoDemas } = coti;

      return {
        ...todoDemas,
        items: JSON.parse(items as string),
      };
    });

    return NextResponse.json(cotizacionesMap, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

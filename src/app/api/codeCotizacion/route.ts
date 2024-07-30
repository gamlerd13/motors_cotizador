import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const lastCode = await prisma.codeCotizacion.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    let newNumber = 1;
    const prefix = "2024-";
    if (lastCode) newNumber = lastCode.nextCode;
    const code = `${prefix}${newNumber.toString().padStart(4, "0")}`;

    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

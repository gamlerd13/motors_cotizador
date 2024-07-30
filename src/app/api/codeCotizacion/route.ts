import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const prefix = "2024-";
    let newNumber = 1;
    const lastCode = await prisma.codeCotizacion.findFirst();
    if (lastCode) newNumber = lastCode.nextCode + 1;
    const code = `${prefix}${newNumber.toString().padStart(4, "0")}`;

    console.log("This is a code in producction", code);
    return NextResponse.json(code, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
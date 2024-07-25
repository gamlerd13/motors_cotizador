import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const clientes = await prisma.client.findMany();

    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

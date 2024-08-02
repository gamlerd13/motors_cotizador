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


export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const { clientName, clientContact, clientRuc, clientReference } = body;

    if (clientName.trim() == "" && clientContact.trim() == "" && clientRuc.trim() == "" && clientReference.trim() == "") {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Guarda el nuevo código en la base de datos
    const newCode = await prisma.client.create({
      data: {
        name: clientName.trim(),
        contact: clientContact.trim(),
        ruc: clientRuc.trim(),
        reference: clientReference.trim(),
      },
    });

    return NextResponse.json(newCode, { status: 201 });
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.error();
  }
}

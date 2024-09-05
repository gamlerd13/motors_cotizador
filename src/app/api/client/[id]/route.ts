import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Client } from "@/models/client";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Leer el cuerpo de la petición
    const clientData: Client = await req.json();

    const updatedClient = await prisma.client.update({
      where: {
        id: parseInt(params.id),
      },
      data: clientData,
    });

    // Retornar la respuesta con el cliente actualizado
    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

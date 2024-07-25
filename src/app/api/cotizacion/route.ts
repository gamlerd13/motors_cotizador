import { Cotizacion, ProductItemPost } from "@/models/cotizacion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: Cotizacion = await req.json();
    const {
      client,
      clientName,
      clientContact,
      clientReference,
      date,
      deliverTime,
      paymentCondition,
      totalPrice,
      ...resto
    } = body;

    console.log(client);
    console.log(clientName);
    console.log(clientContact);
    console.log(resto);

    // const newPayment = await prisma..create({
    //   data: {
    //     alumnoId,
    //     paymentConceptId,
    //     paymentMethod,
    //     total,
    //   },
    // });
    const newPayment = "asdf";
    if (!newPayment) {
      console.log("va  a haber un error");
      throw new Error("No se pudo crear el pago");
    }
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

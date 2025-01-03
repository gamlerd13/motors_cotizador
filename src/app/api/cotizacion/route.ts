import {
  CotizacionType,
  CotizacionPost,
  ProductItemPost,
} from "@/models/cotizacion";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { CotizacionStatus, Cotizacion } from "@prisma/client";
import { Prisma } from "@prisma/client";
export interface ProductItemType {
  key: number;
  description: string;
  model: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PdfCotizacion {
  id: number; //por si hay que cotizar desde backend
  code: string;
  clientName: string;
  clientReference: string;
  clientContact: string;
  date: string;
  items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: CotizacionType = await req.json();
    console.log("Body start", body);
    const {
      companyPhone,
      companyEmail,
      client: clientBody,
      clientName,
      clientContact,
      clientRuc,
      clientReference,
      date,
      deliverTime,
      paymentCondition,
      offerValidity,
      warranty,
      bankAccountNumber,
      totalPrice,
      currencyType,
      ...resto //son los items que hay que tiene,estos son dinamicos
    } = body;

    const items: ProductItemType[] = Object.keys(resto)
      .filter((key) => key.match(/^\d+_id$/))
      .map((key) => {
        const id = key.split("_")[0];
        return {
          key: parseInt(resto[`${id}_id`], 10),
          description: resto[`${id}_description`],
          model: resto[`${id}_model`],
          amount: parseInt(resto[`${id}_amount`], 10),
          unitPrice: parseFloat(resto[`${id}_unitprice`]),
          totalPrice: parseFloat(resto[`${id}_totalprice`]),
        };
      });

    //  manejar el codigo aca

    const prefix = `${new Date().getFullYear().toString()}-`;

    let newNumber = 1; // Valor predeterminado si no hay registros
    const codeRecord = await prisma.codeCotizacion.findFirst();
    if (codeRecord) newNumber = codeRecord.nextCode + 1;
    const newCode = `${prefix}${newNumber.toString().padStart(4, "0")}`;

    const dateString = date === "" ? new Date() : new Date(date);

    let newCotizacionConditional = null;
    //create client
    const commonData = {
      companyPhone: companyPhone,
      companyEmail: companyEmail,
      status: CotizacionStatus.ESTADO1,
      code: newCode,
      parentCode: newCode,
      date: dateString,
      deliverTime: deliverTime,
      paymentCondition: paymentCondition,
      offerValidity: offerValidity,
      warranty: warranty,
      bankAccountNumber: bankAccountNumber,
      totalPrice: parseFloat(totalPrice),
      currencyType: currencyType,
      items: JSON.stringify(items),
    };

    const cli = {
      client: {
        create: {
          name: clientName.trim(),
          contact: clientContact.trim(),
          ruc: clientRuc.trim(),
          reference: clientReference.trim(),
          createAt: new Date(),
        },
      },
    };
    if (clientBody === "") {
      const client = clientName.trim() !== "" ? cli.client : undefined;
      newCotizacionConditional = await prisma.cotizacion.create({
        data: {
          ...commonData,
          client,
          clientName: "",
          clientContact: "",
          clientRuc: "",
          clientReference: "",
        },
      });
    } else if (!isNaN(parseInt(clientBody))) {
      newCotizacionConditional = await prisma.cotizacion.create({
        data: {
          ...commonData,
          clientName: clientName.trim(),
          clientContact: clientContact.trim(),
          clientRuc: clientRuc.trim(),
          clientReference: clientReference.trim(),
          clientId: parseInt(clientBody),
        },
      });
    }

    if (!newCotizacionConditional) {
      throw new Error("No se pudo crear el pago");
    }

    //Despues de que se haya creado satisfactoriamente la cotizacion, crear el siguiente numero en codigo cotizacion
    if (codeRecord) {
      await prisma.codeCotizacion.update({
        where: { id: codeRecord.id },
        data: { nextCode: newNumber },
      });
    } else {
      //crear el primer registro
      await prisma.codeCotizacion.create({
        data: {
          nextCode: 1,
        },
      });
    }

    //Crear una instancia de LastCodeFhaterCotizacion para el cotizador padre
    await prisma.lastCodeCotizacion.create({
      data: {
        cotizacionId: newCotizacionConditional.id,
      },
    });

    return NextResponse.json(newCotizacionConditional, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cotizaciones = await prisma.cotizacion.findMany({
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

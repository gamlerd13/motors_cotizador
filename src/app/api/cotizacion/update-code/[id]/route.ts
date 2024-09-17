import {
  CotizacionType,
  CotizacionPost,
  ProductItemPost,
  InitialCodeCotizacionChild,
  CotizacionUpdate,
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

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body: CotizacionUpdate = await req.json();
    const parentId = params.id;
    const {
      // client: clientBody,
      companyPhone,
      companyEmail,
      clientId,
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
      code,
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

    //  manejar el codigo, asegurar que exista una coti. padre
    let newCodeLeter = 0;
    const codeLeter = await prisma.lastCodeCotizacion.findFirst({
      where: {
        cotizacionId: parseInt(parentId),
      },
    });
    if (codeLeter) newCodeLeter = codeLeter.nextCode;
    const newCode = `${code}-${InitialCodeCotizacionChild[newCodeLeter]}`; //2024-0021-A

    const dateString = date === "" ? new Date() : new Date(date);

    let newCotizacionConditional = null;
    //create client
    const commonData = {
      companyPhone: companyPhone,
      companyEmail: companyEmail,
      code: newCode,
      date: dateString,
      deliverTime: deliverTime,
      paymentCondition: paymentCondition,
      offerValidity: offerValidity,
      warranty: warranty,
      bankAccountNumber: bankAccountNumber,
      totalPrice: parseFloat(totalPrice),
      currencyType: currencyType,
      items: JSON.stringify(items),
      isEdit: true,
    };

    // const cli = {
    //   client: {
    //     create: {
    //       name: clientName.trim(),
    //       contact: clientContact.trim(),
    //       ruc: clientRuc.trim(),
    //       reference: clientReference.trim(),
    //       createAt: new Date(),
    //     },
    //   },
    // };
    // if (clientBody === "") {
    //   const client = clientName.trim() !== "" ? cli.client : undefined;
    //   newCotizacionConditional = await prisma.cotizacion.update({
    //     where: {
    //       id: parseInt(parentId),
    //     },
    //     data: {
    //       ...commonData,
    //       client,
    //       clientName: "",
    //       clientContact: "",
    //       clientRuc: "",
    //       clientReference: "",
    //     },
    //   });
    // } else if (!isNaN(parseInt(clientBody))) {
    //   newCotizacionConditional = await prisma.cotizacion.update({
    //     where: {
    //       id: parseInt(parentId),
    //     },
    //     data: {
    //       ...commonData,
    //       clientName: clientName.trim(),
    //       clientContact: clientContact.trim(),
    //       clientRuc: clientRuc.trim(),
    //       clientReference: clientReference.trim(),
    //       clientId: parseInt(clientBody),
    //     },
    //   });
    // }

    newCotizacionConditional = await prisma.cotizacion.update({
      where: {
        id: parseInt(parentId),
      },
      data: {
        ...commonData,
        client: {
          update: {
            where: {
              id: parseInt(clientId),
            },
            data: {
              name: clientName,
              contact: clientContact,
              ruc: clientRuc,
              reference: clientReference,
            },
          },
        },
      },
    });
    if (!newCotizacionConditional) {
      throw new Error("No se pudo crear la cotizacion");
    }

    //Despues de que se haya creado satisfactoriamente la cotizacion, crear el siguiente numero en codigo cotizacion
    if (codeLeter) {
      await prisma.lastCodeCotizacion.update({
        where: {
          id: codeLeter.id,
        },
        data: {
          nextCode: codeLeter.nextCode + 1,
        },
      });
    }

    return NextResponse.json(newCotizacionConditional, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

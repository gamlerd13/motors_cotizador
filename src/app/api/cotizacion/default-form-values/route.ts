import { NextRequest, NextResponse } from "next/server";
import { DefaulFormValues } from "@prisma/client";
import prisma from "@/libs/db";

export async function GET(req: NextRequest) {
  try {
    const defaulFormValues = await prisma.defaulFormValues.findFirst();

    if (!defaulFormValues) throw new Error("No existe valores por defecto");

    return NextResponse.json(defaulFormValues, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { companyPhone, companyEmail, bankAccountNumber }: DefaulFormValues =
      await req.json();

    const defaultValue = await prisma.defaulFormValues.findFirst();

    let defaulFormValues = undefined;

    if (defaultValue) {
      defaulFormValues = await prisma.defaulFormValues.update({
        where: {
          id: defaultValue.id,
        },
        data: {
          companyPhone,
          companyEmail,
          bankAccountNumber,
        },
      });
    } else {
      defaulFormValues = await prisma.defaulFormValues.create({
        data: {
          companyPhone,
          companyEmail,
          bankAccountNumber,
        },
      });
    }

    if (!defaulFormValues)
      throw new Error("No existe valor por defecto en la cotización");

    return NextResponse.json(defaulFormValues, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export const dynamic = "force-dynamic";

import { CotizacionStatus } from "@prisma/client";
import { Client, ClientCreate } from "./client";

export interface ProductItemType {
  key: number;
  description: string;
  model: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export type ProductItemPost = ProductItemType & {
  [key: string]: any;
};

export interface CotizacionType {
  id?: number; //por si hay que cotizar desde backend
  client: string;
  // undefined client
  clientName: string;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  // items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: string;
  [key: string]: any;
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

export interface CotizacionGet {
  id: number; //por si hay que cotizar desde backend
  client: Client | null;
  // undefined client
  code: string;
  clientName: string;
  status: CotizacionStatus;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
}

export interface CotizacionPost {
  client?: {
    create: {
      name: string;
      contact: string;
      ruc: string;
      reference: string;
      createAt: Date;
    };
  };
  clientId?: number;
  code: string;
  clientName: string;
  status: CotizacionStatus;
  clientContact: string;
  clientReference: string;
  clientRuc: string;
  date: Date;
  items: ProductItemType[] | string;
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
}

export const statusLabels: { [key in CotizacionStatus]: string } = {
  [CotizacionStatus.DRAFT]: "BORRADOR",
  [CotizacionStatus.SENT]: "ENVIADO",
  [CotizacionStatus.ACCEPTED]: "ACEPTADO",
  [CotizacionStatus.REJECTED]: "RECHAZADO",
  [CotizacionStatus.EXPIRED]: "EXPIRADO",
};

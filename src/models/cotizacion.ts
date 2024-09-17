import { CotizacionStatus, CurrencyType } from "@prisma/client";
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
  companyPhone: string,
  companyEmail: string,
  client: string;
  // undefined client
  clientName: string;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  // items: ProductItemType[];
  deliverTime: string;
  
  currencyType: CurrencyType;
  totalPrice: string;
  [key: string]: any;

  // comercial conditions
  paymentCondition: string;
  offerValidity: string; // Validez de la oferta
  warranty: string; // Garantía
  bankAccountNumber: string; // Número de cuenta bancaria de Movento S.A.C
}

export interface CotizacionUpdate {
  id?: number; //por si hay que cotizar desde backend
  clientId: string;
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
  companyPhone: string,
  companyEmail: string,
  client: Client | null;
  clientId: number;
  // undefined client
  code: string;
  parentCode: string;
  clientName: string;
  status: CotizacionStatus;
  clientContact: string;
  clientReference: string;
  clientRuc: string;

  date: string;

  items: ProductItemType[];
  deliverTime: string;
  totalPrice: number;
  currencyType: CurrencyType;
  isEdit: boolean;

  // comercial conditions
  paymentCondition: string;
  offerValidity: string; // Validez de la oferta
  warranty: string; // Garantía
  bankAccountNumber: string; // Número de cuenta bancaria de Movento S.A.C
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

// export const statusLabels: { [key in CotizacionStatus]: string } = {
//   [CotizacionStatus.DRAFT]: "BORRADOR",
//   [CotizacionStatus.SENT]: "ENVIADO",
//   [CotizacionStatus.ACCEPTED]: "ACEPTADO",
//   [CotizacionStatus.REJECTED]: "RECHAZADO",
//   [CotizacionStatus.EXPIRED]: "EXPIRADO",
// };

// export const statusLabels: { [key in CotizacionStatus]: string } = {
//   [CotizacionStatus.ESTADO1]: "ESTADO1",
//   [CotizacionStatus.ESTADO2]: "ESTADO2",
//   [CotizacionStatus.ESTADO3]: "ESTADO3",
//   [CotizacionStatus.ESTADO4]: "ESTADO4",
//   [CotizacionStatus.ESTADO5]: "ESTADO5",
//   [CotizacionStatus.ESTADO6]: "ESTADO6",
// };
export const statusLabels: { [key in CotizacionStatus]: string } = {
  [CotizacionStatus.ESTADO1]: "En evaluación por cliente",
  [CotizacionStatus.ESTADO2]: "Cotización actualizada",
  [CotizacionStatus.ESTADO3]: "Cliente toma decisión en siguientes días",
  [CotizacionStatus.ESTADO4]: "Cliente no responde llamada/mensaje",
  [CotizacionStatus.ESTADO5]: "Ganada",
  [CotizacionStatus.ESTADO6]: "Perdida",
};

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export const statusColors: { [key in CotizacionStatus]: ChipColor } = {
  [CotizacionStatus.ESTADO1]: "default",
  [CotizacionStatus.ESTADO2]: "primary",
  [CotizacionStatus.ESTADO3]: "secondary",
  [CotizacionStatus.ESTADO4]: "success",
  [CotizacionStatus.ESTADO5]: "warning",
  [CotizacionStatus.ESTADO6]: "danger",
};

export const InitialCodeCotizacionChild = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export interface RangeDate {
  dateStart: Date;
  dateEnd: Date;
}

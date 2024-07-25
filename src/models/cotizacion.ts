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

export interface Cotizacion {
  id?: number; //por si hay que cotizar desde backend
  client: string;
  // undefined client
  clientName: string;
  clientContact: string;
  clientReference: string;

  date: string;

  // items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
  [key: string]: any;
}

export interface PdfCotizacion {
  id: number; //por si hay que cotizar desde backend
  code: string;
  client: string;
  reference: string;
  date: string;
  contact: string;
  items: ProductItemType[];
  deliverTime: string;
  paymentCondition: string;
  totalPrice: number;
}

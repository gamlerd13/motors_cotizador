import { Prisma, SaleStatusV2 } from "@prisma/client";
import { ChipColor } from "./core";
export interface SalePost {
  id?: number;
  cotizacionId: string;
  customerOrderDate: string;
  customerOrder: string;
  line: string;
  deliveryTime: string;
  deliveryDate: string;

  // Cuentas por cobrar - Cliente
  clientInvoiceNumber: string;
  clientInvoiceDate: string;
  clientInvoiceDueDate: string;
  isPaidByClient: boolean | string;
  isPaidByFactoring: boolean | string;
  factoringPaymentAmountUsd: string;
  factoringPaymentAmountPen: string;
  // Adelanto
  advanceValueUsdClient: string;
  advanceValuePenClient: string;
  advancePaymentDate: string;
  advanceInvoiceNumber: string;
  advanceInvoiceDate: string;
  // Segundo Pago
  secondPaymentUsdClient: string;
  secondPaymentPenClient: string;
  secondPaymentDate: string;
  secondInvoiceNumber: string;
  secondInvoiceDate: string;
  // Tercer Pago
  thirdPaymentUsdClient: string;
  thirdPaymentPenClient: string;
  thirdPaymentDate: string;
  thirdInvoiceNumber: string;
  thirdInvoiceDate: string;
  // Total Venta
  totalSaleUsd: string;
  totalSalePen: string;

  // Proveedor 1
  supplierOrder1: string;
  advanceValueUsd1: string;
  balanceValueUsd1: string;
  totalCostUsd1: string;
  advanceValuePen1: string;
  balanceValuePen1: string;
  totalCostPen1: string;
  advanceDate1: string;
  balanceDate1: string;
  supplierInvoice1: string;
  balanceInvoice1: string;
  supplierShipment1: string;
  invoiceDate1: string;
  balanceInvoiceDate1: string;
  shipmentDate1: string;

  // Proveedor 2
  supplierOrder2: string;
  advanceValueUsd2: string;
  balanceValueUsd2: string;
  totalCostUsd2: string;
  advanceValuePen2: string;
  balanceValuePen2: string;
  totalCostPen2: string;
  advanceDate2: string;
  balanceDate2: string;
  supplierInvoice2: string;
  balanceInvoice2: string;
  supplierShipment2: string;
  invoiceDate2: string;
  balanceInvoiceDate2: string;
  shipmentDate2: string;

  // Proveedor 3
  supplierOrder3: string;
  advanceValueUsd3: string;
  balanceValueUsd3: string;
  totalCostUsd3: string;
  advanceValuePen3: string;
  balanceValuePen3: string;
  totalCostPen3: string;
  advanceDate3: string;
  balanceDate3: string;
  supplierInvoice3: string;
  balanceInvoice3: string;
  supplierShipment3: string;
  invoiceDate3: string;
  balanceInvoiceDate3: string;
  shipmentDate3: string;

  totalSaleCostUsd: string;
  totalSaleCostPen: string;

  valueUsd: string;
  percentageUsd: string;
  valuePen: string;
  percentagePen: string;
}

export interface SaleGet {
  id: number;
  customerOrderDate: string;
  customerOrder: string;
  quoteCode: string;
  companyName: string;
  line: string;
  companyRuc: string;
  deliveryTime: string;
  deliveryDate: string;

  // Cuentas por cobrar - Cliente
  clientInvoiceNumber: string;
  clientInvoiceDate: string;
  clientInvoiceDueDate: string;
  isPaidByClient: boolean | string;
  isPaidByFactoring: boolean | string;
  factoringPaymentAmountUsd: number;
  factoringPaymentAmountPen: number;
  // Adelanto
  advanceValueUsdClient: number;
  advanceValuePenClient: number;
  advancePaymentDate: string;
  advanceInvoiceNumber: string;
  advanceInvoiceDate: string;
  // Segundo Pago
  secondPaymentUsdClient: number;
  secondPaymentPenClient: number;
  secondPaymentDate: string;
  secondInvoiceNumber: string;
  secondInvoiceDate: string;
  // Tercer Pago
  thirdPaymentUsdClient: number;
  thirdPaymentPenClient: number;
  thirdPaymentDate: string;
  thirdInvoiceNumber: string;
  thirdInvoiceDate: string;
  // Total Venta
  totalSaleUsd: number;
  totalSalePen: number;

  // Proveedor 1
  supplierOrder1: string;
  advanceValueUsd1: number;
  balanceValueUsd1: number;
  totalCostUsd1: number;
  advanceValuePen1: number;
  balanceValuePen1: number;
  totalCostPen1: number;
  advanceDate1: string;
  balanceDate1: string;
  supplierInvoice1: string;
  balanceInvoice1: string;
  supplierShipment1: string;
  invoiceDate1: string;
  balanceInvoiceDate1: string;
  shipmentDate1: string;

  // Proveedor 2
  supplierOrder2: string;
  advanceValueUsd2: number;
  balanceValueUsd2: number;
  totalCostUsd2: number;
  advanceValuePen2: number;
  balanceValuePen2: number;
  totalCostPen2: number;
  advanceDate2: string;
  balanceDate2: string;
  supplierInvoice2: string;
  balanceInvoice2: string;
  supplierShipment2: string;
  invoiceDate2: string;
  balanceInvoiceDate2: string;
  shipmentDate2: string;

  // Proveedor 3
  supplierOrder3: string;
  advanceValueUsd3: number;
  balanceValueUsd3: number;
  totalCostUsd3: number;
  advanceValuePen3: number;
  balanceValuePen3: number;
  totalCostPen3: number;
  advanceDate3: string;
  balanceDate3: string;
  supplierInvoice3: string;
  balanceInvoice3: string;
  supplierShipment3: string;
  invoiceDate3: string;
  balanceInvoiceDate3: string;
  shipmentDate3: string;

  totalSaleCostUsd: number;
  totalSaleCostPen: number;

  valueUsd: number;
  percentageUsd: number;
  valuePen: number;
  percentagePen: number;
  status: SaleStatusV2;
}

export interface SalePut {
  id?: number;
  customerOrderDate: string;
  customerOrder: string;
  line: string;
  deliveryTime: string;
  deliveryDate: string;

  // Cuentas por cobrar - Cliente
  clientInvoiceNumber: string;
  clientInvoiceDate: string;
  clientInvoiceDueDate: string;
  isPaidByClient: boolean | string;
  isPaidByFactoring: boolean | string;
  factoringPaymentAmountUsd: string;
  factoringPaymentAmountPen: string;
  // Adelanto
  advanceValueUsdClient: string;
  advanceValuePenClient: string;
  advancePaymentDate: string;
  advanceInvoiceNumber: string;
  advanceInvoiceDate: string;
  // Segundo Pago
  secondPaymentUsdClient: string;
  secondPaymentPenClient: string;
  secondPaymentDate: string;
  secondInvoiceNumber: string;
  secondInvoiceDate: string;
  // Tercer Pago
  thirdPaymentUsdClient: string;
  thirdPaymentPenClient: string;
  thirdPaymentDate: string;
  thirdInvoiceNumber: string;
  thirdInvoiceDate: string;
  // Total Venta
  totalSaleUsd: string;
  totalSalePen: string;

  // Proveedor 1
  supplierOrder1: string;
  advanceValueUsd1: string;
  balanceValueUsd1: string;
  totalCostUsd1: string;
  advanceValuePen1: string;
  balanceValuePen1: string;
  totalCostPen1: string;
  advanceDate1: string;
  balanceDate1: string;
  supplierInvoice1: string;
  balanceInvoice1: string;
  supplierShipment1: string;
  invoiceDate1: string;
  balanceInvoiceDate1: string;
  shipmentDate1: string;

  // Proveedor 2
  supplierOrder2: string;
  advanceValueUsd2: string;
  balanceValueUsd2: string;
  totalCostUsd2: string;
  advanceValuePen2: string;
  balanceValuePen2: string;
  totalCostPen2: string;
  advanceDate2: string;
  balanceDate2: string;
  supplierInvoice2: string;
  balanceInvoice2: string;
  supplierShipment2: string;
  invoiceDate2: string;
  balanceInvoiceDate2: string;
  shipmentDate2: string;

  // Proveedor 3
  supplierOrder3: string;
  advanceValueUsd3: string;
  balanceValueUsd3: string;
  totalCostUsd3: string;
  advanceValuePen3: string;
  balanceValuePen3: string;
  totalCostPen3: string;
  advanceDate3: string;
  balanceDate3: string;
  supplierInvoice3: string;
  balanceInvoice3: string;
  supplierShipment3: string;
  invoiceDate3: string;
  balanceInvoiceDate3: string;
  shipmentDate3: string;

  totalSaleCostUsd: string;
  totalSaleCostPen: string;

  valueUsd: string;
  percentageUsd: string;
  valuePen: string;
  percentagePen: string;
}

export interface SaleExport {
  customerOrderDate: string | null;
  customerOrder: string | null;
  quoteCode: string;
  companyName: string | null;
  line: string | null;
  companyRuc: string | null;
  deliveryTime: string | null;
  deliveryDate: string | null;
  value: number | null;
  percentage: number | null;
}

export type SaleWithRelations = Prisma.SaleGetPayload<{
  include: {
    cotizacion: {
      include: {
        client: true;
      };
    };
  };
}>;

export const SalesStatusLabel: {
  [key in SaleStatusV2]: { label: string; color: ChipColor };
} = {
  [SaleStatusV2.CREATED]: { label: "Creada", color: "default" },
  [SaleStatusV2.UPDATED]: { label: "Actualizada", color: "primary" },
  [SaleStatusV2.FINISHED]: { label: "Finalizada", color: "success" },
};

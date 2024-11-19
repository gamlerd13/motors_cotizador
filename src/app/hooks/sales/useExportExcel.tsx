import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Sale } from "@prisma/client";

export const generateExcel = (salesData: Sale[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sales Report");

  // Encabezados y agrupaciones
  const headers = [
    { header: "ID", key: "id", width: 10 },
    { header: "Cotización ID", key: "cotizacionId", width: 15 },
    { header: "Fecha OC del Cliente", key: "customerOrderDate", width: 20 },
    { header: "OC del Cliente", key: "customerOrder", width: 20 },
    { header: "Línea", key: "line", width: 15 },
    { header: "Plazo de entrega", key: "deliveryTime", width: 20 },
    { header: "Fecha de entrega", key: "deliveryDate", width: 20 },
    { header: "Estado", key: "status", width: 15 },

    // Cuentas por cobrar - Cliente
    { header: "No de Factura Cliente", key: "clientInvoiceNumber", width: 25 },
    { header: "Fecha Factura Cliente", key: "clientInvoiceDate", width: 25 },
    {
      header: "Vencimiento Factura Cliente",
      key: "clientInvoiceDueDate",
      width: 25,
    },
    { header: "Pagado por Cliente", key: "isPaidByClient", width: 20 },
    { header: "Pagado por Factoring", key: "isPaidByFactoring", width: 20 },
    {
      header: "Monto Factoring USD",
      key: "factoringPaymentAmountUsd",
      width: 25,
    },
    {
      header: "Monto Factoring PEN",
      key: "factoringPaymentAmountPen",
      width: 25,
    },

    // Adelanto
    { header: "Valor Adelanto USD", key: "advanceValueUsdClient", width: 25 },
    { header: "Valor Adelanto PEN", key: "advanceValuePenClient", width: 25 },
    { header: "Fecha Adelanto", key: "advancePaymentDate", width: 20 },
    { header: "Factura Adelanto", key: "advanceInvoiceNumber", width: 25 },
    { header: "Fecha Factura Adelanto", key: "advanceInvoiceDate", width: 25 },

    // Segundo Pago
    { header: "Valor 2do Pago USD", key: "secondPaymentUsdClient", width: 25 },
    { header: "Valor 2do Pago PEN", key: "secondPaymentPenClient", width: 25 },
    { header: "Fecha 2do Pago", key: "secondPaymentDate", width: 25 },
    { header: "Factura 2do Pago", key: "secondInvoiceNumber", width: 25 },
    { header: "Fecha Factura 2do Pago", key: "secondInvoiceDate", width: 25 },

    // Tercer Pago
    { header: "Valor 3er Pago USD", key: "thirdPaymentUsdClient", width: 25 },
    { header: "Valor 3er Pago PEN", key: "thirdPaymentPenClient", width: 25 },
    { header: "Fecha 3er Pago", key: "thirdPaymentDate", width: 25 },
    { header: "Factura 3er Pago", key: "thirdInvoiceNumber", width: 25 },
    { header: "Fecha Factura 3er Pago", key: "thirdInvoiceDate", width: 25 },

    // Total Venta
    { header: "Total Venta USD", key: "totalSaleUsd", width: 25 },
    { header: "Total Venta PEN", key: "totalSalePen", width: 25 },

    // Proveedor 1
    { header: "OC Proveedor 1", key: "supplierOrder1", width: 25 },
    { header: "Adelanto USD Proveedor 1", key: "advanceValueUsd1", width: 25 },
    { header: "Saldo USD Proveedor 1", key: "balanceValueUsd1", width: 25 },
    { header: "Costo Total USD Proveedor 1", key: "totalCostUsd1", width: 25 },
    { header: "Adelanto PEN Proveedor 1", key: "advanceValuePen1", width: 25 },
    { header: "Saldo PEN Proveedor 1", key: "balanceValuePen1", width: 25 },
    { header: "Costo Total PEN Proveedor 1", key: "totalCostPen1", width: 25 },
    { header: "Fecha Adelanto Proveedor 1", key: "advanceDate1", width: 25 },
    { header: "Fecha Saldo Proveedor 1", key: "balanceDate1", width: 25 },
    {
      header: "Factura Proveedor Adelanto 1",
      key: "supplierInvoice1",
      width: 25,
    },
    { header: "Factura Proveedor Saldo 1", key: "balanceInvoice1", width: 25 },
    {
      header: "Guía Remisión Proveedor 1",
      key: "supplierShipment1",
      width: 25,
    },
    { header: "Fecha Factura Adelanto 1", key: "invoiceDate1", width: 25 },
    { header: "Fecha Factura Saldo 1", key: "balanceInvoiceDate1", width: 25 },
    { header: "Fecha Guía Remisión 1", key: "shipmentDate1", width: 25 },

    // Repite los mismos campos para Proveedor 2 y Proveedor 3
    // Total Venta
    { header: "Costo Total Venta USD", key: "totalSaleCostUsd", width: 25 },
    { header: "Costo Total Venta PEN", key: "totalSaleCostPen", width: 25 },

    // Campos de valor y porcentaje
    { header: "Valor USD", key: "valueUsd", width: 20 },
    { header: "Porcentaje USD", key: "percentageUsd", width: 20 },
    { header: "Valor PEN", key: "valuePen", width: 20 },
    { header: "Porcentaje PEN", key: "percentagePen", width: 20 },
  ];

  // Configurar columnas en el worksheet
  worksheet.columns = headers;

  // Agregar datos
  salesData.forEach((sale) => {
    worksheet.addRow(sale);
  });

  // Ajustar tamaño dinámico de columnas
  worksheet.columns.forEach((column) => {
    if (column.eachCell) {
      // Verificar si eachCell está definido
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        if (cell.value) {
          const cellValue = cell.value.toString();
          maxLength = Math.max(maxLength, cellValue.length);
        }
      });
      column.width = maxLength + 2; // Ajustar el ancho de la columna
    }
  });

  // Generar y descargar el archivo Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ventas_Report.xlsx");
  });
};

import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs/promises';
import { SaleExport } from '@/models/sale';

export async function POST(req: NextRequest) {
  try {
    const sales: SaleExport[] = await req.json();
    const templatePath = path.join(process.cwd(), 'public', 'templates', 'sales_template.xlsx');
    const templateBuffer = await fs.readFile(templatePath);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(templateBuffer);

    const worksheetName = 'REGISTRO DE VENTAS';
    const worksheet = workbook.getWorksheet(worksheetName);

    if (!worksheet) {
      throw new Error(`No se pudo encontrar la hoja de cálculo con el nombre "${worksheetName}" en la plantilla`);
    }

    const sortedSales = sales.sort((a, b) => {
      const dateA = a.customerOrderDate ? new Date(a.customerOrderDate).getTime() : 0;
      const dateB = b.customerOrderDate ? new Date(b.customerOrderDate).getTime() : 0;
      return dateB - dateA;
    });

    const currencyColumns = [20, 21, 22, 23, 24, 25, 27, 36];

    sortedSales.forEach((sale, index) => {
      const rowNumber = index + 5;
      const row = worksheet.getRow(rowNumber);

      let currencySymbol = '';
      if (sale.currencyType === 'DOLARES' || sale.currencyType === 'USD') {
        currencySymbol = '$';
      } else if (sale.currencyType === 'SOLES' || sale.currencyType === 'PEN') {
        currencySymbol = 'S/.';
      }

      const cells = [
        { col: 2, value: sale.customerOrderDate ? new Date(sale.customerOrderDate) : '' },
        { col: 3, value: sale.customerOrder || '' },
        { col: 4, value: sale.quoteCode || '' },
        { col: 5, value: sale.companyName || '' },
        { col: 6, value: sale.line || '' },
        { col: 7, value: sale.companyRuc || '' },
        { col: 8, value: sale.deliveryTime || '' },
        { col: 9, value: sale.deliveryDate ? new Date(sale.deliveryDate) : '' },
        { col: 10, value: sale.invoiceNumber || '' },
        { 
          col: 11, 
          value: sale.currencyType === 'DOLARES' ? 'USD' :
                 sale.currencyType === 'SOLES' ? 'PEN' :
                 sale.currencyType || '' 
        },
        { col: 12, value: sale.paymentType || '' },
        { col: 14, value: sale.observation || '' },
        { col: 15, value: sale.paymentMethod || '' },
        { col: 16, value: sale.period || '' },
        { col: 18, value: sale.startDate ? new Date(sale.startDate) : '' },
        { col: 19, value: sale.dueDate ? new Date(sale.dueDate) : '' },
        { col: 20, value: sale.withoutTax || 0 },
        { col: 21, value: sale.withTax || 0 },
        { col: 22, value: sale.detraction || 0 },
        { col: 23, value: sale.netPayable || 0 },
        { col: 24, value: sale.paidAmount || 0 },
        { col: 25, value: sale.totalSalePrice || 0 },
        { col: 26, value: sale.status || '' },
        { col: 27, value: sale.outstandingAmount || 0 },
        { col: 28, value: sale.supplierOrder || '' },
        { col: 29, value: sale.advancePayment || 0 },
        { col: 30, value: sale.advanceDate ? new Date(sale.advanceDate) : '' },
        { col: 31, value: sale.balance || 0 },
        { col: 32, value: sale.balanceDate ? new Date(sale.balanceDate) : '' },
        { col: 33, value: sale.totalCost || 0 },
        { col: 34, value: sale.supplierInvoice || '' },
        { col: 35, value: sale.supplierShipment || '' },
        { col: 36, value: sale.value || 0 },
        { col: 37, value: sale.percentage || 0 }
      ];

      cells.forEach(cell => {
        const cellObj = row.getCell(cell.col);
        cellObj.value = cell.value;

        if (currencyColumns.includes(cell.col)) {
          if (currencySymbol === '$') {
            cellObj.numFmt = `"${currencySymbol}"#,##0.00`;
          } else if (currencySymbol === 'S/.') {
            cellObj.numFmt = `"${currencySymbol}"#,##0.00`;
          } else {
            cellObj.numFmt = '#,##0.00';
          }
        }

        cellObj.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

      const statusCell = row.getCell(26);
      switch (sale.status) {
        case 'POR CANCELAR':
        case 'CANCELADO':
          statusCell.font = { color: { argb: '000746' }, bold: true };
          break;
        case 'ANULADO':
          statusCell.font = { color: { argb: 'FF0000' }, bold: true };
          break;
      }

      row.commit();
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=Reporte_de_Ventas.xlsx'
      }
    });
  } catch (error) {
    console.error("Error en exportToExcel:", error);
    return NextResponse.json({ message: "No se pudo generar el archivo Excel" }, { status: 500 });
  }
}

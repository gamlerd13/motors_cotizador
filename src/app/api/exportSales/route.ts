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



      const cells = [
        { col: 2, value: sale.customerOrderDate ? new Date(sale.customerOrderDate) : '' },
        { col: 3, value: sale.customerOrder || '' },
        { col: 4, value: sale.quoteCode || '' },
        { col: 5, value: sale.companyName || '' },
        { col: 6, value: sale.line || '' },
        { col: 7, value: sale.companyRuc || '' },
        { col: 8, value: sale.deliveryTime || '' },
        { col: 9, value: sale.deliveryDate ? new Date(sale.deliveryDate) : '' },
        { col: 36, value: sale.value || 0 },
        { col: 37, value: sale.percentage || 0 }
      ];

      cells.forEach(cell => {
        const cellObj = row.getCell(cell.col);
        cellObj.value = cell.value;

        if (currencyColumns.includes(cell.col)) {
          cellObj.numFmt = '#,##0.00';
        }

        cellObj.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

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

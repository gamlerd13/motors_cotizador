"use client";
import React, { useEffect } from "react";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SalesStatusLabel, SaleWithRelations } from "@/models/sale";
import { differenceInDays } from "date-fns";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  Button,
  useDisclosure,
  Switch,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ModalConfirmation } from "@/components/modal/ModalConfirmation";
import { generateExcel } from "@/app/hooks/sales/useExportExcel";

interface SaleTableProps {
  isLoading: boolean;
  sales?: SaleWithRelations[];
  setSeeAll: React.Dispatch<React.SetStateAction<boolean>>;
  seeAll: boolean;
  fetchSales: (seeAll: boolean) => void;
}

function SaleTable({
  isLoading,
  sales = [],
  seeAll,
  setSeeAll,
  fetchSales,
}: SaleTableProps) {
  const router = useRouter();
  const [saleSelectedId, setSaleSelectedId] = useState<number | null>(null);
  const {
    isOpen: isOpenEnd,
    onOpen: onOpenEnd,
    onOpenChange: onOpenChangeEnd,
  } = useDisclosure();

  const [isExporting, setIsExporting] = useState(false);

  // const handleExportToExcel = async () => {
  //   setIsExporting(true);
  //   try {
  //     const response = await axios.post("/api/exportSales", sales, {
  //       responseType: "blob",
  //     });

  //     if (response.status !== 200) {
  //       throw new Error("Failed to generate Excel file");
  //     }

  //     const blob = new Blob([response.data], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "Reporte_de_Ventas.xlsx";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);

  //     toast.success("Reporte de ventas exportado exitosamente");
  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //     toast.error("Error al exportar el reporte de ventas");
  //   } finally {
  //     setIsExporting(false);
  //   }
  // };
  const handleExportToExcel = () => {
    generateExcel(sales);
  };
  const handleOpenModal = (saleId: number) => {
    setSaleSelectedId(saleId);
    onOpenEnd();
  };
  const handleSaleFinish = async () => {
    try {
      if (saleSelectedId) {
        const response = await axios.put(
          `/api/sale/${saleSelectedId}/completed`
        );
        console.log(response);
        if (response.status == 200) {
          fetchSales(seeAll);
          toast.success("Se finalizó la venta");
        } else {
          toast.error("Hubo un error al finalizar la venta");
        }
      }
    } catch (e) {
      toast.error("Hubo un error al finalizar la venta");
    }
  };

  if (!sales) return null;

  return (
    <>
      <ModalConfirmation
        title="Finalizar venta"
        isOpen={isOpenEnd}
        onOpenChange={onOpenChangeEnd}
        content="Esta seguro de Finalizar la venta ?"
        onClick={() => handleSaleFinish()}
      />
      <div className="flex justify-end p-2 gap-x-2">
        <div className="flex items-center">
          <Switch
            size="sm"
            color="default"
            checked={seeAll}
            onChange={() => setSeeAll((prev) => !prev)}
          >
            Ver todos
          </Switch>
        </div>
        <Button
          size="sm"
          type="button"
          onClick={() => handleExportToExcel()}
          disabled={isExporting || sales.length === 0}
        >
          {isExporting ? "Exportando..." : "Reporte de Ventas"}
        </Button>
      </div>

      <Table
        aria-label="Tabla de cotizaciones"
        className="max-h-[520px] overflow-scroll"
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Código Cotización</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Días a Vencer</TableColumn>
          <TableColumn>Utilidad</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={sales}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.cotizacion.code}</TableCell>
              <TableCell>
                {sale.cotizacion.client?.name || "Sin cliente"}
              </TableCell>

              <TableCell>
                {sale.clientInvoiceDueDate &&
                  differenceInDays(
                    new Date(sale.clientInvoiceDueDate),
                    new Date()
                  )}
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span>Soles&nbsp; (S/.) {sale.valueUsd?.toFixed(2)} </span>
                  <span>Dolares($.) {sale.valuePen?.toFixed(2)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  radius="sm"
                  size="sm"
                  color={SalesStatusLabel[sale.status].color}
                >
                  {SalesStatusLabel[sale.status].label}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      router.push(`/sales/edit/${sale.cotizacionId}`)
                    }
                  >
                    <span className="flex items-center justify-center  text-red-950">
                      <FaEdit />
                    </span>
                    Editar
                  </Button>
                  <Button size="sm" onClick={() => handleOpenModal(sale.id)}>
                    Finalizar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default SaleTable;

"use client";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SalesStatusLabel, SaleWithRelations } from "@/models/sale";
import { differenceInDays } from "date-fns";
import { SaleStatusV2 } from "@prisma/client";

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

  const handleExportToExcel = () => {
    generateExcel(sales);
  };
  const handleOpenModal = (saleId: number) => {
    setSaleSelectedId(saleId);
    onOpenEnd();
  };
  const handleChangeStatus = async (status: SaleStatusV2) => {
    try {
      if (saleSelectedId) {
        const response = await axios.put(
          `/api/sale/${saleSelectedId}/status`,
          JSON.stringify(status)
        );
        console.log(response);
        if (response.status == 200) {
          fetchSales(seeAll);
          toast.success("Estado de venta cambiado");
        } else {
          toast.error("Hubo un error al cambiar el estado de venta");
        }
      }
    } catch (e) {
      toast.error("Hubo un error al finalizar la venta");
    }
  };

  const daysRemainingColor = (dueDate: Date | undefined | null) => {
    if (dueDate) {
      const days = differenceInDays(new Date(dueDate), new Date());
      return days <= 0 ? "danger" : "success";
    }
    return "default";
  };

  const SaleStatus = () => {
    return (
      <div className="flex justify-around">
        <Button
          onClick={() => {
            handleChangeStatus(SaleStatusV2.UPDATED);
            onOpenChangeEnd();
          }}
          color="primary"
          size="sm"
        >
          Actualizar
        </Button>
        <Button
          onClick={() => {
            handleChangeStatus(SaleStatusV2.FINISHED);
            onOpenChangeEnd();
          }}
          size="sm"
          color="success"
        >
          Finalizar
        </Button>
      </div>
    );
  };

  if (!sales) return null;

  return (
    <>
      <ModalConfirmation
        title="Cambiar Estado de venta"
        isOpen={isOpenEnd}
        onOpenChange={onOpenChangeEnd}
        contentComponent={<SaleStatus />}
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
                <Chip
                  className="min-w-[60px] text-center"
                  radius="sm"
                  color={daysRemainingColor(sale.clientInvoiceDueDate)}
                >
                  {sale.clientInvoiceDueDate
                    ? differenceInDays(
                        new Date(sale.clientInvoiceDueDate),
                        new Date()
                      )
                    : "---"}
                </Chip>
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
                    {sale.status == SaleStatusV2.FINISHED ? (
                      "Ver venta"
                    ) : (
                      <>
                        <span className="flex items-center justify-center  text-red-950">
                          <FaEdit />
                        </span>
                        Editar
                      </>
                    )}
                  </Button>
                  <Button size="sm" onClick={() => handleOpenModal(sale.id)}>
                    Cambiar estado
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

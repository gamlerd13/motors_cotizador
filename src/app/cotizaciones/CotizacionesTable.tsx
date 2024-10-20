"use client";

import { getDateHour } from "@/lib/main";
import { CotizacionGet, statusColors, statusLabels } from "@/models/cotizacion";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { CotizacionStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SaleExport } from "@/models/sale";
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
} from "@nextui-org/react";
import { useState } from "react";
import { CotizacionEnd } from "./types/main";
import ModalEndCotizacion from "./modal/ModalEndQuotation";
import ModalJoinCotizacion from "./modal/ModalJoinCotizacion";
import ModalDownloadCotizacionByDate from "./modal/ModalDownloadCotizacionByDate";
import { toast } from "sonner";
import axios from "axios";

interface CotizacionesTableProps {
  cotizacionList: CotizacionGet[] | null;
  isLoading: boolean;
  updateCotizacion: (
    cotizacionId: number,
    typeEnding: CotizacionStatus
  ) => void;
  createSale: (cotizacionId: number) => void;
  editSale: (cotizacionId: number) => void;
  sales?: SaleExport[];
}

function CotizacionesTable({
  cotizacionList,
  isLoading,
  updateCotizacion,
  createSale,
  editSale,
  sales = [],
}: CotizacionesTableProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenJoinCotizacion,
    onOpen: onOpenJoinCotizacion,
    onClose: onCloseJoinCotizacion,
    onOpenChange: onOpenChangeJoinCotizacion,
  } = useDisclosure();
  const {
    isOpen: isOpenDownload,
    onOpen: onOpenDownload,
    onClose: onCloseDownload,
    onOpenChange: onOpenChangeDownload,
  } = useDisclosure();

  const [isExporting, setIsExporting] = useState(false);
  const [cotizacionEnd, setCotizacionIdEnd] = useState<CotizacionEnd | null>(
    null
  );
  const [cotizacionSelected, setCotizacionSelected] =
    useState<CotizacionGet | null>(null);

  const handleOpenFinalizarModal = (cotizacion: CotizacionEnd) => {
    setCotizacionIdEnd(cotizacion);
    onOpen();
  };

  const handleOpenJoinCotizacionModal = (cotizacion: CotizacionGet) => {
    setCotizacionSelected(cotizacion);
    onOpenJoinCotizacion();
  };

  const handleFinalizarCotizacion = (typeEnding: CotizacionStatus) => {
    if (cotizacionEnd) {
      updateCotizacion(cotizacionEnd.id, typeEnding);
    }
    onClose();
  };

  const handleOpenCotizarForm = (idCotizacion: number) => {
    router.push(`cotizar/edit/${idCotizacion}`);
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const response = await axios.post("/api/exportSales", sales, {
        responseType: "blob",
      });

      if (response.status !== 200) {
        throw new Error("Failed to generate Excel file");
      }

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Reporte_de_Ventas.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Reporte de ventas exportado exitosamente");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Error al exportar el reporte de ventas");
    } finally {
      setIsExporting(false);
    }
  };

  if (!cotizacionList) return null;

  return (
    <>
      <ModalEndCotizacion
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        cotizacionEnd={cotizacionEnd}
        handleFinalizarCotizacion={handleFinalizarCotizacion}
      />
      <ModalJoinCotizacion
        isOpen={isOpenJoinCotizacion}
        onOpenChange={onOpenChangeJoinCotizacion}
        cotizacionSelected={cotizacionSelected}
      />
      <ModalDownloadCotizacionByDate
        isOpen={isOpenDownload}
        onOpenChange={onOpenChangeDownload}
      />

      <div className="flex justify-end p-2 gap-x-2">
        {/* <Button
          size="sm"
          type="button"
          onClick={handleExportToExcel}
          disabled={isExporting || sales.length === 0}
        >
          {isExporting ? "Exportando..." : "Reporte de Ventas"}
        </Button> */}
        <Button size="sm" type="button" onClick={onOpenDownload}>
          Descargar por fecha
        </Button>
      </div>

      <Table
        aria-label="Tabla de cotizaciones"
        className="max-h-[520px] overflow-scroll"
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Precio Total</TableColumn>
          <TableColumn>Acciones Cotización</TableColumn>
          <TableColumn>Venta</TableColumn>
          <TableColumn>Acciones Venta</TableColumn>
        </TableHeader>
        <TableBody
          items={cotizacionList}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(cotizacion) => (
            <TableRow key={cotizacion.id}>
              <TableCell>{cotizacion.code}</TableCell>
              <TableCell>{cotizacion.client?.name || "Sin cliente"}</TableCell>
              <TableCell>
                <div>{getDateHour(cotizacion.date)[0]}</div>
                <div>{getDateHour(cotizacion.date)[1]}</div>
              </TableCell>
              <TableCell>
                <Chip size="sm" color={statusColors[cotizacion.status]}>
                  {statusLabels[cotizacion.status]}
                </Chip>
              </TableCell>
              <TableCell>
                {cotizacion.currencyType === "SOLES" ? "S/." : "$"}{" "}
                {cotizacion.totalPrice}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <span
                    onClick={() => handleOpenJoinCotizacionModal(cotizacion)}
                    className="flex items-center justify-center text-2xl w-8 text-red-950 cursor-pointer rounded-full"
                  >
                    <FaFilePdf />
                  </span>
                  <span
                    onClick={() => handleOpenCotizarForm(cotizacion.id)}
                    className="flex items-center justify-center text-2xl w-8 text-red-950 cursor-pointer rounded-full"
                  >
                    <FaEdit />
                  </span>
                  <Button
                    size="sm"
                    type="button"
                    onPress={() =>
                      handleOpenFinalizarModal({
                        id: cotizacion.id,
                        name: cotizacion.client?.name || "Sin cliente",
                        code: cotizacion.code,
                        status: cotizacion.status,
                      })
                    }
                  >
                    Cambiar Estado
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {cotizacion.saleStatus === "CREATED" && (
                  <span className="text-green-600">Creada</span>
                )}
                {cotizacion.saleStatus === "TO_CREATE" && (
                  <span className="text-yellow-600">Por crear</span>
                )}
                {cotizacion.saleStatus === "NONE" && (
                  <span className="text-red-600">Ninguna</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {cotizacion.saleStatus === "TO_CREATE" && (
                    <Button
                      size="sm"
                      type="button"
                      onPress={() => createSale(cotizacion.id)}
                    >
                      Crear Venta
                    </Button>
                  )}
                  {cotizacion.saleStatus === "CREATED" && (
                    <Button
                      size="sm"
                      type="button"
                      onPress={() => editSale(cotizacion.id)}
                    >
                      Detalles Venta
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default CotizacionesTable;

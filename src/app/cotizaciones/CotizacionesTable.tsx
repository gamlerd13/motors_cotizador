import { getDateHour } from "@/lib/main";
import { CotizacionGet, statusColors, statusLabels } from "@/models/cotizacion";
import { FaFilePdf } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { CotizacionStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Chip,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import ReactPdfComponent from "@/components/cotizacion/React-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CotizacionEnd } from "./types/main";
import ModalEndCotizacion from "./modal/ModalEndQuotation";
import ModalJoinCotizacion from "./modal/ModalJoinCotizacion";
import { BiEdit } from "react-icons/bi";

interface CotizacionesTable {
  cotizacionList: CotizacionGet[] | null;
  isLoading: boolean;
  updateCotizacion: (
    cotizacionId: number,
    typeEnding: CotizacionStatus
  ) => void;
}

function CotizacionesTable({
  cotizacionList,
  isLoading,
  updateCotizacion,
}: CotizacionesTable) {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenJoinCotizacion,
    onOpen: onOpenJoinCotizacion,
    onClose: onCloseJoinCotizacion,
    onOpenChange: onOpenChangeJoinCotizacion,
  } = useDisclosure();

  const [cotizacionEnd, setCotizacionIdEnd] = useState<CotizacionEnd | null>(
    null
  );
  const [cotizacionSelected, setCotizacionSelected] =
    useState<CotizacionGet | null>(null);

  if (!cotizacionList) return true;

  // Handle modal
  const handleOpenFinalizarModal = (cotizacion: CotizacionEnd) => {
    setCotizacionIdEnd(cotizacion);
    onOpen();
  };
  const handleOpenJoinCotizacionModal = (cotizacion: CotizacionGet) => {
    //Manejar
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

      <Table
        aria-label="Example table with dynamic content"
        className=""
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[200px]",
        }}
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Precio Total</TableColumn>
          <TableColumn>Acciones</TableColumn>
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
              <TableCell>S/. {cotizacion.totalPrice}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  {/* <span className="flex items-center justify-center text-2xl w-8  text-red-950 cursor-pointer rounded-full">
                    <PDFDownloadLink
                      document={<ReactPdfComponent cotizacion={cotizacion} />}
                      fileName={`cotizacion-${cotizacion.code}.pdf`}
                    >
                      <FaFilePdf />
                    </PDFDownloadLink>
                  </span> */}
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
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default CotizacionesTable;

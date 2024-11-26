"use client";
import React from "react";

import {
  ChangeEvent,
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
  CardBody,
  Card,
  Badge,
  Spinner,
} from "@nextui-org/react";

import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { FaFilePdf } from "react-icons/fa6";
import { CotizacionGet } from "@/models/cotizacion";
import ReactPdfComponent from "@/components/cotizacion/React-pdf";
import ReactPDF, { pdf } from "@react-pdf/renderer";
import { FileObject } from "../types/main";
import DragAndDrop from "./DragAndDrop";
import { toast } from "sonner";

interface ModalJoinCotizacionProps {
  isOpen: boolean;
  onOpenChange: () => void;
  cotizacionSelected: CotizacionGet | null;
}

export default function ModalJoinCotizacion({
  isOpen,
  onOpenChange,
  cotizacionSelected,
}: ModalJoinCotizacionProps) {
  const [buildingPdf, setBuildingPdf] = useState(true);
  const [pdfFiles, setPdfFiles] = useState<FileObject[]>([
    { id: 0, file: null },
  ]);

  useEffect(() => {
    const cotizacionPDF = async () => {
      if (cotizacionSelected) {
        const blob = await pdf(
          <ReactPdfComponent cotizacion={cotizacionSelected} />
        ).toBlob(); // Convertir el PDF a Blob

        const pdfFile = new File(
          [blob],
          `cotizacion-${cotizacionSelected.code}.pdf`,
          {
            type: "application/pdf",
          }
        );

        setPdfFiles([{ id: 0, file: pdfFile }]);
        setBuildingPdf(false);
      }
    };
    cotizacionPDF();
  }, [cotizacionSelected]);

  const removePdfFile = (id: number) => {
    if (id === 0) {
      return toast.error("No se puede eliminar pdf cotización principal");
    }
    setPdfFiles((previousValue) => [
      ...previousValue.filter((file) => file.id !== id),
    ]);
  };

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    // const pdfFiles = files.filter((file) => file.type === "application/pdf");

    // if (pdfFiles.length !== files.length) {
    //   toast.error("Solo pdf estan permitido");
    //   return;
    // }

    setPdfFiles((prevValue) => [
      ...prevValue,
      ...files.map((file, index) => ({
        id: prevValue.length + index,
        file: file,
      })),
    ]);

    // setPdfFiles((prevValue) => [
    //   ...prevValue,
    //   ...pdfFiles.map((file, index) => ({
    //     id: prevValue.length + index,
    //     file: file,
    //   })),
    // ]);
  };

  const joinPdfs = async () => {
    //This aproach force adding at least 1 pdf more, but now it's not nessesary
    // if (pdfFiles.length < 2) {
    //   toast.error("Seleccione al menos 1 elemento para unir");
    //   return;
    // }

    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      if (pdfFile.file) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    saveAs(blob, `cotizacion-${cotizacionSelected?.code}.pdf`);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="">Descargar o unir Cotización con PDF extras</div>
            </ModalHeader>
            <ModalBody>
              <div className="">
                <h1 className="font-medium py-2 ">
                  Seleccione pdf si desea unir
                </h1>

                <div>
                  <input
                    type="file"
                    className="block w-full
                    text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-default
                    hover:file:bg-gray-400"
                    name="extra_doc"
                    id="extra_doc"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => handleInputFileChange(e)}
                  />
                </div>
              </div>
              <div className="">
                <h1 className="font-medium py-2 ">Pdfs</h1>
                {!buildingPdf ? (
                  <DragAndDrop
                    pdfFiles={pdfFiles}
                    setPdfFiles={setPdfFiles}
                    removePdfFile={removePdfFile}
                  />
                ) : (
                  <Spinner color="default" />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="success"
                onPress={() => {
                  joinPdfs();
                  onClose();
                }}
              >
                Descargar pdf
              </Button>
              <Button size="sm" color="default" onPress={onClose}>
                cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

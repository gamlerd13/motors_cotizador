import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { RangeDate } from "@/models/cotizacion";
import { useDownloadCotizacionesByDate } from "@/app/hooks/cotizacion/useDownloadCotizacionesByDate";

interface ModalDownloadCotizacionByDateProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function ModalDownloadCotizacionByDate({
  isOpen,
  onOpenChange,
}: ModalDownloadCotizacionByDateProps) {
  const { downloadPdfByDate } = useDownloadCotizacionesByDate();
  const [rangeDate, setRangeDate] = useState<RangeDate | null>(null);
  const handleDownload = (onClose: () => void) => {
    if (rangeDate) downloadPdfByDate(rangeDate);
    onClose();
  };

  const handleRange = (e: RangeValue<DateValue>) => {
    const { start, end } = e;

    setRangeDate({
      dateStart: new Date(start.toString()),
      dateEnd: new Date(end.toString()),
    });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="">Descargar cotización por fechas</div>
            </ModalHeader>
            <ModalBody>
              <div>Seleccione un rango de fecha</div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <I18nProvider locale="es">
                  <DateRangePicker
                    label="Rango de fecha"
                    visibleMonths={2}
                    onChange={(e) => handleRange(e)}
                  />
                </I18nProvider>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="success"
                onPress={() => handleDownload(onClose)}
              >
                Descargar pdfs
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

export default ModalDownloadCotizacionByDate;

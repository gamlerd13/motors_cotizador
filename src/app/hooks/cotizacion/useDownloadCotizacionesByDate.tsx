import { CotizacionGet, RangeDate } from "@/models/cotizacion";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import ReactPdfComponent from "@/components/cotizacion/React-pdf";

export const useDownloadCotizacionesByDate = () => {
  // const [cotizacion, setCotizacion] = useState<CotizacionGet[]>([]);

  const getCotizacion = async (rangeDate: RangeDate) => {
    try {
      const { data, status } = await axios.get(
        "/api/cotizacion/cotizacionesbydate/",
        { params: rangeDate }
      );

      if (status === 200) {
        // setCotizacion(data);
        return data;
      }
      return undefined;
    } catch (error) {
      toast.error("Hubo un error al generar las cotizaciones");
    }
  };

  const downloadPdfByDate = async (rangeDate: RangeDate) => {
    const data: CotizacionGet[] = await getCotizacion(rangeDate);

    if (data == undefined) {
      console.log("SE ENCONTRARON ESTAS COTIZACIONES EN ESTAS FECHAS, ", data);
    }

    //Aqui descargar todo
    data.forEach(async (element) => {
      const blob = await pdf(
        <ReactPdfComponent cotizacion={element} />
      ).toBlob(); // Convertir el PDF a Blob

      const pdfFile = new File([blob], `cotizacion-${element.code}.pdf`, {
        type: "application/pdf",
      });

      saveAs(blob, `cotizacion-${element?.code}.pdf`);
    });
  };

  return {
    getCotizacion,
    downloadPdfByDate,
  };
};

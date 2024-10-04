"use client";
import { CotizacionGet, statusLabels } from "@/models/cotizacion";
import axios from "axios";
import { useEffect, useState } from "react";
import { CotizacionStatus } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePostCotizacion = () => {
  const router = useRouter();
  const [responseNewCotizacion, setResponseNewCotizacion] = useState<
    string | null
  >(null);
  const addNewCotizacion = async (formDataNewCotizacion: FormData) => {
    try {
      const formDataEntries = Object.fromEntries(
        formDataNewCotizacion.entries()
      );
      const response = await axios.post(
        "api/cotizacion/",
        formDataEntries,
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "Surrogate-Control": "no-store",
          },
        }

        // JSON.stringify(formDataEntries)
      );
      if (response.status == 201) {
        toast.success("Se creó una cotizacion exitosamente");
        setResponseNewCotizacion(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error en useClient, getClient");
    }
  };

  return {
    responseNewCotizacion,
    addNewCotizacion,
  };
};

export const usePutCotizacion = () => {
  const router = useRouter();
  const [responseNewCotizacion, setResponseNewCotizacion] = useState<
    string | null
  >(null);
  const updateCotizacion = async (
    idCotizacion: number,
    formDataNewCotizacion: FormData
  ) => {
    try {
      const formDataEntries = Object.fromEntries(
        formDataNewCotizacion.entries()
      );
      const response = await axios.put(
        `/api/cotizacion/update-code/${idCotizacion}`,
        formDataEntries
        // JSON.stringify(formDataEntries)
      );
      if (response.status == 201) {
        toast.success("Se actualizó una cotizacion exitosamente");
        setResponseNewCotizacion(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error en useClient, getClient");
    }
  };

  return {
    responseNewCotizacion,
    updateCotizacion,
  };
};

export const useGetUpdateCotizacion = () => {
  const [cotizacionList, setCotizacionList] = useState<CotizacionGet[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async () => {
    try {
      const response = await axios.get("api/cotizacion");

      if (response.status == 200) {
        setCotizacionList(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCotizacion = async (cotizacionId: number, typeEnding: CotizacionStatus) => {
    try {
      const response = await axios.put(`/api/cotizacion/update-status/${cotizacionId}`, JSON.stringify(typeEnding));
  
      if (response.status === 201) {
        toast.success(`Se actualizó el estado de la cotización a ${statusLabels[typeEnding]}`);
        getCotizaciones();
      } else if (response.status === 400) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Hubo un error en updateCotizacion", error);
      toast.error("No puedes cambiar el estado de la cotización porque la venta ya está creada. Considera eliminar la venta para continuar.");
    }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);

  return {
    cotizacionList,
    isLoading,
    updateCotizacion,
  };
};

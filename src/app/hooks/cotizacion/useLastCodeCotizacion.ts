"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useLastCodeCotizacion = (idCotizacion: number) => {
  const [lastCodeCotizacion, setLastCodeCotizacion] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async () => {
    try {
      const response = await axios.get(
        `/api/lastCodeCotizacion/${idCotizacion}`
      );

      if (response.status == 200) {
        console.log(response.data);
        setLastCodeCotizacion(response.data);
      }
    } catch (error) {
      console.error("Hubo un error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);

  return { lastCodeCotizacion, isLoading };
};

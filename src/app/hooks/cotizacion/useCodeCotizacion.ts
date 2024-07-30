"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface CodeCotizacion {
  id: number;
  nextCode: string;
}

export const useCodeCotizacion = () => {
  const [lastCodeCotizacion, setLastCodeCotizacion] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCotizaciones = async () => {
    try {
      const response = await axios.get("api/codeCotizacion");

      if (response.status == 200) {
        console.log(response.data);
        setLastCodeCotizacion(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useGetUpdateCotizacion, getCotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCotizaciones();
  }, []);

  return { lastCodeCotizacion, isLoading };
};

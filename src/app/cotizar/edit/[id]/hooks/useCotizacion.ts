import axios from "axios";
import { useEffect, useState } from "react";

export const useCotizacion = (idCotizacion: string) => {
  const [cotizacion, setCotizacion] = useState(null);

  useEffect(() => {
    const fetchCotizacion = async () => {
      try {
        const res = await axios.get(`/api/cotizacion/${idCotizacion}`);

        if (res.status === 200) {
          setCotizacion(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCotizacion();
  }, []);

  return {
    cotizacion,
  };
};

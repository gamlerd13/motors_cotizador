import { Cotizacion, ProductItemPost } from "@/models/cotizacion";
import axios from "axios";
import { useState } from "react";

export const usePostCotizacion = () => {
  const [responseNewCotizacion, setResponseNewCotizacion] = useState<
    string | null
  >(null);
  const addNewCotizacion = async (formDataNewCotizacion: FormData) => {
    try {
      console.log("esto es el usepsotCotizacion: ", formDataNewCotizacion);
      const formDataEntries = Object.fromEntries(
        formDataNewCotizacion.entries()
      );
      const response = await axios.post(
        "api/cotizacion/",
        formDataEntries
        // JSON.stringify(formDataEntries)
      );
      console.log("respueste de la api: ", response);
      if (response.status == 201) {
        setResponseNewCotizacion(response.data);
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

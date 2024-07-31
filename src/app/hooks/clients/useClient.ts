import { Client } from "@/models/client";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetClientList = () => {
  const [clientList, setClientList] = useState<Client[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getClients = async () => {
    try {
      const response = await axios.get("/api/client");

      if (response.status == 200) {
        console.log(
          "Cotizacion en resnpose use cliente, get client",
          response.data
        );
        setClientList(response.data);
      }
    } catch (error) {
      console.error("Hubo un error en useClient, getClient");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return {
    clientList,
    isLoading
  };
};

// export const usePostClient = async (formDataNewClient) => {
//   const [responseNewClient, setResponseNewClient] = useState<string | null>(
//     null
//   );
//   const addNew
//   try {
//     const response = await axios.post("api/client", formDataNewClient);

//     if (response.status == 201) {
//       setResponseNewClient(response.data);
//     }
//   } catch (error) {
//     console.error("Hubo un error en useClient, getClient");
//   }
//   return {
//     responseNewClient,
//   };
// };

"use client";

import { useAppContext } from "@/context";
import { Client } from "@/models/client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const useGetClientList = () => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClients = async () => {
    try {
      const response = await axios.get("/api/client");

      if (response.status == 200) {
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
    isLoading,
  };
};

// TODO:create toast aviso create new client
// validar all data equal

export const usePostClient = () => {
  const [responseNewClient, setResponseNewClient] = useState<string | null>(
    null
  );

  const { clients = [], setClients } = useAppContext();

  const addNewClient = async (
    formDataNewClient: FormData,
    setIsActiveCreateClient: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const formDataEntries = Object.fromEntries(formDataNewClient.entries());

    const newClient: Omit<Client, "id"> = {
      name: formDataEntries.clientName as string,
      contact: formDataEntries.clientContact as string,
      ruc: formDataEntries.clientRuc as string,
      reference: formDataEntries.clientReference as string,
    };

    try {
      const response = await axios.post("api/client", formDataEntries);

      if (response.status == 201) {
        setResponseNewClient(response.data);
        setIsActiveCreateClient(false);
        toast.success("Cliente Agregado Satisfactoriamente");

        setClients([...clients, response.data]);
        console.log(response.data, "response.data");
      }
    } catch (error) {
      console.error("Hubo un error en useClient, post client", error);
    }
  };

  return {
    responseNewClient,
    addNewClient,
  };
};

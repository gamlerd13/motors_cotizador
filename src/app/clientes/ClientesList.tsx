"use client";

import { useEffect } from "react";
import { useGetClientList } from "../hooks/clients/useClient";
import ClientesTable from "./ClientesTable";
import { useAppContext } from "@/context";


export default function ClientesList() {
  const { clientList, isLoading } = useGetClientList();


  const { clients = [], setClients } = useAppContext()

  useEffect(() => {
    setClients(clientList)
    console.log(clients)
  }, [clientList])

  return (
    <div>
      <ClientesTable
        clientList={clients}
        isLoading={isLoading}
      />
    </div>
  );
}

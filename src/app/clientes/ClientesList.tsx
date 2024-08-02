"use client";

import React, { SetStateAction, useEffect } from "react";
import { useGetClientList } from "../hooks/clients/useClient";
import ClientesTable from "./ClientesTable";
import { useAppContext } from "@/context";


interface ClientesListProps {
  isActiveCreateClient: boolean,
  setIsActiveCreateClient: React.Dispatch<SetStateAction<boolean>>
}


export default function ClientesList({ isActiveCreateClient, setIsActiveCreateClient }: ClientesListProps) {
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
        isActiveCreateClient={isActiveCreateClient}
        setIsActiveCreateClient={setIsActiveCreateClient}
      />
    </div>
  );
}

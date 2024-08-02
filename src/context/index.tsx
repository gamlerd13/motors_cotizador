import { Client, ClientForm } from "@/models/client";
import React, { Children, createContext, SetStateAction, useContext, useState } from "react";

interface Context {
  clients: Client[],
  setClients: React.Dispatch<SetStateAction<Client[]>>,
  clientValue: ClientForm,
  setClientValue: React.Dispatch<SetStateAction<ClientForm>>,
  isEdit: boolean,
  setIsEdit: React.Dispatch<SetStateAction<boolean>>
}



const AppContext = createContext<Context | undefined>(undefined);

export function AppWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [clients, setClients] = useState<Client[]>([])
  const [clientValue, setClientValue] = useState<ClientForm>({
    clientName: '',
    clientContact: '',
    clientRuc: '',
    clientReference: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <AppContext.Provider value={{ clients, setClients, clientValue, setClientValue, isEdit, setIsEdit }} >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}

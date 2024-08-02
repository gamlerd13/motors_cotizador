import { Client } from "@/models/client";
import React, { Children, createContext, SetStateAction, useContext, useState } from "react";

interface Context {
  clients: Client[],
  setClients: React.Dispatch<SetStateAction<Client[]>>
}

const AppContext = createContext<Context | undefined>(undefined);

export function AppWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [clients, setClients] = useState<Client[]>([])
  return (
    <AppContext.Provider value={{ clients, setClients }} >
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

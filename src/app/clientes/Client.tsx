"use client"

import TitlePage from "@/components/TitlePage";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Button } from "@nextui-org/react";
import ClientesList from "./ClientesList";
import ClienteForm from "./formCliente/ClienteForm";
import { AppWrapper } from "@/context";

function Client() {
  const [isActiveCreateClient, setIsActiveCreateClient] = useState(false);

  return (
    <AppWrapper>
      <div className="w-full flex justify-center items-center">
        <div className="px-4 pt-4 sm:w-9/12 w-full">
          <div className="flex justify-between items-center">
            <TitlePage title={isActiveCreateClient ? "Cliente" : "Clientes"} />

            <Button size="sm" onClick={() => setIsActiveCreateClient(!isActiveCreateClient)} >
              Agregar
              {
                isActiveCreateClient
                  ? <CiCircleMinus className="text-xl" />
                  : <CiCirclePlus className="text-xl" />
              }
            </Button>

          </div>
          <hr className="border-1 mb-4" />

          {
            isActiveCreateClient && (
              <ClienteForm
                setIsActiveCreateClient={setIsActiveCreateClient}
              />
            )
          }

          {/* <LandingHome /> */}
          <ClientesList
          />
        </div>

      </div>
    </AppWrapper>

  );
}

export default Client;

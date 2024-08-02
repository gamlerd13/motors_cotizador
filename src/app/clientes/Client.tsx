"use client"

import TitlePage from "@/components/TitlePage";
import { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Button } from "@nextui-org/react";
import ClientesList from "./ClientesList";
import ClienteForm from "./formCliente/ClienteForm";
import { useAppContext } from "@/context";

function Client() {
  const { isActiveCreateClient, setIsActiveCreateClient, setIsEdit } = useAppContext();


  useEffect(() => {
    if (!isActiveCreateClient) {
      setIsEdit(false);
    }
  }, [isActiveCreateClient])


  return (
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
              isActiveCreateClient={isActiveCreateClient}
              setIsActiveCreateClient={setIsActiveCreateClient}
            />
          )
        }

        {/* <LandingHome /> */}
        <ClientesList
          isActiveCreateClient={isActiveCreateClient}
          setIsActiveCreateClient={setIsActiveCreateClient}
        />
      </div>

    </div>

  );
}

export default Client;

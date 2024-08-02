"use client"

import { usePostClient } from "@/app/hooks/clients/useClient";
import ButtonSubmit from "@/components/Button";
import { Client } from "@/models/client";
import { Input } from "@nextui-org/input";
import React, { Dispatch, useRef, useState } from "react";

interface ClientForm {
  clientName: string;
  clientContact: string;
  clientRuc: string;
  clientReference: string;
}

interface ClienteFormProps {
  setIsActiveCreateClient: Dispatch<React.SetStateAction<boolean>>,
}

function ClienteForm({ setIsActiveCreateClient }: ClienteFormProps) {
  const [clientValue, setClientValue] = useState<ClientForm | null>(null);
  // TODO: add animation desplazamiento

  const { addNewClient } = usePostClient()

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Convertir FormData a un array de pares clave-valor
    const formDataEntries = Array.from(formData.entries());

    // Verificar si todos los campos están vacíos
    const allFieldsEmpty = formDataEntries.every(([key, value]) => (value as string).trim() === ''); if (allFieldsEmpty) {
      // Activar el useRef si todos los campos están vacíos
      if (inputRef.current) {
        inputRef.current.focus();
      }
      console.log("Todos los campos están vacíos");
      return; // Salir de la función para evitar enviar el formulario
    }


    try {
      await addNewClient(formData, setIsActiveCreateClient);
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <form className="mb-8 grid gap-2"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-2">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="clientName"
          value={clientValue?.clientName}
          label="Razón Social"
          ref={inputRef}
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="clientContact"
          value={clientValue?.clientContact}
          label="Contacto"
        />
      </div>

      <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
        <Input
          size="sm"
          className="md:col-span-1 "
          type="text"
          name="clientReference"
          value={clientValue?.clientReference}
          label="Referencia"
        />

        <Input
          size="sm"
          className="md:col-span-1 "
          type="text"
          name="clientRuc"
          value={clientValue?.clientRuc}
          label="Ruc"
        />
      </div>

      <ButtonSubmit text="Agregar Cliente" />
    </form>
  );
}

export default ClienteForm;

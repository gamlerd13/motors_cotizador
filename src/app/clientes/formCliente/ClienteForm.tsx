"use client";
import { usePostClient } from "@/app/hooks/clients/useClient";
import ButtonSubmit from "@/components/Button";
import { useAppContext } from "@/context";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import React, { SetStateAction, useRef, useEffect } from "react";
import { toast } from "sonner";

interface ClientFormProps {
  isActiveCreateClient: boolean;
  setIsActiveCreateClient: React.Dispatch<SetStateAction<boolean>>;
}

function ClienteForm({
  isActiveCreateClient,
  setIsActiveCreateClient,
}: ClientFormProps) {
  // TODO: add animation desplazamiento

  const {
    clientValue,
    setClientValue,
    isEdit,
    setClients,
    clients,
    setIsEdit,
  } = useAppContext();

  const { addNewClient } = usePostClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      const clientToEdit = clients.find(
        (client) => client.id == clientValue.clientId
      );

      if (
        clientToEdit?.name == clientValue.clientName &&
        clientToEdit.ruc == clientValue.clientRuc &&
        clientToEdit.contact == clientValue.clientContact &&
        clientToEdit.reference == clientValue.clientReference
      ) {
        if (inputRef.current) {
          inputRef.current.focus();
        }

        return;
      }

      try {
        const response = await axios.put(
          `/api/client/${clientValue.clientId}`,
          {
            name: clientValue.clientName.trim(),
            contact: clientValue.clientContact.trim(),
            reference: clientValue.clientReference.trim(),
            ruc: clientValue.clientRuc.trim(),
            createAt: clientValue.clientDate,
          }
        );

        console.log("Client updated:", response.data);

        const editClient = clients.map((client) =>
          client.id == clientValue.clientId ? response.data : { ...client }
        );
        setClients(editClient);
        setClientValue({
          clientRuc: "",
          clientName: "",
          clientContact: "",
          clientReference: "",
        });

        setIsActiveCreateClient(false);
        setIsEdit(false);
        toast.success("Cliente Actualizado satisfactoriamente");
      } catch (error) {
        console.error("Error updating client:", error);
      }

      console.log(clientValue, "editando");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formDataEntries = Array.from(formData.entries());

    const allFieldsEmpty = formDataEntries.every(
      ([key, value]) => (value as string).trim() === ""
    );
    if (allFieldsEmpty) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    try {
      await addNewClient(formData, setIsActiveCreateClient);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(clientValue, "clientValue");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClientValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isActiveCreateClient && !isEdit) {
      setClientValue({
        clientRuc: "",
        clientContact: "",
        clientReference: "",
        clientName: "",
      });
    }
  }, [isActiveCreateClient, isEdit, setClientValue]);

  return (
    <form className="mb-8 grid gap-2" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-2">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="clientName"
          value={clientValue?.clientName}
          label="Razón Social"
          ref={inputRef}
          onChange={handleChange}
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="clientContact"
          value={clientValue?.clientContact}
          label="Contacto"
          onChange={handleChange}
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
          onChange={handleChange}
        />

        <Input
          size="sm"
          className="md:col-span-1 "
          type="text"
          name="clientRuc"
          value={clientValue?.clientRuc}
          label="Ruc"
          onChange={handleChange}
        />
      </div>

      {isEdit ? (
        <div className="w-full flex justify-center">
          <Button className="bg-indigo-600 text-white" type="submit">
            Editar Cliente
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <ButtonSubmit text="Agregar Cliente" />
        </div>
      )}
    </form>
  );
}

export default ClienteForm;

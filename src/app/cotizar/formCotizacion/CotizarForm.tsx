"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import useItems from "../hooks/useItems";
import ProductItem from "./ProductItem";
import ButtonSubmit from "@/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/react";
import { useGetClientList } from "@/app/hooks/clients/useClient";
import { usePostCotizacion } from "@/app/hooks/cotizacion/useCotizacion";
import { ProductItemType } from "@/models/cotizacion";

function CotizarForm() {
  const { Items, addItem, updateItem, removeItem, prices, setPrices } =
    useItems();
  const { clientList } = useGetClientList();
  const { responseNewCotizacion, addNewCotizacion } = usePostCotizacion();

  const initialClientValues = {
    clientName: "",
    clientContact: "",
    clientReference: "",
  };
  const [clientValues, setClientValues] = useState(initialClientValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    await addNewCotizacion(formData);
    //Guardar y generar pdf
    console.log(formData);
    console.log("Estos son los items: ", Items);
  };

  const handleSelect = (e: string) => {
    const client = clientList?.find((client) => client.id == parseInt(e));

    if (!client) {
      setClientValues(initialClientValues);
    } else {
      setClientValues({
        ...clientValues,
        clientName: client.name,
        clientContact: client.contact,
        clientReference: client.reference,
      });
    }
  };

  const totalPrice = prices.reduce((accumulator, currentValue) => {
    return currentValue.total + accumulator;
  }, 0);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <h1 className="font-medium text-slate-600">Cliente</h1>
        <div className="flex gap-x-2">
          {clientList && (
            <Select
              size="sm"
              className="w-32"
              placeholder="Seleccione"
              name="client"
              onChange={(e) => handleSelect(e.target.value)}
            >
              {clientList.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </Select>
          )}
          <Button size="sm" type="button" onClick={() => addItem()}>
            Agregar
            <CiCirclePlus className="text-xl" />
          </Button>
        </div>
      </div>
      <hr />

      <div className="w-full grid gap-y-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="clientName"
            value={clientValues.clientName}
            label="Razón Social"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="clientContact"
            value={clientValues.clientContact}
            placeholder="ejemplo: rolando gaspar"
            label="Contacto "
          />
        </div>

        <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
          <Input
            size="sm"
            className="md:col-span-1 "
            type="text"
            name="clientReference"
            value={clientValues.clientReference}
            label="Referencia"
          />
          <DateInput
            size="sm"
            name="date"
            label={"Fecha"}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            className="md:col-span-1"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center h-full text-center">
            <span className="font-medium text-slate-600">
              Productos ({Items.length})
            </span>
          </div>
          <Button size="sm" type="button" onClick={() => addItem()}>
            Agregar
            <CiCirclePlus className="text-xl" />
          </Button>
        </div>

        <div className="w-full pt-4">
          <div className="grid gap-2">
            {Items.length &&
              Items.map((item, index) => (
                <ProductItem
                  // valueItems={valueItems}
                  // setValueItems={valueItems}
                  updateItem={updateItem}
                  setPrices={setPrices}
                  item={item}
                  index={index + 1}
                  removeItem={removeItem}
                  key={item.key}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="w-full pt-4">
        <div className="flex justify-end">
          <Input
            size="sm"
            className="max-w-[300px]"
            label="Precio de Venta Total (No incluye I.G.V.)"
            type="number"
            name="totalPrice"
            startContent={<span>s/. </span>}
            value={totalPrice.toString()}
          />
        </div>
      </div>

      <h1 className="font-medium text-slate-600">Condiciones Comerciales</h1>
      <hr />

      <div className="w-full pt-4 flex flex-col sm:flex-row gap-2 ">
        <Input
          size="sm"
          label="Plazo de Entrega (Ejemplo: 4-6 )"
          name="deliverTime"
          type="text"
        />

        <Input
          size="sm"
          label="Condición de Pago"
          name="paymentCondition"
          placeholder="50% con la OC, 50% c. entrega"
          type="text"
        />
      </div>

      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Generar cotización" />
      </div>
    </form>
  );
}

export default CotizarForm;

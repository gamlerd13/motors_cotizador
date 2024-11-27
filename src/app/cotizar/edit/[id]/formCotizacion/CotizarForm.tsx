"use client";
import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button, DateInput } from "@nextui-org/react";
import { CalendarDateTime } from "@internationalized/date";
import useItems from "../hooks/useItems";
import ProductItem from "./ProductItem";
import ButtonSubmit from "@/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/react";
import { useGetClientList } from "@/app/hooks/clients/useClient";
import {
  usePostCotizacion,
  usePutCotizacion,
} from "@/app/hooks/cotizacion/useCotizacion";
import { CotizacionGet, ProductItemType } from "@/models/cotizacion";
import { useDateTime } from "@/app/hooks/common/useDateTime";
import { useLastCodeCotizacion } from "@/app/hooks/cotizacion/useLastCodeCotizacion";
import useDefaultValuesStore from "@/store/defaultFormValuesStorage";

interface ClientForm {
  clientName: string;
  clientContact: string;
  clientRuc: string;
  clientReference: string;
}

function CotizarForm({ cotizacion }: { cotizacion: CotizacionGet }) {
  const { Items, addItem, updateItem, removeItem, prices, setPrices } =
    useItems(cotizacion);

  const { clientList } = useGetClientList();
  const { currentDateTime } = useDateTime();
  const { lastCodeCotizacion } = useLastCodeCotizacion(cotizacion.id);
  const { createUpdateDefaultValues } = useDefaultValuesStore();

  const { updateCotizacion } = usePutCotizacion();

  const initialClientValues = {
    clientName: "",
    clientContact: "",
    clientReference: "",
  };
  const [clientValues, setClientValues] = useState<ClientForm | null>(null);
  const [clientSelected, setClientSelected] = useState<string>("");

  const [currencyType, setCurrencyType] = useState<"SOLES" | "DOLARES">(
    cotizacion.currencyType
  );
  useEffect(() => {
    if (cotizacion && cotizacion.currencyType) {
      setCurrencyType(cotizacion.currencyType);
    }
  }, [cotizacion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const companyPhone = formData.get("companyPhone")?.toString() || "";
    const companyEmail = formData.get("companyEmail")?.toString() || "";
    const bankAccountNumber =
      formData.get("bankAccountNumber")?.toString() || "";

    if (cotizacion.id) {
      await createUpdateDefaultValues({
        companyPhone,
        companyEmail,
        bankAccountNumber,
      });
      await updateCotizacion(cotizacion.id, formData);
    }

    //Guardar y generar pdf
    console.log(formData);
  };

  const handleSelect = (e: string) => {
    const client = clientList?.find((client) => client.id == parseInt(e));

    if (!client) {
      setClientValues(null);
    } else {
      setClientValues({
        ...clientValues,
        clientName: client.name,
        clientContact: client.contact,
        clientReference: client.reference,
        clientRuc: client.ruc,
      });
    }
  };

  useEffect(() => {
    if (cotizacion && cotizacion.clientId) {
      const clientIdString = cotizacion.clientId.toString();
      setClientSelected(clientIdString);
      handleSelect(clientIdString);
    }
  }, [cotizacion, clientList]);

  const totalPrice = prices
    .reduce((accumulator, currentValue) => {
      return currentValue.total + accumulator;
    }, 0)
    .toFixed(2);

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full pt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            label="Número telefónico de Movento S.A.C."
            defaultValue={cotizacion.companyPhone}
            name="companyPhone"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            name="companyEmail"
            label="Correo de Movento S.A.C."
            defaultValue={cotizacion.companyEmail}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Cliente</h1>
        <div className="flex gap-x-2">
          {/* {clientList && (
            <Select
              size="sm"
              aria-label="clientSelect"
              className="w-32"
              placeholder="Seleccione"
              name="client"
              value={clientSelected}
              defaultSelectedKeys={[clientSelected]}
              onChange={(e) => {
                const selectedValue = e.target.value;
                handleSelect(selectedValue);
                setClientSelected(selectedValue);
              }}
            >
              {clientList.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </Select>
          )} */}
        </div>
      </div>
      <hr />

      <div className="w-full grid gap-y-2 mt-4">
        {lastCodeCotizacion && (
          <>
            <Input
              size="sm"
              className="md:col-span-1 font-bold"
              type="text"
              value={`${cotizacion.parentCode}-${lastCodeCotizacion}`}
              label="Código (El codigó se actualizará siguiente código)"
              disabled
            />
            <Input
              size="sm"
              className="md:col-span-1 font-bold"
              name="code"
              value={cotizacion.parentCode}
              label="Código"
              type="hidden"
            />
          </>
        )}

        {cotizacion && (
          <>
            <div className="grid md:grid-cols-2 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="hidden"
                name="clientId"
                defaultValue={cotizacion.client?.id.toString()}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientName"
                value={cotizacion.client?.name}
                defaultValue={cotizacion.client?.name}
                label="Razón Social"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientContact"
                defaultValue={cotizacion.client?.contact}
                label="Contacto"
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientReference"
                defaultValue={cotizacion.client?.reference}
                label="Referencia"
              />

              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientRuc"
                defaultValue={cotizacion.client?.ruc}
                label="Ruc"
              />
            </div>
            {/* 
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
                label="Contacto"
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

              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientRuc"
                value={clientValues.clientRuc}
                label="Ruc"
              />
            </div> */}
          </>
        )}
        {currentDateTime && (
          <DateInput label="Fecha" name="date" defaultValue={currentDateTime} />
        )}
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
        <div className="flex justify-end items-end space-x-4">
          <Select
            size="sm"
            label="Tipo de moneda"
            className="w-[150px]"
            name="currencyType"
            selectedKeys={[currencyType]}
            value={currencyType}
            onChange={(e) =>
              setCurrencyType(e.target.value as "SOLES" | "DOLARES")
            }
          >
            <SelectItem key="SOLES" value="SOLES">
              Soles
            </SelectItem>
            <SelectItem key="DOLARES" value="DOLARES">
              Dólares
            </SelectItem>
          </Select>
          <Input
            size="sm"
            className="max-w-[300px]"
            label="Precio de Venta Total (No incluye I.G.V.)"
            type="number"
            name="totalPrice"
            startContent={
              <span className="text-default-400 text-small">
                {currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            value={totalPrice.toString()}
            readOnly
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
          defaultValue={cotizacion.deliverTime}
          type="text"
        />

        <Input
          size="sm"
          label="Condición de Pago"
          name="paymentCondition"
          defaultValue={cotizacion.paymentCondition}
          placeholder="50% con la OC, 50% c. entrega"
          type="text"
        />
      </div>
      <div className="w-full pt-4 flex flex-col sm:flex-row gap-2 ">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="offerValidity"
          defaultValue={cotizacion.offerValidity}
          label="Validez de oferta"
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="warranty"
          defaultValue={cotizacion.warranty}
          label="Garantía"
        />
      </div>
      <div className="w-full pt-4 flex flex-col sm:flex-row gap-2 ">
        <Textarea
          placeholder="Ingrese el modelo"
          size="sm"
          name="bankAccountNumber"
          label="No CUENTA BANCARIA DE MOVENTO S.A.C"
          defaultValue={cotizacion.bankAccountNumber}
          className="w-full"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Actualizar cotización" />
      </div>
    </form>
  );
}

export default CotizarForm;

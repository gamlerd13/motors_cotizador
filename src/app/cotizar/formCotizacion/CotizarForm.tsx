"use client";
import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button, DateInput } from "@nextui-org/react";
import { CalendarDateTime } from "@internationalized/date";
import useItems from "../hooks/useItems";
import ProductItem from "./ProductItem";
import ButtonSubmit from "@/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/react";
import { useGetClientList } from "@/app/hooks/clients/useClient";
import { usePostCotizacion } from "@/app/hooks/cotizacion/useCotizacion";
import { ProductItemType } from "@/models/cotizacion";
import { useCodeCotizacion } from "@/app/hooks/cotizacion/useCodeCotizacion";
import { useDateTime } from "@/app/hooks/common/useDateTime";

interface ClientForm {
  clientName: string;
  clientContact: string;
  clientRuc: string;
  clientReference: string;
}

function CotizarForm() {
  const { Items, addItem, updateItem, removeItem, prices, setPrices } =
    useItems();
  const { clientList, isLoading: isLoadingClient } = useGetClientList();
  const { currentDateTime } = useDateTime();
  const { lastCodeCotizacion } = useCodeCotizacion();

  const { responseNewCotizacion, addNewCotizacion } = usePostCotizacion();

  const initialClientValues = {
    clientName: "",
    clientContact: "",
    clientReference: "",
  };
  const [clientValues, setClientValues] = useState<ClientForm | null>(null);

  const [companyPhone, setCompanyPhone] = useState("902196904");
  const [companyEmail, setCompanyEmail] = useState("ventas@moventodrives.com");
  const [currencyType, setCurrencyType] = React.useState<"SOLES" | "DOLARES">(
    "SOLES"
  );
  // Estado para los campos de condiciones comerciales editables
  const [offerValidity, setOfferValidity] = useState("30 días.");
  const [warranty, setWarranty] = useState(
    "La garantía es por 6 meses luego de la puesta en servicio."
  );
  const [bankAccountNumber, setBankAccountNumber] = useState(
    "BANCO INTERBANK\n" +
      "SOLES: 200-3005630612\n" +
      "CCI SOLES: 003-200-003005630612-36\n" +
      "DOLARES: 200-003005630620\n" +
      "CCI DOLARES: 003-200-003005630620-39\n" +
      "Cuenta detracción del banco de la nación - Cuenta Corriente: 00-002-212722"
  );

  if (!lastCodeCotizacion) return;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    await addNewCotizacion(formData);
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
            value={companyPhone} // Valor del estado
            name="companyPhone"
            onChange={(e) => setCompanyPhone(e.target.value)} // Actualización del estado
          />
          <Input
            size="sm"
            className="md:col-span-1"
            name="companyEmail"
            value={companyEmail}
            label="Correo de Movento S.A.C."
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Cliente</h1>
        <div className="flex gap-x-2">
          {clientList && !isLoadingClient && (
            <Select
              size="sm"
              className="w-32"
              aria-label="selectClient"
              placeholder="Seleccione"
              name="client"
              onChange={(e) => handleSelect(e.target.value)}
            >
              {clientList.map((client, index) => (
                <SelectItem key={client.id || index} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
      <hr />

      <div className="w-full grid gap-y-2 mt-4">
        {lastCodeCotizacion && (
          <Input
            size="sm"
            className="md:col-span-1 font-bold"
            type="text"
            value={lastCodeCotizacion}
            label="Código"
            disabled
          />
        )}

        {clientValues ? (
          <>
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
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientName"
                label="Razón Social"
                required
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientContact"
                label="Contacto"
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientReference"
                label="Referencia"
              />

              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientRuc"
                label="Ruc"
              />
            </div>
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
        <div className="flex items-end justify-end space-x-4">
          <Select
            size="sm"
            label="Tipo de moneda"
            className="w-[150px]"
            value={currencyType}
            name="currencyType"
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

      <div className="w-full pt-4 flex flex-col sm:flex-row gap-2 ">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="offerValidity"
          value={offerValidity} // Valor del estado
          onChange={(e) => setOfferValidity(e.target.value)} // Actualizar estado
          label="Validez de oferta"
        />
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="warranty"
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
          label="Garantía"
        />
      </div>
      <div className="w-full pt-4 flex flex-col sm:flex-row gap-2 ">
        <Textarea
          placeholder="Ingrese el modelo"
          size="sm"
          name="bankAccountNumber"
          label="No CUENTA BANCARIA DE MOVENTO S.A.C"
          value={bankAccountNumber}
          onChange={(e) => setBankAccountNumber(e.target.value)}
          className="w-full"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Generar cotización" />
      </div>
    </form>
  );
}

export default CotizarForm;

"use client";
import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button, DateInput } from "@nextui-org/react";

import ButtonSubmit from "@/components/Button";
import { Select, SelectItem } from "@nextui-org/react";
import { useDateTime } from "@/app/hooks/common/useDateTime";
import { CotizacionGet } from "@/models/cotizacion";
import useSale from "../hooks/useSale";

function CreateForm({
  cotizacion,
  cotizacionId,
}: {
  cotizacion: CotizacionGet;
  cotizacionId: string;
}) {
  const { currentDateTime } = useDateTime();
  const { createExpense } = useSale();
  const withTax = Number(cotizacion.totalPrice) * 1.18;
  const detraction =
    cotizacion.offerValidity === "0 DÍAS" ? 0 : Math.round(withTax * 0.12);
  const netPayable = withTax - detraction;
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const outstandingAmount = netPayable - paidAmount;

  const [totalSalePrice, setTotalSalePrice] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const value = totalSalePrice - totalCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    formData.append("cotizacionId", cotizacionId);

    await createExpense(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Cliente Comercial</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <div className="grid md:grid-cols-2 gap-2">
            {currentDateTime && (
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha OC del Cliente"
                name="customerOrderDate"
                defaultValue={currentDateTime}
              />
            )}
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="customerOrder"
              label="OC del Cliente"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              value={cotizacion.code}
              label="N° Cotización"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              label="Razón Social"
              value={cotizacion.client?.name}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="line"
              label="Línea"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              label="RUC"
              value={cotizacion.client?.ruc}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="deliveryTime"
              label="Plazo de Entrega"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Entrega"
              name="deliveryDate"
            />
          </div>
        </>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Facturación del Cliente</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="invoiceNumber"
            label="N° Factura"
          />
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              label="Tipo Moneda"
              value={cotizacion.currencyType === "SOLES" ? "PEN" : "USD"}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="paymentType"
              label="Tipo de Pago"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="paymentMethod"
              label="Forma de Pago"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              label="Período"
              value={cotizacion.offerValidity}
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Inicio"
              name="startDate"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Vencimiento"
              name="dueDate"
            />
          </div>
          <Textarea
            placeholder="Ingrese la observación"
            size="sm"
            name="observation"
            label="Observación"
            defaultValue={cotizacion.bankAccountNumber}
            className="w-full"
            style={{ whiteSpace: "pre-wrap" }}
          />
        </>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">
          Cuentas por Cobrar - Cliente
        </h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="withoutTax"
              label="Sin IGV"
              value={cotizacion.totalPrice.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
              readOnly
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="withTax"
              label="Con IGV"
              value={withTax.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="detraction"
              label="Detracción"
              value={detraction.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="netPayable"
              label="Neto a Pagar"
              value={netPayable.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="paidAmount"
              label="Abonado"
              value={paidAmount.toString()}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="outstandingAmount"
              label="Falta"
              value={outstandingAmount.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />

            <Select
              size="sm"
              label="Estado"
              className="md:col-span-1 h-[40px]"
              placeholder="Seleccione"
              name="status"
            >
              <SelectItem key="ANULADO" value="ANULADO">
                ANULADO
              </SelectItem>
              <SelectItem key="CANCELADO" value="CANCELADO">
                CANCELADO
              </SelectItem>
              <SelectItem key="POR CANCELAR" value="POR CANCELAR">
                POR CANCELAR
              </SelectItem>
            </Select>
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalSalePrice"
              label="Precio Venta Total (con IGV)"
              value={totalSalePrice.toString()}
              onChange={(e) => setTotalSalePrice(Number(e.target.value))}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
          </div>
        </>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">
          Cuentas por Pagar - Proveedor
        </h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="supplierOrder"
              label="N° OC a Proveedor"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advancePayment"
              label="Adelanto (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Adelanto"
              name="advanceDate"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balance"
              label="Saldo (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Saldo"
              name="balanceDate"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCost"
              value={totalCost.toString()}
              onChange={(e) => setTotalCost(Number(e.target.value))}
              label="Costo Total (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="Text"
              name="supplierInvoice"
              label="N° Factura de Proveedor"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="Text"
              name="supplierShipment"
              label="N° Guía de Remisión de Proveedor"
            />
          </div>
        </>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Utilidad</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="value"
              label="Valor"
              value={value.toFixed(2)}
              startContent={
                <span className="text-default-400 text-small">
                  {cotizacion.currencyType === "SOLES" ? "S/." : "$"}
                </span>
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="percentage"
              label="Porcentaje (%)"
            />
          </div>
        </>
      </div>
      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Generar Venta" />
      </div>
    </form>
  );
}

export default CreateForm;

"use client";

import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button, DateInput, Select, SelectItem } from "@nextui-org/react";
import ButtonSubmit from "@/components/Button";
import { SaleGet } from "@/models/sale";

import { CalendarDateTime } from "@internationalized/date";
import { useDeleteSale, usePutSale } from "../hooks/useSale";
import { FiTrash } from "react-icons/fi";

interface EditFormProps {
  sale: SaleGet;
}

const convertToCalendarDateTime = (
  date?: string | null
): CalendarDateTime | undefined => {
  if (!date) return undefined;

  const d = new Date(date);

  return new CalendarDateTime(
    d.getUTCFullYear(),
    d.getUTCMonth() + 1,
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds()
  );
};
const formatNumber = (num: number | null | undefined) => {
  return num !== null && num !== undefined ? num.toFixed(2).toString() : "0.00";
};

function EditForm({ sale }: EditFormProps) {
  const { updateSale } = usePutSale();
  const { deleteSale } = useDeleteSale();
  const [paidAmount, setPaidAmount] = useState<number>(sale.paidAmount || 0);
  const [totalSalePrice, setTotalSalePrice] = useState<number>(
    sale.totalSalePrice || 0
  );
  const [totalCost, setTotalCost] = useState<number>(sale.totalCost || 0);

  const withTax = Number(sale.withoutTax) * 1.18;
  const detraction = sale.period === "0 DÍAS" ? 0 : Math.round(withTax * 0.12);
  const netPayable = withTax - detraction;
  const outstandingAmount = netPayable - paidAmount;
  const value = totalSalePrice - totalCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    await updateSale(sale.id, formData);
  };

  const [status, setStatus] = useState(sale.status);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Cliente Comercial</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Fecha OC del Cliente"
            name="customerOrderDate"
            defaultValue={convertToCalendarDateTime(sale.customerOrderDate)}
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="customerOrder"
            defaultValue={sale.customerOrder}
            label="OC del Cliente"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={sale.quoteCode}
            label="N° Cotización"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={sale.companyName}
            label="Razón Social"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="line"
            defaultValue={sale.line}
            label="Línea"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={sale.companyRuc}
            label="RUC"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="deliveryTime"
            defaultValue={sale.deliveryTime}
            label="Plazo de Entrega"
          />
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Fecha de Entrega"
            name="deliveryDate"
            defaultValue={convertToCalendarDateTime(sale.deliveryDate)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Facturación del Cliente</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <Input
          size="sm"
          className="md:col-span-1"
          type="text"
          name="invoiceNumber"
          defaultValue={sale.invoiceNumber}
          label="N° Factura"
        />
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={sale.currencyType === "SOLES" ? "PEN" : "USD"}
            label="Tipo Moneda"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="paymentType"
            defaultValue={sale.paymentType}
            label="Tipo de Pago"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="paymentMethod"
            defaultValue={sale.paymentMethod}
            label="Forma de Pago"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={sale.period}
            label="Período"
          />
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Inicio"
            name="startDate"
            defaultValue={convertToCalendarDateTime(sale.startDate)}
          />
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Vencimiento"
            name="dueDate"
            defaultValue={convertToCalendarDateTime(sale.dueDate)}
          />
        </div>
        <Textarea
          placeholder="Ingrese la observación"
          size="sm"
          name="observation"
          label="Observación"
          defaultValue={sale.observation}
          className="w-full"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">
          Cuentas por Cobrar - Cliente
        </h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="withoutTax"
            value={formatNumber(sale.withoutTax)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Sin IGV"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="withTax"
            value={formatNumber(withTax)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Con IGV"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="detraction"
            value={formatNumber(detraction)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Detracción"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="netPayable"
            value={formatNumber(netPayable)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Neto a Pagar"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="paidAmount"
            defaultValue={paidAmount.toString()}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Abonado"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="outstandingAmount"
            value={formatNumber(outstandingAmount)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Falta"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            value={status}
            label="Estado"
            name="status"
            readOnly
          />
          <Select
            size="sm"
            label="Cambiar estado a:"
            className="md:col-span-1 h-[40px]"
            onChange={handleSelectChange}
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
        </div>
        <Input
          size="sm"
          className="md:col-span-1"
          type="number"
          name="totalSalePrice"
          defaultValue={formatNumber(totalSalePrice)}
          onChange={(e) => setTotalSalePrice(Number(e.target.value))}
          startContent={
            <span className="text-default-400 text-small">
              {sale.currencyType === "SOLES" ? "S/." : "$"}
            </span>
          }
          label="Precio Venta Total (con IGV)"
        />
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">
          Cuentas por Pagar - Proveedor
        </h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="supplierOrder"
            defaultValue={sale.supplierOrder}
            label="N° OC a Proveedor"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="advancePayment"
            defaultValue={formatNumber(sale.advancePayment)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Adelanto (con IGV)"
          />
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Fecha de Adelanto"
            name="advanceDate"
            defaultValue={convertToCalendarDateTime(sale.advanceDate)}
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="balance"
            defaultValue={formatNumber(sale.balance)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Saldo (con IGV)"
          />
          <DateInput
            size="sm"
            className="md:col-span-1"
            label="Fecha de Saldo"
            name="balanceDate"
            defaultValue={convertToCalendarDateTime(sale.balanceDate)}
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="totalCost"
            defaultValue={formatNumber(totalCost)}
            onChange={(e) => setTotalCost(Number(e.target.value))}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Costo Total (con IGV)"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="supplierInvoice"
            defaultValue={sale.supplierInvoice}
            label="N° Factura de Proveedor"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="text"
            name="supplierShipment"
            defaultValue={sale.supplierShipment}
            label="N° Guía de Remisión de Proveedor"
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-slate-600">Utilidad</h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="value"
            value={formatNumber(value)}
            startContent={
              <span className="text-default-400 text-small">
                {sale.currencyType === "SOLES" ? "S/." : "$"}
              </span>
            }
            label="Valor"
          />
          <Input
            size="sm"
            className="md:col-span-1"
            type="number"
            name="percentage"
            defaultValue={formatNumber(sale.percentage)}
            label="Porcentaje (%)"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pt-4">
        <Button color="danger" onClick={() => deleteSale(sale.id)}>
          <FiTrash />
          Eliminar venta
        </Button>
        <ButtonSubmit text="Actualizar Venta" />
      </div>
    </form>
  );
}

export default EditForm;

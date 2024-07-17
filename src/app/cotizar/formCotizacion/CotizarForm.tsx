"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import useItems from "../hooks/useItems";
import ProductItem from "./ProductItem";
import ButtonSubmit from "@/components/Button";
import { CiCirclePlus } from "react-icons/ci";
function CotizarForm() {
  const { Items, addItem, removeItem, prices, setPrices } = useItems();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);
  };

  const totalPrice = prices.reduce((accumulator, currentValue) => {
    return currentValue.total + accumulator;
  }, 0);
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-medium text-slate-600">Cliente</h1>
      <hr />

      <div className="w-full grid gap-4 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            className="md:col-span-1"
            type="text"
            name="code"
            value="2024-123"
            disabled
            label="N° cotización "
          />
          <Input
            className="md:col-span-1"
            type="text"
            name="client"
            label="Razón Social"
          />
        </div>

        <div className="w-full grid md:grid-cols-2 gap-2">
          <Input
            className="md:col-span-1"
            type="text"
            name="reference"
            label="Referencia"
          />
          <DateInput
            name="date"
            label={"Fecha"}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            className="md:col-span-1"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center w-20 h-full text-center">
            <span className="font-medium text-slate-600">Productos</span>
          </div>
          <Button type="button" onClick={() => addItem()}>
            Agregar
            <CiCirclePlus className="text-xl" />
          </Button>
        </div>

        <div className="w-full pt-4">
          <div className="grid gap-2">
            {Items.length &&
              Items.map((item, index) => (
                <ProductItem
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
        <div className="flex justify-between">
          <span>PRECIO DE VENTA TOTAL (NO INCLUYE I.G.V.)</span>
          <Input
            className="max-w-[200px]"
            label="Precio Total"
            type="number"
            name="totalPrice"
            startContent={<span>s/. </span>}
            value={totalPrice.toString()}
          />
        </div>
      </div>

      <div className="w-full pt-4">
        <div className="flex justify-between">
          <span>Plazo de Entrega</span>
          <Input
            className="max-w-[200px]"
            label="Semanas (Ejemplo: 4-6 )"
            name="deliverTime"
            type="text"
          />
        </div>
      </div>

      <h1 className="font-medium text-slate-600">Condiciones Comerciales</h1>
      <hr />
      <div className="w-full pt-4">
        <div className="flex justify-between">
          <span>Condición de Pago</span>
          <Input
            className="max-w-[200px]"
            label="Condición de Pago (%)"
            name="paymentCondition"
            type="number"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Generar cotización" />
      </div>
    </form>
  );
}

export default CotizarForm;

"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Checkbox, DateInput } from "@nextui-org/react";
import { DateValue } from "@internationalized/date";

import ButtonSubmit from "@/components/Button";
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

  const [isPaidByClient, setIsPaidByClient] = useState(false);
  const [isPaidByFactoring, setIsPaidByFactoring] = useState(false);

  const [factoringPaymentAmountUsd, setFactoringPaymentAmountUsd] =
    useState<number>(0);
  const [advanceValueUsdClient, setAdvanceValueUsdClient] = useState<number>(0);
  const [secondPaymentUsdClient, setSecondPaymentUsdClient] =
    useState<number>(0);
  const [thirdPaymentUsdClient, setThirdPaymentUsdClient] = useState<number>(0);

  const [factoringPaymentAmountPen, setFactoringPaymentAmountPen] =
    useState<number>(0);
  const [advanceValuePenClient, setAdvanceValuePenClient] = useState<number>(0);
  const [secondPaymentPenClient, setSecondPaymentPenClient] =
    useState<number>(0);
  const [thirdPaymentPenClient, setThirdPaymentPenClient] = useState<number>(0);

  const totalSaleUsd =
    factoringPaymentAmountUsd +
    advanceValueUsdClient +
    secondPaymentUsdClient +
    thirdPaymentUsdClient;
  const totalSalePen =
    factoringPaymentAmountPen +
    advanceValuePenClient +
    secondPaymentPenClient +
    thirdPaymentPenClient;

  const [advanceValueUsd1, setAdvanceValueUsd1] = useState<number>(0);
  const [balanceValueUsd1, setBalanceValueUsd1] = useState<number>(0);
  const [advanceValuePen1, setAdvanceValuePen1] = useState<number>(0);
  const [balanceValuePen1, setBalanceValuePen1] = useState<number>(0);
  const totalCostUsd1 = advanceValueUsd1 + balanceValueUsd1;
  const totalCostPen1 = advanceValuePen1 + balanceValuePen1;

  const [advanceValueUsd2, setAdvanceValueUsd2] = useState<number>(0);
  const [balanceValueUsd2, setBalanceValueUsd2] = useState<number>(0);
  const [advanceValuePen2, setAdvanceValuePen2] = useState<number>(0);
  const [balanceValuePen2, setBalanceValuePen2] = useState<number>(0);
  const totalCostUsd2 = advanceValueUsd2 + balanceValueUsd2;
  const totalCostPen2 = advanceValuePen2 + balanceValuePen2;

  const [advanceValueUsd3, setAdvanceValueUsd3] = useState<number>(0);
  const [balanceValueUsd3, setBalanceValueUsd3] = useState<number>(0);
  const [advanceValuePen3, setAdvanceValuePen3] = useState<number>(0);
  const [balanceValuePen3, setBalanceValuePen3] = useState<number>(0);
  const totalCostUsd3 = advanceValueUsd3 + balanceValueUsd3;
  const totalCostPen3 = advanceValuePen3 + balanceValuePen3;

  const [totalCostUsd_1, setTotalCostUsd_1] = useState<number>(0);
  const [totalCostPen_1, setTotalCostPen_1] = useState<number>(0);
  const [totalCostUsd_2, setTotalCostUsd_2] = useState<number>(0);
  const [totalCostPen_2, setTotalCostPen_2] = useState<number>(0);
  const [totalCostUsd_3, setTotalCostUsd_3] = useState<number>(0);
  const [totalCostPen_3, setTotalCostPen_3] = useState<number>(0);

  const [totalSaleCostUsd, setTotalSaleCostUsd] = useState<number>(0);
  useEffect(() => {
    setTotalCostUsd_1(advanceValueUsd1 + balanceValueUsd1);
  }, [advanceValueUsd1, balanceValueUsd1]);
  useEffect(() => {
    setTotalCostUsd_2(advanceValueUsd2 + balanceValueUsd2);
  }, [advanceValueUsd2, balanceValueUsd2]);
  useEffect(() => {
    setTotalCostUsd_3(advanceValueUsd3 + balanceValueUsd3);
  }, [advanceValueUsd3, balanceValueUsd3]);
  useEffect(() => {
    setTotalSaleCostUsd(totalCostUsd_1 + totalCostUsd_2 + totalCostUsd_3);
  }, [totalCostUsd_1, totalCostUsd_2, totalCostUsd_3]);

  const [totalSaleCostPen, setTotalSaleCostPen] = useState<number>(0);
  useEffect(() => {
    setTotalCostPen_1(advanceValuePen1 + balanceValuePen1);
  }, [advanceValuePen1, balanceValuePen1]);
  useEffect(() => {
    setTotalCostPen_2(advanceValuePen2 + balanceValuePen2);
  }, [advanceValuePen2, balanceValuePen2]);
  useEffect(() => {
    setTotalCostPen_3(advanceValuePen3 + balanceValuePen3);
  }, [advanceValuePen3, balanceValuePen3]);
  useEffect(() => {
    setTotalSaleCostPen(totalCostPen_1 + totalCostPen_2 + totalCostPen_3);
  }, [totalCostPen_1, totalCostPen_2, totalCostPen_3]);

  const [totalSalePen_utility, setTotalSalePen_utility] = useState<number>(0);
  const [totalSaleCostPen_utility, setTotalSaleCostPen_utility] =
    useState<number>(0);
  const [valuePen, setValuePen] = useState<number>(0);
  useEffect(() => {
    setTotalSalePen_utility(
      factoringPaymentAmountPen +
        advanceValuePenClient +
        secondPaymentPenClient +
        thirdPaymentPenClient
    );
  }, [
    factoringPaymentAmountPen,
    advanceValuePenClient,
    secondPaymentPenClient,
    thirdPaymentPenClient,
  ]);
  useEffect(() => {
    setTotalSaleCostPen_utility(totalSaleCostPen);
  }, [totalSaleCostPen]);

  useEffect(() => {
    setValuePen(totalSalePen_utility - totalSaleCostPen_utility);
  }, [totalSalePen_utility, totalSaleCostPen_utility]);

  const [totalSalePen_percentage, setTotalSalePen_percentage] =
    useState<number>(0);
  const [valuePen_percentage, setValuePen_percentage] = useState<number>(0);
  const [percentagePen, setPercentagePen] = useState<number>(0);
  useEffect(() => {
    setTotalSalePen_percentage(totalSalePen_utility);
  }, [totalSalePen_utility]);
  useEffect(() => {
    setValuePen_percentage(valuePen);
  }, [valuePen]);

  useEffect(() => {
    setPercentagePen((valuePen_percentage * 100) / totalSalePen_percentage);
  }, [totalSalePen_percentage, valuePen_percentage]);

  const [totalSaleUsd_utility, setTotalSaleUsd_utility] = useState<number>(0);
  const [totalSaleCostUsd_utility, setTotalSaleCostUsd_utility] =
    useState<number>(0);
  const [valueUsd, setValueUsd] = useState<number>(0);
  useEffect(() => {
    setTotalSaleUsd_utility(
      factoringPaymentAmountUsd +
        advanceValueUsdClient +
        secondPaymentUsdClient +
        thirdPaymentUsdClient
    );
  }, [
    factoringPaymentAmountUsd,
    advanceValueUsdClient,
    secondPaymentUsdClient,
    thirdPaymentUsdClient,
  ]);
  useEffect(() => {
    setTotalSaleCostUsd_utility(totalSaleCostUsd);
  }, [totalSaleCostUsd]);

  useEffect(() => {
    setValueUsd(totalSaleUsd_utility - totalSaleCostUsd_utility);
  }, [totalSaleUsd_utility, totalSaleCostUsd_utility]);

  const [totalSaleUsd_percentage, setTotalSaleUsd_percentage] =
    useState<number>(0);
  const [valueUsd_percentage, setValueUsd_percentage] = useState<number>(0);
  const [percentageUsd, setPercentageUsd] = useState<number>(0);
  useEffect(() => {
    setTotalSaleUsd_percentage(totalSaleUsd_utility);
  }, [totalSaleUsd_utility]);
  useEffect(() => {
    setValueUsd_percentage(valueUsd);
  }, [valueUsd]);

  useEffect(() => {
    setPercentageUsd((valueUsd_percentage * 100) / totalSaleUsd_percentage);
  }, [totalSaleUsd_percentage, valueUsd_percentage]);

  const handleClientPaymentChange = (isSelected: boolean) => {
    setIsPaidByClient(isSelected);
    if (isSelected) {
      setIsPaidByFactoring(false);
      setFactoringPaymentAmountUsd(0);
      setFactoringPaymentAmountPen(0);
    }
  };

  const handleFactoringPaymentChange = (isSelected: boolean) => {
    setIsPaidByFactoring(isSelected);
    if (isSelected) {
      setIsPaidByClient(false);
    } else {
      setFactoringPaymentAmountUsd(0);
      setFactoringPaymentAmountPen(0);
    }
  };

  useEffect(() => {
    if (!isPaidByFactoring) {
      setFactoringPaymentAmountUsd(0);
      setFactoringPaymentAmountPen(0);
    }
  }, [isPaidByFactoring]);

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [daysUntilDue, setDaysUntilDue] = useState<number | null>(null);

  const handleDateChange = (value: DateValue) => {
    const date = new Date(value.toString());
    setDueDate(date);
  };

  useEffect(() => {
    if (dueDate) {
      const currentDate = new Date();
      const timeDifference = dueDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setDaysUntilDue(daysRemaining);
    }
  }, [dueDate]);

  const getDaysMessage = () => {
    if (daysUntilDue === null) return "";
    if (daysUntilDue > 0) return `${daysUntilDue} días`;
    return `${Math.abs(daysUntilDue)} días pasados`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("isPaidByClient", isPaidByClient.toString());
    formData.append("isPaidByFactoring", isPaidByFactoring.toString());

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
        <h1 className="font-medium text-slate-600">
          Cuentas por Cobrar - Cliente
        </h1>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        <>
          <h2 className="text-slate-600">CRÉDITO</h2>
          <div className="grid md:grid-cols-4 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="clientInvoiceNumber"
              label="N° de Factura de Movento SAC"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha Factura de cliente"
              name="clientInvoiceDate"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Vencimiento de Factura de cliente"
              name="clientInvoiceDueDate"
              onChange={handleDateChange}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              label="Número de días para vencimiento"
              name="daysUntilDue"
              value={getDaysMessage()}
              disabled
              style={{
                color:
                  daysUntilDue !== null && daysUntilDue > 0 ? "green" : "red",
              }}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-2">
            <Checkbox
              size="sm"
              className="md:col-span-1"
              isSelected={isPaidByClient}
              onValueChange={handleClientPaymentChange}
            >
              Pagado por el cliente
            </Checkbox>
            <Checkbox
              size="sm"
              className="md:col-span-1"
              isSelected={isPaidByFactoring}
              onValueChange={handleFactoringPaymentChange}
            >
              Pagado por factoring
            </Checkbox>
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="factoringPaymentAmountUsd"
              label="Monto pagado por factoring en USD"
              value={factoringPaymentAmountUsd.toString()}
              onChange={(e) =>
                setFactoringPaymentAmountUsd(Number(e.target.value))
              }
              isDisabled={!isPaidByFactoring}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="factoringPaymentAmountPen"
              label="Monto pagado por factoring en S/."
              value={factoringPaymentAmountPen.toString()}
              onChange={(e) =>
                setFactoringPaymentAmountPen(Number(e.target.value))
              }
              isDisabled={!isPaidByFactoring}
            />
          </div>
          <hr />
          <h2 className="text-slate-600">CON ANTICIPO</h2>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValueUsdClient"
              label="Valor Adelanto USD (con IGV)"
              value={advanceValueUsdClient.toString()}
              onChange={(e) => setAdvanceValueUsdClient(Number(e.target.value))}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValuePenClient"
              label="Valor Adelanto S/. (con IGV)"
              value={advanceValuePenClient.toString()}
              onChange={(e) => setAdvanceValuePenClient(Number(e.target.value))}
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Adelanto"
              name="advancePaymentDate"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="advanceInvoiceNumber"
              label="N° Factura de Movento SAC"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha Factura de cliente"
              name="advanceInvoiceDate"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="secondPaymentUsdClient"
              label="Valor 2do.Pago USD (con IGV)"
              value={secondPaymentUsdClient.toString()}
              onChange={(e) =>
                setSecondPaymentUsdClient(Number(e.target.value))
              }
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="secondPaymentPenClient"
              label="Valor 2do Pago S/. (con IGV)"
              value={secondPaymentPenClient.toString()}
              onChange={(e) =>
                setSecondPaymentPenClient(Number(e.target.value))
              }
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de 2do. Pago"
              name="secondPaymentDate"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="secondInvoiceNumber"
              label="N° Factura de Movento SAC"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha Factura de cliente"
              name="secondInvoiceDate"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="thirdPaymentUsdClient"
              label="Valor 3er.Pago USD (con IGV)"
              value={thirdPaymentUsdClient.toString()}
              onChange={(e) => setThirdPaymentUsdClient(Number(e.target.value))}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="thirdPaymentPenClient"
              label="Valor 3er Pago S/. (con IGV)"
              value={thirdPaymentPenClient.toString()}
              onChange={(e) => setThirdPaymentPenClient(Number(e.target.value))}
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de 3er. Pago"
              name="thirdPaymentDate"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="thirdInvoiceNumber"
              label="N° Factura de Movento SAC"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha Factura de cliente"
              name="thirdInvoiceDate"
            />
          </div>
          <hr />
          <div className="grid md:grid-cols-6 gap-2">
            <Input
              size="sm"
              className="md:col-span-2"
              type="number"
              name="totalSaleUsd"
              label="Precio de Venta Total en USD (con IGV)"
              value={totalSaleUsd.toFixed(2)}
            />
            <Input
              size="sm"
              className="md:col-span-2"
              type="number"
              name="totalSalePen"
              label="Precio de Venta Total en S/. (con IGV)"
              value={totalSalePen.toFixed(2)}
            />
            <div className="md:col-span-2"></div>
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
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-5"
              type="text"
              name="supplierOrder1"
              label="N° OC a Proveedor No 1"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValueUsd1"
              value={advanceValueUsd1.toString()}
              onChange={(e) => setAdvanceValueUsd1(Number(e.target.value))}
              label="Valor Adelanto USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValuePen1"
              value={advanceValuePen1.toString()}
              onChange={(e) => setAdvanceValuePen1(Number(e.target.value))}
              label="Valor Adelanto en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Adelanto"
              name="advanceDate1"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="supplierInvoice1"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="invoiceDate1"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValueUsd1"
              value={balanceValueUsd1.toString()}
              onChange={(e) => setBalanceValueUsd1(Number(e.target.value))}
              label="Valor Saldo en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValuePen1"
              value={balanceValuePen1.toString()}
              onChange={(e) => setBalanceValuePen1(Number(e.target.value))}
              label="Valor Saldo en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Saldo"
              name="balanceDate1"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="balanceInvoice1"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="balanceInvoiceDate1"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostUsd1"
              value={totalCostUsd1.toFixed(2)}
              onChange={(e) => setTotalCostUsd_1(Number(e.target.value))}
              label="Costo Total en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostPen1"
              value={totalCostPen1.toFixed(2)}
              onChange={(e) => setTotalCostPen_1(Number(e.target.value))}
              label="Costo Total en S/. (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-2"
              type="text"
              name="supplierShipment1"
              label="N° Guía de Remisión del Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de GR"
              name="shipmentDate1"
            />
          </div>
        </>
        <hr />
        <>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-5"
              type="text"
              name="supplierOrder2"
              label="N° OC a Proveedor No 2"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValueUsd2"
              value={advanceValueUsd2.toString()}
              onChange={(e) => setAdvanceValueUsd2(Number(e.target.value))}
              label="Valor Adelanto USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValuePen2"
              value={advanceValuePen2.toString()}
              onChange={(e) => setAdvanceValuePen2(Number(e.target.value))}
              label="Valor Adelanto en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Adelanto"
              name="advanceDate2"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="supplierInvoice2"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="invoiceDate2"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValueUsd2"
              value={balanceValueUsd2.toString()}
              onChange={(e) => setBalanceValueUsd2(Number(e.target.value))}
              label="Valor Saldo en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValuePen2"
              value={balanceValuePen2.toString()}
              onChange={(e) => setBalanceValuePen2(Number(e.target.value))}
              label="Valor Saldo en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Saldo"
              name="balanceDate2"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="balanceInvoice2"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="balanceInvoiceDate2"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostUsd2"
              value={totalCostUsd2.toFixed(2)}
              onChange={(e) => setTotalCostUsd_2(Number(e.target.value))}
              label="Costo Total en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostPen2"
              value={totalCostPen2.toFixed(2)}
              onChange={(e) => setTotalCostPen_2(Number(e.target.value))}
              label="Costo Total en S/. (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-2"
              type="text"
              name="supplierShipment2"
              label="N° Guía de Remisión del Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de GR"
              name="shipmentDate2"
            />
          </div>
        </>
        <hr />
        <>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-5"
              type="text"
              name="supplierOrder3"
              label="N° OC a Proveedor No 3"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValueUsd3"
              value={advanceValueUsd3.toString()}
              onChange={(e) => setAdvanceValueUsd3(Number(e.target.value))}
              label="Valor Adelanto USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="advanceValuePen3"
              value={advanceValuePen3.toString()}
              onChange={(e) => setAdvanceValuePen3(Number(e.target.value))}
              label="Valor Adelanto en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Adelanto"
              name="advanceDate3"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="supplierInvoice3"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="invoiceDate3"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValueUsd3"
              value={balanceValueUsd3.toString()}
              onChange={(e) => setBalanceValueUsd3(Number(e.target.value))}
              label="Valor Saldo en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="balanceValuePen3"
              value={balanceValuePen3.toString()}
              onChange={(e) => setBalanceValuePen3(Number(e.target.value))}
              label="Valor Saldo en S/. (con IGV)"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Saldo"
              name="balanceDate3"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="text"
              name="balanceInvoice3"
              label="N° Factura de Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de Factura"
              name="balanceInvoiceDate3"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostUsd3"
              value={totalCostUsd3.toFixed(2)}
              onChange={(e) => setTotalCostUsd_3(Number(e.target.value))}
              label="Costo Total en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="totalCostPen3"
              value={totalCostPen3.toFixed(2)}
              onChange={(e) => setTotalCostPen_3(Number(e.target.value))}
              label="Costo Total en S/. (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-2"
              type="text"
              name="supplierShipment3"
              label="N° Guía de Remisión del Proveedor"
            />
            <DateInput
              size="sm"
              className="md:col-span-1"
              label="Fecha de GR"
              name="shipmentDate3"
            />
          </div>
        </>
        <hr />
        <div className="grid md:grid-cols-6 gap-2">
          <Input
            size="sm"
            className="md:col-span-2"
            type="number"
            name="totalSaleCostUsd"
            value={totalSaleCostUsd.toFixed(2)}
            label="Costo Total de Venta en USD (con IGV)"
          />
          <Input
            size="sm"
            className="md:col-span-2"
            type="number"
            name="totalSaleCostPen"
            value={totalSaleCostPen.toFixed(2)}
            label="Costo Total de Venta en S/. (con IGV)"
          />
          <div className="md:col-span-2"></div>
        </div>
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
              name="valueUsd"
              label="Valor de la Utilidad en USD"
              value={valueUsd.toFixed(2)}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="percentageUsd"
              label="Porcentaje (%)"
              value={percentageUsd.toFixed(2)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="valuePen"
              label="Valor de la Utilidad en S/."
              value={valuePen.toFixed(2)}
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="percentagePen"
              label="Porcentaje (%)"
              value={percentagePen.toFixed(2)}
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

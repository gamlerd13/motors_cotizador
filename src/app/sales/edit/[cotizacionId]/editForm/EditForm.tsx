"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, Checkbox, DateInput, useDisclosure } from "@nextui-org/react";
import { CalendarDate, DateValue } from "@internationalized/date";
import { FiTrash } from "react-icons/fi";
import { SaleStatusV2 } from "@prisma/client";

import ButtonSubmit from "@/components/Button";
import { ModalConfirmation } from "@/components/modal/ModalConfirmation";
import { useDeleteSale, usePutSale } from "../hooks/useSale";
import { useRouter } from "next/navigation";

import { SaleGet } from "@/models/sale";
import { differenceInDays } from "date-fns";

interface EditFormProps {
  sale: SaleGet;
}

const convertToCalendarDateTime = (
  date?: string | null
): CalendarDate | undefined => {
  if (!date) return undefined;

  const d = new Date(date);

  return new CalendarDate(
    d.getUTCFullYear(),
    d.getUTCMonth() + 1,
    d.getUTCDate()
  );
};
const formatNumber = (num: number | null | undefined) => {
  return num !== null && num !== undefined ? num.toFixed(2).toString() : "0.00";
};

function EditForm({ sale }: EditFormProps) {
  const { updateSale } = usePutSale();
  const { deleteSale } = useDeleteSale();
  const router = useRouter();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const [isPaidByClient, setIsPaidByClient] = useState<boolean>(
    sale?.isPaidByClient === "true" || sale?.isPaidByClient === true
  );
  const [isPaidByFactoring, setIsPaidByFactoring] = useState<boolean>(
    sale?.isPaidByFactoring === "true" || sale?.isPaidByFactoring === true
  );

  const [factoringPaymentAmountUsd, setFactoringPaymentAmountUsd] =
    useState<number>(sale.factoringPaymentAmountUsd || 0);
  const [advanceValueUsdClient, setAdvanceValueUsdClient] = useState<number>(
    sale.advanceValueUsdClient || 0
  );
  const [secondPaymentUsdClient, setSecondPaymentUsdClient] = useState<number>(
    sale.secondPaymentUsdClient || 0
  );
  const [thirdPaymentUsdClient, setThirdPaymentUsdClient] = useState<number>(
    sale.thirdPaymentUsdClient || 0
  );

  const [factoringPaymentAmountPen, setFactoringPaymentAmountPen] =
    useState<number>(sale.factoringPaymentAmountPen || 0);
  const [advanceValuePenClient, setAdvanceValuePenClient] = useState<number>(
    sale.advanceValuePenClient || 0
  );
  const [secondPaymentPenClient, setSecondPaymentPenClient] = useState<number>(
    sale.secondPaymentPenClient || 0
  );
  const [thirdPaymentPenClient, setThirdPaymentPenClient] = useState<number>(
    sale.thirdPaymentPenClient || 0
  );

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

  const [advanceValueUsd1, setAdvanceValueUsd1] = useState<number>(
    sale.advanceValueUsd1 || 0
  );
  const [balanceValueUsd1, setBalanceValueUsd1] = useState<number>(
    sale.balanceValueUsd1 || 0
  );
  const totalCostUsd1 = advanceValueUsd1 + balanceValueUsd1;
  const [advanceValuePen1, setAdvanceValuePen1] = useState<number>(
    sale.advanceValuePen1 || 0
  );
  const [balanceValuePen1, setBalanceValuePen1] = useState<number>(
    sale.balanceValuePen1 || 0
  );
  const totalCostPen1 = advanceValuePen1 + balanceValuePen1;

  const [advanceValueUsd2, setAdvanceValueUsd2] = useState<number>(
    sale.advanceValueUsd2 || 0
  );
  const [balanceValueUsd2, setBalanceValueUsd2] = useState<number>(
    sale.balanceValueUsd2 || 0
  );
  const totalCostUsd2 = advanceValueUsd2 + balanceValueUsd2;
  const [advanceValuePen2, setAdvanceValuePen2] = useState<number>(
    sale.advanceValuePen2 || 0
  );
  const [balanceValuePen2, setBalanceValuePen2] = useState<number>(
    sale.balanceValuePen2 || 0
  );
  const totalCostPen2 = advanceValuePen2 + balanceValuePen2;

  const [advanceValueUsd3, setAdvanceValueUsd3] = useState<number>(
    sale.advanceValueUsd3 || 0
  );
  const [balanceValueUsd3, setBalanceValueUsd3] = useState<number>(
    sale.balanceValueUsd3 || 0
  );
  const totalCostUsd3 = advanceValueUsd3 + balanceValueUsd3;
  const [advanceValuePen3, setAdvanceValuePen3] = useState<number>(
    sale.advanceValuePen3 || 0
  );
  const [balanceValuePen3, setBalanceValuePen3] = useState<number>(
    sale.balanceValuePen3 || 0
  );
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

  const [dueDate, setDueDate] = useState<Date | null>(
    sale.clientInvoiceDueDate ? new Date(sale.clientInvoiceDueDate) : null
  );
  const [daysUntilDue, setDaysUntilDue] = useState<number | null>(null);

  const handleDateChange = (value: DateValue) => {
    const date = value ? new Date(value.toString()) : null;
    setDueDate(date);
  };

  useEffect(() => {
    const calculateDaysRemaining = () => {
      if (dueDate) {
        const daysRemaining = differenceInDays(new Date(dueDate), new Date());
        // const currentDate = new Date();
        // const timeDifference = dueDate.getTime() - currentDate.getTime();
        // const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setDaysUntilDue(daysRemaining);
      }
    };

    calculateDaysRemaining();
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
    await updateSale(sale.id, formData);
  };

  return (
    <>
      <ModalConfirmation
        title="Eliminar venta"
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        contentString="Esta seguro de eliminar la venta ?"
        onClick={() => deleteSale(sale.id)}
      />
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
                defaultValue={sale.clientInvoiceNumber}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha Factura de cliente"
                name="clientInvoiceDate"
                defaultValue={convertToCalendarDateTime(sale.clientInvoiceDate)}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Vencimiento de Factura de cliente"
                name="clientInvoiceDueDate"
                defaultValue={convertToCalendarDateTime(
                  sale.clientInvoiceDueDate
                )}
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
                defaultValue={formatNumber(sale.advanceValueUsdClient)}
                onChange={(e) =>
                  setAdvanceValueUsdClient(Number(e.target.value))
                }
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValuePenClient"
                label="Valor Adelanto S/. (con IGV)"
                defaultValue={formatNumber(sale.advanceValuePenClient)}
                onChange={(e) =>
                  setAdvanceValuePenClient(Number(e.target.value))
                }
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Adelanto"
                name="advancePaymentDate"
                defaultValue={convertToCalendarDateTime(
                  sale.advancePaymentDate
                )}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="advanceInvoiceNumber"
                label="N° Factura de Movento SAC"
                defaultValue={sale.advanceInvoiceNumber}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha Factura de cliente"
                name="advanceInvoiceDate"
                defaultValue={convertToCalendarDateTime(
                  sale.advanceInvoiceDate
                )}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="secondPaymentUsdClient"
                label="Valor 2do.Pago USD (con IGV)"
                defaultValue={formatNumber(sale.secondPaymentUsdClient)}
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
                defaultValue={formatNumber(sale.secondPaymentPenClient)}
                onChange={(e) =>
                  setSecondPaymentPenClient(Number(e.target.value))
                }
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de 2do. Pago"
                name="secondPaymentDate"
                defaultValue={convertToCalendarDateTime(sale.secondPaymentDate)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="secondInvoiceNumber"
                label="N° Factura de Movento SAC"
                defaultValue={sale.secondInvoiceNumber}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha Factura de cliente"
                name="secondInvoiceDate"
                defaultValue={convertToCalendarDateTime(sale.secondInvoiceDate)}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="thirdPaymentUsdClient"
                label="Valor 3er.Pago USD (con IGV)"
                defaultValue={formatNumber(sale.thirdPaymentUsdClient)}
                onChange={(e) =>
                  setThirdPaymentUsdClient(Number(e.target.value))
                }
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="thirdPaymentPenClient"
                label="Valor 3er Pago S/. (con IGV)"
                defaultValue={formatNumber(sale.thirdPaymentPenClient)}
                onChange={(e) =>
                  setThirdPaymentPenClient(Number(e.target.value))
                }
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de 3er. Pago"
                name="thirdPaymentDate"
                defaultValue={convertToCalendarDateTime(sale.thirdPaymentDate)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="thirdInvoiceNumber"
                label="N° Factura de Movento SAC"
                defaultValue={sale.thirdInvoiceNumber}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha Factura de cliente"
                name="thirdInvoiceDate"
                defaultValue={convertToCalendarDateTime(sale.thirdInvoiceDate)}
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
                value={formatNumber(totalSaleUsd)}
              />
              <Input
                size="sm"
                className="md:col-span-2"
                type="number"
                name="totalSalePen"
                label="Precio de Venta Total en S/. (con IGV)"
                value={formatNumber(totalSalePen)}
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
                defaultValue={sale.supplierOrder1}
                label="N° OC a Proveedor No 1"
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValueUsd1"
                defaultValue={formatNumber(advanceValueUsd1)}
                onChange={(e) => setAdvanceValueUsd1(Number(e.target.value))}
                label="Valor Adelanto USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValuePen1"
                defaultValue={formatNumber(advanceValuePen1)}
                onChange={(e) => setAdvanceValuePen1(Number(e.target.value))}
                label="Valor Adelanto en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Adelanto"
                name="advanceDate1"
                defaultValue={convertToCalendarDateTime(sale.advanceDate1)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="supplierInvoice1"
                defaultValue={sale.supplierInvoice1}
                label="N° Factura de Proveedor"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="invoiceDate1"
                defaultValue={convertToCalendarDateTime(sale.invoiceDate1)}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValueUsd1"
                defaultValue={formatNumber(balanceValueUsd1)}
                onChange={(e) => setBalanceValueUsd1(Number(e.target.value))}
                label="Valor Saldo en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValuePen1"
                defaultValue={formatNumber(balanceValuePen1)}
                onChange={(e) => setBalanceValuePen1(Number(e.target.value))}
                label="Valor Saldo en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Saldo"
                name="balanceDate1"
                defaultValue={convertToCalendarDateTime(sale.balanceDate1)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="balanceInvoice1"
                label="N° Factura de Proveedor"
                defaultValue={sale.balanceInvoice1}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="balanceInvoiceDate1"
                defaultValue={convertToCalendarDateTime(
                  sale.balanceInvoiceDate1
                )}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostUsd1"
                value={formatNumber(totalCostUsd1)}
                label="Costo Total en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostPen1"
                value={formatNumber(totalCostPen1)}
                label="Costo Total en S/. (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-2"
                type="text"
                name="supplierShipment1"
                label="N° Guía de Remisión del Proveedor"
                defaultValue={sale.supplierShipment1}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de GR"
                name="shipmentDate1"
                defaultValue={convertToCalendarDateTime(sale.shipmentDate1)}
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
                defaultValue={sale.supplierOrder2}
                label="N° OC a Proveedor No 2"
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValueUsd2"
                defaultValue={formatNumber(advanceValueUsd2)}
                onChange={(e) => setAdvanceValueUsd2(Number(e.target.value))}
                label="Valor Adelanto USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValuePen2"
                defaultValue={formatNumber(advanceValuePen2)}
                onChange={(e) => setAdvanceValuePen2(Number(e.target.value))}
                label="Valor Adelanto en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Adelanto"
                name="advanceDate2"
                defaultValue={convertToCalendarDateTime(sale.advanceDate2)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="supplierInvoice2"
                defaultValue={sale.supplierInvoice2}
                label="N° Factura de Proveedor"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="invoiceDate2"
                defaultValue={convertToCalendarDateTime(sale.invoiceDate2)}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValueUsd2"
                defaultValue={formatNumber(balanceValueUsd2)}
                onChange={(e) => setBalanceValueUsd2(Number(e.target.value))}
                label="Valor Saldo en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValuePen2"
                defaultValue={formatNumber(balanceValuePen2)}
                onChange={(e) => setBalanceValuePen2(Number(e.target.value))}
                label="Valor Saldo en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Saldo"
                name="balanceDate2"
                defaultValue={convertToCalendarDateTime(sale.balanceDate2)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="balanceInvoice2"
                label="N° Factura de Proveedor"
                defaultValue={sale.balanceInvoice2}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="balanceInvoiceDate2"
                defaultValue={convertToCalendarDateTime(
                  sale.balanceInvoiceDate2
                )}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostUsd2"
                value={formatNumber(totalCostUsd2)}
                label="Costo Total en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostPen2"
                value={formatNumber(totalCostPen2)}
                label="Costo Total en S/. (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-2"
                type="text"
                name="supplierShipment2"
                label="N° Guía de Remisión del Proveedor"
                defaultValue={sale.supplierShipment2}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de GR"
                name="shipmentDate2"
                defaultValue={convertToCalendarDateTime(sale.shipmentDate2)}
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
                defaultValue={sale.supplierOrder3}
                label="N° OC a Proveedor No 3"
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValueUsd3"
                defaultValue={formatNumber(advanceValueUsd3)}
                onChange={(e) => setAdvanceValueUsd3(Number(e.target.value))}
                label="Valor Adelanto USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="advanceValuePen3"
                defaultValue={formatNumber(advanceValuePen3)}
                onChange={(e) => setAdvanceValuePen3(Number(e.target.value))}
                label="Valor Adelanto en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Adelanto"
                name="advanceDate3"
                defaultValue={convertToCalendarDateTime(sale.advanceDate3)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="supplierInvoice3"
                defaultValue={sale.supplierInvoice3}
                label="N° Factura de Proveedor"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="invoiceDate3"
                defaultValue={convertToCalendarDateTime(sale.invoiceDate3)}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValueUsd3"
                defaultValue={formatNumber(balanceValueUsd3)}
                onChange={(e) => setBalanceValueUsd3(Number(e.target.value))}
                label="Valor Saldo en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="balanceValuePen3"
                defaultValue={formatNumber(balanceValuePen3)}
                onChange={(e) => setBalanceValuePen3(Number(e.target.value))}
                label="Valor Saldo en S/. (con IGV)"
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Saldo"
                name="balanceDate3"
                defaultValue={convertToCalendarDateTime(sale.balanceDate3)}
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="balanceInvoice3"
                label="N° Factura de Proveedor"
                defaultValue={sale.balanceInvoice3}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de Factura"
                name="balanceInvoiceDate3"
                defaultValue={convertToCalendarDateTime(
                  sale.balanceInvoiceDate3
                )}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostUsd3"
                value={formatNumber(totalCostUsd3)}
                label="Costo Total en USD (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="number"
                name="totalCostPen3"
                value={formatNumber(totalCostPen3)}
                label="Costo Total en S/. (con IGV)"
              />
              <Input
                size="sm"
                className="md:col-span-2"
                type="text"
                name="supplierShipment3"
                label="N° Guía de Remisión del Proveedor"
                defaultValue={sale.supplierShipment3}
              />
              <DateInput
                size="sm"
                className="md:col-span-1"
                label="Fecha de GR"
                name="shipmentDate3"
                defaultValue={convertToCalendarDateTime(sale.shipmentDate3)}
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
              value={formatNumber(totalSaleCostUsd)}
              label="Costo Total de Venta en USD (con IGV)"
            />
            <Input
              size="sm"
              className="md:col-span-2"
              type="number"
              name="totalSaleCostPen"
              value={formatNumber(totalSaleCostPen)}
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
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="valueUsd"
              value={formatNumber(valueUsd)}
              label="Valor de la Utilidad en USD"
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="percentageUsd"
              value={formatNumber(percentageUsd)}
              label="Porcentaje (%)"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="valuePen"
              value={formatNumber(valuePen)}
              label="Valor de la Utilidad en S/."
            />
            <Input
              size="sm"
              className="md:col-span-1"
              type="number"
              name="percentagePen"
              value={formatNumber(percentagePen)}
              label="Porcentaje (%)"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 pt-4">
          <Button color="default" onClick={() => router.push("/sales")}>
            Ir a ventas
          </Button>

          {sale.status != SaleStatusV2.FINISHED && (
            <>
              {/* <Button color="danger" onClick={() => onOpenDelete()}>
                <FiTrash />
                Eliminar venta
              </Button> */}

              <ButtonSubmit text="Actualizar Venta" />
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default EditForm;

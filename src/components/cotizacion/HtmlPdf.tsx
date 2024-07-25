import { PdfCotizacion, ProductItemType } from "@/models/cotizacion";
import React from "react";
import { data } from "./data";
import Image from "next/image";

function HtmlPdf() {
  const {
    client,
    code,
    reference,
    date,
    contact,
    items,
    deliverTime,
    paymentCondition,
    totalPrice,
  } = data;
  return (
    <div className="w-full text-sm font-extralight">
      <div className="w-10/12">
        <div className="my-4">
          <h1 className="text-center font-bold text-2xl">
            OFERTA TÉCNICO COMERCIAL
          </h1>
        </div>

        <div className="my-4">
          <table>
            <tbody>
              <tr>
                <td>Numero de Cotización: </td>
                <td className="font-medium">{code}</td>
              </tr>
              <tr>
                <td>Fecha: </td>
                <td className="font-medium">{date}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <table className="w-full">
            <tbody className="border-1 border-black">
              <tr className="w-full ">
                <td className="border-1 border-black w-6/12">
                  <div className="flex flex-col">
                    <span>Razón social: MOVENTO S.A.C.</span>
                    <span>RUC: 20611599308</span>
                    <span>Calle Parque San Martin 376 - Pueblo Libre</span>
                  </div>
                </td>
                <td className="w-6/12">
                  <div className="flex flex-col">
                    <span>Telefono: 902196904</span>
                    <span>
                      Correo:{" "}
                      <span className="text-blue-700 font-light underline">
                        ventas@moventodrives.com
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <h1 className="text-lg font-normal  bg-blue-950 text-white py-2">
            Cliente
          </h1>
          <table>
            <tbody>
              <tr>
                <td className="w-32">Cliente:</td>
                <td>{client}</td>
              </tr>
              <tr>
                <td>Refencia:</td>
                <td>{reference}</td>
              </tr>
              <tr>
                <td>Contacto:</td>
                <td>{contact}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <TableItems items={items} totalPrice={totalPrice} />
        </div>

        <div className="my-4">
          <h1 className="text-lg font-normal  bg-blue-950 text-white py-2">
            Condiciones Comerciales
          </h1>
          <table>
            <tbody>
              <tr>
                <td className="w-48">PLAZO DE ENTREGA:</td>
                <td>{deliverTime}</td>
              </tr>
              <tr>
                <td>CONDICIÓN DE PAGO:</td>
                <td>{paymentCondition}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-4 flex justify-center">
          <Image
            className="border-1 border-black"
            alt="logo"
            height={100}
            src="/logo.png"
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

function TableItems({
  items,
  totalPrice,
}: {
  items: ProductItemType[];
  totalPrice: number;
}) {
  return (
    <table className="w-full font-extralight ">
      <thead>
        <tr className="bg-blue-950 text-white">
          <th className="py-4">Item</th>
          <th>Descripción</th>
          <th>Cant.</th>
          <th>Precio total S/.</th>
        </tr>
      </thead>
      <tbody className="border-1 border-black">
        {/* Aca el map */}
        {items.map((item) => (
          <tr className="border-1 border-black" key={item.key}>
            <td className="border-1 border-black text-center">{item.key}</td>
            <td className="px-2 border-1 border-black">
              <div className="flex flex-col">
                <span className="font-medium">{item.description}</span>
                <span>Modelo: {item.model}</span>
              </div>
            </td>
            <td className="px-2 border-1 border-black">{item.amount}</td>
            <td className="px-2 border-1 border-black">{item.totalPrice}</td>
          </tr>
        ))}
        <tr className="border-1 border-black">
          <td></td>
          <td colSpan={2} className="">
            PRECIO DE VENTA TOTAL (NO INCLUYE I.G.V.)
          </td>
          <td className="border-1 border-black font-medium">
            S/. {totalPrice}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HtmlPdf;

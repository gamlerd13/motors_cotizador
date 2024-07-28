import { PdfCotizacion } from "@/models/cotizacion";

export const data: PdfCotizacion = {
  id: 1,
  code: "COT20230724-01",
  clientName: "Empresa ABC",
  clientReference: "Proyecto XYZ",
  date: "2024-07-24",
  clientContact: "Juan Pérez",
  totalPrice: 2500,
  items: [
    {
      key: 1,
      description: "Producto A",
      model: "Modelo A",
      amount: 10,
      unitPrice: 50,
      totalPrice: 500,
    },
    {
      key: 2,
      description: "Producto B",
      model: "Modelo B",
      amount: 5,
      unitPrice: 100,
      totalPrice: 500,
    },
  ],
  deliverTime: "2 semanas",
  paymentCondition: "30 días",
};

// const cotizacion2: PdfCotizacion = {
//   id: 2,
//   code: "COT20230724-02",
//   client: "Empresa DEF",
//   reference: "Mantenimiento Anual",
//   date: "2024-07-24",
//   contact: "María López",
//   totalPrice: 2500,
//   items: [
//     {
//       id: 1,
//       description: "Servicio de Mantenimiento",
//       model: "Modelo B",

//       amount: 1,
//       unitPrice: 2000,
//       totalPrice: 2000,
//     },
//     {
//       id: 2,
//       description: "Producto C",
//       model: "Modelo B",

//       amount: 3,
//       unitPrice: 150,
//       totalPrice: 450,
//     },
//   ],
//   deliverTime: "1 semana",
//   paymentCondition: "15 días",
// };

// const cotizacion3: PdfCotizacion = {
//   id: 3,
//   code: "COT20230724-03",
//   client: "Empresa GHI",
//   reference: "Implementación de Software",
//   date: "2024-07-24",
//   contact: "Carlos Gómez",
//   totalPrice: 2500,
//   items: [
//     {
//       id: 1,
//       description: "Software XYZ",
//       model: "Modelo B",

//       amount: 2,
//       unitPrice: 5000,
//       totalPrice: 10000,
//     },
//     {
//       id: 2,
//       description: "Capacitación",
//       model: "Modelo B",

//       amount: 1,
//       unitPrice: 1500,
//       totalPrice: 1500,
//     },
//   ],
//   deliverTime: "1 mes",
//   paymentCondition: "50% al inicio, 50% al finalizar",
// };

import React, { useState } from "react";
import { ProductItems } from "@/models/cotizacion";
export default function BodyItems() {
  const [Items, setItems] = useState<ProductItems[] | null>(null);

  setItems([
    {
      id: 1,
      description: "",
      amount: 0,
      unitPrice: 0,
      totalPrice: 0,
    },
  ]);

  return <tbody></tbody>;
}

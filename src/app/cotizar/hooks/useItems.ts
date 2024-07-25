import { ProductItemType } from "@/models/cotizacion";
import { useState } from "react";
import { toast } from "sonner";

interface Price {
  key: number;
  total: number;
}

export default function useItems() {
  const initialItemValues = {
    description: "",
    model: "",
    amount: 0,
    unitPrice: 0,
    totalPrice: 0,
  };
  const [Items, setItems] = useState<ProductItemType[]>([
    {
      key: 1,
      ...initialItemValues,
    },
  ]);
  const [prices, setPrices] = useState<Price[]>([
    {
      key: 1,
      total: 0,
    },
  ]);
  const [nextKey, setNextKey] = useState<number>(2);

  const addItem = () => {
    setItems((prevItem) => [
      ...prevItem,
      { key: nextKey, ...initialItemValues },
    ]);
    setPrices((prevPrice) => [...prevPrice, { key: nextKey, total: 0 }]);
    setNextKey((prevKey) => prevKey + 1);
  };

  //Con esto se trabaja el tema de los items dinamicos en el cliente, pero consume muchos recursos
  const updateItem = (id: number, clave: string, valor: string | number) => {
    console.log(id, clave, valor);
    setItems((prevValues) =>
      prevValues.map((item) =>
        item.key === id ? { ...item, [clave]: valor } : item
      )
    );
    // setItems((prevValues) => [
    //   ...prevValues.filter((item) => item.key !== id),
    //   { key: id, [clave]: valor, ...initialItemValues },
    // ]);
  };

  const removeItem = (idItem: number) => {
    if (Items.length == 1) {
      toast.error("Tiene que tener al menos un Item");
      return;
    }
    setItems((prevItem) => prevItem.filter((item) => item.key !== idItem));
    setPrices((prevPrice) => prevPrice.filter((price) => price.key !== idItem));
  };

  return {
    Items,
    addItem,
    updateItem,
    removeItem,
    prices,
    setPrices,
  };
}

//This ia correct code, id anything in the future doesn't work

/* import { useState } from "react";
import { toast } from "sonner";
interface Item {
  key: number;
}
interface Price {
  key: number;
  total: number;
}

export default function useItems() {
  const [Items, setItems] = useState<Item[]>([
    {
      key: 1,
    },
  ]);
  const [prices, setPrices] = useState<Price[]>([
    {
      key: 1,
      total: 0,
    },
  ]);
  const [nextKey, setNextKey] = useState<number>(2);

  const addItem = () => {
    setItems((prevItem) => [...prevItem, { key: nextKey }]);
    setPrices((prevPrice) => [...prevPrice, { key: nextKey, total: 0 }]);
    setNextKey((prevKey) => prevKey + 1);
  };

  const removeItem = (idItem: number) => {
    if (Items.length == 1) {
      toast.error("Tiene que tener al menos un Item");
      return;
    }
    setItems((prevItem) => prevItem.filter((item) => item.key !== idItem));
    setPrices((prevPrice) => prevPrice.filter((price) => price.key !== idItem));
  };

  return {
    Items,
    addItem,
    removeItem,
    prices,
    setPrices,
  };
}
 */

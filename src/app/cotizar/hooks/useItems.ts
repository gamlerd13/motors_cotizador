import { useState } from "react";
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

// import { useState } from "react";
// import { toast } from "sonner";
// interface Item {
//   key: number;
// }

// export default function useItems() {
//   const [Items, setItems] = useState<Item[]>([
//     {
//       key: 1,
//     },
//   ]);
//   const [nextKey, setNextKey] = useState<number>(2);

//   const addItem = () => {
//     setItems((prevItem) => [...prevItem, { key: nextKey }]);
//     setNextKey((prevKey) => prevKey + 1);
//   };
//   const removeItem = (idItem: number) => {
//     if (Items.length == 1) {
//       toast.error("Tiene que tener al menos un Item");
//       return;
//     }
//     setItems((prevItem) => prevItem.filter((item) => item.key !== idItem));
//   };

//   return {
//     Items,
//     addItem,
//     removeItem,
//   };
// }

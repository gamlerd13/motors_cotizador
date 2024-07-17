import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
interface Item {
  key: number;
}
interface Price {
  key: number;
  total: number;
}
interface ItemProp {
  item: Item;
  removeItem: (itemId: number) => void;
  index: number;
  setPrices: React.Dispatch<React.SetStateAction<Price[]>>;
}
export default function ProductItem({
  item,
  removeItem,
  index,
  setPrices,
}: ItemProp) {
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  useEffect(() => {
    const updatePrices = (key: number) => {
      console.log("Cantidad: ", itemAmount, "Precio unitario: ", unitPrice);

      setPrices((prevPrices) =>
        prevPrices.map((price: Price) =>
          price.key === key
            ? { ...price, total: unitPrice * itemAmount }
            : price
        )
      );
    };
    updatePrices(item.key);
  }, [itemAmount, unitPrice]);

  return (
    <div className="w-full">
      <hr className="pb-2" />

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-grow">
          <Input type="hidden" name={`${index}_id`} value={index.toString()} />
          <span className="bg-slate-100 rounded-xl flex items-center justify-center w-20 h-full text-center text-md me-2">
            {index}
          </span>

          <Input
            className="w-full me-2"
            type="text"
            name={`${item.key}_description`}
            label="Descripción"
          />
          <Input type="text" name={`${item.key}_model`} label="Modelo" />
        </div>

        <div className="flex flex-grow gap-2 min-w-[360px]">
          <Input
            className="flex-none w-[90px]"
            type="number"
            name={`${index}_amount`}
            label="Cantidad"
            value={itemAmount.toString()}
            onChange={(e) => {
              setItemAmount(parseFloat(e.target.value));
              // handlePrices(item.key);
            }}
          />
          <Input
            className="min-w-[120px]"
            type="number"
            name={`${index}_unitprice`}
            label="P. Unitario"
            value={unitPrice.toString()}
            onChange={(e) => {
              setUnitPrice(parseFloat(e.target.value));
              // handlePrices(item.key);
            }}
          />
          <Input
            type="hidden"
            value={(itemAmount * unitPrice).toString()}
            name={`${index}_totalprice`}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            type="number"
            label="P. Total"
            value={(itemAmount * unitPrice).toString()}
            disabled
          />
        </div>

        <div>
          <Button
            className="h-full hover:text-white hover:bg-rose-700 py-2"
            type="button"
            onClick={() => removeItem(item.key)}
          >
            <BiTrash className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}

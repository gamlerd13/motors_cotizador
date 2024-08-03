import { ProductItemType } from "@/models/cotizacion";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

interface Price {
  key: number;
  total: number;
}
interface ItemProp {
  item: ProductItemType;
  updateItem: (id: number, clave: string, valor: string | number) => void;
  removeItem: (itemId: number) => void;
  index: number;
  setPrices: React.Dispatch<React.SetStateAction<Price[]>>;
}
export default function ProductItem({
  item,
  updateItem,
  removeItem,
  index,
  setPrices,
}: ItemProp) {
  const [itemAmount, setItemAmount] = useState<number>(item.amount);
  const [unitPrice, setUnitPrice] = useState<number>(item.unitPrice);

  useEffect(() => {
    const updatePrices = (key: number) => {
      setPrices((prevPrices) =>
        prevPrices.map((price: Price) =>
          price.key === key
            ? { ...price, total: unitPrice * itemAmount }
            : price
        )
      );
    };
    updatePrices(item.key);
  }, [itemAmount, unitPrice, item.key, setPrices]);

  return (
    <div className="w-full">
      <hr className="pb-2" />

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-grow gap-2">
          <Input
            type="hidden"
            name={`${item.key}_id`}
            value={item.key.toString()}
          />
          <Button
            size="sm"
            className="h-full hover:text-white hover:bg-rose-700 py-2"
            type="button"
            onClick={() => removeItem(item.key)}
          >
            <BiTrash className="text-lg" />
          </Button>

          <Input
            size="sm"
            className="w-full"
            type="text"
            name={`${item.key}_description`}
            defaultValue={item.description}
            label="Descripción"
            required
          />
          <Input
            size="sm"
            type="text"
            name={`${item.key}_model`}
            defaultValue={item.model}
            label="Modelo"
          />
        </div>

        <div className="flex flex-grow gap-2 min-w-[345px]">
          <Input
            size="sm"
            required
            className="flex-none w-[90px]"
            type="number"
            name={`${item.key}_amount`}
            label="Cantidad"
            value={itemAmount.toString()}
            defaultValue={item.amount.toString()} //manejar en state
            onChange={(e) => {
              setItemAmount(parseFloat(e.target.value));
              // handlePrices(item.key);
            }}
          />
          <Input
            size="sm"
            className="min-w-[110px]"
            type="number"
            name={`${item.key}_unitprice`}
            label="P. Unitario"
            value={unitPrice.toString()}
            defaultValue={item.unitPrice.toString()} //manejar en state
            onChange={(e) => {
              setUnitPrice(parseFloat(e.target.value));
              // handlePrices(item.key);
            }}
          />
          <Input
            size="sm"
            type="hidden"
            value={(itemAmount * unitPrice).toFixed(2).toString()}
            name={`${item.key}_totalprice`}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            size="sm"
            type="number"
            label="P. Total"
            value={(itemAmount * unitPrice).toFixed(2).toString()}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

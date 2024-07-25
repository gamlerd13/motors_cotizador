import { ProductItemType } from "@/models/cotizacion";
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
        <div className="flex flex-grow gap-2">
          <Input type="hidden" name={`${index}_id`} value={index.toString()} />
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
            label="Descripción"
          />
          <Input
            size="sm"
            type="text"
            name={`${item.key}_model`}
            label="Modelo"
          />
        </div>

        <div className="flex flex-grow gap-2 min-w-[345px]">
          <Input
            size="sm"
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
            size="sm"
            className="min-w-[110px]"
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
            size="sm"
            type="hidden"
            value={(itemAmount * unitPrice).toString()}
            name={`${index}_totalprice`}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            size="sm"
            type="number"
            label="P. Total"
            value={(itemAmount * unitPrice).toString()}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="w-full">
      <hr className="pb-2" />

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-grow gap-2">
          <Input type="hidden" name={`${index}_id`} value={index.toString()} />
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
            label="Descripción"
          />
          <Input
            size="sm"
            type="text"
            name={`${item.key}_model`}
            label="Modelo"
          />
        </div>

        <div className="flex flex-grow gap-2 min-w-[345px]">
          <Input
            size="sm"
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
            size="sm"
            className="min-w-[110px]"
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
            size="sm"
            type="hidden"
            value={(itemAmount * unitPrice).toString()}
            name={`${index}_totalprice`}
            onChange={(e) => console.log(e.target.value)}
          />
          <Input
            size="sm"
            type="number"
            label="P. Total"
            value={(itemAmount * unitPrice).toString()}
            disabled
          />
        </div>
      </div>
    </div> */
}

//este codigo es para trabajar con estado el tema de los items dinamicos, ya que de la otra manera consume
//muchos recursos en el cliente
/* <div className="w-full">
      <hr className="pb-2" />

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-grow gap-2">
          <Input
            type="hidden"
            value={index.toString()}
            onChange={
              (e) => updateItem(item.key, "id", e.target.value)
              // { ...valueItems, id: parseInt(e.target.value)
            }
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
            label="Descripción"
            onChange={(e) =>
              updateItem(item.key, "description", e.target.value)
            }
          />
          <Input
            size="sm"
            type="text"
            label="Modelo"
            onChange={(e) => updateItem(item.key, "model", e.target.value)}
          />
        </div>

        <div className="flex flex-grow gap-2 min-w-[345px]">
          <Input
            size="sm"
            className="flex-none w-[90px]"
            type="number"
            label="Cantidad"
            value={itemAmount.toString()}
            onChange={(e) => {
              setItemAmount(parseFloat(e.target.value));
              updateItem(item.key, "amount", e.target.value);

              // handlePrices(item.key);
            }}
          />
          <Input
            size="sm"
            className="min-w-[110px]"
            type="number"
            label="P. Unitario"
            value={unitPrice.toString()}
            onChange={(e) => {
              setUnitPrice(parseFloat(e.target.value));
              updateItem(item.key, "unitPrice", e.target.value);
            }}
          />
          <Input
            size="sm"
            type="hidden"
            value={(itemAmount * unitPrice).toString()}
            // onChange={(e) => updateItem(item.key, "totalPrice", e.target.value)}
          />
          <Input
            size="sm"
            type="number"
            label="P. Total"
            value={(itemAmount * unitPrice).toString()}
            disabled
          />
        </div>
      </div>
    </div>*/

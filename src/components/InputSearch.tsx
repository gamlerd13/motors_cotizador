import { Input } from "@nextui-org/react";
import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";

interface InputSearch {
  value: string;
  setValue: (value: string) => void;
}
export function InputSearch({ value, setValue }: InputSearch) {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Buscar..."
      startContent={<IoSearchCircleOutline />}
      value={value}
      onValueChange={(e) => setValue(e)}
    />
  );
}

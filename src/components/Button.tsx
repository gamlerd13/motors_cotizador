import React from "react";
import { Button } from "@nextui-org/react";
import { PiPlusCircleDuotone } from "react-icons/pi";

interface ButtonSubmitProps {
  text?: string;
  action?: () => void;
}

export default function ButtonSubmit({ text, action }: ButtonSubmitProps) {
  return (
    <Button onClick={action} color="success" type="submit">
      {text ? text : "Enviar"}
    </Button>
  );
}

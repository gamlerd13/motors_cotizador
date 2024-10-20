import { useEffect, useState } from "react";
import { DateInput } from "@nextui-org/react"; // Asegúrate de importar el componente correcto
import { CalendarDate } from "@internationalized/date";

export const useDateTime = () => {
  const [currentDateTime, setCurrentDateTime] =
    useState<CalendarDate | null>(null);

  useEffect(() => {
    const now = new Date();
    const dateTime = new CalendarDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
    );
    setCurrentDateTime(dateTime);
  }, []);

  return {
    currentDateTime,
  };
};

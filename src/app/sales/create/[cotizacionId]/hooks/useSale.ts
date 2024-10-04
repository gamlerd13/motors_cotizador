"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useSale() {
  const router = useRouter();
  const [ sale, setSale ] = useState<string | null>(null);
  const createExpense = async (formDataNewSale: FormData) => {
    try {
      const formDataEntries = Object.fromEntries(formDataNewSale.entries());
  
      if (!formDataEntries.cotizacionId) {
        toast.error("El ID de cotización es requerido.");
        return;
      }
  
      const response = await axios.post("/api/sale", formDataEntries, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        toast.success("Se creó una venta exitosamente");
        setSale(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error en useSale:", error);
      toast.error("Hubo un error al crear la venta.");
    }
  };

  return {
    createExpense
  }
}
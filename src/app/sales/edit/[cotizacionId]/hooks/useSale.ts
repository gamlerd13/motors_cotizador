"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SaleGet } from "@/models/sale";
import { useRouter } from "next/navigation";

export function useSale(cotizacionId: string) {
  const [sale, setSale] = useState<SaleGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`/api/saleByCotizacion/${cotizacionId}`);
        setSale(response.data);
      } catch (err: any) {
        console.error("Error fetching sale data:", err);
        setError(err.response?.data?.error || "Error al obtener datos");
        toast.error(err.response?.data?.error || "Error al obtener datos");
      } finally {
        setLoading(false);
      }
    };

    if (cotizacionId) {
      fetchSale();
    }
  }, [cotizacionId]);

  return { sale, loading, error };
}

export const usePutSale = () => {
  const router = useRouter();
  const [responseNewSale, setResponseNewSale] = useState<
    string | null
  >(null);
  
  const updateSale = async (
    id: number,
    formDataNewSale: FormData
  ) => {
    try {
      const formDataEntries = Object.fromEntries(
        formDataNewSale.entries()
      );
      const response = await axios.put(
        `/api/sale/${id}`,
        JSON.stringify(formDataEntries), {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status == 200) {
        toast.success("Se actualizó una venta exitosamente");
        setResponseNewSale(response.data);
        router.push("/cotizaciones");
      }
    } catch (error) {
      console.error("Hubo un error en usePutSale");
      toast.error("Error al actualizar la venta")
    }
  };

  return {
    responseNewSale,
    updateSale,
  };
};

export const useDeleteSale = () => {
  const router = useRouter();

  const deleteSale = useCallback(async (id: number) => {
    try {
      const { status } = await axios.delete(`/api/sale/${id}`);
      if (status === 200) {
        toast.success("Se eliminó la venta exitosamente");
        router.push("/cotizaciones");
      }
    } catch (error) {
      toast.error("Error al eliminar la venta");
    }
  }, [router]);

  return { deleteSale };
};

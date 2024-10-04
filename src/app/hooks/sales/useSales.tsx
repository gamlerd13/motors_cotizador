import { useState, useCallback } from "react";
import axios from "axios";
import { SaleExport } from "@/models/sale";

export const useSales = () => {
  const [sales, setSales] = useState<SaleExport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/sale");
      setSales(response.data);
    } catch (err) {
      setError("Error obteniendo las ventas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { sales, loading, fetchSales };
};

import { useState, useCallback } from "react";
import axios from "axios";
import { SaleExport, SaleWithRelations } from "@/models/sale";

export const useSales = () => {
  const [sales, setSales] = useState<SaleWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async (seeAll: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/sale?seeAll=${seeAll}`);
      setSales(response.data);
    } catch (err) {
      setSales([]);
      setError("Error obteniendo las ventas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { sales, loading, fetchSales };
};

export const useExportSales = () => {
  const [sales, setSales] = useState<SaleExport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/sale/export");
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

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUpdateCotizacion } from "../hooks/cotizacion/useCotizacion";
import { useSales } from "../hooks/sales/useSales";
import CotizacionesTable from "./CotizacionesTable";

export default function CotizacionesList() {
  const router = useRouter();

  const {
    cotizacionList,
    updateCotizacion,
    isLoading: isCotizacionLoading,
  } = useGetUpdateCotizacion();

  const { sales, loading: isSalesLoading, fetchSales } = useSales();

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  if (isCotizacionLoading || isSalesLoading) {
    return <div>Cargando...</div>;
  }

  const createSale = (cotizacionId: number) => {
    router.push(`/sales/create/${cotizacionId}`);
  };

  const editSale = (cotizacionId: number) => {
    router.push(`/sales/edit/${cotizacionId}`);
  };

  return (
    <div>
      <CotizacionesTable
        cotizacionList={cotizacionList}
        updateCotizacion={updateCotizacion}
        isLoading={isCotizacionLoading || isSalesLoading}
        createSale={createSale}
        editSale={editSale}
        sales={sales}
      />
    </div>
  );
}

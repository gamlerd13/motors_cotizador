"use client";
import React from "react";
import { useGetUpdateCotizacion } from "../hooks/cotizacion/useCotizacion";
import CotizacionesTable from "./CotizacionesTable";

export default function CotizacionesList() {
  const { cotizacionList, updateCotizacion, isLoading } =
    useGetUpdateCotizacion();

  if (!isLoading) console.log(cotizacionList);
  return (
    <div>
      <CotizacionesTable
        cotizacionList={cotizacionList}
        updateCotizacion={updateCotizacion}
        isLoading={isLoading}
      />
    </div>
  );
}

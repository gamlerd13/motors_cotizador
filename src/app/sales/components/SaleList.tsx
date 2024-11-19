"use client";

import React, { useEffect, useState } from "react";
import { useSales } from "@/app/hooks/sales/useSales";
import SaleTable from "./SaleTable";

export default function SaleList() {
  const { sales, loading, fetchSales } = useSales();
  const [seeAll, setSeeAll] = useState(false);

  useEffect(() => {
    fetchSales(seeAll);
  }, [seeAll]);

  return (
    <div>
      <SaleTable
        isLoading={loading}
        fetchSales={fetchSales}
        sales={sales}
        setSeeAll={setSeeAll}
        seeAll={seeAll}
      />
    </div>
  );
}

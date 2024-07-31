"use client";

import { useGetClientList } from "../hooks/clients/useClient";
import ClientesTable from "./ClientesTable";

export default function ClientesList() {
  const { clientList, isLoading } = useGetClientList();

  console.log(clientList)
  return (
    <div>
      <ClientesTable
        clientList={clientList}
        isLoading={isLoading}
      />
      {/* <CotizacionesTable */}
      {/*   cotizacionList={cotizacionList} */}
      {/*   updateCotizacion={updateCotizacion} */}
      {/*   isLoading={isLoading} */}
      {/* /> */}
    </div>
  );
}

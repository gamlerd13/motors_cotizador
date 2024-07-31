import { getDateHour } from "@/lib/main";
import { Client } from "@/models/client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

interface ClientesTable {
  clientList: Client[] | null,
  isLoading: boolean
}

function ClientesTable({ clientList, isLoading }: ClientesTable) {
  const safeClientList = clientList ?? [];

  return (
    <>

      <Table
        aria-label="Example table with dynamic content"
        className=""
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[200px]",
        }}
        isCompact
        removeWrapper
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Ruc</TableColumn>
          <TableColumn>Fecha Creación</TableColumn>
          <TableColumn>Contacto</TableColumn>
          <TableColumn>Referencia</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={safeClientList}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {
            (client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.ruc}</TableCell>
                <TableCell>
                  <div> {getDateHour(client.createAt)[0]}</div>
                  <div>{getDateHour(client.createAt)[1]}</div>
                </TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.reference}</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </ >
  );
}

export default ClientesTable;

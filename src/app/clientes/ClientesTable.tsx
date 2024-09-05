import { useAppContext } from "@/context";
import { getDateHour } from "@/lib/main";
import { Client, ClientForm } from "@/models/client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
} from "@nextui-org/react";
import { SetStateAction } from "react";

interface ClientesTable {
  clientList: Client[] | null;
  isLoading: boolean;
  isActiveCreateClient: boolean;
  setIsActiveCreateClient: React.Dispatch<SetStateAction<boolean>>;
}

function ClientesTable({
  clientList,
  isLoading,
  isActiveCreateClient,
  setIsActiveCreateClient,
}: ClientesTable) {
  const safeClientList = clientList ?? [];

  const { clients, setClientValue, setIsEdit } = useAppContext();

  const handleClick = (id: number) => {
    setIsActiveCreateClient(true);
    setIsEdit(true);

    const findClient = clients.find((client) => client.id == id);

    if (findClient) {
      const clientEdit: ClientForm = {
        clientId: id,
        clientName: findClient.name,
        clientContact: findClient.contact,
        clientRuc: findClient.ruc,
        clientReference: findClient.reference,
        clientDate: findClient.createAt
          ? new Date(findClient.createAt)
          : undefined,
      };

      setClientValue(clientEdit);
    }
  };

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
          {(client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.ruc}</TableCell>
              <TableCell>
                {client.createAt && (
                  <>
                    <div> {getDateHour(client.createAt)[0]}</div>
                    <div>{getDateHour(client.createAt)[1]}</div>
                  </>
                )}
              </TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>{client.reference}</TableCell>
              <TableCell>
                <Button
                  className="bg-indigo-600 text-[#FAFAFA]"
                  size="sm"
                  onClick={() =>
                    client.id !== undefined && handleClick(client.id)
                  }
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default ClientesTable;

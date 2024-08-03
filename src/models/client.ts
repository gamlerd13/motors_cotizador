export interface Client {
  id: number;
  name: string;
  contact: string;
  ruc: string;
  reference: string;
  createAt?: string;
}

export interface ClientCreate {
  create: {
    name: string;
    contact: string;
    ruc: string | null;
    reference: string;
    createAt: Date;
  };
}

export interface ClientForm {
  clientId?: number;
  clientName: string;
  clientContact: string;
  clientRuc: string;
  clientReference: string;
  clientDate?: Date;
}

import { CotizacionStatus } from "@prisma/client";

// Finalizar cotización
export interface CotizacionEnd {
  id: number;
  name: string;
  code: string;
  status: CotizacionStatus;
}

export interface FileObject {
  id: number;
  file: File | null;
}

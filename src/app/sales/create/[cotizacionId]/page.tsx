"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { FC } from "react";
import CreateForm from "./createForm/CreateForm";
import { useCotizacion } from "./hooks/useCotizacion";

interface CreateSalePageProps {
  params: {
    cotizacionId: string;
  };
}

const CreateSalePage: FC<CreateSalePageProps> = ({ params }) => {
  const { cotizacionId } = params;
  const { cotizacion } = useCotizacion(cotizacionId);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            {cotizacion && (
              <CreateForm cotizacion={cotizacion} cotizacionId={cotizacionId} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
};

export default CreateSalePage;

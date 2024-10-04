"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { FC } from "react";
import EditForm from "./editForm/EditForm";
import { useSale } from "./hooks/useSale";

interface EditSalePageProps {
  params: {
    cotizacionId: string;
  };
}

const EditSalePage: FC<EditSalePageProps> = ({ params }) => {
  const { cotizacionId } = params;
  const { sale, loading, error } = useSale(cotizacionId);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            {sale && sale.length > 0 ? (
              <EditForm sale={sale[0]} />
            ) : (
              <div>No hay ventas para esta cotización.</div>
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

export default EditSalePage;

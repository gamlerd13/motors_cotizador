import React from "react";
import NavBar from "@/components/NavBar";
import CotizacionesList from "./CotizacionesList";
import TitlePage from "@/components/TitlePage";

function App() {
  return (
    <div>
      <NavBar />
      <div className="w-full flex justify-center">
        <div className="p-4 sm:w-9/12">
          <TitlePage title="Cotizaciones" />
          <CotizacionesList />
        </div>
      </div>
    </div>
  );
}
export default App;

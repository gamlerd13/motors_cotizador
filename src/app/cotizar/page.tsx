import React from "react";
import CotizarForm from "./formCotizacion/CotizarForm";
import NavBar from "@/components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="w-full flex justify-center">
        <div className="p-4 sm:w-9/12">
          <CotizarForm />
        </div>
      </div>
    </div>
  );
}

export default App;

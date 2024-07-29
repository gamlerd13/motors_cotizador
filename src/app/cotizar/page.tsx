import React from "react";
import CotizarForm from "./formCotizacion/CotizarForm";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            <CotizarForm />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
}

export default App;

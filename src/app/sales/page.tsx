"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import TitlePage from "@/components/TitlePage";
import Footer from "@/components/Footer";
import SaleList from "./components/SaleList";

function App() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12 w-full">
            <TitlePage title="Ventas" />
            <SaleList />
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

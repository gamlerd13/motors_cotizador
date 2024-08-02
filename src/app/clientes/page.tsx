import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
import Client from "./Client";

function page() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <main>
        <NavBar />

        <Client />
      </main>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
}

export default page;

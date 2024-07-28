"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import HtmlPdf from "@/components/cotizacion/HtmlPdf";
import { Button } from "@nextui-org/button";

import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import ReactPdfComponent from "@/components/cotizacion/React-pdf";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HtmlPdf />

      {/* <PDFDownloadLink document={<ReactPdfComponent />} fileName="motors.pdf">
        <Button>DEscargar pdf</Button>
      </PDFDownloadLink> */}
    </main>
  );
}

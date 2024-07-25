import Image from "next/image";
import NavBar from "@/components/NavBar";
import HtmlPdf from "@/components/cotizacion/HtmlPdf";
export default function Home() {
  return (
    <main>
      <NavBar />
      <HtmlPdf />
    </main>
  );
}

import Cadastrar from "@/components/Cadastrar";
import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function FormCadastrar() {
  return (
    <main>
     {/*  <div className="h-[100vh] home">
        <Navbar/>
      </div> */}
      <div>
        <Cadastrar/>
      </div>
      <Footer/>
    </main>
  );
}
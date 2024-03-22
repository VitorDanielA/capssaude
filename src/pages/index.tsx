import Especialidades from "@/components/Especialidades";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main id="home">
      <div className="min-h-[100vh] home">
        <Navbar/>
      </div>
      <div id="logar">
        <Login/>
      </div>
      <div id="service">
        <Especialidades/>
      </div>
    </main>
  );
}

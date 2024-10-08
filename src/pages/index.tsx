import Contato from "@/components/Contato";
import Especialidades from "@/components/Especialidades";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main id="home">
            <div className="h-[100vh] home flex items-center justify-start ps-1 pt-20 " >
                <div className="">
                    <div className="max-w-[500x] lg:max-w-[500px] h-[520px] lg:h-[500px] bg-blue-500 text-white mx-2 card-apresentacao rounded-3xl flex flex-col px-4 lg:px-20 tracking-tighter leading-tight">
                        <h1 className="text-7xl lg:text-7xl font-black my-1 uppercase pt-4">syscaps<br />saúde</h1>
                        <h2 className="text-5xl lg:text-5xl font-bold">Bem vindo <br />ao SysCaps Saúde</h2>
                        <p className="mt-10 lg:mt-5 font-medium text-justify text-lg pb-2 lg:pb-5 tracking-tighter">Nosso objetivo é oferecer suporte informatizado para melhorar a qualidade dos serviços prestados à população de Irecê, provendo atendimento especializado em saúde mental.</p>
                    </div>
                </div>
            </div>
            <Login/>
            <Footer/>
        </main>
    );
}
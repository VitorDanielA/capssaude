import Contato from "@/components/Contato";
import Especialidades from "@/components/Especialidades";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn !== 'true') {
            router.push('/');
        }
    }, []);

    return (
        <main id="home">
            <div className="h-[100vh] home">
                <Navbar/>
                <Sidebar/>
                <div className="pt-28 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
                    <div className="max-w-[500x] lg:max-w-[500px] h-[520px] lg:h-[500px] text-white mx-2 card-apresentacao rounded-3xl flex flex-col px-4 lg:px-20 bg-blue-500 sm:ms-28">
                        <h1 className="text-5xl lg:text-7xl font-black my-1 uppercase pt-5">syscaps<br />saúde</h1>
                        <h2 className="text-3xl lg:text-6xl font-bold">Bem vindo <br />ao SysCaps Saúde</h2>
                        <p className="mt-10 lg:mt-7 font-medium text-justify text-md pb-2 lg:pb-5 tracking-tighter">Nosso objetivo é oferecer suporte informatizado para melhorar a qualidade dos serviços prestados à população de Irecê, provendo atendimento especializado em saúde mental.</p>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div id="service">
                <Especialidades/>
            </div>
            <div id="contact">
                <Contato/>
            </div>
            <Footer/>
        </main>
    );
}
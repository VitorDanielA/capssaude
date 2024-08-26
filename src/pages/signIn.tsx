import Login from "@/components/Login";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main id="home" className="bg-white text-gray-800 h-[100vh] flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
                <Login />
            </div>
        </main>

    );
}

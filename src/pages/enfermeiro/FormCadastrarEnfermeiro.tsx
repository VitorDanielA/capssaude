import Footer from "@/components/Footer";
import Cadastrar from "@/components/CadastrarEnfermeiro";
import Navbar from "@/components/Navbar";

export default function FormCadastrarEnfermeiro() {

    return (
        <main>
            <Navbar/>
            <div>
                <Cadastrar/>
            </div>
            <Footer/>
        </main>
    );
}
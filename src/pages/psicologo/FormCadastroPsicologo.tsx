import Footer from "@/components/Footer";
import Cadastrar from "@/components/CadastrarPsicologo";
import Navbar from "@/components/Navbar";

export default function FormCadastroPsicologo() {

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
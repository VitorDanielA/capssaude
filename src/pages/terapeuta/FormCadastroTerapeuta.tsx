import Footer from "@/components/Footer";
import Cadastrar from "@/components/CadastrarTerapeuta";
import Navbar from "@/components/Navbar";

export default function FormCadastroTerapeuta() {

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
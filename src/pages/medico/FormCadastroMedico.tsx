import Footer from "@/components/Footer";
import Cadastrar from "@/components/CadastrarMedico";
import Navbar from "@/components/Navbar";

export default function FormCadastroMedico() {

    return (
        <main>
            <Navbar />
            <div>
                <Cadastrar/>
            </div>
            <Footer />
        </main>
    )
}
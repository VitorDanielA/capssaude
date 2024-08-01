import Footer from "@/components/Footer";
import Cadastrar from "@/components/CadastrarMedicamento";
import Navbar from "@/components/Navbar";

export default function FormCadastroMedicamento() {

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
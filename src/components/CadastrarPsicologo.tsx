import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import { useRouter } from 'next/router';
import Link from "next/link";
import { createPsicologo } from "@/helpers/psicologo";

interface PsciologoForm extends Record<string, number | any> {}

export default function CadastrarPsicologo() {
  const [form, setForm] = useState<PsciologoForm>({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    cep: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    telefone: "",
    sexo: "",
    CRP: "",
    email: "",
    diasDisponiveis: [],
    horariosDisponiveis: [],
    comentarios: "",
  });

  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChangeForm = (event: {target: {name: any; value:any;}}) => {
    const { name, value } = event.target;

    if (name === "diasDisponiveis" || name === "horariosDisponiveis") {
      const newList = value.split(',').map((item: any) => item.trim());
      setForm(prevForm => ({
        ...prevForm,
        [name]: newList,
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(form);

    try {
      const {ok, json} = await createPsicologo(form);
      console.log(json);
      if (ok) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          router.push('TabelaPsicologo');
        }, 2000);
      } else {
        alert(json.message || "Erro ao criar Psicólogo");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao criar Psicólogo");
    }
  };

  const inputs = [
    {
      type: "text",
      name: "nome",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Nome",
      required: true,
    },
    {
      type: "text",
      name: "cpf",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "CPF",
      required: true,
    },
    {
      type: "date",
      name: "dataDeNascimento",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Data Nascimento",
      required: true,
    },
    {
      type: "text",
      name: "cep",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "CEP",
      required: true,
    },
    {
      type: "text",
      name: "bairro",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Bairro",
      required: true,
    },
    {
      type: "text",
      name: "logradouro",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Logradouro",
      required: true,
    },
    {
      type: "text",
      name: "complemento",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Complemento",
      required: true,
    },
    {
      type: "text",
      name: "telefone",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Telefone",
      required: true,
    },
    {
      type: "text",
      name: "sexo",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Sexo",
      required: true,
    },
    {
      type: "text",
      name: "CRP",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "CRP",
      required: true,
    },
    {
      type: "email",
      name: "email",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Email",
      required: true,
    },
    {
      type: "text",
      id: "diasDisponiveis",
      name: "diasDisponiveis",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Dias Disponíveis",
    },
    {
      type: "text",
      id: "horariosDisponiveis",
      name: "horariosDisponiveis",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5",
      placeholder: "Horários Disponíveis",
    },
    {
        type: "text",
        name: "comentarios",
        className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
        placeholder: "Comentarios",
        required: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mt-24">
        Preencha os campos para cadastrar um psicólogo!
      </h1>
      <div className="max-w-[1000px] w-full bg-[#005562] p-6 text-white rounded-xl mb-10 fix-form-psicologo">
        <form onSubmit={handleForm} className="flex flex-col">
          <div className="grid grid-cols-3 gap-4">
            {inputs.map((input) => (
              <label key={input.name} className="">
                {input.placeholder}
                <InputFieldProps
                  type={input.type}
                  name={input.name}
                  className={input.className}
                  placeholder={input.placeholder}
                  required={input.required}
                  value={form[input.name]}
                  onChange={handleChangeForm}
                />
              </label>
            ))}
          </div>

          <button className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
            Criar psicólogo
          </button>
          <p className="mt-3 text-center text-lg">
            <span className="text-white border-b cursor-pointer hover:text-gray-400 font-semibold">
              <Link href={"TabelaPsicologo"}>Voltar</Link>
            </span>
          </p>
        </form>
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-black">Cadastro de psicólogo realizado com sucesso!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

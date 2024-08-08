import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function CadastrarPaciente() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    cep: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    telefone: "",
    telefonesEmergencia: [],
  });


  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("telefoneResponsavel")) {
      const index = parseInt(name.replace("telefoneResponsavel", ""), 10) - 1;
      const newTelefonesResponsavel = [...form.telefonesEmergencia];
      newTelefonesResponsavel[index] = value;
      setForm({ ...form, telefonesEmergencia: newTelefonesResponsavel });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    console.log(form);

    try {
      const response = await fetch("http://localhost:8080/caps/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const json = await response.json();
      console.log(response.status);
      console.log(json);

      if (response.ok) {
        setShowSuccessPopup(true);

        setTimeout(() => {
          router.push('TabelaPaciente');
        }, 2000);
      } else {
        alert(json.message || "Erro ao criar Paciente");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao criar Paciente");
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
      placeholder: "logradouro",
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
      id: "telefoneResponsavel1",
      name: "telefoneResponsavel1",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
      placeholder: "Telefone Responsável 1",
    },
    {
      type: "text",
      id: "telefoneResponsavel2",
      name: "telefoneResponsavel2",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5",
      placeholder: "Telefone Responsável 2",
    },
  ];

  return (

    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mt-24">
        Preencha os campos para cadastrar um paciente!
      </h1>
      <div className="max-w-[800px] w-full bg-[#005562] p-6 text-white rounded-xl mb-10 fix-form-paciente">
        <form onSubmit={handleForm} className="flex flex-col">
          <div className="grid grid-cols-2 gap-4">
            {inputs.map((input, index) => (
              <div key={index}>
                <label className="">{input.placeholder}</label>
              <InputFieldProps
                key={input.name}
                type={input.type}
                name={input.name}
                className={input.className}
                placeholder={input.placeholder}
                required={input.required}
                value={form[input.name]}
                onChange={handleChangeForm}
                />
                </div>
            ))}
          </div>

          <button className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
            Criar paciente
          </button>
          <p className="mt-3 text-center text-lg">

            <span className="text-white border-b  cursor-pointer hover:text-gray-400 font-semibold">
              <Link href={"TabelaPaciente"}>Voltar</Link>
            </span>
          </p>
        </form>
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p>Cadastro de paciente realizado com sucesso!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import { useRouter } from 'next/router';

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
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5",
      placeholder: "Nome",
      required: true,
    },
    {
      type: "text",
      name: "cpf",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "CPF",
      required: true,
    },
    {
      type: "date",
      name: "dataDeNascimento",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "Data de Nascimento",
      required: true,
    },
    {
      type: "text",
      name: "cep",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "CEP",
      required: true,
    },
    {
      type: "text",
      name: "bairro",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "Bairro",
      required: true,
    },
    {
      type: "text",
      name: "logradouro",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "logradouro",
      required: true,
    },
    {
      type: "text",
      name: "complemento",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "Complemento",
      required: true,
    },
    {
      type: "text",
      name: "telefone",
      className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
      placeholder: "Telefone",
      required: true,
    },
  ];

  return (
    <div className="flex items-center justify-around flex-wrap min-h-[100vh]">
      <div className="w-[300px] mb-5">
        <h1 className="text-2xl font-semibold">
          Preencha os campos para cadastrar um paciente!
        </h1> 
        <form onSubmit={handleForm} className="flex flex-col">
          {inputs.map((input) => (
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
          ))}

          <div className="mb-5">
            <label
              className="block mb-2 text-gray-700"
              htmlFor="telefoneResponsavel1"
            >
              Telefones do Responsável:
            </label>
            <input
              type="text"
              id="telefoneResponsavel1"
              name="telefoneResponsavel1"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-2"
              placeholder="Telefone do Responsável 1"
              onChange={handleChangeForm}
            />
            <input
              type="text"
              id="telefoneResponsavel2"
              name="telefoneResponsavel2"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none"
              placeholder="Telefone do Responsável 2 (opcional)"
              onChange={handleChangeForm}
            />
          </div>

          <button className="bg-blue-500 p-2.5 mt-2 rounded-lg text-white hover:bg-blue-400">
            Criar paciente
          </button>
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
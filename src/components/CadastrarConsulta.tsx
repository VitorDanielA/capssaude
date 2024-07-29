import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";

export default function CadastrarConsulta() {

    const [form, setForm] = useState({
        nome: '',
        cpf: '',
        dataConsulta: '',
        horarioConsulta: '',
        sintomas: '',
        duracaoSintomas: '',
        medicamentos: '',
        orientacoes: '',
        responsavel: '',
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChangeForm = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
      };

    const handleForm = async (event) => {
        event.preventDefault();
        console.log(form)

        try {
            const response = await fetch('http://localhost:8080/caps/consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const json = await response.json();
            console.log(response.status);
            console.log(json);

            
            if (response.ok) {
                setShowSuccessPopup(true);

                
            } else {
                alert(json.message || 'Erro ao criar Paciente');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar Paciente');
        }
    };

    const inputs = [
        {
            type: 'text',
            name: 'nome',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5',
            placeholder: 'Nome',
            required: true,
        },
        {
            type: 'text',
            name: 'cpf',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'CPF',
            required: true,
        },
        {
            type: 'date',
            name: 'dataConsulta',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Data da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'horarioConsulta',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Horário da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'sintomas',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'duracaoSintomas',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Duração das sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'medicamentos',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Medicamentos',
            required: true,
        },
        {
            type: 'text',
            name: 'orientacoes',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Orientações',
            required: true,
        },
        {
            type: 'text',
            name: 'responsavel',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Responsável',
            required: true,
        },
    ];

    return (

        <div className="flex items-center justify-around flex-wrap min-h-[100vh]">
            <div className="w-[300px] mb-5">
                <h1 className="text-2xl font-semibold">
                    Preencha os campos para cadastrar uma consulta!
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

                    <button className="bg-blue-500 p-2.5 mt-2 rounded-lg text-white hover:bg-blue-400">
                        Criar consulta
                    </button>

                </form>
                {showSuccessPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-md">
                            <p>Cadastro da consulta realizado com sucesso!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
}
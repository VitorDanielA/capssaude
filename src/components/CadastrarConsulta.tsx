import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import Link from "next/link";

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
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Nome',
            required: true,
        },
        {
            type: 'text',
            name: 'cpf',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'CPF',
            required: true,
        },
        {
            type: 'date',
            name: 'dataConsulta',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Data da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'horarioConsulta',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Horário da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'sintomas',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'duracaoSintomas',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Duração das sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'medicamentos',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Medicamentos',
            required: true,
        },
        {
            type: 'text',
            name: 'orientacoes',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1',
            placeholder: 'Orientações',
            required: true,
        },
        {
            type: 'text',
            name: 'responsavel',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Responsável',
            required: true,
        },
    ];

    return (

        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mt-24">
                Preencha os campos para cadastrar uma consulta!
            </h1>
            <div className="max-w-[800px] w-full bg-[#005562] p-6 text-white rounded-xl">
                <form onSubmit={handleForm} className="flex flex-col">
                    <div className="grid grid-cols-2 gap-4">


                        {inputs.map((input, index) => (
                            <div key={index}>
                                <label className="">{input.placeholder}</label>                            <InputFieldProps
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
                        Criar consulta
                    </button>
                    <p className="mt-3 text-center text-lg">

                        <span className="text-white border-b  cursor-pointer hover:text-gray-400 font-semibold">
                            <Link href={"TabelaConsulta"}>Voltar</Link>
                        </span>
                    </p>
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
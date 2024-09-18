import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import Link from "next/link";

export default function CadastrarConsulta() {
    const [form, setForm] = useState({
        pacienteNome: '',
        data: '',
        horario: '',
        sintomas: '',
        duracao: '',
        //medicamentoNomes: [],
        orientacao: '',
        AcompanhanteLegal: '',
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        if (name === 'medicamentoNomes') {
            setForm({
                ...form,
                //medicamentoNomes: value.split(',').map(nome => nome.trim()),
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    /*const fetchPacienteIdByName = async (nome) => {
        const response = await fetch('http://localhost:8080/caps/paciente?nome=${encodeURIComponent(nome)}');
        if (response.ok) {
            const data = await response.json();
            return data.id;
        } else {
            throw new Error('Paciente não encontrado');
        }
    };*/

    /*const fetchMedicamentoIdsByNames = async (nomes) => {
        const response = await fetch('http://localhost:8080/caps/medicamento?nomes=${encodeURIComponent(nomes.join(','))}');
        if (response.ok) {
            const data = await response.json();
            return data.map(med => med.id);
        } else {
            throw new Error('Medicamentos não encontrados');
        }
    };*/

    const handleForm = async (event) => {
        event.preventDefault();
        console.log(form);

        try {
            //const pacienteId = await fetchPacienteIdByName(form.pacienteNome);
            
            //const medicamentoIds = await fetchMedicamentoIdsByNames(form.medicamentoNomes);

            const response = await fetch('http://localhost:8080/caps/consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paciente: form.pacienteNome,
                    data: form.data,
                    horario: form.horario,
                    sintomas: form.sintomas,
                    duracao: form.duracao,
                    //medicamento: medicamentoIds.map(id => ({ id })),
                    orientacao: form.orientacao,
                    AcompanhanteLegal: form.AcompanhanteLegal,
                }),
            });

            const json = await response.json();
            console.log(response.status);
            console.log(json);

            if (response.ok) {
                setShowSuccessPopup(true);
            } else {
                alert(json.message || 'Erro ao criar consulta');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar consulta');
        }
    };

    const inputs = [
        {
            type: 'text',
            name: 'pacienteNome',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Nome do Paciente',
            required: true,
        },
        {
            type: 'date',
            name: 'data',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Data da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'horario',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Horário da consulta',
            required: true,
        },
        {
            type: 'text',
            name: 'sintomas',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'duracao',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Duração dos sintomas',
            required: true,
        },
        {
            type: 'text',
            name: 'medicamentoNomes',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Nomes dos Medicamentos',
            required: true,
        },
        {
            type: 'text',
            name: 'orientacao',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-1',
            placeholder: 'Orientações',
            required: true,
        },
        {
            type: 'text',
            name: 'AcompanhanteLegal',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-5',
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
                            <div key={input.name + index} className="flex flex-col">
                                <label htmlFor={input.name} className="mb-1">
                                    {input.placeholder}
                                </label>
                                <InputFieldProps
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
                    <button type="submit" className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
                        Criar consulta
                    </button>
                    <p className="mt-3 text-center text-lg">
                        <span className="text-white border-b cursor-pointer hover:text-gray-400 font-semibold">
                            <Link href="TabelaConsulta">Voltar</Link>
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
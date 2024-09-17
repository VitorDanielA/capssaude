import React from 'react';
import { useState } from 'react';
import InputFieldProps from "@/components/InputFieldProps";
import { useRouter } from 'next/router';
import { createMedicos } from '@/helpers/medico';
import Link from 'next/link';

interface MedicoForm extends Record<string, number | any> {}

export default function CadastrarMedico() {
    const [form, setForm] = useState<MedicoForm>({
        nome: "",
        email: "",
        cpf: "",
        dataDeNascimento: "",
        cep: "",
        bairro: "",
        logradouro: "",
        complemento: "",
        telefone: "",
        sexo: "",
        especialidade: "",
        codEspecialidade: "",
        diasAtendimento: [],
        horasAtendimento: [],
        comentarios: "",
        codigoRegistro: "",
    });

    const router = useRouter();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChangeForm = (event: {target: {name: any; value:any;}}) => {
        const { name, value } = event.target;

        if (name === "diasAtendimento" || name === "horasAtendimento") {
            const newList = value.split(',').map((item: any) => item.trim());
            setForm(prevForm => ({
                ...prevForm,
                [name]: newList,
            }));
        } else if (name === "especialidade") {
            const selectedEspecialidade = especialidades.find(e => e.value === value);
            setForm(prevForm => ({
                ...prevForm,
                especialidade: value,
                codEspecialidade: selectedEspecialidade ? selectedEspecialidade.sigla: '',
            }));
        }
        else {
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
            const { ok, json } = await createMedicos(form);
            console.log(json);
            if (ok) {
                setShowSuccessPopup(true);
            } else {
                alert(json.message || 'Erro ao criar médico');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar médico');
        }
    };

    const handleContinue = () => {
        router.push('TabelaMedico');
        setShowSuccessPopup(false);
    };

    const especialidades = [
        { value: 'Especialidade', label: 'Especialidade'},
        { value: 'MEDICO', label: 'Medico', sigla: 'CRM'},
        { value: 'ENFERMEIRO', label: 'Enfermeiro', sigla: 'COREN'},
        { value: 'PSICOLOGO', label: 'Psicologo', sigla: 'CRP'},
        { value: 'TERAPEUTA', label: 'Terapeuta', sigla: 'CREFITO'},
    ]

    const sexos = [
        { value: 'Sexo', label: 'Sexo'},
        { value: 'Masculino', label:'Masculino'},
        { value: 'Feminino', label:'Feminino'},
        { value: 'PNI', label: 'Prefiro não me identificar'}
    ]

    const inputs = [
        {
            type: 'text',
            name: 'nome',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mt-2 mb-5',
            placeholder: 'Nome',
            required: true,
        },
        {
            type: 'email',
            name: 'email',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Email',
            required: true,
        },
        {
            type: 'text',
            name: 'cpf',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'CPF',
            required: true,
        },
        {
            type: 'date',
            name: 'dataDeNascimento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Data de Nascimento',
            required: true,
        },
        {
            type: 'text',
            name: 'cep',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'CEP',
            required: true,
        },
        {
            type: 'text',
            name: 'bairro',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Bairro',
            required: true,
        },
        {
            type: 'text',
            name: 'logradouro',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Logradouro',
            required: true,
        },
        {
            type: 'text',
            name: 'complemento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Complemento',
            required: false,
        },
        {
            type: 'tel',
            name: 'telefone',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Telefone',
            required: true,
        },
        {
            type: 'select',
            name: 'sexo',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Sexo',
            required: true,
            options: sexos,
        },
        {
            type: 'select',
            name: 'especialidade',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Especialidade',
            required: true,
            options: especialidades,
        },
        {
            type: 'text',
            name: 'codEspecialidade',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Código da Especialidade',
            required: true,
        },
        {
            type: "text",
            id: "diasAtendimento",
            name: "diasAtendimento",
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            label: 'Dias de Atendimento',
            placeholder: 'Ex: Segunda,Quarta,Sexta',
            required: true,
            isArray: true,
        },
        {
            type: "text",
            id: "horasAtendimento",
            name: "horasAtendimento",
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            label: 'Horas de Atendimento',
            placeholder: 'Ex: 12:00,15:00,18:00',
            required: true,
            isArray: true,
        },
        {
            type: 'text',
            name: 'comentarios',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Comentários',
            required: false,
        },
        {
            type: 'text',
            name: 'codigoRegistro',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 mt-2',
            placeholder: 'Código de Registro',
            required: true,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mt-24">
                Preencha os campos para cadastrar o médico!
            </h1>
            <div className="max-w-[800px] w-full bg-[#005562] p-6 text-white rounded-xl mb-10 fix-form-medico">
                <form onSubmit={handleForm} className="flex flex-col my-10">
                    <div className="grid grid-cols-3 gap-4">
                        {inputs.map((input) => (
                            <label key={input.name} className="">
                                {input.label}
                                {input.isArray === true ? '' : input.placeholder }
                                {input.type === 'select' ? (
                                    <select
                                        name={input.name}
                                        className={input.className}
                                        required={input.required}
                                        value={form[input.name]}
                                        onChange={handleChangeForm}
                                    >
                                        {input.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <InputFieldProps
                                        type={input.type}
                                        name={input.name}
                                        className={input.className}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        required={input.required}
                                        value={form[input.name]}
                                        onChange={handleChangeForm}
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                    <button className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
                        Cadastrar Médico
                    </button>
                    <p className="mt-3 text-center text-lg">
                    <span className="text-white border-b cursor-pointer hover:text-gray-400 font-semibold">
                        <Link href={"TabelaMedico"}>Voltar</Link>
                    </span>
                    </p>
                </form>
                {showSuccessPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-md">
                            <h1 className='text-black'>Cadastro realizado com sucesso!</h1>
                            <button onClick={handleContinue} className="bg-[#005562] p-2 mt-2 rounded-lg text-white hover:bg-[#4599a8] text-xl font-semibold ml-14">
                                Continuar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

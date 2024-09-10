import { useState } from 'react';
import InputFieldProps from './InputFieldProps';
import {updateMedico} from "@/helpers/medico";

interface MedicoProps {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    bairro?: string;
    logradouro: string;
    complemento: string;
    telefone: string;
    sexo: string;
    especialidade: string;
    codEspecialidade: string;
    diasAtendimento: string[];
    horasAtendimento: string[];
    comentarios?: string;
    codigoRegistro: string;
}

const EditarMedico = ({ medico, onClose, onSave }: any) => {
    const [formData, setFormData] = useState({ ...medico });

    const especialidades = [
        { value: 'MEDICO', label: 'Médico', sigla: 'CRM' },
        { value: 'ENFERMEIRO', label: 'Enfermeiro', sigla: 'COREN' },
        { value: 'PSICOLOGO', label: 'Psicólogo', sigla: 'CRP' },
        { value: 'TERAPEUTA', label: 'Terapeuta', sigla: 'CREFITO' },
    ];

    const sexos = [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Feminino' },
    ];

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        if (name === 'diasDisponiveis' || name === 'horariosDisponiveis') {
            const newList = value.split(',').map((item:any) => item.trim());
            setFormData((prev:any) => ({
                ...prev,
                [name]: newList,
            }));
        }
        if (name === 'especialidade') {
            const selectedEspecialidade = especialidades.find(especialidade => especialidade.value === value);
            const sigla = selectedEspecialidade ? selectedEspecialidade.sigla : '';
            setFormData((prev:any) => ({
                ...prev,
                especialidade: value,
                codEspecialidade: sigla,
            }));
        }
        else {
            setFormData((prev:any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            diasAtendimento: formData.diasAtendimento.split(',').map((day: string) => day.trim()),
            horasAtendimento: formData.horasAtendimento.split(',').map((hour: string) => hour.trim()),
        };

        try {
            const { ok, json } = await updateMedico(formData.id, updatedData);
            if (ok) {
                onSave(json);
            } else {
                console.error("Erro ao atualizar médico");
            }
        } catch (error) {
            console.error('Erro ao atualizar médico:', error);
        }
    };

    const inputs = [
        {
            type: 'text',
            name: 'nome',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Nome',
            required: true,
        },
        {
            type: 'email',
            name: 'email',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Email',
            required: true,
        },
        {
            type: 'text',
            name: 'cpf',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'CPF',
            required: true,
        },
        {
            type: 'date',
            name: 'dataNascimento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Data de Nascimento',
            required: true,
        },
        {
            type: 'text',
            name: 'cep',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'CEP',
            required: true,
        },
        {
            type: 'text',
            name: 'bairro',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Bairro',
            required: true,
        },
        {
            type: 'text',
            name: 'logradouro',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Logradouro',
            required: true,
        },
        {
            type: 'text',
            name: 'complemento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Complemento',
        },
        {
            type: 'text',
            name: 'telefone',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Telefone',
            required: true,
        },
        {
            type: 'select',
            name: 'sexo',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Sexo',
            required: true,
            options: sexos,
        },
        {
            type: 'select',
            name: 'especialidade',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Especialidade',
            required: true,
            options: especialidades,
        },
        {
            type: 'text',
            name: 'codEspecialidade',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Código da Especialidade',
            required: true,
        },
        {
            type: 'text',
            id: 'diasAtendimento',
            name: 'diasAtendimento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Dias de Atendimento',
            required: true,
        },
        {
            type: 'text',
            id: 'horasAtendimento',
            name: 'horasAtendimento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Horas de Atendimento',
            required: true,
        },
        {
            type: 'text',
            name: 'comentarios',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5',
            placeholder: 'Comentários',
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="max-w-[800px] w-full bg-[#005562] p-6 text-white rounded-xl">
                <h1 className="font-extrabold text-white text-3xl uppercase text-center mb-6">Editar Médico</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {inputs.map((input) => (
                            <label htmlFor={input.name} key={input.name} className="flex flex-col">
                                {input.placeholder}
                                {input.type === 'select' ? (
                                    <select
                                        name={input.name}
                                        className={input.className}
                                        value={formData[input.name]}
                                        onChange={handleChange}
                                        required={input.required}
                                    >
                                        <option value="">{input.placeholder}</option>
                                        {input.options?.map((option: any) => (
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
                                        placeholder={input.placeholder}
                                        required={input.required}
                                        value={formData[input.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-white p-2.5 w-full mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold ml-2 mr-2">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-800 p-2.5 w-full mt-2 hover:text-gray-400 text-xl rounded-lg font-semibold ml-2 mr-2">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarMedico;

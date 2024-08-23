import { useState, useEffect } from 'react';
import InputFieldProps from "@/components/InputFieldProps";
import { updateTerapeuta } from '@/helpers/terapeuta';

const EditarTerapeuta = ({ terapeuta, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...terapeuta,
    });

    useEffect(() => {
        setFormData({
            ...terapeuta,
        });
    }, [terapeuta]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'diasDisponiveis' || name === 'horariosDisponiveis') {
            const newList = value.split(',').map(item => item.trim());
            setFormData(prev => ({
                ...prev,
                [name]: newList,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
        };

        try {
            const { ok, json } = await updateTerapeuta(formData.id, formData)
            if (ok) {
                onSave(json);
            } else {
                console.error('Erro ao atualizar terapeuta');
            }
        } catch (error) {
            console.error('Erro ao atualizar terapeuta:', error);
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
            placeholder: "Data de Nascimento",
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
            name: "crefito",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "CREFITO",
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
            name: "diasDisponiveis",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Dias Disponíveis",
        },
        {
            type: "text",
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="max-w-[800px] w-full bg-[#005562] p-6 text-white rounded-xl mb-10 fix-form-terapeuta">
                <h1 className="font-extrabold my-5 text-white text-3xl uppercase text-center mt-2">Editar Terapeuta</h1>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-3 gap-4'>
                        {inputs.map((input) => (
                            <label key={input.name}>
                                {input.placeholder}
                                <InputFieldProps
                                    type={input.type}
                                    name={input.name}
                                    className={input.className}
                                    placeholder={input.placeholder}
                                    required={input.required}
                                    value={formData[input.name]}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-white p-2.5 w-full mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold ml-20 mr-10">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-800 p-2.5 w-full mt-2 hover:text-gray-400 text-xl rounded-lg font-semibold ml-2 mr-20">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarTerapeuta;

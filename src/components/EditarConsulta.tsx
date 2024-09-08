import { useState, useEffect } from 'react';
import InputFieldProps from "@/components/InputFieldProps";
import { updateConsulta } from '@/helpers/consulta';


const EditarConsulta = ({ consulta, onClose, onSave }: any) => {
    const [formData, setFormData] = useState({
        ...consulta,
    });

    useEffect(() => {
        setFormData({
            ...consulta,
        });
    }, [consulta]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        if (name === 'medicamentos') {
            const newList = value.split(',').map((item:any) => item.trim());
            setFormData((prev:any) => ({
                ...prev,
                [name]: newList,
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: {preventDefault: () => void;}) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
        };

        try {
            const { ok, json } = await updateConsulta(formData.id, formData);
           
            if (ok) {
                onSave(json);
            } else {
                
                console.error('Erro ao atualizar consulta');
            }
        } catch (error) {
            console.error('Erro ao atualizar consulta:', error);
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
            type: "date",
            name: "dataConsulta",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Data da consulta",
            required: true,
        },
        {
            type: "text",
            name: "horarioConsulta",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Horario da Consulta",
            required: true,
        },
        {
            type: "text",
            name: "sintomas",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Sintomas",
            required: true,
        },
        {
            type: "text",
            name: "duracaoSintomas",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Duracao dos Sintomas",
            required: true,
        },
        {
            type: "text",
            name: "medicamentos",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Medicamentos",
            required: true,
        },
        {
            type: "text",
            name: "orientacoes",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Orientações",
            required: true,
        },
        {
            type: "text",
            name: "responsavel",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-1",
            placeholder: "Responsavel",
            required: true,
        },
    ];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="max-w-[1000px] w-full bg-[#005562] p-6 text-white rounded-xl mb-10 fix-form-psicologo">
                <h1 className="font-extrabold my-5 text-white text-3xl uppercase text-center mt-2">Editar Enfermeiro</h1>
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

export default EditarConsulta;

import { useState } from "react";
import InputFieldProps from "./InputFieldProps";
import { updateMedicamento } from "@/helpers/medicamento";

const Editar = ({ medicamento, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...medicamento });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          const {ok, json} = await updateMedicamento(formData.id, formData);
            if (ok) {
                onSave(json);
            } else {
                console.error('Erro ao atualizar medicamento');
            }
        } catch (error) {
            console.error('Erro ao atualizar medicamento:', error);
        }
    };

    const inputs = [
        {
            type: 'text',
            name: 'nomeMedicamento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Nome do medicamento',
            required: true,
        },
        {
            type: 'text',
            name: 'descricao',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Descrição',
            required: true,
        },
        {
            type: 'text',
            name: 'horario',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Horário',
            required: true,
        },
        {
            type: 'text',
            name: 'dosagem',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Dosagem',
            required: true,
        }
    ];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="max-w-[500px] w-full bg-[#005562] p-6 text-white rounded-xl mb-5">
                <h1 className="font-extrabold my-5 text-white text-3xl uppercase text-center mt-10">Editar Medicamento</h1>
                <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                        <label htmlFor="">
                            {input.placeholder}
                            <InputFieldProps
                                key={input.name}
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

export default Editar;
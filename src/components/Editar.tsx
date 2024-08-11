import { updateUser } from '@/helpers/usuario';
import { useState } from 'react';
import InputFieldProps from './InputFieldProps';

const Editar = ({ usuario, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...usuario });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { ok, json } = await updateUser(formData.id, formData);
            if (ok) {
                onSave(json);
            } else {
                console.error('Erro ao atualizar usuário');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };


    const inputs = [
        {
            type: 'text',
            name: 'nome',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mt-2 mb-5',
            placeholder: 'Nome',
            required: true,
        },
        {
            type: 'email',
            name: 'email',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Email',
            required: true,
        },
        {
            type: 'password',
            name: 'senha',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Senha',
            required: true,
        },
    ];



    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="max-w-[500px] w-full bg-[#005562] p-6 text-white rounded-xl mb-5">
                <h1 className="font-extrabold my-5 text-white text-3xl uppercase text-center mt-10">Editar Usuário</h1>
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

                    <label htmlFor="">NIvel de acesso</label>
                    <select
                        name="nivelAcesso"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5"
                        required
                        value={formData.nivelAcesso}
                        onChange={handleChange}
                    >
                        <option value="1">Usuário Padrão</option>
                        <option value="2">Médico</option>
                        <option value="3">Gestor</option>
                    </select>


                    <div className="flex justify-center">
                        <button type="submit" className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="text-white border-b  cursor-pointer hover:text-gray-400 font-semibold">
                            Cancelar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editar;

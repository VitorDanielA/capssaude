import { updateUser } from '@/helpers/usuario';
import { useState } from 'react';

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
    

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Editar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nível de Acesso</label>
                        <input
                            type="number"
                            name="nivelAcesso"
                            value={formData.nivelAcesso}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 text-gray-600 hover:text-gray-900">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editar;

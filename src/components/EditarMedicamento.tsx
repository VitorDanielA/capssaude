import { useState } from "react";

const Editar = ({ medicamento, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...medicamento });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/caps/medicamento/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                onSave(updatedUser);
            } else {
                console.error('Erro ao atualizar medicamento');
            }
        } catch (error) {
            console.error('Erro ao atualizar medicamento:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Editar Medicamento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome do medicamento</label>
                        <input
                            type="text"
                            name="nomeMedicamento"
                            value={formData.nomeMedicamento}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Horário</label>
                        <input
                            type="text"
                            name="horario"
                            value={formData.horario}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dosagem</label>
                        <input
                            type="text"
                            name="dosagem"
                            value={formData.dosagem}
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
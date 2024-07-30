import { useState } from 'react';
import InputFieldProps from "@/components/InputFieldProps";

const Editar = ({ paciente, onClose, onSave }) => {
    const [formData, setFormData] = useState({
         ...paciente,
         telefonesEmergencia: paciente.telefonesEmergencia || [],
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            if (name.startsWith('telefonesEmergencia')) {
              
              const index = parseInt(name.replace('telefonesEmergencia', ''), 10) - 1;
              setFormData((prev) => ({
                ...prev,
                telefonesEmergencia: [
                  ...prev.telefonesEmergencia.slice(0, index),
                  value,
                  ...prev.telefonesEmergencia.slice(index + 1),
                ],
              }));
            } else {
              setFormData((prev) => ({ ...prev, [name]: value }));
            }
          };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/caps/paciente/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedPaciente = await response.json();
                onSave(updatedPaciente);
            } else {
                console.error('Erro ao atualizar paciente');
            }
        } catch (error) {
            console.error('Erro ao atualizar paciente:', error);
        }
    };


    const inputs = [
        {
            type: "text",
            name: "nome",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5",
            placeholder: "Nome",
            required: true,
        },
        {
            type: "text",
            name: "cpf",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "CPF",
            required: true,
        },
        {
            type: "date",
            name: "dataDeNascimento",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "Data de Nascimento",
            required: true,
        },
        {
            type: "text",
            name: "cep",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "CEP",
            required: true,
        },
        {
            type: "text",
            name: "bairro",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "Bairro",
            required: true,
        },
        {
            type: "text",
            name: "logradouro",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "logradouro",
            required: true,
        },
        {
            type: "text",
            name: "complemento",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "Complemento",
            required: true,
        },
        {
            type: "text",
            name: "telefone",
            className: "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5",
            placeholder: "Telefone",
            required: true,
        },
        {
            type: 'text',
            name: 'telefonesEmergencia1',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Telefone do Responsável 1',
            required: false,
            value: formData.telefonesEmergencia[0] || '',
          },
          {
            type: 'text',
            name: 'telefonesEmergencia2',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Telefone do Responsável 2',
            required: false,
            value: formData.telefonesEmergencia[1] || '',
          },
    ];

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[600px] p-10 mb-5 rounded shadow-lg">
                <h1 className="text-2xl font-semibold">Editar Paciente</h1>
                <form onSubmit={handleSubmit} >

                    {inputs.map((input) => (
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
                    ))}


                    <div className="flex justify-center">
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

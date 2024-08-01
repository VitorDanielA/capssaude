import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";

export default function CadastrarMedicamento(){

    const [form, setForm] = useState({
        nomeMedicamento: '',
        descricao: '',
        horario: '',
        dosagem: '',
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChangeForm = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
      };

    const handleForm = async (event) => {
        event.preventDefault();
        console.log(form)

        try {
            const response = await fetch('http://localhost:8080/caps/medicamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const json = await response.json();
            console.log(response.status);
            console.log(json);

            
            if (response.ok) {
                setShowSuccessPopup(true);

                
            } else {
                alert(json.message || 'Erro ao criar medicamento!');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar Medicamento!');
        }
    };

    const inputs = [
        {
            type: 'text',
            name: 'nomeMedicamento',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5',
            placeholder: 'Nome do medicamento',
            required: true,
        },
        {
            type: 'text',
            name: 'descricao',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Descrição',
            required: true,
        },
        {
            type: 'text',
            name: 'Horário',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Horário',
            required: true,
        },
        {
            type: 'text',
            name: 'dosagem',
            className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5',
            placeholder: 'Dosagem',
            required: true,
        }
    ];

    return (

        <div className="flex items-center justify-around flex-wrap min-h-[100vh]">
            <div className="w-[300px] mb-5">
                <h1 className="text-2xl font-semibold">
                    Preencha os campos para cadastrar um medicamento!
                </h1>
                <form onSubmit={handleForm} className="flex flex-col">


                    {inputs.map((input) => (
                        <InputFieldProps
                            key={input.name}
                            type={input.type}
                            name={input.name}
                            className={input.className}
                            placeholder={input.placeholder}
                            required={input.required}
                            value={form[input.name]}
                            onChange={handleChangeForm}
                        />
                    ))}

                    <button className="bg-blue-500 p-2.5 mt-2 rounded-lg text-white hover:bg-blue-400">
                        Criar medicamento
                    </button>

                </form>
                {showSuccessPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-md">
                            <p>Cadastro do medicamento realizado com sucesso!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );

}
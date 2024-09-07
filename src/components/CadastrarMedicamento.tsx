import { useState } from "react";
import InputFieldProps from "@/components/InputFieldProps";
import { useRouter } from "next/router";
import Link from "next/link";
import { createMedicamento } from "@/helpers/medicamento";

interface MediForm extends Record<string, string> {

}

export default function CadastrarMedicamento() {

    const [form, setForm] = useState<MediForm>({
        nomeMedicamento: '',
        descricao: '',
        horario: '',
        dosagem: '',
    });


    const router = useRouter();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChangeForm = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(form)

        try {
            const { ok, json } = await createMedicamento(form);
            console.log(json);
            if (ok) {
                setShowSuccessPopup(true);
            } else {
                alert(json.message || 'Erro ao criar medicamento!');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar Medicamento!');
        }
    };

    const handleContinue = () => {
        router.push('TabelaMedicamentos');
        setShowSuccessPopup(false);
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

        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mx-4  mt-24">
                Preencha os campos para cadastrar um medicamento!
            </h1>
            <div className="max-w-[500px] w-full bg-[#005562] p-6 text-white rounded-xl">
                <form onSubmit={handleForm} className="flex flex-col">
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
                                value={form[input.name]}
                                onChange={handleChangeForm}
                            />
                        </label>
                    ))}

                    <button className="bg-white p-2.5 mt-4 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
                        Criar medicamento
                    </button>
                    <p className="mt-3 text-center text-lg">

                        <span className="text-white border-b  cursor-pointer hover:text-gray-400 font-semibold">
                            <Link href={"TabelaMedicamentos"}>Voltar</Link>
                        </span>
                    </p>

                </form>
                {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
            <div className="bg-white p-4 rounded shadow-md">
              <h1 className='text-black'>Cadastro realizado com sucesso!</h1>
              <button onClick={handleContinue} className="bg-[#005562] p-2 mt-2 rounded-lg text-white hover:bg-[#4599a8] text-xl font-semibold">
                Continuar
              </button>
            </div>
          </div>
        )}
            </div>
        </div>


    );

}
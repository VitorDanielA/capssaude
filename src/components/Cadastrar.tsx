import { useState } from 'react';
import InputFieldProps from "@/components/InputFieldProps";
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Cadastrar() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        nivelAcesso: 1,
    });

    const router = useRouter();

    const handleChangeForm = (event) => {
        const { name, value } = event.target;
      
        setForm({
          ...form,
          [name]: name === 'nivelAcesso' ? parseInt(value, 10) : value,
        });
      };

    const handleForm = async (event) => {
        event.preventDefault();
        console.log(form)

        try {
            const response = await fetch('http://localhost:8080/caps/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const json = await response.json();
            console.log(response.status);
            console.log(json);

            // Verifique se a resposta do servidor foi bem-sucedida
            if (response.ok) {
                // Redirecione para a página desejada após o cadastro
                router.push('/');
                alert(json.message || 'Usuário criado com sucesso!');
            } else {
                // Exiba um erro caso a resposta do servidor não seja 200
                alert(json.message || 'Erro ao criar usuário');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar usuário');
        }
    };

    const inputs = [
        {
          type: 'text',
          name: 'nome',
          className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5',
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
        <div className="flex items-center justify-around flex-wrap min-h-[100vh]">
            <div className="w-[300px] mb-5">
                <h1 className="text-2xl font-semibold">
                    Preencha os campos para criar sua conta!
                </h1>
                <form onSubmit={handleForm} className="flex flex-col">

                    
                {inputs.map((input) => (
                    <InputFieldProps
                    key={input.name} // Use o name como chave para o mapeamento
                    type={input.type}
                    name={input.name}
                    className={input.className}
                    placeholder={input.placeholder}
                    required={input.required}
                    value={form[input.name]} // Acessa o valor do form
                    onChange={handleChangeForm}
                    />
                ))}

                    <select
                        name="nivelAcesso"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5"
                        required
                        value={form.nivelAcesso}
                        onChange={handleChangeForm}
                    >
                        <option value="1">Usuário Padrão</option>
                        <option value="2">Médico</option>
                        <option value="3">Gestor</option>
                    </select>
                    <button className="bg-blue-500 p-2.5 mt-2 rounded-lg text-white hover:bg-blue-400">
                        Criar conta
                    </button>

                    <p className="mt-3 text-center">
                        Já tem uma conta?{' '}
                        <span className="text-blue-700 border-b border-blue-700 cursor-pointer hover:text-blue-500">
                            <Link href={"/"}>Clique aqui</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

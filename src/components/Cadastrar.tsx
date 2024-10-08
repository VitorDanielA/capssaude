import { useState } from 'react';
import InputFieldProps from "@/components/InputFieldProps";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUser } from '@/helpers/usuario';

interface UserForm extends Record<string, string | number> {}

export default function Cadastrar() {
  const [form, setForm] = useState<UserForm>({
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: 1,
  });

  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChangeForm = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === 'nivelAcesso' ? parseInt(value, 10) : value,
    });
  };

  //USANDO LOCALSTORAGE
  const handleForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify(form)); 

    setShowSuccessPopup(true);
  };

   /*
     REAL FUNÇÃO PARA CADASTRAR USUÁRIO
   */
  /*const handleForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(form);

    try {
      const { ok, json } = await createUser(form);
      console.log(json);
      if (ok) {
        setShowSuccessPopup(true);
      } else {
        alert(json.message || 'Erro ao criar usuário');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar usuário');
    }
  };*/

  const handleContinue = () => {
    router.push('/homescreen');
    setShowSuccessPopup(false);
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
      className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5 mt-2',
      placeholder: 'Email',
      required: true,
    },
    {
      type: 'password',
      name: 'senha',
      className: 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5 mt-2',
      placeholder: 'Senha',
      required: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="font-extrabold my-8 text-[#134e58] text-3xl uppercase text-center mx-4 mt-24">
        Insira os dados para criar a sua conta!
      </h1>
      <div className="max-w-[500px] w-full bg-[#005562] p-6 text-white rounded-xl">
        <form onSubmit={handleForm} className="flex flex-col">
          {inputs.map((input, index) => (
            <label htmlFor="" key={index}>
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

          <label htmlFor="">Nivel de acesso</label>
          <select
            name="nivelAcesso"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5 mt-2"
            required
            value={form.nivelAcesso}
            onChange={handleChangeForm}
          >
            <option value="1">Usuário Padrão</option>
            <option value="2">Médico</option>
            <option value="3">Gestor</option>
          </select>
          <button className="bg-white p-2.5 mt-2 rounded-lg text-[#005562] hover:bg-[#e5f1f3] text-xl font-semibold">
            Criar conta
          </button>

          <p className="my-3 text-center text-lg">
            Já tem uma conta?{' '}
            <span className="text-white border-b  cursor-pointer hover:text-gray-400 font-semibold">
              <Link href={"/"}>Clique aqui</Link>
            </span>
          </p>
        </form>
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
            <div className="bg-white p-4 rounded shadow-md">
              <p className='text-black'>Cadastro realizado com sucesso!</p>
              <button onClick={handleContinue} className="bg-[#005562] p-2 mt-2 rounded-lg text-white hover:bg-[#4599a8] text-xl font-semibold ml-14">
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
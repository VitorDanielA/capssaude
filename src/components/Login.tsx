import { useState } from 'react';
import Image from 'next/image';
import ImgSaude from './../assets/undraw_medicine_b-1-ol.svg';
import Link from "next/link";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            if (response.data.success) {
                window.location.href = "/homescreen";
            } else {
                setError('Email ou senha incorretos.');
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao tentar realizar o login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-around flex-wrap min-h-[100vh]'>
            <div className='p-10'>
                <Image src={ImgSaude} alt='Saúde' width={500} />
            </div>
            <div className='w-[300px] mb-5'>
                <h1 className='text-2xl font-semibold'>Bem vindo ao CAPS Saúde!</h1>
                <p className='mb-4 mt-2 font-medium'>Faça login na sua conta</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input
                            type="email"
                            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none my-5 focus:border-cyan-700'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none mb-5 focus:border-cyan-700'
                            placeholder='Senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className='bg-[#005562] p-2.5 mt-2 rounded-lg text-white hover:bg-[#20646c]'
                            disabled={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
                {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
                <p className='mt-3 text-center'>
                    Ainda não tem uma conta? <span className='text-[#325f67] border-b border-cyan-600 cursor-pointer hover:text-cyan-700'><Link href={"/formCadastrar/FormCadastrar"}>Crie aqui</Link> </span>
                </p>
            </div>
        </div>
    );
}

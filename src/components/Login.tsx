import Image from 'next/image';
import ImgSaude from './../assets/undraw_medicine_b-1-ol.svg';
import Link from "next/link";

export default function Login(){
    return(
        <div className='flex items-center justify-around flex-wrap min-h-[100vh]'>
            <div className='p-10'>
                <Image src={ImgSaude} alt='Saúde' width={500}/>
            </div>
            <div className='w-[300px] mb-5'>
                <h1 className='text-2xl font-semibold'>Bem vindo de volta ao CAPS Saúde!</h1>
                <p className='mb-4 mt-2 font-medium'>Faça login na sua conta</p>
                <div className="flex flex-col">
                    <input 
                        type="text" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none my-5'
                        placeholder='Código Médico'
                    />
                    <input 
                        type="text" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus: outline-none mb-5'
                        placeholder='Senha'
                    />
                    <button className='bg-blue-500 p-2.5 mt-2 rounded-lg text-white hover:bg-blue-400'>Entrar</button>
                </div>
                <p className='mt-3 text-center'>
                    Ainda não tem uma conta? <span className='text-blue-700 border-b border-blue-700 cursor-pointer hover:text-blue-500'><Link href={"/formCadastrar/FormCadastrar"}>Crie aqui</Link> </span>
                </p>
            </div>
        </div>
    )
}
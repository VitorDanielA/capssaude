import Image from 'next/image';
import Saude from './../assets/saude.png';
import Link from 'next/link';

export default function Footer(){
    return(
        <footer className="bg-[#005562] text-white mt-5">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Image src={Saude} className="me-2" alt="Flowbite Logo" width={50} height={50}></Image>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CAPS Saúde</span>
                    </p>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="http://localhost:3000" className="hover:underline me-4 md:me-6">Home</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/servicos/TelaServicos" className="hover:underline me-4 md:me-6">Service</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/contato/TelaContato" className="hover:underline">Contato</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center dark:text-gray-400">
                    © 2024 SysCaps Saúde. Projeto de Inovação.</span>
            </div>
        </footer>
    )
}
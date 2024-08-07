import Image from 'next/image';
import Saude from './../assets/saude.png';

export default function Footer(){
    return(
        <footer className="bg-[#005562] text-white">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Image src={Saude} className="me-2" alt="Flowbite Logo" width={50} height={50}></Image>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CAPS Saúde</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#home" className="hover:underline me-4 md:me-6">Home</a>
                        </li>
                        <li>
                            <a href="#login" className="hover:underline me-4 md:me-6">Login</a>
                        </li>
                        <li>
                            <a href="#service" className="hover:underline me-4 md:me-6">Service</a>
                        </li>
                        <li>
                            <a href="#about" className="hover:underline me-4 md:me-6">Sobre</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">Contato</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">CAPS Saúde</a>. Projeto de Inovação.</span>
            </div>
        </footer>
    )
}
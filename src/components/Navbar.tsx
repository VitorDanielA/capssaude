import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Home', anchor: '#home' },
    { id: 2, text: 'Logar', anchor: '#logar' },
    { id: 3, text: 'Serviços', anchor: '#service' },
    { id: 4, text: 'Sobre', anchor: '#about' },
    { id: 5, text: 'Contato', anchor: '#contact' },
  ];

  return (
    <div className='bg-white font-medium flex justify-between items-center h-24 max-w-[100%] mx-auto px-4 fixed w-full'>
      <Image src="https://flowbite.com/docs/images/logo.svg" className="me-2" alt="Flowbite Logo" width={50} height={50}></Image>
      <h1 className='w-full text-3xl '>CAPS Saúde</h1>
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <a
            key={item.id}
            className='p-4 hover:bg-blue-500 hover:text-white rounded-xl m-2 cursor-pointer duration-300'
            href={item.anchor}
          >
            {item.text}
          </a>
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full bg-blue-500 ease-in-out duration-500 font-medium z-50'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >

        <h1 className='w-full text-3xl font-bold text-white m-4'>CAPS Saúde</h1>

        {navItems.map(item => (
          <a
            key={item.id}
            className=' p-4 text-white hover:bg-white duration-300 cursor-pointer border-gray-600 hover:text-blue-500 flex flex-col'
            href={item.anchor}
          >
            {item.text}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Health from './../assets/saude.png';
import Link from "next/link";

const Navbar = () => {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Home', anchor: '/' },
    { id: 2, text: 'Serviços', anchor: '/servicos/TelaServicos' },
    { id: 3, text: 'Contato', anchor: '/contato/TelaContato' },
  ];

  return (
    <div className='flex justify-between items-center h-24 max-w-[100%] fixed w-full px-10 !bg-[#f3f3f3] z-50'>
      <Image src={Health} className="me-2" alt="Flowbite Logo" width={50} height={50}></Image>
      <h1 className='w-full text-3xl font-bold text-[#005562] uppercase'>SysCaps Saúde</h1>
      <ul className='hidden md:flex'>
        {navItems.map(item => (
            item.link ? (
                <Link href={item.link} key={item.id} className='p-4 hover:text-[#378995] rounded-xl m-2 text-xl hover:underline font-semibold cursor-pointer duration-300 text-[#225860]'>
                    {item.text}
                </Link>
            ) : (
                <a
                    key={item.id}
                    className='p-4 hover:text-[#378995] rounded-xl m-2 text-xl hover:underline font-semibold cursor-pointer duration-300 text-[#225860]'
                    href={item.anchor}
                >
                    {item.text}
                </a>
            )
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full bg-[#005562] ease-in-out duration-500 font-medium z-50'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >

        <h1 className='w-full text-3xl font-bold text-white m-4 '>SysCaps Saúde</h1>

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
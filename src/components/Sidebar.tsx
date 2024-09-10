import React, { useState } from "react";

import { GrServices } from "react-icons/gr";
import { MdContacts } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { PiPillFill } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { BsCalendar2PlusFill } from "react-icons/bs";
import Link from "next/link";

const Sidebar = () => {

    const [open, setOpen] = useState(false);

    const menus = [
        { name: "Home", link: "/", icon: IoHomeOutline },
        { name: "Serviços", link: "/servicos/TelaServicos", icon: GrServices },
        { name: "Contato", link: "/contato/TelaContato", icon: MdContacts },
        { name: "Médicos", link: "/medico/TabelaMedico", icon: FaUserDoctor, margin: true },
        { name: "Consultas", link: "/consulta/TabelaConsulta", icon:  BsCalendar2PlusFill },
        { name: "Medicamentos", link: "/medicamento/TabelaMedicamentos", icon: PiPillFill },
        { name: "Pacientes", link: "/cadastrarPaciente/TabelaPaciente", icon:  ImProfile },
    ];
      

    return(
        <section className="flex gap-6 relative z-50">
        <div
          className={`bg-[#005562] min-h-screen ${
            open ? "w-48" : "w-16"
          } duration-500 text-gray-100 px-4 fixed top-24 left-0`}
        >
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                href={menu?.link} 
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Sidebar;
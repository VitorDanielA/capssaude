import { useState, useEffect, SetStateAction } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarConsulta';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';
import { deleteConsulta, fetchConsultas } from '@/helpers/consulta';
import Sidebar from '@/components/Sidebar';

interface consultaProps{
    id: number;
    paciente: string;
    acompanhanteLegal: string;
    data: Date;
    horario: string;
    sintomas: string;
    medicamento: string[];
    duracao: string;
    orientacao: string;
}

export default function TabelaConsulta() {
    const [consultas, setConsultas] = useState<consultaProps[]>([]);
    const [selectedConsulta, setSelectedConsulta] = useState<consultaProps | null>(null);
    const [editConsulta, setEditConsulta] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchConsultas();
                setConsultas(data);
            } catch (error) {
                console.error('Erro ao buscar consultas:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (consulta: consultaProps) => {
        setSelectedConsulta(consulta);
        setEditConsulta(true);
    };

    const handleDelete = async (id: number) => {
      const  sucess = await deleteConsulta(id);
            if (sucess) {
                setConsultas(consultas.filter(consulta => consulta.id !== id));
            } else {
                console.error('Erro ao excluir consulta');
            }
    };

    const handleChangeForm = (event: {target: {name: any; value: any; };})  => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredConsultas = consultas.filter((consulta) =>
        consulta.acompanhanteLegal.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Paciente", "Acompanhante legal", "Data da Consuta", "Horário da Consulta", "Sintomas", "Duração dos Sintomas", "Medicamentos", "Orientações", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <Sidebar/>
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE CONSULTAS
                </h1>

                <div className='flex justify-start flex-wrap gap-5 my-5 mx-20'>
                    <div className="flex items-center adjust-buttons">
                        <InputFieldProps
                            type="text"
                            name="searchQuery"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus: outline-none pb-3 fix-button adjust-buttons focus:border-[#1f616b]"
                            placeholder="Pesquisar por nome"
                            value={searchQuery}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <button className="bg-[#005562] rounded-lg text-white h-12 text-sm transition-all hover:bg-[#1f616b] px-5 adjust-buttons">
                        <Link href="/consulta/FormCadastroConsulta">
                            Adicionar Consulta
                        </Link>
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg ml-20 mr-5">
                    <table className="w-full text-sm text-left rtl:text-right text-white bg-[#144d54]">
                        <thead className="text-xs text-white uppercase dark:bg-gray-800 text-center">
                            <tr>
                                {trs.map((tr, index) => (
                                    <th scope="col" className="px-6 py-3" key={index}>
                                        {tr}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='bg-[#e0f9fb]'>
                            {filteredConsultas.map((consulta, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <td className="px-6 py-4">
                                        {consulta.paciente}
                                    </td>
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {consulta.acompanhanteLegal}
                                    </th>
                                    <td className="px-6 py-4">
                                        {consulta.data.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.horario}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.sintomas}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.duracao}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.medicamento?.length > 0 ? consulta.medicamento.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {consulta.orientacao}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(consulta)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(consulta.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar eonsulta" width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editConsulta && (
                <Editar
                    eonsulta={selectedConsulta}
                    onClose={() => setEditConsulta(false)}
                    onSave={(updatedConsulta: consultaProps) => {
                        setConsultas(consultas.map(consulta => (consulta.id === updatedConsulta.id ? updatedConsulta : consulta)));
                        setEditConsulta(false);
                    }}
                />
            )}
        </main>
    );
}

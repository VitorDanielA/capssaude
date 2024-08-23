import { useState, useEffect, SetStateAction } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarTerapeuta';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';
import { deleteTerapeuta, fetchTerapeutas } from '@/helpers/terapeuta';

interface terapeutaProps{
    id: number;
    nome: string;
    crefito: string;
    diasDisponiveis: string[];
    horariosDisponiveis: string[];
}

export default function TabelaTerapeuta() {
    const [terapeutas, setTerapeutas] = useState<terapeutaProps[]>([]);
    const [selectedTerapeuta, setSelectedTerapeuta] = useState(null);
    const [editTerapeuta, setEditTerapeuta] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTerapeutas();
                setTerapeutas(data);
            } catch (error) {
                console.error('Erro ao buscar terapeutas:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (terapeuta: SetStateAction<null>) => {
        setSelectedTerapeuta(terapeuta);
        setEditTerapeuta(true);
    };

    const handleDelete = async (id: number) => {
       const sucess = await deleteTerapeuta(id);
            if (sucess) {
                setTerapeutas(terapeutas.filter(terapeuta => terapeuta.id !== id));
            } else {
                console.error('Erro ao excluir terrapeuta');
            }
    };

    const handleChangeForm = (event: {target: {name: any; value: any; };}) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredTerapeutas = terapeutas.filter((terapeuta) =>
        terapeuta.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Nome", "Crefito", "Dias Disponíveis", "Horários Disponíveis", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE TERAPEUTAS
                </h1>

                <div className='flex justify-start flex-wrap gap-5 my-5 mx-10'>
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
                        <Link href="/terapeuta/FormCadastroTerapeuta">
                            Adicionar Terapeuta
                        </Link>
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg mx-10">
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
                            {filteredTerapeutas.map((terapeuta, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {terapeuta.nome}
                                    </th>
                                    <td className="px-6 py-4">
                                        {terapeuta.crefito}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.diasDisponiveis?.length > 0 ? terapeuta.diasDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {terapeuta.horariosDisponiveis?.length > 0 ? terapeuta.horariosDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(terapeuta)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(terapeuta.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar psicólogo" width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editTerapeuta && (
                <Editar
                    terapeuta={selectedTerapeuta}
                    onClose={() => setEditTerapeuta(false)}
                    onSave={(updatedTerapeuta) => {
                        setTerapeutas(terapeutas.map(terapeuta => (terapeuta.id === updatedTerapeuta.id ? updatedTerapeuta : terapeuta)));
                        setEditTerapeuta(false);
                    }}
                />
            )}
        </main>
    );
}

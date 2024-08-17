import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarEnfermeiro';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function TabelaEnfermeiro() {
    const [enfermeiros, setEnfermeiros] = useState([]);
    const [selectedEnfermeiro, setSelectedEnfermeiro] = useState(null);
    const [editEnfermeiro, setEditEnfermeiro] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/caps/enfermeiro', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: {
                    id: string;
                    nome: string;
                    coren: string;
                    diasDisponiveis: string[];
                    horariosDisponiveis: string[];
                }[] = await response.json();
                setEnfermeiros(data);
            } catch (error) {
                console.error('Erro ao buscar enfermeiros:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (enfermeiro) => {
        setSelectedEnfermeiro(enfermeiro);
        setEditEnfermeiro(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/caps/enfermeiro/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEnfermeiros(enfermeiros.filter(enfermeiro => enfermeiro.id !== id));
            } else {
                console.error('Erro ao excluir enfermeiro');
            }
        } catch (error) {
            console.error('Erro ao excluir enfermeiro:', error);
        }
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredEnfermeiros = enfermeiros.filter((enfermeiro) =>
        enfermeiro.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Nome", "COREN", "Dias Disponíveis", "Horários Disponíveis", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE ENFERMEIROS
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
                        <Link href="/enfermeiro/FormCadastrarEnfermeiro">
                            Adicionar Enfermeiro
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
                            {filteredEnfermeiros.map((enfermeiro, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {enfermeiro.nome}
                                    </th>
                                    <td className="px-6 py-4">
                                        {enfermeiro.coren}
                                    </td>
                                    <td className="px-6 py-4">
                                        {enfermeiro.diasDisponiveis?.length > 0 ? enfermeiro.diasDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {enfermeiro.horariosDisponiveis?.length > 0 ? enfermeiro.horariosDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(enfermeiro)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(enfermeiro.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar enfermeiro" width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editEnfermeiro && (
                <Editar
                    enfermeiro={selectedEnfermeiro}
                    onClose={() => setEditEnfermeiro(false)}
                    onSave={(updatedEnfermeiro) => {
                        setEnfermeiros(enfermeiros.map(enfermeiro => (enfermeiro.id === updatedEnfermeiro.id ? updatedEnfermeiro : enfermeiro)));
                        setEditEnfermeiro(false);
                    }}
                />
            )}
        </main>
    );
}

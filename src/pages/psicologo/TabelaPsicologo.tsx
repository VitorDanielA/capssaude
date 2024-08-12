import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarPsicologo';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function TabelaPsicologo() {
    const [psicologos, setPsicologos] = useState([]);
    const [selectedPsicologo, setSelectedPsicologo] = useState(null);
    const [editPsicologo, setEditPsicologo] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/caps/psicologo', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: {
                    id: string;
                    nome: string;
                    crp: string;
                    diasDisponiveis: string[];
                    horariosDisponiveis: string[];
                }[] = await response.json();
                setPsicologos(data);
            } catch (error) {
                console.error('Erro ao buscar psicólogos:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (psicologo) => {
        setSelectedPsicologo(psicologo);
        setEditPsicologo(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/caps/psicologo/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPsicologos(psicologos.filter(psicologo => psicologo.id !== id));
            } else {
                console.error('Erro ao excluir psicólogo');
            }
        } catch (error) {
            console.error('Erro ao excluir psicólogo:', error);
        }
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredPsicologos = psicologos.filter((psicologo) =>
        psicologo.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Nome", "CRP", "Dias Disponíveis", "Horários Disponíveis", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE PSICÓLOGOS
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
                        <Link href="/psicologo/FormCadastroPsicologo">
                            Adicionar Psicólogo
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
                            {filteredPsicologos.map((psicologo, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {psicologo.nome}
                                    </th>
                                    <td className="px-6 py-4">
                                        {psicologo.crp}
                                    </td>
                                    <td className="px-6 py-4">
                                        {psicologo.diasDisponiveis?.length > 0 ? psicologo.diasDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {psicologo.horariosDisponiveis?.length > 0 ? psicologo.horariosDisponiveis.join(', ') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(psicologo)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(psicologo.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar psicólogo" width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editPsicologo && (
                <Editar
                    psicologo={selectedPsicologo}
                    onClose={() => setEditPsicologo(false)}
                    onSave={(updatedPsicologo) => {
                        setPsicologos(psicologos.map(psicologo => (psicologo.id === updatedPsicologo.id ? updatedPsicologo : psicologo)));
                        setEditPsicologo(false);
                    }}
                />
            )}
        </main>
    );
}

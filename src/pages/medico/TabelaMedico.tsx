import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import InputFieldProps from '@/components/InputFieldProps';
import Editar from '@/components/EditarMedico';
//import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';
import { deleteMedico, fetchMedicos } from '@/helpers/medico'; // Funções para buscar e deletar médicos
import Sidebar from '@/components/Sidebar';

interface MedicoProps {
    id: number;
    nome: string;
    especialidade: string;
    diasAtendimento: string[];
    horasAtendimento: string[];
}

export default function TabelaMedico() {
    const [medicos, setMedicos] = useState<MedicoProps[]>([]);
    const [selectedMedico, setSelectedMedico] = useState<MedicoProps | null>(null);
    const [editMedico, setEditMedico] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMedicos();
                setMedicos(data);
            } catch (error) {
                console.error('Erro ao buscar médicos:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (medico: MedicoProps) => {
        setSelectedMedico(medico);
        setEditMedico(true);
    };

    const handleDelete = async (id: number) => {
        const success = await deleteMedico(id);
        if (success) {
            setMedicos(medicos.filter(medico => medico.id !== id));
        } else {
            console.error('Erro ao excluir médico');
        }
    };

    const handleChangeForm = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredMedicos = medicos.filter((medico) =>
        medico.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Nome", "Especialidade", "Dias de Atendimento", "Horas de Atendimento", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <Sidebar/>
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE MÉDICOS
                </h1>

                <div className='flex justify-start flex-wrap gap-5 my-5 mx-20'>
                    <div className="flex items-center adjust-buttons">
                        <InputFieldProps
                            type="text"
                            name="searchQuery"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:outline-none pb-3 fix-button adjust-buttons focus:border-[#1f616b]"
                            placeholder="Pesquisar por nome"
                            value={searchQuery}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <button className="bg-[#005562] rounded-lg text-white h-12 text-sm transition-all hover:bg-[#1f616b] px-5 adjust-buttons">
                        <Link href="/medico/FormCadastroMedico">
                            Adicionar Médico
                        </Link>
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg ml-20 mr-5 my-10">
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
                        {filteredMedicos.map((medico, index) => (
                            <tr key={index} className="text-center font-medium text-[#144d54]">
                                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                    {medico.nome}
                                </th>
                                <td className="px-6 py-4">
                                    {medico.especialidade}
                                </td>
                                <td className="px-6 py-4">
                                    {medico.diasAtendimento?.length > 0 ? medico.diasAtendimento.join(', ') : 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    {medico.horasAtendimento?.length > 0 ? medico.horasAtendimento.join(', ') : 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEdit(medico)} className="text-blue-400 hover:text-blue-600">
                                        <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(medico.id)} className="text-red-400 hover:text-red-600">
                                        <Image src={deletar} alt="Deletar médico" width={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editMedico && (
                <Editar
                    medico={selectedMedico}
                    onClose={() => setEditMedico(false)}
                    onSave={(updatedMedico: MedicoProps) => {
                        setMedicos(medicos.map(medico => (medico.id === updatedMedico.id ? updatedMedico : medico)));
                        setEditMedico(false);
                    }}
                />
            )}
        </main>
    );
}

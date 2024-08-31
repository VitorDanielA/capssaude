import { useState, useEffect, SetStateAction } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarPaciente';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';
import { deletePaciente, fetchPacientes } from '@/helpers/paciente';

interface pacienteProps{
    id: number;
    nome: string;
    cpf: string;
    dataDeNascimento: Date;
    cep: string;
    bairro: string;
    logradouro: string;
    telefone: string;
    telefonesEmergencia: string[];
}

export default function TabelaPaciente() {
    const [pacientes, setPacientes] = useState<pacienteProps[]>([]);
    const [selectedPaciente, setSelectedPaciente] = useState<pacienteProps | null>(null);
    const [editPaciente, setEditPaciente] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try{
              const data = await fetchPacientes();
                setPacientes(data);
                    
                }catch(err){
                    console.log('Erro ao buscar pacientes',err);
                }
           
        };

        fetchData();
    }, []);

    const handleEdit = (paciente: pacienteProps) => {
        setSelectedPaciente(paciente);
        setEditPaciente(true);
    };

    const handleDelete = async (id: number) => {
            const sucess = await deletePaciente(id);
            if (sucess) {
                setPacientes(pacientes.filter(paciente => paciente.id !== id));
            } else {
                console.error('Erro ao excluir paciente');
            }
    };

    const handleChangeForm = (event: {target: {name: any; value: any; };}) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredPacientes = pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const trs = ["Nome", "CPF", "Data de nascimento", "CEP", "Bairro", "Logradouro", "Telefone", "Telefone Responsavel", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE PACIENTES
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
                        <Link href="/cadastrarPaciente/FormCadastrarPaciente">
                            Adicionar Paciente
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
                            {filteredPacientes.map((paciente, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {paciente.nome}
                                    </th>
                                    <td className="px-6 py-4">
                                        {paciente.cpf}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.dataDeNascimento.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.cep}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.bairro}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.logradouro}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.telefone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {paciente.telefonesEmergencia.map((telefone, index) => (
                                            <span key={index}>
                                                {telefone}
                                                {index < paciente.telefonesEmergencia.length - 1 && (
                                                    <span>, </span>
                                                )}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(paciente)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(paciente.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar usuário" width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

            {editPaciente && (
                <Editar
                    paciente={selectedPaciente}
                    onClose={() => setEditPaciente(false)}
                    onSave={(updatedPaciente: pacienteProps) => {
                        setPacientes(pacientes.map(paciente => (paciente.id === updatedPaciente.id ? updatedPaciente : paciente)));
                        setEditPaciente(false);
                    }}
                />
            )}

        </main>
    );
}
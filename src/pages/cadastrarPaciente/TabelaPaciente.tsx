import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/EditarPaciente';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function TabelaPaciente() {
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [editPaciente, setEditPaciente] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/caps/paciente', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: {
                    nome: string;
                    cpf: string;
                    dataDeNascimento: Date;
                    cep: string;
                    bairro: string;
                    logradouro: string;
                    telefone: string;
                    telefonesEmergencia: string[];
                }[] = await response.json();
                setPacientes(data);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (paciente) => {
        setSelectedPaciente(paciente);
        setEditPaciente(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/caps/paciente/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPacientes(pacientes.filter(paciente => paciente.id !== id));
            } else {
                console.error('Erro ao excluir paciente');
            }
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
        }
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredUsers = pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex flex-col">
            <Navbar />

            <div className="">
                <h1 className="text-3xl font-bold text-center mb-8 mt-8">
                    TABELA DE PACIENTES
                </h1>

                <div className='flex justify-between gap-5 my-5'>
                    <div className="relative flex items-center">
                        <InputFieldProps
                            type="text"
                            name="searchQuery"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus: outline-none pb-3 fix-button"
                            placeholder="Pesquisar por nome"
                            value={searchQuery}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <button className="bg-blue-500 rounded-lg text-white h-12 text-sm hover:bg-blue-400 px-5">
                        <Link href="/cadastrarPaciente/FormCadastrarPaciente">
                            Adicionar Paciente
                        </Link>
                    </button>

                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CPF
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data de nascimento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CEP
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bairro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Logradouro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telefone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telefones do Responsavel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Editar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Excluir
                                </th>
                            </tr>
                        </thead>
                        <tbody>


                            {filteredUsers.map((paciente) => (
                                <tr key={paciente.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{paciente.nome}</td>
                                    <td className="px-6 py-4">{paciente.cpf}</td>
                                    <td className="px-6 py-4">{paciente.dataDeNascimento.substring(0, 10)}</td>
                                    <td className="px-6 py-4">{paciente.cep}</td>
                                    <td className="px-6 py-4">{paciente.bairro}</td>
                                    <td className="px-6 py-4">{paciente.logradouro}</td>
                                    <td className="px-6 py-4">{paciente.telefone}</td>
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
                                        <button onClick={() => handleEdit(paciente)} className="text-blue-600 hover:text-blue-900 ml-3 flex items-center">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-4 py-4 sm:px-6">
                                        <button onClick={() => handleDelete(paciente.id)} className="text-red-600 hover:text-red-900 ml-4 flex items-center">
                                            <Image src={deletar} alt="Deletar usuário" width={20} height={20} className="mr-2" />
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
                    onSave={(updatedUser) => {
                        setPacientes(pacientes.map(paciente => (paciente.id === updatedUser.id ? updatedUser : paciente)));
                        setEditPaciente(false);
                    }}
                />
            )}

        </main>
    );
}
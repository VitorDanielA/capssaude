import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/Editar';
import InputFieldProps from '@/components/InputFieldProps';
import lupa from '@/assets/lupa.png';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/caps/usuario', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: { nome: string; email: string; nivelAcesso: number }[] = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (usuario) => {
        setSelectedUser(usuario);
        setEditUser(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/caps/usuario/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            } else {
                console.error('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredUsers = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getNivelAcessoLabel = (nivelAcesso) => {
        switch (nivelAcesso) {
            case 1:
                return 'Usuário Padrão';
            case 2:
                return 'Médico';
            case 3:
                return 'Gestor';
            default:
                return 'Nível Inválido';
        }
    };

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />

            <div className="container mx-auto p-4 mt-10 ">
                <h1 className="text-3xl font-bold text-center mb-8 mt-8">
                    TABELA DE USUÁRIOS
                </h1>

                <div className='flex items-center justify-between mb-4'>

                    <div className="relative flex items-center">
                        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none z-0'>

                            <Image src={lupa} alt="Ícone de Lupa" className="h-5 w-5 text-gray-400" />
                        </div>
                        <InputFieldProps
                            type="text"
                            name="searchQuery"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-60 p-2.5 focus: outline-none my-5 pl-14"
                            placeholder="Pesquisar por nome"
                            value={searchQuery}
                            onChange={handleChangeForm}
                        />
                    </div>
                        <Link href="/formCadastrar/FormCadastrar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar Usuário
                        </Link>

                </div>


                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Nome
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Nível de Acesso
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Editar
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Excluir
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((usuario) => (
                            <tr key={usuario.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                                <td className="px-4 py-4 sm:px-6">{usuario.nome}</td>
                                <td className="px-4 py-4 sm:px-6">{usuario.email}</td>
                                <td className="px-4 py-4 sm:px-6">{getNivelAcessoLabel(usuario.nivelAcesso)}</td>
                                <td className="px-4 py-4 sm:px-6">
                                    <button onClick={() => handleEdit(usuario)} className="text-blue-600 hover:text-blue-900 ml-3 flex items-center">
                                        <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                    </button>
                                </td>
                                <td className="px-4 py-4 sm:px-6">
                                    <button onClick={() => handleDelete(usuario.id)} className="text-red-600 hover:text-red-900 ml-4 flex items-center">
                                        <Image src={deletar} alt="Deletar usuário" width={20} height={20} className="mr-2" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editUser && (
                <Editar
                    usuario={selectedUser}
                    onClose={() => setEditUser(false)}
                    onSave={(updatedUser) => {
                        setUsuarios(usuarios.map(usuario => (usuario.id === updatedUser.id ? updatedUser : usuario)));
                        setEditUser(false);
                    }}
                />
            )}

        </main>
    );
}
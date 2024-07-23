import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Editar from '@/components/Editar';

const inter = Inter({ subsets: ['latin'] });

export default function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [editUser, setEditUser] = useState([]);

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

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />

            <div className="container mx-auto p-4 mt-10">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Lista de Usuários
                </h1>

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
                            <th scope="col" className="px-4 py-3 sm:px-6" align='left'>
                                #
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                                <td className="px-4 py-4 sm:px-6">{usuario.nome}</td>
                                <td className="px-4 py-4 sm:px-6">{usuario.email}</td>
                                <td className="px-4 py-4 sm:px-6">{usuario.nivelAcesso}</td>
                                <td className="px-4 py-4 sm:px-6">
                                    <button onClick={() => handleEdit(usuario)} className="text-blue-600 hover:text-blue-900">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(usuario.id)} className="text-red-600 hover:text-red-900 ml-4">
                                        Excluir
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
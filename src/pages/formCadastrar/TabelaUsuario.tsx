import { useState, useEffect, SetStateAction } from 'react';
import Editar from '@/components/Editar';
import InputFieldProps from '@/components/InputFieldProps';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Image from 'next/image';
import Link from 'next/link';
import { deleteUser, fetchUsers } from '@/helpers/usuario';

interface usuariosProps {
    id: number;
    nome: string;
    email: string;
    nivelAcesso: number;
}

export default function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState<usuariosProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<usuariosProps | null>(null);
    const [editUser, setEditUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        loadUsers();
    }, []);

    const handleEdit = (usuario: usuariosProps) => {
        setSelectedUser(usuario);
        setEditUser(true);
    };

    const handleDelete = async (id: number) => {
        const success = await deleteUser(id);
        if (success) {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } else {
            console.error('Erro ao excluir usuário');
        }
    };

    const handleChangeForm = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredUsers = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getNivelAcessoLabel = (nivelAcesso: number) => {
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

    const trs = ["Nome", "Email", "Nível de Acesso", "Editar", "Excluir"];

    return (
        <main className="flex flex-col">
            <div className="mt-24">
                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE USUÁRIOS
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
                    <button className="bg-[#005562] rounded-lg text-white h-12 text-sm transition-all hover:bg-[#1f616b] px-5 adjust-buttons ">
                        <Link href="/formCadastrar/FormCadastrar">
                            Adicionar Usuário
                        </Link>
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg mx-10">
                    <table className="w-full text-sm text-left rtl:text-right text-white bg-[#144d54] ">
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
                            {filteredUsers.map((usuario, index) => (
                                <tr key={index} className="text-center font-medium text-[#144d54]">
                                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                        {usuario.nome}
                                    </th>
                                    <td className="px-6 py-4">
                                        {usuario.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getNivelAcessoLabel(usuario.nivelAcesso)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(usuario)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt='' width={24} className=''/>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(usuario.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt='' width={24}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editUser && (
                <Editar
                    usuario={selectedUser}
                    onClose={() => setEditUser(false)}
                    onSave={(updatedUser: usuariosProps) => {
                        setUsuarios(usuarios.map(usuario => (usuario.id === updatedUser.id ? updatedUser : usuario)));
                        setEditUser(false);
                    }}
                />
            )}

        </main>
    );
}
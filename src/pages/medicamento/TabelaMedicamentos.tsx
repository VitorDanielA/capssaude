import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import InputFieldProps from '@/components/InputFieldProps';
import Link from "next/link";
import Image from "next/image";
import Editar from '@/components/EditarMedicamento';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Footer from "@/components/Footer";

export default function TabelaMedicamentos() {

    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState(null);
    const [editMedicamento, setEditMedicamento] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/caps/medicamento', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: {
                    nomeMedicamento: string;
                    descricao: string;
                    horario: string;
                    dosagem: string;
                }[] = await response.json();
                setMedicamentos(data);
            } catch (error) {
                console.error('Erro ao buscar medicamentos:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (medicamento) => {
        setSelectedMedicamento(medicamento);
        setEditMedicamento(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/caps/medicamento/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMedicamentos(medicamentos.filter(medicamento => medicamento.id !== id));
            } else {
                console.error('Erro ao excluir medicamento');
            }
        } catch (error) {
            console.error('Erro ao excluir medicamento:', error);
        }
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredUsers = medicamentos.filter((medicamento) =>
        medicamentos.nomeMedicamento.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex flex-col">

            <Navbar />

            <h1 className="text-3xl font-bold text-center mb-8 mt-8">
                TABELA DE MEDICAMENTOS
            </h1>

            <div className="flex flex-col min-h-screen">

                <h1 className="text-3xl font-bold text-center mb-8 mt-8">
                    TABELA DE MEDICAMENTOS
                </h1>

                <div className='flex justify-between gap-5 my-5'>
                    <div className="flex items-center">
                        <InputFieldProps
                            type="text"
                            name="searchQuery"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus: outline-none pb-3 fix-button ml-16"
                            placeholder="Pesquisar por nome"
                            value={searchQuery}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <button className="bg-blue-500 rounded-lg text-white h-12 text-sm hover:bg-blue-400 px-5 mr-16">
                        <Link href="/medicamento/FormCadastroMedicamento">
                            Adicionar Medicamento
                        </Link>
                    </button>

                </div>

                <div className="overflow-x-auto shadow-md sm:rounded-lg ml-16 mr-16">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descrição
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Horário
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dosagem
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


                            {filteredUsers.map((medicamento) => (
                                <tr key={medicamento.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{medicamento.nomeMedicamento}</td>
                                    <td className="px-6 py-4">{medicamento.descricao}</td>
                                    <td className="px-6 py-4">{medicamento.horario}</td>
                                    <td className="px-6 py-4">{medicamento.dosagem}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(medicamento)} className="text-blue-600 hover:text-blue-900 ml-3 flex items-center">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-4 py-4 sm:px-6">
                                        <button onClick={() => handleDelete(medicamento.id)} className="text-red-600 hover:text-red-900 ml-4 flex items-center">
                                            <Image src={deletar} alt="Deletar medicamento" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

            <Footer/>

            {editMedicamento && (
                <Editar
                    medicamento={selectedMedicamento}
                    onClose={() => setEditMedicamento(false)}
                    onSave={(updatedUser) => {
                        setMedicamentos(medicamentos.map(medicamento => (medicamento.id === updatedUser.id ? updatedUser : medicamento)));
                        setEditMedicamento(false);
                    }}
                />
            )}

        </main>
    );

}
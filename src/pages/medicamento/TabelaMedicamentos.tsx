import Navbar from "@/components/Navbar";
import { SetStateAction, useEffect, useState } from "react";
import InputFieldProps from '@/components/InputFieldProps';
import Link from "next/link";
import Image from "next/image";
import Editar from '@/components/EditarMedicamento';
import editar from '@/assets/editar.png';
import deletar from '@/assets/deletar.png';
import Footer from "@/components/Footer";
import { deleteMedicamento, fetchMedicamentos } from "@/helpers/medicamento";

interface medicamentoProps {
    id: number;
    nomeMedicamento: string;
    descricao: string;
    horario: string;
    dosagem: string;
}

export default function TabelaMedicamentos() {
    const [medicamentos, setMedicamentos] = useState<medicamentoProps[]>([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState<medicamentoProps | null>(null);
    const [editMedicamento, setEditMedicamento] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadMedicamentos = async () => {
            try {
                const data = await fetchMedicamentos();
                setMedicamentos(data);
            } catch (error) {
                console.error('Erro ao buscar medicamentos:', error);
            }
        };

        loadMedicamentos();
    }, []);

    const handleEdit = (medicamento: medicamentoProps) => {
        setSelectedMedicamento(medicamento);
        setEditMedicamento(true);
    };

    const handleDelete = async (id: number) => {
        const success = await deleteMedicamento(id);
        if (success) {
            setMedicamentos(medicamentos.filter(medicamento => medicamento.id !== id));
        } else {
            console.error('Erro ao excluir medicamento');
        }
    };

    const handleChangeForm = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        if (name === 'searchQuery') {
            setSearchQuery(value);
            return;
        }
    };

    const filteredUsers = medicamentos.filter((medicamento) =>
        medicamento.nomeMedicamento.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex flex-col">

            <Navbar />

            <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                TABELA DE MEDICAMENTOS
            </h1>

            <div className="flex flex-col min-h-screen">

                <h1 className="sm:text-5xl text-3xl text-[#005562] font-bold text-center mb-8 mt-8">
                    TABELA DE MEDICAMENTOS
                </h1>

                <div className='flex justify-start flex-wrap gap-5 my-5 mx-20'>
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
                        <Link href="/medicamento/FormCadastroMedicamento">
                            Adicionar Medicamento
                        </Link>
                    </button>

                </div>

                <div className="relative overflow-x-auto shadow-md rounded-lg ml-20 mr-5">
                    <table className="w-full text-sm text-left rtl:text-right text-white bg-[#144d54]">
                        <thead className="text-xs text-white uppercase dark:bg-gray-800 text-center">
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
                        <tbody className="bg-[#e0f9fb]">
                            {filteredUsers.map((medicamento) => (
                                <tr key={medicamento.id} className="text-center font-medium text-[#144d54]">
                                    <td className="px-6 py-4">{medicamento.nomeMedicamento}</td>
                                    <td className="px-6 py-4">{medicamento.descricao}</td>
                                    <td className="px-6 py-4">{medicamento.horario}</td>
                                    <td className="px-6 py-4">{medicamento.dosagem}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleEdit(medicamento)} className="text-blue-400 hover:text-blue-600">
                                            <Image src={editar} alt="Editar" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(medicamento.id)} className="text-red-400 hover:text-red-600">
                                            <Image src={deletar} alt="Deletar medicamento" width={20} height={20} className="mr-2" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

            <Footer />

            {editMedicamento && (
                <Editar
                    medicamento={selectedMedicamento}
                    onClose={() => setEditMedicamento(false)}
                    onSave={(updatedMedicamento: medicamentoProps) => {
                        setMedicamentos(medicamentos.map(medicamento => (medicamento.id === updatedMedicamento.id ? updatedMedicamento : medicamento)));
                        setEditMedicamento(false);
                    }}
                />
            )}

        </main>
    );

}
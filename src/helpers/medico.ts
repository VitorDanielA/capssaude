export interface Medico {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cep: string;
    bairro: string;
    logradouro: string;
    complemento: string;
    telefone: string;
    sexo: string;
    especialidade: string;
    codEspecialidade: string;
    diasAtendimento: string[];
    horasAtendimento: string[];
    comentarios: string;
    codigoRegistro: string;
}

export const fetchMedicos = async (): Promise<Medico[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/medico', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Medico[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        throw error;
    }
};

export const deleteMedico = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/medico/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir médico:', error);
        return false;
    }
};

export const createMedicos = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/medico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar médico:', error);
        throw error;
    }
};

export const updateMedico = async ( id: number, formData: any ): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/medico/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(formData);
        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao atualizar médico:', error);
        throw error;
    }
};
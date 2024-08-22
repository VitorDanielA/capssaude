export interface Paciente {
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

export const fetchPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/paciente', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Paciente[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        throw error;
    }
};

export const deletePaciente = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/paciente/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir paciente:', error);
        return false;
    }
};

export const createPaciente = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/paciente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        throw error;
    }
};

export const updatePaciente = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/paciente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        throw error;
    }
};


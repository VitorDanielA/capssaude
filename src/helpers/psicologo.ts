export interface Psicologo {
    id: number;
    nome: string;
    cpf: string,
    dataDeNascimento: Date,
    cep: string,
    bairro: string,
    logradouro: string,
    complemento: string,
    telefone: string,
    sexo: string,
    email: string,
    crp: string;
    diasDisponiveis: string[];
    horariosDisponiveis: string[];
    comentarios: string,
}

export const fetchPsicologos = async (): Promise<Psicologo[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/psicologo', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Psicologo[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar psicologo:', error);
        throw error;
    }
};

export const deletePsicologo = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/psicologo/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir psicologo:', error);
        return false;
    }
};

export const createPsicologo = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/psicologo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar psicologo:', error);
        throw error;
    }
};

export const updatePsicologo = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/psicologo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(formData)
        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao atualizar psicologo:', error);
        throw error;
    }
};


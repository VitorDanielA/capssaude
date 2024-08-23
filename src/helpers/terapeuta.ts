export interface Terapeuta {
    id: number;
    nome: string;
    crefito: string;
    diasDisponiveis: string[];
    horariosDisponiveis: string[];
}

export const fetchTerapeutas = async (): Promise<Terapeuta[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/terapeuta', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Terapeuta[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar terapeuta:', error);
        throw error;
    }
};

export const deleteTerapeuta = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/terapeuta/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir terapeuta:', error);
        return false;
    }
};

export const createTerapeuta = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/terapeuta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar terapeuta:', error);
        throw error;
    }
};

export const updateTerapeuta = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/terapeuta/${id}`, {
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
        console.error('Erro ao atualizar terapeuta:', error);
        throw error;
    }
};


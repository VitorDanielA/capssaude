export interface Enfermeiro {
    id: number;
    nome: string;
    coren: string;
    diasDisponiveis: string[];
    horariosDisponiveis: string[];
}

export const fetchEnfermeiros = async (): Promise<Enfermeiro[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/enfermeiro', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Enfermeiro[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar enfermeiro:', error);
        throw error;
    }
};

export const deleteEnfermeiro = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/enfermeiro/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir enfermeiro:', error);
        return false;
    }
};

export const createEnfermeiro = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/enfermeiro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar enfermeiro:', error);
        throw error;
    }
};

export const updateEnfermeiro = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/enfermeiro/${id}`, {
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
        console.error('Erro ao atualizar enfermeiro:', error);
        throw error;
    }
};


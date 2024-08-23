export interface Medicamento {
    id: number;
    nomeMedicamento: string;
    descricao: string;
    horario: string;
    dosagem: string;
}

export const fetchMedicamentos = async (): Promise<Medicamento[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/medicamento', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Medicamento[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar medicamento:', error);
        throw error;
    }
};

export const deleteMedicamento = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/medicamento/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir medicamento:', error);
        return false;
    }
};

export const createMedicamento = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/medicamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar medicamento:', error);
        throw error;
    }
};

export const updateMedicamento = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/medicamento/${id}`, {
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
        console.error('Erro ao atualizar medicamento:', error);
        throw error;
    }
};


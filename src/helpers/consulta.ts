export interface Consulta {
    id: number;
    acompanhanteLegal: string;
    data: Date,
    horario: string,
    sintomas: string,
    duracao: string,
    medicamento: string[],
    orientacao: string,
   
}

export const fetchConsultas = async (): Promise<Consulta[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/consulta', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Consulta[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar consulta:', error);
        throw error;
    }
};

export const deleteConsulta = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/consulta/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir consulta:', error);
        return false;
    }
};

export const createConsulta = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        throw error;
    }
};

export const updateConsulta = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/consulta/${id}`, {
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
        console.error('Erro ao atualizar consulta:', error);
        throw error;
    }
};


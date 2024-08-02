export interface Usuario {
    id: number;
    nome: string;
    email: string;
    nivelAcesso: number;
}

export const fetchUsers = async (): Promise<Usuario[]> => {
    try {
        const response = await fetch('http://localhost:8080/caps/usuario', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Usuario[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/usuario/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return false;
    }
};

export const createUser = async (form: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch('http://localhost:8080/caps/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

export const updateUser = async (id: number, formData: any): Promise<{ ok: boolean; json: any }> => {
    try {
        const response = await fetch(`http://localhost:8080/caps/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const json = await response.json();
        return { ok: response.ok, json };
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};


import API from '@/plugins/axios'

class UserService {
    getAll(): Promise<any> {
        return API.get("/usuarios");
    }

    get(id: any): Promise<any> {
        return API.get(`/usuarios/${id}`);
    }

    create(data: {name: string, email: string, password: string, c_password: string}): Promise<any> {
        return API.post(`/usuarios`, data);
    }

    update(id: any, data: {name: string, email: string}): Promise<any> {
        return API.put(`/usuarios/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return API.delete(`/usuarios/${id}`);
    }
}

export default new UserService();
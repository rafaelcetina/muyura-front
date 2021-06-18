import API from '@/plugins/axios'
import {Usuario} from "@/models/Usuario";

class UserService {
    getAll(): Promise<any> {
        return API.get("/usuarios");
    }

    get(id: any): Promise<any> {
        return API.get(`/usuarios/${id}`);
    }

    create(data: Usuario): Promise<any> {
        return API.post(`/usuarios`, data);
    }

    update(id: any, data: Usuario): Promise<any> {
        return API.put(`/usuarios/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return API.delete(`/usuarios/${id}`);
    }
}

export default new UserService();
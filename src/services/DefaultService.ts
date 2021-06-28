import API from '@/plugins/axios'

class DefaultService {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getAll(): Promise<any> {
        return API.get(`${this.url}`);
    }

    get(id: any): Promise<any> {
        return API.get(`/${this.url}/${id}`);
    }

    create(data: any): Promise<any> {
        return API.post(`${this.url}`, data);
    }

    update(id: any, data: any): Promise<any> {
        return API.put(`/${this.url}/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return API.delete(`/${this.url}/${id}`);
    }

    activar(id: any): Promise<any> {
        return API.post(`/${this.url}/${id}/change-estatus/1`);
    }

    desactivar(id: any): Promise<any> {
        return API.post(`/${this.url}/${id}/change-estatus/0`);
    }

}

export {DefaultService};
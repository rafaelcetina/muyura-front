import API from '@/plugins/axios'
import {DefaultService} from "@/services/DefaultService";

class CatalogoService extends DefaultService{

    constructor(url: string) {
        super(url);
    }

    activar(id: any): Promise<any> {
        return API.post(`/${this.url}/${id}/change-estatus/1`);
    }

    desactivar(id: any): Promise<any> {
        return API.post(`/${this.url}/${id}/change-estatus/0`);
    }

}

export {CatalogoService};
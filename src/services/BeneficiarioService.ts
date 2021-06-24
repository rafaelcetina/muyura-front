import API from '@/plugins/axios'
import {Beneficiario} from "@/models/Beneficiario";
import {DefaultService} from "@/services/DefaultService";

class BeneficiarioService extends DefaultService {

    constructor() {
        super('beneficiarios');
    }

    create(data: any): Promise<any> {
        data.save_dom = true;
        return API.post(`/beneficiarios`, data);
    }

    update(id: any, data: any): Promise<any> {
        data.save_dom = true;
        return API.put(`/beneficiarios/${id}`, data);
    }

    activar(id: any): Promise<any> {
        return API.post(`/beneficiarios/${id}/change-estatus/1`);
    }

    desactivar(id: any): Promise<any> {
        return API.post(`/beneficiarios/${id}/change-estatus/0`);
    }

    uploadImage(id: any, imagen: any) {
        const formData = new FormData();
        formData.append('p_imagen', imagen);
        return API.post(`/beneficiarios/${id}/upload-image`, formData);
    }

}

export default new BeneficiarioService();
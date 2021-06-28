import API from '@/plugins/axios'
import {Beneficiario} from "@/models/Beneficiario";
import {DefaultService} from "@/services/DefaultService";

class BeneficiarioService extends DefaultService {

    constructor() {
        super('beneficiarios');
    }

    create(data: any): Promise<any> {
        data.save_dom = true;
        return API.post(`/${this.url}`, data);
    }

    update(id: any, data: any): Promise<any> {
        data.save_dom = true;
        return API.put(`/${this.url}/${id}`, data);
    }

    uploadImage(id: any, imagen: any) {
        const formData = new FormData();
        formData.append('p_imagen', imagen);
        return API.post(`/${this.url}/${id}/upload-image`, formData);
    }

    asignarPulsera(id: any, data: any){
        return API.post(`/${this.url}/${id}/asignar-pulsera`,data);
    }

}

export default new BeneficiarioService();
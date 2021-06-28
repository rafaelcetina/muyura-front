import API from '@/plugins/axios'
import {DefaultService} from "@/services/DefaultService";

class TabletaService extends DefaultService {

    constructor() {
        super('tabletas');
    }

    availables(): Promise<any>{
        return API.get(`/${this.url}/availables`);
    }

    vincular(id: any, user: any): Promise<any>{
        return API.post(`/${this.url}/${id}/vincular/${user}`);
    }

    desvincular(id: any): Promise<any>{
        return API.post(`/${this.url}/${id}/desvincular`);
    }


}

export { TabletaService};
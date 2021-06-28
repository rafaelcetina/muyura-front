import {DefaultService} from "@/services/DefaultService";
import API from "@/plugins/axios";

class UserService extends DefaultService{

    constructor() {
        super('usuarios');
    }

    withoutTablet(): Promise<any>{
        return API.get(`/${this.url}/no-tablet`);
    }

    withoutUnit(): Promise<any>{
        return API.get(`/${this.url}/no-unit`);
    }

    fromUnit(unidad_id: any): Promise<any>{
        return API.get(`/${this.url}/unit/${unidad_id}`);
    }

    addToUnit(user_id: any, unidad_id: any): Promise<any>{
        return API.post(`/${this.url}/${user_id}/unit/${unidad_id}`);
    }

    removeFromUnit(user_id: any): Promise<any>{
        return API.post(`/${this.url}/${user_id}/remove-unit`);
    }

}

export default new UserService();
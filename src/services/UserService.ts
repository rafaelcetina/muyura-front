import {DefaultService} from "@/services/DefaultService";

class UserService extends DefaultService{

    constructor() {
        super('usuarios');
    }

}

export default new UserService();
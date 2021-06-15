import API from '@/plugins/axios'
import store from '@/store/index'

class LoginService {
    login(data: {email: string, password: string}): Promise<any> {
        return API.post(`/login`, data);
    }
    updateNip(id: any, data: {old_password: string, password: string, c_password: string}): Promise<any> {
        return API.post(`/profile/${id}/password`, data);
    }
    logout(): Promise<any>{
        return API.post(`/logout/${store.state.id}`);
    }
}

export default new LoginService();
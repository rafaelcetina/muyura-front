import API from '@/plugins/axios'

class DomicilioService {
    getEntidades(): Promise<any>{
        return API.get(`cat/entidades`);
    }

    getMunicipios(entidad: string|number): Promise<any>{
        return API.get(`cat/${entidad}/municipios`);
    }

    getLocalidades(entidad: string|number, municipio: string|number): Promise<any>{
        return API.get(`cat/${entidad}/${municipio}/localidades`);
    }

    getAsentamientos(cp: string){
        return API.get(`cat/cp/${cp}`);
    }
}

export default new DomicilioService();
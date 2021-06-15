import API from '@/plugins/axios'

class TurnoService {
      getAll(): Promise<any> {
        return API.get("/turnos");
      }
    
      get(id: any): Promise<any> {
        return API.get(`/turnos/${id}`);
      }
    
      create(data: any): Promise<any> {
        return API.post("/turnos", data);
      }
    
      update(id: any, data: any): Promise<any> {
        return API.put(`/turnos/${id}`, data);
      }
    
      delete(id: any): Promise<any> {
        return API.delete(`/turnos/${id}`);
      }

      activar(id: any): Promise<any> {
        return API.post(`/turnos/${id}/change-estatus/1`);
      }

      desactivar(id: any): Promise<any> {
          return API.post(`/turnos/${id}/change-estatus/0`);
      }
    
}

export default new TurnoService();
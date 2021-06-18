import API from '@/plugins/axios'
import {Beneficiario} from "@/models/Beneficiario";

class BeneficiarioService {
      getAll(): Promise<any> {
        return API.get("/beneficiarios");
      }
    
      get(id: any): Promise<any> {
        return API.get(`/beneficiarios/${id}`);
      }
    
      create(data: any): Promise<any> {
        return API.post("/beneficiarios", data);
      }
    
      update(id: any, data: any): Promise<any> {
        return API.put(`/beneficiarios/${id}`, data);
      }
    
      delete(id: any): Promise<any> {
        return API.delete(`/beneficiarios/${id}`);
      }

      activar(id: any): Promise<any> {
          return API.post(`/beneficiarios/${id}/change-estatus/1`);
      }

      desactivar(id: any): Promise<any> {
          return API.post(`/beneficiarios/${id}/change-estatus/0`);
      }

      setHorarrios(id: any, data: any){
          return API.post(`horarios/${id}`, data);
      }

      uploadImage(id: any, imagen: any){
          const formData = new FormData();
          formData.append('p_imagen', imagen);
          return API.post(`/beneficiarios/${id}/upload-image`, formData);
      }

}

export default new BeneficiarioService();
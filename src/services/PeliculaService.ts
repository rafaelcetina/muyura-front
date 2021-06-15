import API from '@/plugins/axios'

class PeliculaService {
      getAll(): Promise<any> {
        return API.get("/peliculas");
      }
    
      get(id: any): Promise<any> {
        return API.get(`/peliculas/${id}`);
      }
    
      create(data: any): Promise<any> {
        return API.post("/peliculas", data);
      }
    
      update(id: any, data: any): Promise<any> {
        return API.put(`/peliculas/${id}`, data);
      }
    
      delete(id: any): Promise<any> {
        return API.delete(`/peliculas/${id}`);
      }

      activar(id: any): Promise<any> {
          return API.post(`/peliculas/${id}/change-estatus/1`);
      }

      desactivar(id: any): Promise<any> {
          return API.post(`/peliculas/${id}/change-estatus/0`);
      }

      setHorarrios(id: any, data: any){
          return API.post(`horarios/${id}`, data);
      }

      uploadImage(id: any, imagen: any){
          const formData = new FormData();
          formData.append('p_imagen', imagen);
          return API.post(`/peliculas/${id}/upload-image`, formData);
      }

}

export default new PeliculaService();
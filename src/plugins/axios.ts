import axios, { AxiosInstance } from 'axios';
import EventBus from './event-bus';
import store from '@/store'
import Vue from 'vue'

const API: AxiosInstance = axios.create({
    //baseURL: "http://api-brigadas.edgeit.mx/api",
    baseURL: "http://brigadas.test/api",
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
    },
});


API.interceptors.request.use(
    conf => {
        EventBus.$emit('before-request');
        conf.headers['Authorization'] =`Bearer ${store.state.token}`;
        return conf;
    },
    error => {
        EventBus.$emit('request-error');
        return Promise.reject(error);
    }
);
API.interceptors.response.use(
    response => {
        EventBus.$emit('after-response');
        return response;
    },
    error => {
        if (!error.response) {
            Vue.$toast.error("Error de conexión, Red o API no disponible");
        }else{
            const {config, response} = error
            const originalRequest = config

            if (response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                console.log("Token inválido - " + error.response.data.message)
                Vue.$toast.error("Token de sesión inválido");
                store.dispatch('logout');
                location.href = "/";
                //EventBus.$router.push();
                //TODO: Try to get a new api token
            } else {
                if (error.response) {
                    let status = error.response.status

                    switch (status) {
                        case 500:
                            console.log("Error de servidor - "+error.response.data.message);
                            Vue.$toast.error("Error de servidor");
                            break;
                        case 422:
                            console.log("Request data invalido");
                            Vue.$toast.error("Los datos enviados son inválidos");
                            break;
                        case 403:
                            console.log("Permiso denegado - " + error.response.data.message)
                            Vue.$toast.error("Permiso denegado");
                            break
                        case 429:
                            Vue.$toast.error("Ha realizado demasiadas peticiones seguidas");
                            console.log("Ha realizado demasiadas peticiones seguidas - " + error.response.data.message);
                            break
                        default:
                            console.log(error.response.data)
                            console.log(error.response.status)
                            console.log(error.response.headers)
                    }
                    //throw error.response
                } else if (error.request) {
                    console.log(error.request)
                    //throw error.request
                } else {
                    console.log('Error', error.message)
                    //throw error.message
                }
            }
        }

        EventBus.$emit('response-error');
        return Promise.reject(error);
    }
);
  

export default API;
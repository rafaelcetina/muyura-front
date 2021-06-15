import axios, { AxiosInstance } from 'axios';
import EventBus from './event-bus';
import store from '@/store'

let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}

const API: AxiosInstance = axios.create({
    //baseURL: "https://apptest-global.sytes.net/api",
    baseURL: "http://brigadas.test:82/api",
    headers: {
        "Content-type": "application/json",
    },
});


API.interceptors.request.use(
    conf => {
        EventBus.$emit('before-request');
        conf.headers = { 
            'Authorization': `Bearer ${store.state.token}`,
          }
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
        if(error.response!=undefined){
            if(error.response.status==403)
                console.log("Permiso denegado - "+error.response.data.message);
            if(error.response.status==429)
                console.log("Ha realizado demasiadas peticiones seguidas - "+error.response.data.message);
        }else
            console.log(error);
        EventBus.$emit('response-error');
        return Promise.reject(error);
    }
);
  

export default API;
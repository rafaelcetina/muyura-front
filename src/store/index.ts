import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  key: 'apptest-global',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexPersistence.plugin],
  state: {
    id: null,
    usuario: null,
    session: false,
    token: null,
    expire_at: null,
    modules: [],
    routes: [],
  },
  getters: {
    usuario(state){
      return state.usuario
    },
    id(state){
      return state.id
    },
    session(state){
      return state.session;
    },
    modules(state){
      return state.modules;
    },
    routes(state){
      return state.routes;
    },
  },
  mutations: {
    updateUsuario(state, payload){
      state.usuario = payload;
    },
    setToken(state, payload){
      state.id = payload.id;
      state.usuario = payload.name;
      state.token = payload.token;
      state.session = true;
      state.expire_at = payload.expires_at;
      state.modules = payload.modules;
      state.routes = payload.routes;
    },
    logout(state){
      state.id = null;
      state.usuario = null;
      state.token = null;
      state.session = false;
      state.expire_at = null;
      state.modules = [];
      state.routes = [];
    }
  },
  actions: {
    updateUser(context, payload){
      context.commit('updateUsuario', payload);
    },
    setToken(context, payload){
      context.commit('setToken', payload);
    },
    logout(context){
      context.commit('logout');
    }
  },
  modules: {
  }
})

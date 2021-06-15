import Vue from 'vue';
import App from './containers/App.vue';
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import UpperCase from '@/directives/uppercase'

Vue.config.productionTip = false;

Vue.directive('uppercase', UpperCase);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');


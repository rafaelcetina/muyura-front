import Vue from 'vue';
import App from './containers/App.vue';
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import UpperCase from '@/directives/uppercase'
import NumericOnly from '@/directives/numeric'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// @ts-ignore
import { VueMaskDirective, VueMaskFilter  } from 'v-mask'

Vue.directive('mask', VueMaskDirective);
Vue.filter('VMask', VueMaskFilter)

Vue.config.productionTip = false;

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};
Vue.use(Toast, options);

Vue.directive('uppercase', UpperCase);
Vue.directive('numeric', NumericOnly);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');


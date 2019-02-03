import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';
import filters from './filters';

Vue.config.productionTip = false;

// Configuração do Axios
const BASE_API = process.env.VUE_APP_BASE_API;
const HTTP = axios.create({
  baseURL: BASE_API,
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': BASE_API,
  },
});

Vue.use(VueAxios, HTTP);
Vue.use(components);
Vue.use(filters);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

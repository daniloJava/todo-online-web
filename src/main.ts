import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'normalize.css';
import ElementUI from 'element-ui';
import Component from 'vue-class-component';
import SvgIcon from 'vue-svgicon';
import '@/styles/index.scss';
import '@/icons/components';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import filters from './filters';


// Configuração do Axios
const BASE_API = 'http://127.0.0.1:3088/';
const HTTP = axios.create({
  baseURL: BASE_API,
  timeout: 60000,
  headers: {
    'crossDomain': 'true',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptador das Requisições
HTTP.interceptors.request.use(
  (config) => {
    return new Promise((resolve, reject) => {
      const user = store.getters['user/user'];
      if (user.token) {
        config.headers.Authorization = 'Bearer ' + user.token;
      }
      resolve(config);
    });
  },
  (error) => {
    const err = !error.response ? error : error.response.data;
    return Promise.reject(err);
  },
);

// Interceptador das Respostas
HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = !error.response ? error : error.response.data;
    return Promise.reject(err);
  },
);


Vue.use(VueAxios, HTTP);
Vue.use(filters);

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});
// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

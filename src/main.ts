import axios from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'viewerjs/dist/viewer.css';
import 'highlight.js/styles/github.css';

import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';
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
Vue.use(components);
Vue.use(filters);

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

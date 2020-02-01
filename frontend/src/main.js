import Vue from 'vue';


import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/',
});

Vue.prototype.$http = http;


Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false;



new Vue({
  render (createElement) {
    return createElement(App);
  }
  //render: (h) => h(App)
}).$mount('#app');
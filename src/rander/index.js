import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import store from './store';
import routes from './routes';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import './style.less'

const router = new VueRouter({ routes });

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const app = new Vue(Object.assign({ store, router }, App));

app.$mount('#app');
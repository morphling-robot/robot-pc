import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import VueElectron from 'vue-electron'
import App from './App.vue';
import store from './store';
import routes from './routes';
import i18n from './i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import './style.less'

const router = new VueRouter({ routes });

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueElectron);

const app = new Vue(Object.assign({ store, router, i18n }, App));

app.$mount('#app');
import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueElectron from 'vue-electron'
import App from './App.vue';
import store from './store';
import routes from './routes';
import i18n from './i18n';
import Blockly from '@/lib/blockly/browser.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'video.js/dist/video-js.min.css';
import 'videojs-record/dist/css/videojs.record.css';
import './style.less'
import axios from '@/utils/axios';


import bFormSlider from 'vue-bootstrap-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.css'

Blockly.prompt = function (message, defaultValue, callback) {
	app.$root.$emit('bv::show::modal', 'prompt-modal');

	window.promptArgs = {
		message,
		defaultValue,
		callback
	};
};

window.prompt = Blockly.prompt;

const router = new VueRouter({ routes });

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueElectron);
Vue.use(axios);
Vue.use(bFormSlider);

const app = new Vue(Object.assign({ store, router, i18n }, App));

app.$mount('#app');
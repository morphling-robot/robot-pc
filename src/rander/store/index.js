import Vue from 'vue';
import Vuex from 'vuex';
import editor from './module/editor';
import user from './module/user';

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
	strict: true,
	modules: {
		editor,
		user
	}
});

export default store;
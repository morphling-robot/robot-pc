import Vue from 'vue';
import Vuex from 'vuex';
import editor from './modules/editor';
import user from './modules/user';
import robot from './modules/robot';

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
	strict: true,
	modules: {
		editor,
		user,
		robot
	}
});

if (module.hot) {
  module.hot.accept(['./modules/editor', './modules/user', './modules/robot'], () => {
    const newModuleEditor = require('./modules/editor').default
    const newModuleUser = require('./modules/user').default
    const newModuleRobot = require('./modules/robot').default
    store.hotUpdate({
      mutations: newMutations,
      modules: {
				editor: newModuleEditor,
				user: newModuleUser,
				robot: newModuleRobot
      }
    })
  })
}

export default store;
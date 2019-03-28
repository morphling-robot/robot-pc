const state = {
	id: null,
	name: '',
	password: '',
	token: null
};

const mutations = {
	updateUserStatus(state, {id , username, password}) {
		state.id = id;
		state.name = username;
		state.password = password;
	},
	updateUserToken(state, payload) {
		state.token = payload;
	}
};

export default {
	state,
	mutations
};
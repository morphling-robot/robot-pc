const state = {
	id: null,
	name: null,
	token: null
};

const mutations = {
	updateUserStatus(state, {id , username}) {
		state.id = id;
		state.name = username;
	},
	updateUserToken(state, payload) {
		state.token = payload;
	}
};

export default {
	state,
	mutations
};
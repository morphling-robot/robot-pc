const state = {
	id: null,
	name: null
};

const mutations = {
	updateUserStatus(state, {id , username}) {
		state.id = id;
		state.name = username;
	}
};

export default {
	state,
	mutations
};
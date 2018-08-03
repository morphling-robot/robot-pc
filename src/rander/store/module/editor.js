const state = {
	mode: 'blockly',
	blockly: {
		content: {}
	},
	python: {
		code: ''
	}
};

const mutations = {
	modeUpdate(state, payload) {
		if (payload == 'blockly' || payload == 'python')
		state.mode = payload;
	},
	blocklyUpdate(state, payload) {
		state.blockly.content = payload;
	},
	pythonUpdate(state, payload) {
		state.python.code = payload;
	}
};

export default {
	state,
	mutations
};
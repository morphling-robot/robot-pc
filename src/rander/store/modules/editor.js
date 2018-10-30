const state = {
	mode: 'blockly',
	blockly: {
		content: '',
		code: ''
	},
	python: {
		content: '',
		code: ''
	}
};

const mutations = {
	modeUpdate(state, payload) {
		if (payload == 'blockly' || payload == 'python') {
			state.mode = payload;
		}
	},
	blocklyUpdateContent(state, payload) {
		state.blockly.content = payload;
	},
	blocklyUpdateCode(state, payload) {
		state.blockly.code = payload;
	},
	pythonUpdateContent(state, payload) {
		state.python.content = payload;
	},
	pythonUpdateCode(state, payload) {
		state.python.code = payload;
	}
};

export default {
	state,
	mutations
};
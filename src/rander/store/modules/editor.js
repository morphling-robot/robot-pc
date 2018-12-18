const state = {
	mode: 'blockly',
	fileName: '',
	blockly: {
		isFileOpen: false,
		code: ''
	},
	python: {
		isFileOpen: false,
		code: ''
	},
	codeList: []
};

const mutations = {
	modeUpdate(state, payload) {
		if (payload == 'blockly' || payload == 'python') {
			state.mode = payload;
		}
	},
	blocklyUpdateOpendState(state, payload) {
		state.blockly.isFileOpen = payload;
	},
	blocklyUpdateCode(state, payload) {
		state.blockly.code = payload;
	},
	pythonUpdateOpenedState(state, payload) {
		state.python.isFileOpen = payload;
	},
	pythonUpdateCode(state, payload) {
		state.python.code = payload;
	},
	updateFileName(state, payload) {
		state.fileName = payload;
	},
	getCodeList(state, payload) {
		state.codeList = payload;
	}
};

export default {
	state,
	mutations
};
const state = {
	mode: 'blockly',
	fileName: '',
	blockly: {
		isFileOpen: false,
		code: '',
		originCode: ''
	},
	python: {
		isFileOpen: false,
		code: '',
		originCode: ''
	},
	codeList: []
};

const getters = {
	isPythonChanged(state) {
		return state.python.originCode !== state.python.code;
	},
	isBlocklyChanged(state) {
		return state.blockly.originCode !== state.blockly.code;
	}
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
	blocklyOriginUpdateCode(state, payload) {
		state.blockly.originCode = payload;
	},
	pythonUpdateOpendState(state, payload) {
		state.python.isFileOpen = payload;
	},
	pythonUpdateCode(state, payload) {
		state.python.code = payload;
	},
	pythonOriginUpdateCode(state, payload) {
		state.python.originCode = payload;
	},
	updateFileName(state, payload) {
		state.fileName = payload;
	},
	getCodeList(state, payload) {

		if (payload) {
			state.codeList = payload;
		}
	}
};

export default {
	state,
	mutations,
	getters
};
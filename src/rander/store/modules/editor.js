const state = {
	mode: 'blockly',
	fileName: '',
	blockly: {
		content: '',
		code: ''
	},
	python: {
		content: '',
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
const state = {
    videoState: 'open',
    videoIp: '',
    dialogState: 'close'
};

const mutations = {
	updateVideoState(state, payload) {
        state.videoState = payload;
    },
    updateVideoIp(state, payload) {
        state.videoIp = payload;
    },
    updateDialogState(state, payload) {
        state.dialogState = payload;
    }
};

export default {
	state,
	mutations
};
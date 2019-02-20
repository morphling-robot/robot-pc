const state = {
    videoIp: null,
    dialogState: 'close',
    large: {
        height: 360
    },
    small: {
        height: 300,
        top: 0,
        left: 45
    }
};

const mutations = {
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
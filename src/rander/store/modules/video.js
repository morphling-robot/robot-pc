const state = {
    videoState: 'open',
    videoIp: 'rtmp://192.168.31.217/live/test',
    dialogState: 'close',
    large: {
        height: 360
    },
    small: {
        height: 240,
        top: 0,
        left: 60
    }
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
const state = {
    videoState: 'close',
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
	updateVideoState(state, payload) {
        state.videoState = payload;
    },
    updateVideoIp(state, payload) {
        state.videoIp = payload;
    },
    updateDialogState(state, payload) {
        state.dialogState = payload;
    },
    openVideo(state) {
        state.videoState = 'open';
    },
    closeVideo(state) {
        state.videoState = 'close';


    }
};

export default {
	state,
	mutations
};
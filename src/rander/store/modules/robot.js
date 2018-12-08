const state = {
	isConnected: false,
	updateCycle: 10 * 1000,
	env: {
		ip: null,
		serialNumber: null,
		ssid: null
	},
	status: {
		ip: null,
		posture: null,
		power: null,
		robotId: null,
		ssid: null,
		robotState: null
	},
	isShow: false
};

const mutations = {
	updateRobotStatus(state, payload) {
		state.status = payload;
	},
	updateRobotEnv(state, payload) {
		state.env = payload;
	},
	updateIsShow() {
		state.isShow = !state.isShow;
	}
};

export default {
	state,
	mutations
};
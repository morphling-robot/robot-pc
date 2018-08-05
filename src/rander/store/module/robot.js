const state = {
	isConnected: false,
	updateCycle: 2 * 1000,
	env: {
		ip: null,
		serialNumber: null
	},
	status: {
		battery: null,
		signalStrength: null,
		servo: null,
		alert: null
	}
};

const mutations = {
	updateRobotStatus(state, payload) {
		state.status = payload;
	},
	updateRobotEnv(state, payload) {
		state.env = payload;
	}
};

export default {
	state,
	mutations
};
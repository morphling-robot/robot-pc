const state = {
	isConnected: false,
	updateCycle: 2 * 1000,
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
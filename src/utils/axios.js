import axios from 'axios';
const serverURL = 'localhost';

const versionPrefix = '/v1';
const prefix = '' + versionPrefix;

const api = {
	robot: axios,
	server: AxiosFactory(serverURL)
};

function AxiosFactory(axiosConfig) {
	return axios.create(Object.assign({}, axiosConfig));
}

const apiList = {
	getNetworkList() {
		return api.robot.get(prefix + '/network').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	postNetwork({data, config: axiosConfig}) {
		const axiosData = {
			ssid: data.ssid,
			secret: data.password
		};

		return api.robot.post(prefix + '/network', axiosData, axiosConfig).then(({data}) => {
			console.log(data);
		}).catch(error => console.log(error));
	},
	getCodeList() {
		return api.robot.get(prefix + '/codes').then(({data}) => {
			const result = [];

			data.forEach(item => result.push({ codeName: item }));

			return result;
		}).catch(error => console.log(error));
	},
	getCode({data, config}) {
		return api.robot.get(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	uploadCode({data, config}) {
		return api.robot.post(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	deleteCode({data, config}) {
		return api.robot.delete(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	updateCode({data, config}) {
		return api.robot.put(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	getActionsList() {
		return api.robot.get(prefix + '/actions').then(({data}) => {
			return Promise.resolve(data.data);
		});
	},
	getActions({data, config}) {
		return api.robot.get(prefix + '/actions').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	uploadActions({data, config}) {
		return api.robot.post(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	deleteActions({data, config}) {
		return api.robot.delete(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	updateActions({data, config}) {
		return api.robot.put(prefix + '/codes').then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	},
	getStates() {
		return api.robot
			.get(prefix + '/states')
			.then(({data}) => {
				return {
					ip: data.ip,
					posture: data.posture,
					power: data.power,
					robotId: data.robot_id,
					ssid: data.ssid,
					robotState: data.state
				}
			})
			.catch(error => {});
	},
	postInstructs({data, config}) {
		const axiosData = {
			instruct_type: data.instruct_type,
			para: data.para
		};

		return api.robot.post(prefix + '/instructs', axiosData, axiosConfig).then(({data}) => {
			return Promise.resolve(data);
		}).catch(error => console.log(error));
	}
};

export default function install(Vue) {
	Vue.prototype.$api = apiList;

	window.addEventListener('connect', event => {
		console.log(event.baseURL);
		api.robot = AxiosFactory({
			baseURL: event.baseURL
		});
	});
}
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
			return data;
		}).catch(error => console.log(error));
	},
	postNetwork({data, config: axiosConfig}) {
		const axiosData = {
			ssid: data.ssid,
			secret: data.password
		};

		return api.robot.post(prefix + '/network', axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	getCodeList() {
		return api.robot.get(prefix + '/codes').then(({data}) => {
			const result = [];

			data.forEach(item => result.push({ codeName: item }));

			return result;
		}).catch(error => console.log(error));
	},
	getCode({index, data, config: axiosConfig}) {
		return api.robot.get(`${prefix}/codes/${index}`).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	createCode({index, data, config: axiosConfig}) {
		const axiosData = data;
		return api.robot.post(`${prefix}/codes`, axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	deleteCode({index, data, config: axiosConfig}) {
		const axiosData = data;
		return api.robot.delete(`${prefix}/codes/${index}`, axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	updateCode({index, data, config: axiosConfig}) {
		return api.robot.put(`${prefix}/codes/${index}`, axiosData, axiosConfig).then(({data}) => {
			return  data;
		}).catch(error => console.log(error));
	},
	getActionsList() {
		return api.robot.get(prefix + '/actions').then(({data}) => {
			const result = [];

			data.forEach((item, index) => {
				result.push({
					id: index,
					name: item,
					frameList: []
				});
			});

			return result;
		});
	},
	getActions({index, data, config: axiosConfig}) {
		const axiosData = data;

		return api.robot.get(`${prefix}/actions/${index}`, axiosData, axiosConfig).then(({data}) => {
			const frameList = [];

			data.body.split('\n').forEach(item => {
				if (item === '') {
					return;
				}

				const frame = [];
				
				item.split(' ').forEach(angle => {
					if (angle === '') {
						return;
					}

					frame.push({angle: new Number(angle)});
				})

				frameList.push(frame);
			});
			
			return {
				name: data.name,
				frameList
			};
		}).catch(error => console.log(error));
	},
	createActions({data, config: axiosConfig}) {
		const axiosData = {
			body: data.body,
			name: data.name
		};

		return api.robot.post(`${prefix}/actions/${index}/user`, axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	deleteActions({index, data, config: axiosConfig}) {
		const axiosData = data;

		return api.robot.delete(`${prefix}/actions/${index}/user`, axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	updateActions({index, data, config: axiosConfig}) {  //调试put接口
		const result = '';

		data.body.forEach(frame => {
			frame.forEach(servo => {
				result + servo.angle + ' ';
			});

			result + '\n';
		});console.log(result);

		const axiosData = {
			name: data.name,
			body: result
		};

		return api.robot.put(`${prefix}/actions/${index}/user`, axiosData, axiosConfig).then(({data}) => {
			return data;
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
	postInstructs({data, config: axiosConfig}) {
		const axiosData = {
			instruct_type: data.instruct_type,
			para: data.para
		};

		return api.robot.post(prefix + '/instructs', axiosData, axiosConfig).then(({data}) => {
			return data;
		}).catch(error => console.log(error));
	},
	createToken({data, config: axiosConfig}) {
		const axiosData = {
			nickname: data.username,
			secret: data.password
		};

		return api.robot.post(prefix + '/token', axiosData, axiosConfig).then(({data}) => {
			return data;
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
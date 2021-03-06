import axios from 'axios';
import * as actionUtil from './actionUtil';
import decode from './hexToString';

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

const robotControlCodeList = {
	'pause': 1001,
	'continue': 1002,
	'stop': 1003,
	'reset': 1004
}

const apiList = {
	getNetworkList() {
		return api.robot
			.get(prefix + '/network')
			.then(({ data }) => {
				return data.map(item => decode(item));
			})
			.catch(error => console.log(error));
	},
	postNetwork({ data, config: axiosConfig }) {
		const axiosData = {
			ssid: data.ssid,
			secret: data.password
		};

		return api.robot
			.post(prefix + '/network', axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			});
	},
	getCodeList() {
		return api.robot
			.get(prefix + '/codes')
			.then(({ data }) => {
				const result = [];

				data.forEach(item => result.push({ codeName: item }));

				return result;
			})
			.catch(error => console.log(error));
	},
	getCode({ index, data, config: axiosConfig }) {
		return api.robot
			.get(`${prefix}/codes/${index}`)
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	createCode({ index, data, config: axiosConfig }) {
		const axiosData = data;
		return api.robot
			.post(`${prefix}/codes`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			});
	},
	deleteCode({ index, data, config: axiosConfig }) {
		const axiosData = data;
		return api.robot
			.delete(`${prefix}/codes/${index}`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	updateCode({ index, data, config: axiosConfig }) {
		const axiosData = data;
		
		return api.robot
			.put(`${prefix}/codes/${index}`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	getActionsList() {
		return api.robot
			.get(prefix + '/actions')
			.then(({ data }) => {
				const result = [];

				data.forEach((item, index) => {
					result.push({
						name: item
					});
				});

				return result;
			})
			.catch(error => console.log(error));
	},
	getActions({ index, data, config: axiosConfig }) {
		const axiosData = data;

		return api.robot
			.get(`${prefix}/actions/${index}`, axiosData, axiosConfig)
			.then(({ data }) => {
				return actionUtil.strToObject(data);
			})
			.catch(error => console.log(error));
	},
	createActions({ data, config: axiosConfig }) {
		const axiosData = actionUtil.objectToStr(data);

		return api.robot
			.post(`${prefix}/actions`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	deleteActions({ index, data, config: axiosConfig }) {
		const axiosData = data;

		return api.robot
			.delete(`${prefix}/actions/${index}`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	updateActions({ index, data, config: axiosConfig }) {  //调试put接口
		const axiosData = actionUtil.objectToStr(data);

		return api.robot
			.put(`${prefix}/actions/${index}`, axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			});
	},
	getStates() {
		return api.robot
			.get(prefix + '/states')
			.then(({ data }) => {
				return {
					ip: data.ip,
					posture: data.posture,
					power: data.power,
					robotId: data.robot_id,
					ssid: decode(data.ssid),
					robotState: data.state
				}
			})
			.catch(error => console.log(error));
	},
	postInstructs({ data, config: axiosConfig }) {
		const axiosData = {
			instruct_type: data.instruct_type,
			para1: data.para1,
			para2: data.para2
		};

		return api.robot
			.post(prefix + '/instructs', axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			});
		},
	robotControl({ data: type, config }) {
		this
			.postInstructs({
				data: {
					instruct_type: robotControlCodeList[type],
					para1: null,
					para2: null
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	getFrame(config) {
		return this
			.postInstructs({
				data: {
					instruct_type: 2001,
				},
				config
			})
			.then((data) => {
				const frame = [], modeList = [];

				data.angle_list.forEach((angle, index) => {
					frame.push({angle});
					modeList.push({
						mode: data.mode_list[index]
					})
				});

				return {
					frame, modeList
				};
			});
	},
	runActionSlice({ data, config }) {
		return this
			.postInstructs({
				data: {
					instruct_type: 2002,
					para1: actionUtil.actionToStr(data.body),
					para2: data.speed
				},
				config
			})
			.then(({ data }) => {
				return data;
			});
	},
	runSysAction({ data, config }) {
		this
			.postInstructs({
				data: {
					instruct_type: 3001,
					para1: data.name,
					para2: data.speed
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	runUserAction({ data, config }) {
		return this
			.postInstructs({
				data: {
					instruct_type: 3002,
					para1: data.name,
					para2: data.speed
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	runSysCode({ data, config }) {
		this
			.postInstructs({
				data: {
					instruct_type: 4001,
					para1: actionUtil.actionToStr(data.body),
					para2: data.speed
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	runUserCode({ data, config }) {
		this
			.postInstructs({
				data: {
					instruct_type: 4002,
					para1: actionUtil.actionToStr(data.body),
					para2: data.speed
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	changeServoMode({ data: servo, config }) {
		return this
			.postInstructs({
				data: {
					instruct_type: 5001,
					para1: servo.mode,
					para2: servo.id
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	changeServoAngle({ data: servo, config }) {
		this
			.postInstructs({
				data: {
					instruct_type: 5002,
					para1: `${servo.angle},${servo.speed}`,
					para2: servo.id
				},
				config
			})
			.then(({ data }) => {
				return data;
			})
			.catch(error => console.log(error));
	},
	calibrateServo({ data, config }) {
		return this
			.postInstructs({
				data: {
					instruct_type: 6000,
					para2: data.id
				},
				config
			});
	},
	createToken({ data, config: axiosConfig }) {
		const axiosData = {
			nickname: data.username,
			secret: data.password
		};

		return api.robot
			.post(prefix + '/token', axiosData, axiosConfig)
			.then(({ data }) => {
				return data;
			});
	},
	connectCamera() {
		return api.robot
			.get(prefix + '/camera')
			.then(({ data }) => {
				return data;
			});
	},
	closeCamera() {
		return api.robot
			.get(prefix + '/camera/close')
			.then(({ data }) => {
				return data;
			});
	},
	getResult() {
		return api.robot.get(prefix + '/output').then(({data}) => {
			return data;
		})
	}
};

export default function install(Vue) {
	Vue.prototype.$api = apiList;

	window.addEventListener('connect', event => {
		api.robot = AxiosFactory({
			baseURL: event.baseURL
		});
	});
}
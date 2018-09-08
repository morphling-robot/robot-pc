import axios from 'axios';
const serverURL = 'localhost';

const api = {
	robot: axios,
	server: AxiosFactory(serverURL)
};

function AxiosFactory(axiosConfig) {
	return axios.create(Object.assign({}, axiosConfig));
}

const apiList = {
	getNetworkList() {
		return api.robot.get('/network').then(({data}) => {
			console.log(data);
		});
	},
	postNetwork({axiosData, axiosConfig}) {
		return api.robot.post('/network', axiosData, axiosConfig).then(({data}) => {
			console.log(data);
		});
	},
	getCodeList() {
		return api.robot.get('/codes')
	},
	getCode({axiosData, axiosConfig}) {
		return api.robot.get('/codes')
	},
	uploadCode({axiosData, axiosConfig}) {
		return api.robot.post('/codes')
	},
	deleteCode({axiosData, axiosConfig}) {
		return api.robot.delete('/codes')
	},
	updateCode({axiosData, axiosConfig}) {
		return api.robot.put('/codes')
	},
	getActionsList() {
		return api.robot.get('/codes').then(({data}) => {
			return Promise.resolve(data.data);
		});
	},
	getActions({axiosData, axiosConfig}) {
		return api.robot.get('/codes')
	},
	uploadActions({axiosData, axiosConfig}) {
		return api.robot.post('/codes')
	},
	deleteActions({axiosData, axiosConfig}) {
		return api.robot.delete('/codes')
	},
	updateActions({axiosData, axiosConfig}) {
		return api.robot.put('/codes')
	},
	getStates() {
		return api.robot.get('/states')
	},
	postInstructs() {
		return api.robot.post('/instructs')
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
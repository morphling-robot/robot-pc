<template>
	<div
		class="py-3"
		id="filter">
		<b-row>
			<b-col>
				<b-form-group
					label="IP">
					<b-form-input
						readonly
						size="sm"
						:value="connectedRobot.ip" />
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group
					label="ID">
					<b-form-input
						readonly
						size="sm"
						:value="connectedRobot.robotId" />
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group
					:label="$t('robot.connect.power')">
					<b-form-input
						size="sm"
						readonly
						v-model="connectedRobot.power" />
				</b-form-group>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="auto">
				<b-button
					variant="success"
					@click="search"
					:disabled="isSearch"
					size="sm"><i class="fas fa-search" /></b-button>
				<span v-if="isSearch">{{$t('robot.connect.waiting')}}</span>
			</b-col>
			<b-col></b-col>
			<b-col cols="auto">
				<b-pagination
					size="sm"
					:limit="5"
					:total-rows="robotList.length"
					v-model="currentPage"
					:per-page="perPage" />
			</b-col>
		</b-row>

		<b-table
			small
			:items="robotList"
			:fields="[
				{key: 'id', label: 'ID'},
				{ key: 'ip', label: 'IP' },
				{ key: 'power', label: 'POWER'},
				{key: 'state', label: 'ConnectState'},
				{ key: 'connect', label: 'Action'}
			]"
			:current-page="currentPage"
			:per-page="perPage">
			<template slot="state" slot-scope="row">
				<span>{{row.item.ip === connectedRobot.ip ? 'on' : 'off'}}</span>
			</template>
			<template slot="connect" slot-scope="row">
				<b-button size="sm" @click.stop="connect(row)">
					<i class="fas fa-exchange-alt" />
				</b-button>
			</template>
		</b-table>

	</div>
</template>

<script>
import cidrRange from 'cidr-range'; //改
import axios from 'axios';

export default {
  data() {
    return {
			robotList: [
				{
					ip: '192.168.1.1',
					serialNumber: 'ABCDE-FGHIJ-KLMNO'
				}
			],
			ipList: [],
			networkInterfaceList: [
				{
					name: '',
					cidr: '192.168.1.1/24'
				},
				{
					name: '',
					cidr: '192.168.31.1/24'
				}
			],
			selectedIp: null,
			currentPage: 1,
			perPage: 9,
			robotName: '',
			isSearch: false
    	};
	},
	computed: {
		connectedRobot() {
			return this.$store.state.robot.status ? this.$store.state.robot.status : {};
		}
	},
	mounted() {
		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-connect-dialog');

		// ipcRenderer.on('app-toggle-connect-dialog', () => {
		// 	this.$refs.robotModalRef.show();
		// });

		this.init();
	},
	methods: {
		init() {
			this.getNetworkInterfaceList();
		},
		getNetworkInterfaceList() {
			const os = this.$electron.remote.require('os');
			const result = [];

			const networkInterfaces = os.networkInterfaces();

			for (const key in networkInterfaces) {
				networkInterfaces[key].forEach(item => {
					if (item.family == 'IPv4') {
						if (item.cidr !== '127.0.0.1/8') {
							result.push({
								name: key,
								cidr: item.cidr
							});
						}
					}
				});
			}

			this.networkInterfaceList = result;
		},
		getIpList() {
			let result = [];

			for (const aoeu in this.networkInterfaceList) {
				result = [...result, ...cidrRange(this.networkInterfaceList[aoeu].cidr)];
			}

			this.ipList = result;
		},
		search() {
			this.getNetworkInterfaceList();
			this.getIpList();

			this.robotList = [];

			this.isSearch = true;
			
			this.ipList.forEach((ip, index) => {

				axios.get(`http://${ip}:5000/v1/states`, { timeout: 5000 })
					.then(r => {
						this.robotList.push({
							id: r.data.robot_id,
							ip: r.data.ip,
							power: r.data.power
						});

						if (index === this.ipList.length - 1) {
							this.isSearch = false;
						}
					}).catch(r => {
						if (index === this.ipList.length - 1) {
							this.isSearch = false;
						}
				});
			});

			// axios.get(`http://192.168.43.108:5000/v1/states`, { timeout: 5000 })
			// 		.then(r => {
			// 			this.robotList.push({
			// 				id: r.data.robot_id,
			// 				ip: r.data.ip,
			// 				power: r.data.power
			// 			});
			// 			this.isSearch = false;
			// 		}).catch(r => {
			// 			this.isSearch = false;
			// 		});
		},
		updateRobotStatus() {
			this.$api
				.getStates()
				.then(payload => {
					if (payload) {

						this.$store.commit("updateRobotStatus", payload);
					}
				})
				.catch(err => {
					this.$store.commit("updateRobotStatus", {
						ip: null,
						posture: null,
						power: null,
						robotId: null,
						ssid: null,
						robotState: null
					});
				});
			},
		connect(row) {

			const event = new CustomEvent('connect');

			event.baseURL = `http://${row.item.ip}:5000`;

			window.dispatchEvent(event);
			
			this.$store.commit("updateRobotStatus", {
				ip: row.item.ip,
				posture: null,
				power: null,
				robotId: null,
				ssid: null,
				robotState: null
			});

			this.updateRobotStatus();
		}
	}
};
</script>

<style lang="less">
#filter {
	position: relative;
}

.status-card {
  max-width: 300px;
}
</style>


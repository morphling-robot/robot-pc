<template>
	<b-modal
		id="robotModal"
		size="lg"
		ref="robotModalRef"
		:title="$t('robot.connect.label')"
		no-close-on-backdrop>
		<div
			id="filter"
			style="height: 530px;">
			<b-row>
				<b-col>
					<b-form-group
						label="IP">
						<b-form-input
							readonly
							size="sm"
							value="N/A" />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						:label="$t('robot.connect.type')">
						<b-form-input
							readonly
							size="sm"
							value="N/A" />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						:label="$t('robot.connect.serialNumber')">
						<b-form-input
							readonly
							size="sm"
							value="N/A" />
					</b-form-group>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="auto">
					<b-button
						@click="search"
						size="sm">{{$t('robot.connect.search')}}</b-button>
				</b-col>
				<b-col></b-col>
				<b-col cols="auto">
					<b-pagination
						size="sm"
						:total-rows="robotList.length"
						v-model="currentPage"
						:per-page="perPage" />
				</b-col>
			</b-row>

			<b-table
				small
				:items="robotList"
				:fields="[
					{ key: 'ip', label: 'IP' },
					{ key: 'serialNumber', label: 'SN'},
					{ key: 'connect', label: 'Action'}
				]"
				:current-page="currentPage"
				:per-page="perPage">
				<template slot="connect" slot-scope="row">
					<b-button size="sm" @click.stop="connect">
						{{$t('robot.connect.connect')}}
					</b-button>
				</template>
			</b-table>

		</div>
	</b-modal>
</template>

<script>
import cidrRange from 'cidr-range';
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
			perPage: 5
    };
	},
	mounted() {
		const { ipcRenderer } = this.$electron;

		ipcRenderer.removeAllListeners('app-toggle-connect-dialog');

		ipcRenderer.on('app-toggle-connect-dialog', () => {
			this.$refs.robotModalRef.show();
		});

		this.getNetworkInterfaceList();
	},
	methods: {
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
			this.getIpList();console.log(this.ipList)

			this.ipList.forEach(ip => {
				axios.get(`http://${ip}:8080`, { timeout: 5000 })
							.then(r => {
								console.log(r);
								this.robotList.push(ip);
							}).catch(r => console.log(1));
			});
		},
		connect() {
			const event = new CustomEvent('connect');

			event.baseURL = 'http://localhost:8888';

			window.dispatchEvent(event);
		}
	}
};
</script>

<style lang="less">
.status-card {
  max-width: 300px;
}
</style>

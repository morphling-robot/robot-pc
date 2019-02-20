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
					@click="refresh"
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
			isSearch: false,
			server: null
    	};
	},
	computed: {
		connectedRobot() {
			return this.$store.state.robot.status ? this.$store.state.robot.status : {};
		}
	},
	methods: {
		search(msg, ip) {
			if (this.connectedRobot.ip) {
				this.robotList.push({
					id: this.connectedRobot.robotId,
					ip,
					power: this.connectedRobot.power
				});

				return;
			}

			this.robotList.push({
				id: msg,
				ip,
				power: '--'
			});
		},
		updateRobotStatus(row) {
			this.$api
				.getStates()
				.then(payload => {
					if (payload) {
						this.robotList[row.index].id = payload.robotId;
						this.robotList[row.index].power = payload.power;

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

			this.updateRobotStatus(row);
		},
		refresh() {
			this.server.close();

			this.createUdpConnect();
		},
		createUdpConnect() {
			const dgram = require('dgram');
			const subnetInfo = require('subnet-info');
			const networkInterfaces = require('os').networkInterfaces();
			const robotId = Buffer.from("ORIGAKER-2018001");

			this.server = dgram.createSocket("udp4");
				
			this.server.bind(41234);

			this.server.on("error", err => {
				this.server.close();
			});

			this.server.on("message", (msg, rinfo) => {
				this.search(msg, rinfo.address);

				this.isSearch = false;
			});

			this.server.on("listening", () => {
				this.robotList = [];
				this.isSearch = true;
				this.server.setBroadcast(true);
			});


			for (const key in networkInterfaces) {
				networkInterfaces[key].forEach(item => {
					if (item.family == 'IPv4') {
						if (item.cidr !== '127.0.0.1/8') {
							const { broadcastAddress } = new subnetInfo(item.cidr).info();
							this.server.send(robotId, 8080, broadcastAddress);
						}
					}
				});
			}
        }
	}
};
</script>

<style lang="less">
#filter {
	position: relative;

	button {
		background-color: rgba(0, 0, 0, .1);
		padding:3px 8px;
		color: gray;
	}
}

.status-card {
  max-width: 300px;
}
</style>


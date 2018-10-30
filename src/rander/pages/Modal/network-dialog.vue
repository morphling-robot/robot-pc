<template>
	<b-modal
		id="networkModal"
		ref="networkModalRef"
		:title="$t('robot.network.label')"
		size="sm"
		no-close-on-backdrop
		centered
		hide-footer
		@shown="getNetworkList">
		<b-form-group
			:label="$t('robot.network.label')">
			<!-- <template
				slot="label">
				<i class="fas fa-wifi" />
			</template> -->
			<b-input-group
				size="sm">
				<b-input-group-prepend>
					<b-btn
						@click="getNetworkList"
						variant="success"><i
							class="fas fa-sync-alt" />
					</b-btn>
				</b-input-group-prepend>
				<b-dropdown
					split
					:text="selectedSSID"
					size="sm">
					<b-dropdown-item
						v-for="(ssid, index) in ssidList"
						:key="index"
						@click="changeSSID(ssid)">
						{{ssid}}
					</b-dropdown-item>
				</b-dropdown>
			</b-input-group>
		</b-form-group>
		<b-form-group
			:label="$t('robot.network.password')">
			<b-form-input
				size="sm"
				v-model="password" />
		</b-form-group>
		<b-row>
			<b-col />
			<b-col cols="auto">
				<b-button
					@click="setNetwork"
					size="sm">{{$t('robot.network.connect')}}</b-button>
			</b-col>
		</b-row>
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			ssidList: [
				'ORCHANGE',
				'ORCHANGE_5G'
			],
			selectedSSID: null,
			password: 'P@ssw0rd'
		}
	},
	mounted() {
		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-network-dialog');
		
		// ipcRenderer.on('app-toggle-network-dialog', () => {console.log(1);
		// 	this.$refs.networkModalRef.show();
		// });
		
		this.getNetworkList();
	},
	methods: {
		changeSSID(ssid = this.ssidList[0]) {
			this.selectedSSID = ssid;
		},
		getNetworkList() {
			this.$api.getNetworkList().then(data => {
				this.ssidList = data;
				this.changeSSID();
			});
		},
		setNetwork() {
			this.$api.postNetwork({
				data: {
					ssid: this.selectedSSID,
					password: this.password
				}
			});
		}
	}
}
</script>


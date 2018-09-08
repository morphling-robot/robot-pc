<template>
	<b-modal
		id="networkModal"
		ref="networkModalRef"
		:title="$t('robot.network.label')"
		size="sm"
		no-close-on-backdrop
		centered
		hide-footer
		@ok="fuck()">
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
				value="N/A" />
		</b-form-group>
		<b-row>
			<b-col />
			<b-col cols="auto">
				<b-button
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
			password: null
		}
	},
	mounted() {
		const { ipcRenderer } = this.$electron;

		ipcRenderer.removeAllListeners('app-toggle-network-dialog');
		
		ipcRenderer.on('app-toggle-network-dialog', () => {console.log(1);
			this.$refs.networkModalRef.show();
		});

		this.$api.getNetworkList().then(data => this.ssidList = data);
		this.changeSSID(this.ssidList[0]);
	},
	methods: {
		changeSSID(ssid) {
			this.selectedSSID = ssid;
		},
		setNetwork() {
			this.$api.postNetwork({
				axiosData: {
					ssid: this.selectedSSID,
					password: this.password
				}
			});
		}
	}
}
</script>


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
			<b-col>
				<p v-if="prompt.isShow" class="mb-0">
					<span v-if="prompt.isSuccess === 0">
						<i class="fas fa-sync-alt animated rotateIn infinite" /> 配置网络中，请稍侯......
					</span>
					<span v-if="prompt.isSuccess === 1" class="text-success">
						<i class="far fa-check-circle" /> 网络配置成功，机器人下次重启后将优先连接此网络
					</span>
					<span v-if="prompt.isSuccess === -1" class="text-danger">
						<i class="far fa-times-circle" /> 网络配置失败，请检查wifi密码是否正确
					</span>
				</p>
			</b-col>
			<b-col cols="auto">
				<b-button
					variant="success"
					@click="setNetwork" :disabled="prompt.isShow && prompt.isSuccess === 0"
					size="sm">{{$t('robot.network.connect')}}</b-button>
			</b-col>
		</b-row>
	</b-modal>
</template>

<script>
function initPrompt() {
	return {
		isShow: false,
		isSuccess: 0,
	};
}

export default {
	data() {
		return {
			ssidList: [
				'ORCHANGE',
				'ORCHANGE_5G'
			],
			selectedSSID: null,
			password: 'P@ssw0rd',
			prompt: initPrompt()
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
			this.prompt = initPrompt();

			this.$api.getNetworkList().then(data => {
				this.ssidList = data;
				this.changeSSID();
			});
		},
		setNetwork() {
			this.prompt.isShow = true;

			this.$api.postNetwork({
				data: {
					ssid: this.selectedSSID,
					password: this.password
				}
			}).then(() => {
				this.prompt.isSuccess = 1;
			}).catch(err => {
				// this.prompt.isSuccess = -1;
			}) ;
		}
	}
}
</script>


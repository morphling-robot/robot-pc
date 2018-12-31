<template>
	<b-modal
		id="loginModal"
		:title="$t('user.login')"
		size="sm"
		ref="loginModalRef"
		no-close-on-backdrop
		centered
		hide-footer
		@shown="init">
		<b-form-group
			:label="$t('user.name')">
			<b-form-input
				size="sm"
				v-model="username" />
		</b-form-group>
		<b-form-group
			:label="$t('user.password')">
			<b-form-input
				size="sm"
				v-model="password" />
		</b-form-group>
		<b-row>
			<b-col>
				<p v-if="prompt.isShow" class="mb-0">
					<span v-if="prompt.isSuccess === 0">
						<i class="fas fa-sync-alt animated rotateIn infinite" /> {{$t('user.waiting')}}
					</span>
					<span v-if="prompt.isSuccess === 1" class="text-success">
						<i class="far fa-check-circle" /> {{$t('user.success')}}
					</span>
					<span v-if="prompt.isSuccess === -1" class="text-danger">
						<i class="far fa-times-circle" /> {{$t('user.fail')}}
					</span>
				</p>
			</b-col>
			<b-col cols="auto">
				<b-button variant="success"
					@click="handleLogin" :disabled="prompt.isShow && prompt.isSuccess === 0"
					size="sm">{{$t('user.login')}}</b-button>
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
			username: '',
			password: '',
			prompt: initPrompt()
		};
	},
	mounted() {
		// this.$refs.loginModalRef.show();

		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-login-dialog');
		
		// ipcRenderer.on('app-toggle-login-dialog', () => {console.log(1);
		// 	this.$refs.loginModalRef.show();
		// });
	},
	methods: {
		updateUserStatus(id, username) {
			this.$store.commit('updateUserStatus', { id, username });
		},
		handleLogin() {
			this.prompt.isShow = true;

			this.$api.createToken({
				data: {
					username: this.username,
					password: this.password
				}
			}).then((data) => {
				this.$store.commit('updateUserToken', data.token);

				this.prompt.isSuccess = 1;
			}).catch(e => {
				this.prompt.isSuccess = -1;
			});
		},
		init() {
			this.username = '';
			this.password = '';
			this.prompt = initPrompt();
		}
	}
}
</script>


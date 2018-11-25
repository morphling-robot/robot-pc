<template>
	<b-modal
		id="loginModal"
		:title="$t('user.login')"
		size="sm"
		ref="loginModalRef"
		no-close-on-backdrop
		centered
		@ok="handleLogin()">
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
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
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
			this.$api.createToken({
				data: {
					username: this.username,
					password: this.password
				}
			}).then((data) => {
				this.$store.commit('updateUserToken', data.token);
			}).catch(e => console.log(e))
		}
	}
}
</script>


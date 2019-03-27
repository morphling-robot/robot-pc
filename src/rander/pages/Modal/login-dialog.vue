<template>
	<b-modal
		id="loginModal"
		size="sm"
		ref="loginModalRef"
		centered
		hide-footer
		hide-header
		@shown="init">
		<b-tabs>
			<b-tab :title="$t('user.login')" class="pt-3">
				<b-form-group>
					<b-form-input
						size="sm"
						:placeholder="$t('user.name')"
						v-model="username" />
				</b-form-group>
				<b-form-group>
					<b-form-input
						size="sm"
						:placeholder="$t('user.password')"
						v-model="password" />
				</b-form-group>
				<b-row>
					<b-col>
						<p v-if="prompt.isShow" class="mb-0" style="font-size: 13px">
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
						<b-button variant="primary"
							@click="$refs.loginModalRef.hide()" style="background-color: rgba(138, 193, 239, 0.48); border-color: rgba(138, 193, 239, 0.48); color: #25A5EC"
							size="sm">{{$t('robot.code.leave')}}</b-button>
						<b-button variant="primary"
							@click="handleLogin" :disabled="prompt.isShow && prompt.isSuccess === 0"
							size="sm">{{$t('user.login')}}</b-button>
					</b-col>
				</b-row>
			</b-tab>
			<b-tab :title="$t('user.register')" class="pt-3">
				<custom-form ref="register" :operation="$t('user.register')" :modal="$refs.loginModalRef" :isRegister="true"></custom-form>
			</b-tab>
			<b-tab :title="$t('user.change')" class="pt-3">
				<custom-form ref="changePassword" :operation="$t('user.changeOperate')" :modal="$refs.loginModalRef" :isRegister="false"></custom-form>
			</b-tab>
		</b-tabs>
	</b-modal>
</template>

<script>
import CustomForm from '../component/form.vue';

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
			register: {
				username: '',
				password: ''
			},
			prompt: initPrompt()
		};
	},
	components: {
		CustomForm
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

			// this.$api.createToken({
			// 	data: {
			// 		username: this.username,
			// 		password: this.password
			// 	}
			// }).then((data) => {
			// 	this.$store.commit('updateUserToken', data.token);

			// 	this.prompt.isSuccess = 1;
			// }).catch(e => {
			// 	this.prompt.isSuccess = -1;
			// });
			this.$refs.register.createAxiosRetrive('login', {
				user: this.username, pwd: this.password
			}).then(({data}) => {
				this.prompt.isSuccess = data.code;
			}).catch(e => {
				this.prompt.isSuccess = -1;
			});
		},
		init() {
			this.username = '';
			this.password = '';
			this.prompt = initPrompt();

			this.initOther(this.$refs.register);
			this.initOther(this.$refs.changePassword);
		},
		initOther(component) {
			component.prompt = initPrompt();
			component.code = {
				returnMsg: '',
				status: 0,
				sending:false
			};
			component.msg = {
				account: '',
				code: '',
				password: ''
			};
		}
	}
}
</script>

<style lang="less">
#loginModal {
	.modal-title {
		color:#666666
	}
	.form-control {
		border-color: #DFDFDF;
	}
	.btn-primary {
		width: 65px;
		height: 25px;
		line-height: 16px;
	}
}
</style>


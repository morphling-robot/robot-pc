<template>
	<b-modal
		id="loginModal"
		size="sm"
		ref="loginModalRef"
		centered
		:title="title"
		hide-footer
		@shown="init">
		<div v-if="type === 'login'">
			<b-form-group>
				<b-form-input
					size="sm"
					:placeholder="$t('user.name')"
					v-model="username" />
			</b-form-group>
			<b-form-group class="mb-2">
				<b-form-input
					size="sm"
					:placeholder="$t('user.password')"
					:type="show ? 'text' : 'password'"
					v-model="password" />
					<i
						class="far"
						@click="show = !show"
						:class="{
							'fa-eye': show,
							'fa-eye-slash': !show
						}" style="position: absolute; top: 70px; right: 30px" />
			</b-form-group>
			<b-row>
				<b-col>
					<b-button variant="link" class="p-0" @click="type = 'change';title = $t('user.change')">{{$t('user.msg.change')}}</b-button>
				</b-col>
				<b-col>
					<b-button variant="link" class="p-0" style="float:right" @click="type ='register';title = $t('user.register')">{{$t('user.msg.register')}}</b-button>
				</b-col>
			</b-row>
			<b-button variant="primary" class="w-100 mt-3"
				@click="handleLogin" :disabled="prompt.isShow && prompt.isSuccess === 0"
				size="md">{{$t('user.login')}}</b-button>
			<p v-if="prompt.isShow" class="mb-0  mt-2" style="font-size: 13px">
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
		</div>
		<div v-else-if="type === 'register'">
			<custom-form ref="register" :operation="$t('user.register')" :modal="$refs.loginModalRef" :isRegister="true"
				:createAxiosRetrive="createAxiosRetrive">
				<b-button slot="link" variant="link"
					class="w-100 mt-1" @click="title = $t('user.login');type = 'login'"
					size="sm">{{$t('user.msg.return')}}</b-button>
			</custom-form>
		</div>
		<div v-else>
			<custom-form ref="changePassword" :operation="$t('user.changeOperate')" :modal="$refs.loginModalRef" :isRegister="false"
				:createAxiosRetrive="createAxiosRetrive">
				<b-button slot="link" variant="link"
					class="w-100 mt-1" @click="title = $t('user.login');type = 'login'"
					size="sm">{{$t('user.msg.return')}}</b-button>
			</custom-form>
		</div>
	</b-modal>
</template>

<script>
import CustomForm from '../component/form.vue';
import axios from 'axios';

function initPrompt() {
	return {
		isShow: false,
		isSuccess: 0,
	};
}

export default {
	data() {
		return {
			title: this.$t('user.login'),
			type: 'login',
			username: '',
			password: '',
			show: true,
			register: {
				username: '',
				password: ''
			},
			prompt: initPrompt(),
			prefix: 'http://robot.goodlinlin.com/DRrobot/public/api/v1'
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
		createAxiosRetrive(url, arg) {
			return axios.post(`${this.prefix}/${url}`, arg);
		},
		updateUserStatus(username, password) {
			this.$store.commit('updateUserStatus', { username, password });
		},
		handleLogin() {
			this.prompt.isShow = true;

			this.createAxiosRetrive('login', {
				user: this.username, pwd: this.password
			}).then(({data}) => {
				this.prompt.isSuccess = data.code;
				this.$store.commit('updateUserToken', data.data.token);
				this.updateUserStatus(this.username, this.password);
			}).catch(e => {
				this.prompt.isSuccess = -1;
			});
		},
		init() {
			this.username = this.$store.state.user.name;
			this.password = this.$store.state.user.password;;
			this.prompt = initPrompt();

			this.title = this.$t('user.login');
			this.type = 'login';

			this.initOther(this.$refs.register);
			this.initOther(this.$refs.changePassword);
		},
		initOther(component) {
			if (!component) {
				return;
			}

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
		height: 30px;
		line-height: 16px;
	}
}
</style>


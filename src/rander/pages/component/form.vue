<template>
	<div>
		<b-form-group>
			<b-input-group>
				<b-dropdown size="sm" slot="prepend" :text="selectedAccount" style="border: 1px solid #DFDFDF;border-radius: .25rem;border-top-right-radius: 0;
    			border-bottom-right-radius: 0;">
					<b-dropdown-item @click="selectedAccount = $t('user.phone'); isPhone = true">{{$t('user.phone')}}</b-dropdown-item>
					<b-dropdown-item @click="selectedAccount = $t('user.email'); isPhone = false">{{$t('user.email')}}</b-dropdown-item>
				</b-dropdown>
				<b-form-input size="sm" :placeholder="`${$t('user.phone')}/${$t('user.email')}`"
				v-model="msg.account" />
			</b-input-group>
		</b-form-group>
		<b-form-group>
			<b-form-input
				size="sm"
				v-model="msg.password"
				:type="show ? 'text' : 'password'"
				:placeholder="$t('user.password')" />
				<i
					class="far"
					@click="show = !show"
					:class="{
						'fa-eye': show,
						'fa-eye-slash': !show
					}" style="position: absolute; top: 70px; right: 30px" />
		</b-form-group>
		<b-form-group>
			<b-input-group>
				<b-form-input @input.native="init" size="sm" :placeholder="$t('user.code')" v-model="msg.code" />
				<b-input-group-append>
					<b-button size="sm" text="Button" variant="primary" style="height: 31px" @click="sendCode" :disabled="code.sending">{{$t('user.send')}}</b-button>
				</b-input-group-append>
			</b-input-group>
			<span :class="{'text-success': code.status === 1, 'text-danger': code.status === -1}" style="font-size: 12px;position:absolute">
				{{code.returnMsg}}
			</span>
		</b-form-group>
		<b-button variant="primary"
			class="w-100 mt-0 mb-2"
			@click="operate" :disabled="prompt.isShow && prompt.isSuccess === 0"
			size="sm">{{operation}}</b-button>
		<slot name="link"></slot>
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
</template>

<script>
export default {
	props: ['operation', 'modal', 'isRegister', 'createAxiosRetrive'],
	data() {
		return {
			selectedAccount: this.$t('user.phone'),
			prompt: {
				isShow: false,
				isSuccess: 0
			},
			code: {
				returnMsg: '',
				status: 0,
				sending:false
			},
			isPhone: true,
			msg: {
				account: '',
				code: '',
				password: ''
			},
			show: true
		}
	},
	methods: {
		init() {
			this.code.status = 0;
			this.code.returnMsg = '';
		},
		operate() {
			this.prompt.isShow = true;

			if (this.isRegister) {
				this.createAxiosRetrive('setPassword', {
					user: this.msg.account, code: this.msg.code, pwd: this.msg.password
				}).then(({data}) => {
					this.prompt.isSuccess = data.code;
				}).catch((e) => {
					this.prompt.isSuccess = -1;
				});
			} else {
				this.createAxiosRetrive('changePassword', {
					user: this.msg.account, code: this.msg.code, pwd: this.msg.password
				}).then(({data}) => {
					this.prompt.isSuccess = data.code;
				}).catch((e) => {
					this.prompt.isSuccess = -1;
				});
			}
		},
		sendCode() {
			this.code.sending = true;
			this.code.returnMsg = '';
			this.code.status = 0;

			if (this.isPhone) {
				this.createAxiosRetrive('sendSMS', {
					user: this.msg.account
				}).then(({data}) => {
					this.code.status = data.code;
					this.code.returnMsg = data.msg;
					this.code.sending = false;
				}).catch((e) => {
					this.code.status = -1;
					this.code.returnMsg = this.$t('user.fail');
					this.code.sending = false;
				});
			} else {
				this.createAxiosRetrive('sendEmail', {
					user: this.msg.account
				}).then(({data}) => {
					this.code.status = data.code;
					this.code.returnMsg = data.msg;
					this.code.sending = false;
				}).catch((e) => {
					this.code.status = -1;
					this.code.sending = false;
				});
			}
		}
	}
}
</script>


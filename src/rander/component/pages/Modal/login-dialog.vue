<template>
	<b-modal
		id="loginModal"
		title="登录"
		no-close-on-backdrop
		centered
		@ok="handleLogin()">
		<p>用户名：</p>
		<b-form-input
			class="login-input"
			v-model="username"
			type="text"
			placeholder="用户名">
		</b-form-input>
		<p>密码：</p>
		<b-form-input
			class="login-input"
			v-model="password"
			type="password"
			placeholder="密码">
			</b-form-input>
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
	methods: {
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
		handleLogin() {
			this.updateUserStatus(
				Math.floor(Math.random() * (100 - 1) + 1),
				this.username
			);
		}
	}
}
</script>


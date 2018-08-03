<template>
	<div>
		<b-modal id="loginModal" title="登录" @ok="handleLogin()">
			<b-form-input
				class="login-input"
				v-model="username"
        type="text"
        placeholder="用户名">
			</b-form-input>
			<p></p>
			<p></p>
			<b-form-input
				class="login-input"
				v-model="password"
        type="password"
    		placeholder="密码">
			</b-form-input>
  	</b-modal>

		<b-navbar id="navbar" toggleable="md" type="dark" variant="dark">

			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			<b-navbar-brand>
				<router-link to="/">DRRobot</router-link>
			</b-navbar-brand>

			<b-collapse is-nav id="nav_collapse">

				<b-navbar-nav>
					<b-nav-item>
						<router-link to="/editor">代码编辑器</router-link>
					</b-nav-item>
					<b-nav-item>
						<router-link to="/setting">设置</router-link>
					</b-nav-item>
					<b-nav-item
						@click="switchEditorMode()"
						v-if="this.$route.path == '/editor'"
						right
					>
						{{this.editorMode}}
					</b-nav-item>
				</b-navbar-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">

		 	 <b-nav-item-dropdown right>
					<!-- Using button-content slot -->
			 	 <template slot="button-content">
			 		 <a>{{this.loggenInUsername}}</a>
					</template>
					<b-dropdown-item href="#">个人资料</b-dropdown-item>
					<b-dropdown-item href="#" v-if="this.loggenInUserid" @click="handleLogout()">注销</b-dropdown-item>
					<b-dropdown-item href="#" v-b-modal.loginModal v-else>登录</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>

		</b-collapse>
	</b-navbar>
	</div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
			battery: 70,
			username: '',
			password: '',
    };
  },
  computed: {
    editorMode() {
      return this.$store.state.editor.mode;
    },
    loggenInUsername() {
			const name = this.$store.state.user.name;
			if (name) {
				return name;
			}
      return '用户';
		},
		loggenInUserid() {
			return this.$store.state.user.id;
		}
  },
  methods: {
    switchEditorMode() {
      const editorMode = this.editorMode == "blockly" ? "python" : "blockly";

      this.$store.commit("modeUpdate", editorMode);
		},
		handleLogin() {
			this.updateUserStatus(
				Math.floor(Math.random() * (100 - 1) + 1),
				this.username
			);
		},
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		}
  }
};
</script>

<style lang="less">

</style>


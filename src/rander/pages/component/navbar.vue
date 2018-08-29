<template>
	<div>
		<b-navbar id="navbar" toggleable="md" type="dark" variant="dark">

			<b-navbar-brand to="/python">{{$t('navbar.brand')}}</b-navbar-brand>

				<b-navbar-nav>
					<b-nav-item
						to="/blockly">
						{{$t('navbar.editor')}}
					</b-nav-item>
					<b-nav-item
						v-b-modal.manageModal>
						{{$t('navbar.manage')}}
					</b-nav-item>
					<b-nav-item
						v-b-modal.actionModal>
						{{$t('navbar.action')}}
					</b-nav-item>
					<b-nav-item
						v-b-modal.videoModal>
						{{$t('navbar.video')}}
					</b-nav-item>
				</b-navbar-nav>

				<b-navbar-nav class="mx-auto">
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
			 	 <b-nav-item-dropdown right>
				 		<template slot="button-content">
			 				<a>{{this.loggenInUsername}}</a>
						</template>
						<b-dropdown-item href="#">{{$t('navbar.profile')}}</b-dropdown-item>
						<b-dropdown-item href="#" v-if="this.loggenInUserid" @click="handleLogout()">{{$t('navbar.logout')}}</b-dropdown-item>
						<b-dropdown-item href="#" v-b-modal.loginModal v-else>{{$t('navbar.login')}}</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>



export default {
	name: "navbar",
	data() {
		return {
			file: null,
			filetext: null,
			filetype: null
		}
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
			return this.$t('navbar.user');
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
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
	},
	watch: {
		file() {
			console.log(this.file);
			const blocklyReg = /.bk$/;
			const pythonReg = /.py$/;

			if (blocklyReg.test(this.file.name)) {
				this.filetype = 'blockly';
				this.$router.push('/blockly');
			} else if (pythonReg.test(this.file.name)) {
				this.filetype = 'python';
				this.$router.push('/python');
			}
		},
	}
};
</script>

<style lang="less">
.menu-button{
	margin-left: 10px;
	margin-right: 10px;
}
.menu-button.active {
	color: black!important;
	background-color: white!important;
}
</style>


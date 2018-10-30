<template>
	<div>
		<b-navbar id="navbar" toggleable="md" type="dark" variant="dark">
			<b-dropdown variant="dark" size="lg" no-caret>
				<template slot="button-content">
					<i class="fas fa-bars" />
				</template>
				<b-dropdown-item
					v-b-modal.robotModal>
					{{$t('robot.connect.label')}}
				</b-dropdown-item>
				<b-dropdown-item
					v-b-modal.networkModal>
					{{$t('robot.network.label')}}
				</b-dropdown-item>
				<b-dropdown-item
					v-b-modal.actionModal>
					{{$t('robot.action.label')}}
				</b-dropdown-item>
				<b-dropdown-item
					v-b-modal.videoModal>
					{{$t('robot.video.label')}}
				</b-dropdown-item>
			</b-dropdown>


			<b-navbar-brand to="/">{{$t('navbar.brand')}}</b-navbar-brand>

			<b-navbar-nav>
				
			</b-navbar-nav>

			<b-navbar-nav class="mx-auto">
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>



export default {
	name: "navbar",
	data() {
		return {

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
	}
};
</script>

<style lang="less">
#navbar {
	height: 48px;
}
</style>

<template>
	<div>
		<b-navbar id="navbar" toggleable="md" type="dark" variant="dark">

			<b-navbar-brand to="/">DRRobot</b-navbar-brand>

				<b-navbar-nav>
					<b-nav-item
						to="/editor">
						代码编辑器
					</b-nav-item>
					<b-nav-item
						v-b-modal.manageModal>
						机器人管理
					</b-nav-item>
					<b-nav-item
						v-b-modal.videoModal>
						录像功能
					</b-nav-item>
				</b-navbar-nav>

				<b-navbar-nav class="mx-auto">
					<!-- <b-button
						@click="switchEditorMode()"
						class="menu-button my-2 my-sm-0"
						:class="{'active': this.editorMode == 'blockly'}">
						{{this.editorMode}}
					</b-button> -->
					<b-form-file
						v-model="file"
						id="fileInput"
						style="display:none"></b-form-file>
					<b-button
						class="menu-button my-2 my-sm-0"
						file
						@click="onOpenhandle()">
						打开
					</b-button>
					<b-button
						class="menu-button my-2 my-sm-0"
						@click="onSavehandle()">
						保存
					</b-button>
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
			 	 <b-nav-item-dropdown right>
				 		<template slot="button-content">
			 				<a>{{this.loggenInUsername}}</a>
						</template>
						<b-dropdown-item href="#">个人资料</b-dropdown-item>
						<b-dropdown-item href="#" v-if="this.loggenInUserid" @click="handleLogout()">注销</b-dropdown-item>
						<b-dropdown-item href="#" v-b-modal.loginModal v-else>登录</b-dropdown-item>
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
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
		onOpenhandle() {
			const fileInput = document.querySelector('#fileInput');
			const event = new MouseEvent('click');
			fileInput.dispatchEvent(event);
		},
		onSavehandle() {

		},
		fileReader() {
			const fr = new FileReader();
			fr.onload = (e) => {
    		this.filetext = e.target.result;
				console.log(this.filetext);
			}

			fr.readAsText(this.file);
		},
		parserXML(str) {
			const dp = new DOMParser();
			const xml = dp.parseFromString(str, 'text/xml').firstChild;
			return xml;
		}
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

			// this.fileReader();
		},
		// filetext() {
		// 	if (this.filetype == 'blockly') {
		// 		// const xml = this.parserXML(this.filetext);
		// 		// this.$store.commit('blocklyUpdate', xml);
				
		// 	} else if (this.filetype == 'python') {
		// 		// this.$store.commit('pythonUpdate', this.filetext);
				
		// 	}
		// }
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


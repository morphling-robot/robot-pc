<template>
	<div>
		<b-navbar id="navbar" toggleable="md" type="dark" variant="dark" class="pl-0">
			<b-dropdown variant="dark" size="lg" no-caret>
				<template slot="button-content">
					<i class="fas fa-bars" />
				</template>

				<b-dropdown-item @click="changeLocale('zh')">
					{{$t('navbar.Chinese')}}
				</b-dropdown-item>
				<b-dropdown-item @click="changeLocale('en')">
					{{$t('navbar.English')}}
				</b-dropdown-item>
				<b-dropdown-item @click="saveFile">
					保存
				</b-dropdown-item>
				<b-dropdown-item @click="openFile">
					打开
				</b-dropdown-item>
				<b-dropdown-item @click="createCode">
					上传
				</b-dropdown-item>
			</b-dropdown>

			<b-navbar-nav class="mr-auto">
				<b-navbar-brand>{{$t('navbar.brand')}}</b-navbar-brand>
			</b-navbar-nav>

			<!-- <b-dropdown variant="dark" size="lg" no-caret id="change-locale">
				<template slot="button-content">
					<i class="fas fa-language" style="font-size: 30px" />
				</template>
				<b-dropdown-item @click="changeLocale('zh')">
					{{$t('navbar.Chinese')}}
				</b-dropdown-item>
				<b-dropdown-item @click="changeLocale('en')">
					{{$t('navbar.English')}}
				</b-dropdown-item>
			</b-dropdown> -->

			<b-navbar-nav  class="mx-auto">
				<b-input-group size="sm">
					<b-form-radio-group
						id="btnradios1"
						buttons
						size="sm"
						style="margin: 0px;"
						v-model="editorMode"
						name="radiosBtnDefault">
						<b-form-radio value="blockly"><i class="fas fa-cubes mr-1" />方块文件</b-form-radio>
						<b-form-radio value="python"><i class="fab fa-python mr-1" />Python</b-form-radio>
					</b-form-radio-group>
				</b-input-group>

			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-form>
					<b-button
						class="mr-2"
						size="sm"
						@click="saveFile"
						v-b-tooltip.hover title="保存"><i class="fas fa-save" /></b-button>

					<b-button
						class="mr-2"
						size="sm"
						@click="openFile"
						v-b-tooltip.hover title="打开"><i class="fas fa-folder-open" /></b-button>

					<b-button
						size="sm"
						@click="createCode"
						v-b-tooltip.hover title="上传"><i class="fas fa-upload" /></b-button>
				</b-nav-form>
			</b-navbar-nav>
		</b-navbar>
		<!-- <b-modal
			v-model="isShow"
			:title="$t('modal.prompt')"
			size="sm"
			@ok="changeMode"
			@cancel="saveFileBtn"
			:ok-title="$t('modal.ok')"
			:cancel-title="$t('robot.code.save')"
			cancel-variant="link">
			{{$t('modal.message')}}
		</b-modal> -->
	</div>

</template>

<script>
const blocklyFilter = {
	name: "block",
	extensions: ["bk"]
};
const pythonFilter = {
	name: "python",
	extensions: ["py"]
};


export default {
	name: "navbar",
	data() {
		return {
			fileName: '',
			ipcRenderer: null,
			isShow: false,
		}
	},
	mounted() {
		this.fileName = '无标题';
	},
	computed: {
		editorMode: {
			get() {
				return this.$store.state.editor.mode;
			},
			set(value) {
				this.$store.commit('modeUpdate', value);

				this.$router.push(value);
			}
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
		changeLocale(msg) {
			 this.$i18n.locale = msg;
		},
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
		// changeMode(a) {
			
		// },
		saveFileBtn() {
			this.saveFile();
			this.changeMode();
		},
		saveFile() {
			const electron = this.$electron;
			const { dialog } = electron.remote;
			const ipcRenderer = electron.ipcRenderer;
			const fs = electron.remote.require("fs");
			let text = "";
			const filters = [];
			switch (this.$route.path) {
				case "/python":
				text = this.$store.state.editor.python.code;
				filters.push(pythonFilter);
				break;

				case "/blockly":
				text = this.$store.state.editor.blockly.code;
				filters.push(blocklyFilter);
				break;

				case "/":
				text = this.$store.state.editor.blockly.code;
				filters.push(blocklyFilter);
				break;
			}

			dialog.showSaveDialog({ properties: ["openFile"], filters }, filename => {
				fs.writeFileSync(filename, text, "utf8");
			});
		},
		openFile() {
			const electron = this.$electron;
			const { dialog } = electron.remote;
			const ipcRenderer = electron.ipcRenderer;
			const fs = electron.remote.require("fs");
			const blocklyReg = /.bk$/;
			const pythonReg = /.py$/;
			const filters = [blocklyFilter, pythonFilter];

			const filePaths = dialog.showOpenDialog(
				{ properties: ["openFile"], filters },
				filePaths => {
					const filename = filePaths[0];
					let route;

					if (blocklyReg.test(filename)) {
						route = "blockly";
					}

					if (pythonReg.test(filename)) {
						route = "python";
					}
					this.$router.push(route);

					setTimeout(() => {
						console.log(filename);
						const data = fs.readFileSync(filename, "utf8");
						console.log(route);
						this.$store.commit(`${route}UpdateContent`, data);
					}, 100);
				}
			);
		},
		createCode() {
			window.prompt('请输入文件名', 'untitle', name => {
        this.$api.createCode({
					data: {
						name,
						body: this.$store.state.editor.python.code
					},
					config: {
						auth: {
							username: this.$store.state.user.token,
							password: ''
						}
					}
				});
      });
		},
	},
	watch: {
		fileName() {
			this.$store.commit('updateFileName', this.fileName);
		}
	},
	mounted() {
		const electron = this.$electron;
		this.ipcRenderer = electron.ipcRenderer;
	}
};
</script>

<style lang="less">
#navbar {
	height: 48px;
}

#right {
	fieldset {
		margin-bottom: 0;
		margin-right: 30px;
	}
}

#change-locale button {
	padding: 0px 1rem;
}
</style>

<template>
	<div>
		<b-navbar id="navbar" toggleable="md" class="pl-0">
			<b-dropdown class="ml-3" size="lg" no-caret>
				<template slot="button-content">
					<i class="fas fa-bars" />
				</template>

				<b-dropdown-item @click="changeLocale('zh')">
					{{$t('navbar.Chinese')}}
				</b-dropdown-item>
				<b-dropdown-item @click="changeLocale('en')">
					{{$t('navbar.English')}}
				</b-dropdown-item>
				<b-dropdown-item @click="createFileBtn">
					{{$t('file.create')}}
				</b-dropdown-item>
				<b-dropdown-item @click="saveFile">
					{{$t('file.save')}}
				</b-dropdown-item>
				<b-dropdown-item @click="openFile">
					{{$t('file.open')}}
				</b-dropdown-item>
				<b-dropdown-item @click="createCode">
					{{$t('file.upload')}}
				</b-dropdown-item>
			</b-dropdown>

			<!-- <b-navbar-nav class="mr-auto">
				<b-navbar-brand>{{$t('navbar.brand')}}</b-navbar-brand>
			</b-navbar-nav> -->

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

			<b-navbar-nav  style="margin: 0 85px">
				<b-input-group size="sm">
					<b-form-radio-group
						id="btnradios1"
						buttons
						size="sm"
						style="margin: 0px;"
						v-model="editorMode"
						name="radiosBtnDefault">
						<b-form-radio value="blockly"><i class="fas fa-puzzle-piece mr-1"></i>{{$t('navbar.blockly')}}</b-form-radio>
						<b-form-radio value="python"><i class="fab fa-python mr-1" />Python</b-form-radio>
					</b-form-radio-group>
				</b-input-group>

			</b-navbar-nav>

			<b-navbar-nav  class="mx-auto">
				<img src="../../../../asset/images/logo.png" style="width:100%">
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto" id="code-operate">
				<b-nav-form>
					<b-button
						class="mr-2"
						size="sm"
						@click="saveFile"
						v-b-tooltip.hover :title="$t('file.save')"><i class="fas fa-save" /></b-button>

					<b-button
						class="mr-2"
						size="sm"
						@click="openFile"
						v-b-tooltip.hover :title="$t('file.open')"><i class="fas fa-folder-open" /></b-button>

					<b-button
						size="sm"
						@click="createCode"
						v-b-tooltip.hover :title="$t('file.upload')"><i class="fas fa-cloud-upload-alt"></i></b-button>
				</b-nav-form>
			</b-navbar-nav>
		</b-navbar>
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
			editorMode: this.$store.state.editor.mode
		}
	},
	mounted() {
		this.fileName = '无标题';
	},
	computed: {
		loggenInUsername() {
			const name = this.$store.state.user.name;
			if (name) {
				return name;
			}
			return this.$t('navbar.user');
		},
		loggenInUserid() {
			return this.$store.state.user.id;
		},
		isChanged() {
			return this.$store.getters.isPythonChanged || this.$store.getters.isBlocklyChanged;
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
		createFile() {
			this.$store.commit('blocklyUpdateCode', '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>');
			this.$store.commit('pythonUpdateCode', '');

			this.$store.commit('blocklyOriginUpdateCode', '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>');
			this.$store.commit('pythonOriginUpdateCode', '');

			this.$root.$emit('create-file');
		},
		createFileBtn() {
			if (this.isChanged) {

				this.$dialog.confirmChange(this.$t('modal.create')).then(() => {
					this.createFile();
				})
			} else {
				this.createFile();
			}
		},
		saveFileBtn() {
			this.saveFile();
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
				
				this.$store.commit('pythonOriginUpdateCode', text);
				break;

				case "/blockly":
				text = this.$store.state.editor.blockly.code;
				filters.push(blocklyFilter);

				this.$store.commit('blocklyOriginUpdateCode', text);
				break;

				case "/":
				text = this.$store.state.editor.blockly.code;
				filters.push(blocklyFilter);

				this.$store.commit('pythonOriginUpdateCode', text);
				this.$store.commit('blocklyOriginUpdateCode', text);
				break;
			}

			dialog.showSaveDialog({ properties: ["openFile"], filters, title: 'Save' }, filename => {
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
			const {isPythonChanged, isBlocklyChanged} = this.$store.getters;
			let hasChange = false;

			const filePaths = dialog.showOpenDialog(
				{ properties: ["openFile"], filters },
				filePaths => {
					const filename = filePaths[0];
					let route;

					if (blocklyReg.test(filename)) {
						route = "blockly";
						hasChange = isBlocklyChanged || isPythonChanged;

						this.$root.$emit('init-python');
					}

					if (pythonReg.test(filename)) {
						route = "python";
						hasChange = isPythonChanged;
					}

					if (hasChange) {

						this.$dialog.confirmChange(this.$t('modal.open')).then(() => {
							this.changeCodeContent(filename, route);
						});
					} else {
						this.changeCodeContent(filename, route);
					}

					
				}
			);

		},
		changeCodeContent(filename, route) {
			const electron = this.$electron;
			const fs = electron.remote.require("fs");

			setTimeout(() => {
				const data = fs.readFileSync(filename, "utf8");
				this.$store.commit(`${route}UpdateCode`, data);
				this.$store.commit(`${route}OriginUpdateCode`, data);
				this.$store.commit(`${route}UpdateOpendState`, true);

				this.$root.$emit('open-file');
			}, 100);
			
			this.$router.push(route);
			this.$store.commit('modeUpdate', route);
			this.editorMode = route;
		},
		createCode() {
			window.prompt(this.$t('robot.code.filename'), 'untitle', name => {
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
				}).then(() => {
					// this.$api.getCodeList().then(data => {

					// 	this.$store.commit('getCodeList', data);
					// });
					this.$store.commit('pythonOriginUpdateCode', this.$store.state.editor.python.code);

					const codeList = [].concat(this.$store.state.editor.codeList);

					codeList.unshift({
						codeName: name
					});

					this.$store.commit('getCodeList', codeList);
				});
			});
		},
	},
	watch: {
		fileName() {
			this.$store.commit('updateFileName', this.fileName);
		},
		editorMode(newValue, oldValue) {

			if (oldValue !== 'python' || this.$store.state.editor.python.code === '') {
				this.$store.commit('modeUpdate', newValue);
	
				this.$router.push(newValue);

				return;
			}

			this.$dialog.confirmChange(this.$t('modal.file')).then(() => {

				this.$store.commit('modeUpdate', newValue);
	
				this.$router.push(newValue);
				
			}, () => {
				this.editorMode = oldValue;
			});
		}
	},
	mounted() {
		const electron = this.$electron;
		this.ipcRenderer = electron.ipcRenderer;
		
    	this.$root.$on('change-mode', this.changeMode = (mode) => {
			this.editorMode = mode;
		});
	},
	destroyed() {
		this.$root.$off('change-mode', this.changeMode);
	}
};
</script>

<style lang="less">
#navbar {
	height: 48px;
	border-bottom: 1px solid #DFDFDF;

	button {
		padding: 0px;
	}

	label.btn-secondary {
		background: #E8E8E8;
		color: #000000;
		border: none;
	}

	.btn-secondary:not(:disabled):not(.disabled).active {
		background: #666666;
		color: #ffffff;
	}
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

#code-operate {
	button {
		font-size: 16px;
		padding: 0 3px;
	}
}
</style>

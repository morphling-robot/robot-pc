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
					v-b-modal.codeModal>
					代码
				</b-dropdown-item>
				<b-dropdown-item
					v-b-modal.videoModal>
					{{$t('robot.video.label')}}
				</b-dropdown-item>
			</b-dropdown>

			<b-navbar-nav class="mr-auto">
				<b-navbar-brand>{{$t('navbar.brand')}}</b-navbar-brand>
			</b-navbar-nav>

			<b-navbar-nav  class="mx-auto">
				<b-input-group size="sm">
					<b-form-radio-group
						id="btnradios1"
						buttons
						size="sm"
						style="margin: 0px;"
						v-model="mode"
						name="radiosBtnDefault"
						@change="changeMode">
						<b-form-radio value="blockly"><i class="fas fa-cubes mr-1" />方块文件</b-form-radio>
						<b-form-radio value="python"><i class="fab fa-python mr-1" />Python</b-form-radio>
					</b-form-radio-group>
					<b-form-input style="width: 10em;" v-model="fileName" />
				</b-input-group>

			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-form>
					

					<b-button
						class="mr-2"
						size="sm"
						@click="saveFile"><i class="fas fa-save" /></b-button>

					<b-button
						class="mr-2"
						size="sm"
						@click="openFile"><i class="fas fa-folder-open" /></b-button>

					<b-button
						size="sm"
						@click="createCode"><i class="fas fa-upload" /></b-button>

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
			mode: 'blockly',
			fileName: ''
		}
	},
	mounted() {
		this.fileName = '无标题';
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
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
		changeMode(a) {
			this.mode = a;
			this.$router.push(a);
		},
		saveFile() {
			const electron = this.$electron;
			const { dialog } = electron.remote;
			const ipcRenderer = electron.ipcRenderer;
			const fs = electron.remote.require("fs");
			let text = "";
      const filters = [];
      console.log(this.$route.path);
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
            console.log(data);
            this.$store.commit(`${route}UpdateContent`, data);
          }, 100);
        }
      );
		},
		createCode() {
			this.$api.createCode({
				data: {
					name: this.$store.state.editor.fileName,
					body: this.$store.state.editor.python.code
				},
				config: {
          auth: {
            username: this.$store.state.user.token,
            password: ''
          }
        }
			});
		},
	},
	watch: {
		fileName() {
			this.$store.commit('updateFileName', this.fileName);
		}
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
</style>

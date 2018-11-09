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


			<b-navbar-brand>{{$t('navbar.brand')}}</b-navbar-brand>

			<b-navbar-nav>
				
			</b-navbar-nav>

			<b-navbar-nav  class="mx-auto">
				
			</b-navbar-nav>

			<b-navbar-nav id="right" class="ml-auto">
				<b-form-group>
					<b-form-radio-group
						id="btnradios1"
						buttons
						size="md"
						style="margin: 0px;"
						v-model="mode"
						:options="radioOptions"
						name="radiosBtnDefault"
						@change="test" />
				</b-form-group>

				<b-button
					@click="saveFile">保存</b-button>

				<b-button
					@click="openFile">打开</b-button>
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
			radioOptions: [
				{ text: '方块文件', value: 'blockly'},
				{ text: 'Python', value: 'python'},
			],
			mode: 'blockly'
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
		handleLogout() {
			this.updateUserStatus(null, null);
		},
		updateUserStatus(id, username) {
			this.$store.commit("updateUserStatus", { id, username });
		},
		test(a) {
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

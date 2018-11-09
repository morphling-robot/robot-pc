<template>
	<div id="app">
		<navbar />
		<login-modal />
		<video-modal />
		<action-modal />
    <code-modal />
		<connect-modal />
		<network-modal />

		<b-container
			id="app-view-container"
			fluid>
			<b-row
				style="height: 100%;">
				<b-col cols="3">
					<side-view />
				</b-col>
				<b-col>
          <div id="router-view-container">
						<router-view></router-view>
					</div>
				</b-col>
			</b-row>
		</b-container>

    <prompt-modal />

		<Statusbar/>
	</div>
</template>

<script>
import Navbar from "./pages/component/navbar.vue";
import SideView from "./pages/component/sideView.vue";
import Statusbar from "./pages/component/statusbar.vue";
import LoginModal from "./pages/Modal/login-dialog.vue";
import VideoModal from "./pages/Modal/video-dialog.vue";
import ActionModal from "./pages/Modal/action-dialog.vue";
import CodeModal from "./pages/Modal/code-dialog.vue";
import ConnectModal from "./pages/Modal/connect-dialog.vue";
import NetworkModal from "./pages/Modal/network-dialog.vue";
import PromptModal from "./pages/Modal/prompt-dialog.vue";

export default {
  name: "app",
  components: {
		Navbar,
		SideView,
    Statusbar,
    LoginModal,
    VideoModal,
    ActionModal,
    CodeModal,
    ConnectModal,
    NetworkModal,
    PromptModal
  },
  data() {
    return {
      file: null
    };
  },
  mounted() {
    const aaa = new MouseEvent("click");
    const electron = this.$electron;
    const { dialog } = electron.remote;
    const ipcRenderer = electron.ipcRenderer;
    const fs = electron.remote.require("fs");
    const blocklyFilter = {
      name: "block",
      extensions: ["bk"]
    };
    const pythonFilter = {
      name: "python",
      extensions: ["py"]
    };

    const events = [
      "app-new-python",
      "app-new-blockly",
      "app-openfile",
      "app-savefile",
      "app-change-locale",
      "app-uploadfile"
    ];

    events.forEach(e => ipcRenderer.removeAllListeners(e));

    ipcRenderer.on("app-new-python", () => {
      if (this.$route.path !== "/python") {
        this.$router.push("python");
      }

      setTimeout(() => {
        this.$store.commit("pythonUpdateContent", "");
      }, 100);
    });

    ipcRenderer.on("app-new-blockly", () => {
      if (this.$route.path !== "/blockly") {
        this.$router.push("blockly");
      }

      setTimeout(() => {
        this.$store.commit(
          "blocklyUpdateContent",
          '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
        );
      }, 100);
    });

    ipcRenderer.on("app-openfile", () => {
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
    });

    ipcRenderer.on("app-savefile", () => {
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
    });

    ipcRenderer.on("app-uploadfile", () => {});

    ipcRenderer.on("app-change-locale", (event, msg) => {
      this.$i18n.locale = msg;
    });
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
}

#router-view-container {
	height: 100%;
}

#app-view-container {
  position: absolute;
  top: 48px;
  bottom: 24px;
  background: #f0f0f0;
  width: 100%;
  padding: 0;
  height: auto;

  .row {
    margin: 0;
  }
  
  .row > div {
    padding: 0;
    margin: 0;
  }
}
</style>

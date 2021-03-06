<template>
	<div id="app">
		<navbar />
		<login-modal />
		<video-modal />
		<action-modal ref="actionModal" />
    <code-modal />
		<connect-modal @hide-connect="$refs.actionModal.getActionsList()" />
		<network-modal />
    <engine-modal />

		<b-container
			id="app-view-container"
			fluid>
      <side-view :width="sidebarWidth" v-if="sidebarWidth !== 0" style="left: 45px" />
      <div id="side-toolbar">
        <b-button
						class="ml-1 my-2"
            @click="changeVideoShow"
						size="sm" :title="$t('robot.label')"><i class="fas fa-robot" /></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.robotModal
						size="sm" :title="$t('robot.connect.label')"><i class="fas fa-link"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.networkModal
						size="sm" :title="$t('robot.network.label')"><i class="fas fa-wifi"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.actionModal
						size="sm" :title="$t('robot.action.label')"><i class="fas fa-gamepad"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.codeModal
						size="sm" :title="$t('robot.code.label')"><i class="fas fa-code"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.videoModal
						size="sm" :title="$t('robot.video.label')"><i class="fas fa-video"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.engineModal
						size="sm" :title="$t('robot.engine.calibration')"><i class="fas fa-cog"></i></b-button>
        <b-button
						class="ml-1 my-2"
            v-b-modal.loginModal
						size="sm" :title="$t('user.login')"><i class="fas fa-sign-in-alt"></i></b-button>
      </div>
      <div id="router-view-container"
        :style="{
          left: `${45 + sidebarWidth}px`
        }">
        <router-view></router-view>
      </div>
		</b-container>
    <result-show />
    <Statusbar/>
    <prompt-modal />
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
import EngineModal from "./pages/Modal/engine-dialog.vue";
import ResultShow from "./pages/component/result.vue";

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
    PromptModal,
    EngineModal,
    ResultShow
  },
  data() {
    return {
      file: null,
    };
  },
  computed: {
    sidebarWidth() {
      return this.$store.state.robot.isShow ? 0 : 390;
    }
  },
  methods: {
    changeVideoShow() {
      this.$store.commit('updateIsShow');
      
      this.$nextTick(() => {
				window.dispatchEvent(new CustomEvent('resize'));
			});
		},
  },
  mounted() {
    const aaa = new MouseEvent("click");
    const electron = this.$electron;
    const { dialog } = electron.remote;

    const { process } = electron.remote;

    const cwd = process.cwd();

    const ipcRenderer = electron.ipcRenderer;
    const fs = electron.remote.require("fs");

    fs.readdir(cwd + '/asset', (err, files) => console.log(files));

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
        this.$store.commit("pythonUpdateCode", "");
      }, 100);
    });

    ipcRenderer.on("app-new-blockly", () => {
      if (this.$route.path !== "/blockly") {
        this.$router.push("blockly");
      }

      setTimeout(() => {
        this.$store.commit(
          "blocklyUpdateCode",
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
            const data = fs.readFileSync(filename, "utf8");
            this.$store.commit(`${route}UpdateCode`, data);
            this.$store.commit(`${route}UpdateOpendState`, true);
          }, 100);
        }
      );
    });

    ipcRenderer.on("app-savefile", () => {
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

  .page-item.active .page-link {
    background-color: #25A5EC;
    border-color: #25A5EC;
  }

  .pagination-sm .page-link {
    padding: .15rem .5rem;
  }

  .page-item.disabled .page-link {
    color: #dee2e6;
  }

  .ace-github .ace_gutter, .ace_active-line {
    background-color: #F7F9FA;
  }
  .btn-primary {
    background-color: #25A5EC;
    border-color: #25A5EC;
  }

  .btn-danger, .btn-danger.disabled, .btn-danger:disabled {
    background-color: #FF4848;
    border-color: #FF4848;
  }
  .slider-handle {
    background-color: #25A5EC;
    background-image: none;
  }

  button:disabled {
      color: #fff;
      cursor: not-allowed;
  }
}

#router-view-container {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 100;
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
}

#side-toolbar {
  width: 45px;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  button {
    font-size: 18px;
    width: 35px;
    padding: 0px;
  }
}

</style>

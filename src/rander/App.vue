<template>
	<div id="app">
		<login-modal/>
		<video-modal/>
		<action-modal/>
		<manage-modal/>
		<Navbar/>

		<div id="app-view-container">
			<router-view></router-view>
		</div>

		<Statusbar/>
	</div>
</template>

<script>
import Navbar from "./pages/component/navbar.vue";
import Statusbar from "./pages/component/statusbar.vue";
import LoginModal from "./pages/Modal/login-dialog.vue";
import VideoModal from "./pages/Modal/video-dialog.vue";
import actionModal from "./pages/Modal/action-dialog.vue";
import ManageModal from "./pages/Modal/manage-dialog.vue";

export default {
	name: "app",
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
			name: 'block',
			extensions: ['bk']
		};
		const pythonFilter = {
			name: 'python',
			extensions: ['py']
		};
		
		ipcRenderer.on("app-new-python", () => {
				if (this.$route.path !== '/python') {
					this.$router.push('python');console.log('jumpp');
				}
				
				setTimeout(() => {
					this.$store.commit('pythonUpdate', '');
				}, 100);
		});

		ipcRenderer.on("app-new-blockly", () => {
			if (this.$route.path !== '/blockly') {
				this.$router.push('blockly');console.log('jumpb');
			}
				
				setTimeout(() => {
					this.$store.commit('blocklyUpdateContent', '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>');
				}, 100);
		});

		ipcRenderer.on("app-openfile", () => {
			const blocklyReg = /.bk$/;
			const pythonReg = /.py$/;
			const filters = [ blocklyFilter, pythonFilter ];

			const filePaths = dialog.showOpenDialog({properties: ['openFile'], filters}, (filePaths) => {
				const filename = filePaths[0];
				let route;

				if (blocklyReg.test(filename)) {
					route = 'blockly';
				}

				if (pythonReg.test(filename)) {
					route = 'python';
				}
				this.$router.push(route);

				setTimeout(() => {
					const data = fs.readFileSync(filename, 'utf8');

					this.$store.commit(`${route}Update${route == 'blockly' ? 'Content' : ''}`, data);
				}, 100);
			});			
		});

		ipcRenderer.on("app-savefile", () => {
			let text = '';
			const filters = [];
			switch (this.$route.path) {
				case '/python':
					text = this.$store.state.editor.python.code;
					filters.push(pythonFilter);
					break;

				case '/blockly':
					text = this.$store.state.editor.blockly.code;
					filters.push(blocklyFilter);
					break;
			}

			dialog.showSaveDialog({properties: ['openFile'], filters}, (filename) => {
				console.log('cb', filename);
				fs.writeFileSync(filename, text, 'utf8');
			});
		});
	},
	components: {
		Navbar,
		Statusbar,
		LoginModal,
		VideoModal,
		actionModal,
		ManageModal
	}
};
</script>

<style lang="less">
#app {
	height: 100%;
	width: 100%;
}

#app-view-container {
	position: absolute;
	top: 56px;
	bottom: 24px;
	background: #f0f0f0;
	width: 100%;
}
</style>

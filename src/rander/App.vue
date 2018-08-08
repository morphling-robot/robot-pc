<template>
	<div id="app">
		<login-modal/>
		<video-modal/>
		<manage-modal/>
		<Navbar/>

		<div id="app-view-container">
			<router-view></router-view>
		</div>

		<Statusbar/>
	</div>
</template>

<script>
import Navbar from './component/navbar.vue';
import Statusbar from './component/statusbar.vue';
import LoginModal from './component/pages/Modal/login-dialog.vue';
import VideoModal from './component/pages/Modal/video-dialog.vue';
import ManageModal from './component/pages/Modal/manage-dialog.vue';

export default {
  name: 'app',
  data () {
    return {
    }
	},
	components: {
		Navbar,
		Statusbar,
		LoginModal,
		VideoModal,
		ManageModal
	}
}
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

<template>
	<div>
		<login-modal/>
		<video-modal/>
		<manage-modal/>
		<Navbar/>
		<router-view></router-view>
		<Statusbar/>
	</div>
</template>

<script>
import Navbar from './navbar.vue';
import Statusbar from './statusbar.vue';
import LoginModal from './login-modal.vue';
import VideoModal from './video-modal.vue';
import ManageModal from './manage-modal.vue';

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
.list-group {
	width: 20%;
}
.list-group-item {
	color: skyblue;
}
</style>

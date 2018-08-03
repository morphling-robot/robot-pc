<template>
	<div>
		<Navbar/>
		<router-view></router-view>
		<Statusbar/>
	</div>
</template>

<script>
import Navbar from './navbar.vue';
import Statusbar from './statusbar.vue';

export default {
  name: 'app',
  data () {
    return {
    }
	},
	components: {
		Navbar,
		Statusbar
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

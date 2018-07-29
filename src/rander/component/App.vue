<template>
	<div>
		<navbar></navbar>
		<router-view></router-view>
	</div>
</template>

<script>
import Navbar from './navbar.vue';

export default {
  name: 'app',
  data () {
    return {
    }
	},
	components: {
		Navbar
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

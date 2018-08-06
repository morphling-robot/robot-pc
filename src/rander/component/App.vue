<script src="@/lib/blockly/blockly_compressed.js"></script>
<script src="@/lib/blockly/blocks_compressed.js"></script>
<script src="@/src/lib/blockly/python_compressed.js"></script>
<script src="@/src/lib/blockly/msg/js/zh-hans.js"></script>
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

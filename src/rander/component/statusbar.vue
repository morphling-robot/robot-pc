<template>
	<div class="statusbar">
		<b-navbar toggleable="md" type="dark" variant="success">
			<b-nav-text right>
					电量：{{this.battery}}%
			</b-nav-text>
			<b-navbar-nav id='statusBar'>
				
				<b-nav-item>
					信号强度：
				</b-nav-item>
				<b-nav-item>
					舵机状态：
				</b-nav-item>
				<b-nav-item>
					报警：
				</b-nav-item>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="less" scoped>
.navbar {
	height: 24px;
	background-color: rgb(0, 122, 204)
}
</style>


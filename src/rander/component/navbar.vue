<template>
	<b-navbar toggleable="md" type="dark" variant="info">

		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		<b-navbar-brand>
			<router-link to="/">Robot</router-link>
		</b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">

			<b-navbar-nav>
				<b-nav-item>
					<router-link to="/editor">editor</router-link>
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav id='statusBar'>
				<b-nav-item>
					电量：{{this.battery}}%
				</b-nav-item>
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
			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">

		 	 <b-nav-item-dropdown right>
					<!-- Using button-content slot -->
			 	 <template slot="button-content">
			 		 <em>User</em>
					</template>
					<b-dropdown-item href="#">Profile</b-dropdown-item>
					<b-dropdown-item href="#">Signout</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>

		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'navbar',
	data() {
		return {
			battery: 70
		}
	}
}
</script>

<style lang="less">
#statusBar {
	left: 200px;
}
</style>


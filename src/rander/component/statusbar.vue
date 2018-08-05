<template>
	<div>
		<b-navbar id="statusbar" toggleable="md" type="dark" variant="primary">

    	<b-navbar-nav class="ml-auto status">
				<b-nav-text>
					剩余电量：{{this.robotStatus.battery}}%
				</b-nav-text>
				<b-nav-text>
					信号强度：{{this.robotStatus.signalStrenght}}%
				</b-nav-text>
				<b-nav-text>
					舵机状态：{{this.robotStatus.servo}}
				</b-nav-text>
				<b-nav-text>
					警告：{{this.robotStatus.alert}}
				</b-nav-text>
    	</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
	computed: {
		robotStatus() {
			return this.$store.state.robot.status;
		},
		statusUpdateCycle() {
			return this.$store.state.robot.updateCycle;
		}
	},
	methods: {
		updateRobotStatus() {
			this.$store.commit('updateRobotStatus', {
				battery: Math.floor(Math.random() * (100 - 70) + 70),
				signalStrenght: Math.floor(Math.random() * (100 - 80) + 80),
				servo: '良好',
				alert: '无'
			});
		}
	},
	mounted() {
		const throttle = setInterval(this.updateRobotStatus, this.statusUpdateCycle);
	}
}
</script>

<style lang="less">
#statusbar {
	height: 24px;
	.navbar-text {
		margin-left: 10px;
		margin-right: 10px;
		color: white;
	}
}
</style>


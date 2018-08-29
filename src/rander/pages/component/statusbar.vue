<template>
	<b-container id="app-status-bar" fluid>
		<b-row>
			<b-col></b-col>
			<b-col cols="auto">123</b-col>
		</b-row>
	</b-container>
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
		// const throttle = setInterval(this.updateRobotStatus, this.statusUpdateCycle);
	}
}
</script>

<style lang="less">


#app-status-bar {
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: blue;
	height: 24px;
}
</style>


<template>
	<b-container id="app-status-bar" fluid>
		<b-row>
			<b-col>
				未登录
			</b-col>
			<b-col />
			<b-col cols="auto">
				<span v-for="(item, key) in robotStatus" :key="item">{{key}}:{{item}}</span>
			</b-col>
			</b-col>
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
    test() {
      alert(1);
    },
    updateRobotStatus() {
      this.$api
        .getStates()
        .then(payload => {
          this.$store.commit("updateRobotStatus", payload);
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("updateRobotStatus", {
            ip: null,
            posture: null,
            power: null,
            robotId: null,
            ssid: null,
            robotState: null
          });
        });
    }
  },
  mounted() {
    const throttle = setInterval(
      this.updateRobotStatus,
      this.statusUpdateCycle
    );
  }
};
</script>

<style lang="less">
#app-status-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 122, 204);
  height: 24px;
}
</style>


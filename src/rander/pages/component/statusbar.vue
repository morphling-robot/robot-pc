<template>
	<b-container id="app-status-bar" fluid>
		<b-row>
			<b-col>
				<span v-b-modal.loginModal style="cursor: pointer">{{msg}}</span>
			</b-col>
			<b-col />
			<b-col cols="auto">
				<span v-for="(item, key) in robotStatus"
          class="mx-3"
          :key="item">{{key}}:{{item}}</span>
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
    },
    msg() {
      return this.$store.state.user.token ? this.$t('user.state.login') : this.$t('user.state.unlogin')
    }
  }
};
</script>

<style lang="less">
#app-status-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #000;
  background-color: #EEE;
  height: 24px;
  font-size: 12px;
  font-weight: 100;
  line-height: 24px;
  border-top: 1px solid rgba(0, 0, 0, .125)
}
</style>


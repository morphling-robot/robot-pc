<template>
	<b-container id="app-status-bar" fluid>
		<b-row>
			<b-col>
				<span v-b-modal.loginModal>{{msg}}</span>
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
      return this.$store.state.user.token ? '已登录' : '未登录'
    }
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
  font-size: 12px;
  font-weight: 100;
  line-height: 24px;
}
</style>


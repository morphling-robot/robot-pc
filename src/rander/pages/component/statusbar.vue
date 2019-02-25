<template>
	<b-container id="app-status-bar" fluid>
		<b-row>
			<b-col style="padding-left:20px">
				<span v-b-modal.loginModal style="cursor: pointer">
          {{msg}}
        </span>
        <b-button
          size="sm" @click="changeShowState(true)"><i class="fas fa-angle-double-up" /></b-button>
        <b-button
          size="sm" @click="changeShowState(false)"><i class="fas fa-angle-double-down" /></b-button>
        <b-button
          size="sm" @click="clearContent()"><i class="fas fa-trash" /></b-button>
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
  },
  methods: {
    changeShowState(isShow) {
      this.$store.commit('changeResultShow', isShow);
    },
    clearContent() {
      this.$store.commit('updateResultContent', {isClear: true});
    }
  }
};
</script>

<style lang="less">
#app-status-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #333333;
  background-color: #F7F9FA;
  height: 24px;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  border-top: 1px solid #DFDFDF
}
</style>


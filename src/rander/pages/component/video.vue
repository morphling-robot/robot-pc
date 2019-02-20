<template>
  <div style="position: relative">
    <img :src="streamURL" v-if="ip" />
    <div v-if="!ip" class="h-100 w-100" style="background-color: #000;">
      <p v-if="isFail" class="w-100">{{$t('robot.video.fail')}}</p>
      <p v-if="!isFail" class="w-100">{{$t('robot.video.waiting')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isFail'],
  data() {
    return {
      player: null,
      container: null
    }
  },
  computed: {
    isSmall() {
      return this.$store.state.video.dialogState === 'close';
    },
    isClose() {
      return this.$store.state.video.videoState === 'close';
    },
    streamURL() {
      return `http://${this.ip}`;
    },
    ip() {
      return this.$store.state.video.videoIp;
    }
  }
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
p {
  text-align: center;
  position: absolute; 
  top: 50%; 
  left: 0; 
  transform: translateY(-50%);
  color: #fff;
  font-size: 16px;
}
</style>


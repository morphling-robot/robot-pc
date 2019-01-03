<template>
	<video id="video" class="video-js vjs-default-skin" :style="styleObj">
    <source v-if="streamURL" :src="streamURL" type='rtmp/*'>
  </video>
</template>

<script>
export default {
  props: ['id', 'file'],
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
    styleObj() {
      const {small, large} = this.$store.state.video;
      
      return this.isSmall ? (this.isClose ?  'display: none' : `position: relative;z-index:0;width: ${(this.$store.state.robot.isShow ? 0 : 340)}px;height: ${small.height}px;top: ${small.top}px;left: ${small.left}px`) 
        : `position: relative;z-index:10000;width: 640px;height: ${large.height}px;margin:90px auto`;

    },
    streamURL() {
      // return `http://${this.$store.state.video.videoIp}:8080`;
      return this.$store.state.video.videoIp;
    }
  },
  watch: {
    styleObj(newStylle) {
      if (this.container) {
        setTimeout(() => {
          this.container.style = newStylle;
        }, 100);
      }
    }
  },
  mounted() {
    this.player = videojs(
      video,
      {
        controls: true,
        fluid: false
      },
      function() {
      });
    this.container = document.getElementById('video');

  }
};
</script>

<style lang="less">
#video {
  .vjs-big-play-button {
    z-index: 10000 !important;
  }
  video {
    margin: 0px !important;
    left: 0px !important;
  }
}
</style>

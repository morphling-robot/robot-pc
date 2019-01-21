<template>
	<video id="video" class="video-js vjs-default-skin vjs-big-play-centered" :style="styleObj">
    <source v-if="streamURL" :src="streamURL">
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
      
      return this.isSmall ? (this.isClose ?  'display: none' : `position: relative;z-index:0;width: ${(this.$store.state.robot.isShow ? 0 : 390)}px;height: ${small.height}px;top: ${small.top}px;left: ${small.left}px`) 
        : `position: relative;z-index:10000;width: 640px;height: ${large.height}px;margin:-${large.height - 95}px auto 0;top:55%`;

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
    },
    isClose(newValue) {
      if (newValue) {
        this.player.pause();
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
      () => {
        this.player.on('play',() =>{
    　　　　this.$store.commit('updateVideoState', 'open');
    　　});
      });
    this.container = document.getElementById('video');
  }
};
</script>

<style lang="less">
#video {
  .vjs-big-play-button{
    z-index: 10000 !important;
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
  }
  video {
    margin: 0px !important;
    left: 0px !important;
    top: 0px !important;
  }

  transition: transform .3s ease-out,-webkit-transform .3s ease-out;
}
</style>

<template>
		<video :id="id" class="video-js vjs-default-skin">
      <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
    </video>
</template>

<script>
// import videojs from 'videojs-record/dist/videojs.record.min.js';


export default {
  props: ['id'],
  mounted() {
    var player = videojs(
      this.id,
      {
        controls: true,
        width: 640,
        height: 360,
        fluid: false,
        plugins: {
          record: {
            audio: true,
            video: true,
            maxLength: 10,
            debug: true,
            videoMimeType: 'video/webm'
            
          }
        }
      },
      function() {
        // print version information at startup
        var msg =
          "Using video.js " +
          videojs.VERSION +
          " with videojs-record " +
          videojs.getPluginVersion("record") +
          " and recordrtc " +
          RecordRTC.version;
        videojs.log(msg);
      }
    );

  player.on('play', function() { 
      player.src( [
// { type: "rtmp/mp4", src: "rtmp://mypath/mp4" },
// { type: "rtmp/mp4", src: "rtmpt://mypath/mp4" },
{ type: "video/mp4", src: "http://vjs.zencdn.net/v/oceans.mp4" }
]);
  });

    player.on("deviceError", function() {
      console.log("device error:", player.deviceErrorCode);
    });
    player.on("error", function(error) {
      console.log("error:", error);
    });
    // user clicked the record button and started recording
    player.on("startRecord", function() {
      console.log("started recording!");
    });
    // user completed recording and stream is available
    player.on("finishRecord", function() {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", player.recordedData);
    });
  }
};
</script>
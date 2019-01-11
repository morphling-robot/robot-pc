<template>
	<b-modal
		id="videoModal"
		ref="videoModalRef"
		size="lg"
		:title="$t('robot.video.label')"
		hide-footer
		@shown="updateDialogState('open')"
		@hide="updateDialogState('close')"
		no-close-on-backdrop>
		<!-- <div id="toolbar">
			<b-button size="sm" variant="success" @click="startRecord">{{$t('robot.video.start')}}</b-button>
			<b-button size="sm" variant="danger" @click="stopRecord">{{$t('robot.video.end')}}</b-button>
			<b-button size="sm" variant="success" @click="watchRecord">{{$t('robot.video.watch')}}</b-button>
			<b-button size="sm" variant="success" @click="watchVideo">{{$t('robot.video.return')}}</b-button>
			<b-button size="sm" variant="success" @click="saveRecord">{{$t('robot.video.save')}}</b-button>
		</div> -->
	</b-modal>
</template>

<script>
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			mediaElement: null,
			canvasElement: null,
			canvasContext: null,
			position: {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			},
			recorder: null,
			blob: null
		}
	},
	computed: {
		dialogState() {
			setTimeout(() => {

				return this.$store.state.video.dialogState === 'open';
			}, 1000);
		}
	},
	watch: {
		dialogState() {
			this.setConfig();
		}
	},
	methods: {
		updateDialogState(state) {
			this.$store.commit('updateDialogState', state);
		},
		startRecord() {
			this.captureScreen(screen => {
				this.mediaElement.ontimeupdate = (ev) => {
					this.cropFrame(ev, screen, this.mediaElement);
					
					this.mediaElement.style.display = 'none';

					this.mediaElement.srcObject = screen;
					this.mediaElement.screen = screen;

					this.addStreamStopListener(screen);

					const captureStream = this.canvasElement.captureStream();

					this.recorder = RecordRTC(captureStream, {
						type: 'video'
					});

					this.recorder.startRecording();
				};
				
			});
		},
		stopRecord() {
			this.recorder.stopRecording(() => {
				console.log(1);

				this.blob = this.recorder.getBlob();
				
				this.mediaElement.style.display = 'block';
				this.canvasElement.style.display = 'none';

				if (this.mediaElement.screen && this.mediaElement.screen.getVideoTracks) {
					this.mediaElement.screen.stop();
					this.mediaElement.screen = null;
				}
			});
		},
		watchRecord() {
			this.mediaElement.srcObject = null;
			this.mediaElement.src = URL.createObjectURL(this.blob);
		},
		watchVideo() {
			this.mediaElement.srcObject = null;
			this.mediaElement.src = this.$store.state.video.videoIp; //协议和端口
		},
		saveRecord() {
			const electron = this.$electron;
			const { dialog } = electron.remote;
			const fs = electron.remote.require("fs");
			const filters = ['mp4', 'wav'];

			const fileReader = new FileReader();

  			fileReader.readAsDataURL(this.blob);
			fileReader.onload = function(e) {
				const content = e.target.result;
				const dataBuffer = new Buffer(content.replace(/^data:audio\/\w+;base64,/,""), 'base64');

				dialog.showSaveDialog({ properties: ["openFile"], filters, title: 'Save' }, filename => {
					fs.writeFileSync(filename, dataBuffer);
				});
			};

		},
		captureScreen(callback) {
			getScreenId(function(error, sourceId, screen_constraints) {
				navigator.mediaDevices.getUserMedia(screen_constraints).then(callback).catch(function(error) {
					console.error('getScreenId error', error);
					alert('Failed to capture your screen. Please check Chrome console logs for further information.');
				});
			});
		},
		cropFrame(ev, stream, video) {
			const {left, top, width, height} = this.position;

			this.canvasContext.width = width;
			this.canvasContext.height = height;

			this.canvasContext.drawImage(video, left, top, width, height, 0, 0, width, height);
		},
		setConfig() {
			this.position = {
				left: this.mediaElement.offsetLeft,
				top: this.mediaElement.offsetTop,
				width: this.mediaElement.offsetWidth,
				height: this.mediaElement.offsetHeight
			};
		},
		addStreamStopListener(stream, callback) {
			    stream.addEventListener('ended', function() {
					// callback();
					callback = function() {};
				}, false);

				stream.addEventListener('inactive', function() {
					// callback();
					callback = function() {};
				}, false);

				stream.getTracks().forEach(function(track) {
					track.addEventListener('ended', function() {
						// callback();
						callback = function() {};
					}, false);

					track.addEventListener('inactive', function() {
						// callback();
						callback = function() {};
					}, false);
				});
		}
	},
	mounted() {
		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-video-dialog');

		// ipcRenderer.on('app-toggle-video-dialog', () => {
		// 	this.$refs.videoModalRef.show();
		// });

		this.mediaElement = document.getElementsByTagName('video')[0];
		this.canvasElement = document.querySelector('canvas');
		this.canvasContext = this.canvasElement.getContext('2d');

		this.setConfig();
	},
}
</script>

<style lang="less">
#videoModal .modal-body {
	height: 557px;

	#toolbar {
		margin: 419px auto;
		text-align: center;
		width: 100%;
	}
}
</style>

<template>
	<b-modal
		id="videoModal"
		ref="videoModalRef"
		size="md"
		hide-footer
		centered
		@shown="updateDialogState('open')"
		@hide="updateDialogState('close')"
		no-close-on-backdrop>
		<div slot="modal-header" class="w-100">
			<div style="display: inline-block">
				<h5 class="modal-title">{{$t('robot.video.label')}}</h5>
			</div>
			<div style="display: inline-block; float: right">
				<button type="button" aria-label="Close" class="close" @click.stop="closeVideo()">×</button>
			</div>
			<div style="display: inline-block; float: right">
				<button type="button" style="font-size:1em" aria-label="Close" class="close" @click.stop="$refs.videoModalRef.hide()">
					<i class="far fa-window-minimize"></i>
				</button>
			</div>
		</div>
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

			if (state === 'open') {
				this.$api.connectCamera().then((ip) => {
					this.$store.commit('updateVideoIp', ip);
				});
			}
		},
		closeVideo() {
			this.$refs.videoModalRef.hide();
			this.$store.commit('updateVideoState', 'close');

			this.$api.closeCamera();
		}
	},
	mounted() {
		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-video-dialog');

		// ipcRenderer.on('app-toggle-video-dialog', () => {
		// 	this.$refs.videoModalRef.show();
		// });
	},
}
</script>

<style lang="less">
#videoModal .modal-dialog {
	max-width: 642px;
}

#videoModal {
	.modal-open .modal {
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.modal-header {
		border: none;
	}

	.modal-title {
		color: #666666;
	}

	// .modal.fade .modal-dialog {
	// 	transition-delay: 0s;
	// }
}

#videoModal .modal-body {
	height: 389px;

	#toolbar {
		margin: 419px auto;
		text-align: center;
		width: 100%;
	}
}
</style>

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
		<camera style="height: 350px" :isFail="isFail"></camera>
	</b-modal>
</template>

<script>
import { setTimeout } from 'timers';
import Camera from '../component/video';

export default {
	data() {
		return {
			isFail: false
		}
	},
	components: {Camera},
	methods: {
		updateDialogState(state) {
			this.$store.commit('updateDialogState', state);
			this.isFail = false;

			if (state === 'open') {
				this.$api.connectCamera().then((camera) => {
					this.$store.commit('updateVideoIp', camera.camera_ip);
				}).catch(() => {
					this.isFail = true;
				});
			}
		},
		closeVideo() {
			this.$api.closeCamera().then(() => {
				this.$store.commit('updateVideoIp', null);
				this.$refs.videoModalRef.hide();
			});
		}
	},
	mounted() {
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
	padding-top: 0px;
	#toolbar {
		margin: 419px auto;
		text-align: center;
		width: 100%;
	}
}

#videoModal.modal.fade .modal-dialog {
	transition: none;
}
</style>

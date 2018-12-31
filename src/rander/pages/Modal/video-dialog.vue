<template>
	<b-modal
		id="videoModal"
		ref="videoModalRef"
		size="lg"
		:title="$t('robot.video.label')"
		hide-footer
		@show="updateDialogState('open')"
		@hidden="updateDialogState('close')"
		no-close-on-backdrop>
		<test-video
			id="video1"
			class="mx-auto"/>
	</b-modal>
</template>

<script>
import TestVideo from '../component/video';
import { setTimeout } from 'timers';

export default {
	components: {
		TestVideo
	},
	computed: {
		dialogState() {
			setTimeout(() => {

				return this.$store.state.video.dialogState === 'open';
			}, 1000);
		}
	},
	methods: {
		updateDialogState(state) {
			this.$store.commit('updateDialogState', state);
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

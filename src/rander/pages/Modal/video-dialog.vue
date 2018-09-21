<template>
	<b-modal
		id="videoModal"
		ref="videoModalRef"
		size="lg"
		:title="$t('robot.video.label')"
		no-close-on-backdrop>
		<test-video
			class="mx-auto"/>
	</b-modal>
</template>

<script>
import TestVideo from '../component/test';

export default {
	components: {
		TestVideo
	},	
	mounted() {
		const { ipcRenderer } = this.$electron;

		ipcRenderer.removeAllListeners('app-toggle-video-dialog');

		ipcRenderer.on('app-toggle-video-dialog', () => {
			this.$refs.videoModalRef.show();
		});
	},
}
</script>

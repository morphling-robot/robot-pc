<template>
	<b-modal
		id="videoModal"
		ref="videoModalRef"
		size="lg"
		title="录像"
		no-close-on-backdrop>
		<test-video/>
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

		ipcRenderer.on('app-toggle-video-dialog', () => {
			this.$refs.videoModalRef.show();
		});
	},
}
</script>

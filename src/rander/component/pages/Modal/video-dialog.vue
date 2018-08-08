<template>
	<b-modal
		id="videoModal"
		size="lg"
		title="录像"
		no-close-on-backdrop>
		<test-video/>
	</b-modal>
</template>

<script>
import TestVideo from '../utils/test';

export default {
	components: {
		TestVideo
	}
}
</script>

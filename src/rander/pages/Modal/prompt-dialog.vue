<template>
	
<b-modal id="prompt-modal"
	:title="message"
	size="sm"
	cancel-variant="link"
	@ok="invokeCallback"
	@shown="init"
	@hidden="clearPromptArgs">
	<b-input v-model="value" />
</b-modal>

</template>

<script>
export default {
	data() {
		return {
			message: '',
			value: ''
		}
	},
	methods: {
		init() {
			this.message = window.promptArgs.message;
			this.value = window.promptArgs.defaultValue;
		},
		invokeCallback() {
			window.promptArgs.callback(this.value);
		},
		clearPromptArgs() {
			delete window.promptArgs;
		}
	}
}
</script>

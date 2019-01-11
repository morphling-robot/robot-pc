<template>
	
<b-modal id="prompt-modal"
	:title="message"
	size="sm"
	cancel-variant="link"
	@shown="init"
	ref="promptModal"
	hide-footer
	centered
	@hidden="clearPromptArgs">
	<b-input v-model="value" class="my-5" />
	<b-row class="pt-3">
		<b-col>
			<p v-if="isShow" class="mb-0 text-danger">
				{{prompt}}
			</p>
		</b-col>
		<b-col cols="auto">
			<b-button
				variant="primary"
				@click="invokeCallback" :disabled="isShow"
				size="sm">{{$t('robot.code.upload')}}</b-button>
		</b-col>
	</b-row>
</b-modal>

</template>

<script>
export default {
	data() {
		return {
			message: '',
			value: '',
			prompt: ''
		}
	},
	computed: {
		codeList() {
			return this.$store.state.editor.codeList.map(code => {
				return code.codeName;
			});
		},
		isShow() {
			if (this.codeList.indexOf(this.value) !== -1) {
				this.prompt = this.$t('robot.code.prompt');
			}

			if (this.value.split(' ').length > 1) {
				this.prompt = this.$t('robot.code.error');
			}

			return this.codeList.indexOf(this.value) !== -1 || this.value.split(' ').length > 1;
		}
	},
	methods: {
		init() {
			this.message = window.promptArgs.message;
			this.value = window.promptArgs.defaultValue;
		},
		invokeCallback() {
			if (this.value === '' || this.isShow) {
				return;
			}

			window.promptArgs.callback(this.value);
			this.value = '';

			this.$refs.promptModal.hide();
		},
		clearPromptArgs() {
			delete window.promptArgs;
		}
	}
}
</script>

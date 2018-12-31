<template>
	
<b-modal id="prompt-modal"
	:title="message"
	size="sm"
	cancel-variant="link"
	@shown="init"
	hide-footer
	@hidden="clearPromptArgs">
	<b-input v-model="value" />
	<b-row class="pt-3">
		<b-col>
			<p v-if="isShow" class="mb-0 text-danger">
				{{$t('robot.code.prompt')}}
			</p>
		</b-col>
		<b-col cols="auto">
			<b-button
				variant="success"
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
			value: ''
		}
	},
	computed: {
		codeList() {
			return this.$store.state.editor.codeList.map(code => {
				return code.codeName;
			});
		},
		isShow() {
			return this.codeList.indexOf(this.value) !== -1;
		}
	},
	methods: {
		init() {
			this.message = window.promptArgs.message;
			this.value = window.promptArgs.defaultValue;
		},
		invokeCallback() {
			if (this.value === '') {
				return;
			}

			window.promptArgs.callback(this.value);
			this.value = '';
		},
		clearPromptArgs() {
			delete window.promptArgs;
		}
	}
}
</script>

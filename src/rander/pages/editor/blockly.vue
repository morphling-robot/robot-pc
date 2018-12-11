<template>
	<b-container id="playground" fluid>
		<b-row>
			<b-col :cols="showCode ? 6 : 12">
				<b-button
					style="position: absolute;z-index: 999;right: 5px;"
					@click="showCode=!showCode" ><i
						class="far"
						:class="{
							'fa-eye': showCode,
							'fa-eye-slash': !showCode
						}" /></b-button>
				<blockly
					id="blockly-editor"
					class="editor"
					:block-str="blockStr"
					:locale="$i18n.locale"
					@update="onBlocklyUpdate($event)">
				</blockly>
			</b-col>
			<b-col cols="6" style="padding-right:2px"
				v-show="showCode">
				<brace
					class="brace-editor"
					:editable="false"
					:fontsize="'20px'" 
					:theme="'github'" 
					:mode="'python'"
					:codefolding="'markbegin'"
					:softwrap="'free'"
					:selectionstyle="'text'"
					:highlightline="true"
					:code="python">
				</brace>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Blockly from '../component/blockly.vue';
import Brace from '../component/brace.vue';

export default {
	name: 'editor',
	data() {
		return {
			showCode: true,
			python: '',
			cooldown: 500,
			flag: true
		}
	},
	components: {
		Blockly,
		Brace
	},
	watch: {
		showCode() {
			this.$nextTick(() => {
				window.dispatchEvent(new CustomEvent('resize'));
			});
		}
	},
	methods: {
		onBlocklyUpdate({ code, blockStr }) {
			this.updateBlocklyModel(blockStr);
			this.updatePythonModel(code);
		},
		updateBlocklyModel(blockStr) {
			if (this.flag) {
				this.$store.commit('blocklyUpdateCode', blockStr);
				this.$store.commit('blocklyUpdateContent', blockStr);
				this.flag = false;
				setTimeout(() => {
					this.flag = true;
				}, this.cooldown) 
			}
		},
		updatePythonModel(code) {
			this.python = code;
			this.$store.commit('pythonUpdateCode', code);
			this.$store.commit('pythonUpdateContent', code);
		}
	},
	computed: {
		blockStr() {
			return this.$store.state.editor.blockly.content;
		},
		pythonContent() {
			return this.$store.state.editor.python.content;
		}
	},
	mounted() {
		window.ed = this;
	}
}
</script>

<style lang="less">
#playground {
	padding: 0;

	&, .row, .row > div {
		height: 100%;
	}

	.row > div {
		padding: 0;
	}
}

#blockly-editor {
	width: 100%;
	height: 100%;
}

.brace-editor {
	height: 100%;
}


</style>
<template>
	<div>
		<div id="blocklyDiv"></div>
		<xml id="toolbox" style="display: none">
  		<block type="controls_if"></block>
  		<block type="controls_repeat_ext"></block>
  		<block type="logic_compare"></block>
  		<block type="math_number"></block>
  		<block type="math_arithmetic"></block>
  		<block type="text"></block>
  		<block type="text_print"></block>
		</xml>
	</div>
</template>

<script>
export default {
	name: 'blockly',
	props: {

	},
	data() {
		return {
			hello: ''
		}
	},
	mounted() {
		const self = this;
		const workspacePlayground = Blockly.inject('blocklyDiv',
			{toolbox: document.getElementById('toolbox')}
		);

		window.aoeu = workspacePlayground;

		function myUpdateFunction(event) {
			const code = Blockly.Python.workspaceToCode(workspacePlayground);
			const xml = Blockly.Xml.workspaceToDom(workspacePlayground);
			self.$emit('update', { code, xml });
		}
		workspacePlayground.addChangeListener(myUpdateFunction);
	},
	methods: {
		
	}
}
</script>

<style lang="less">
#blocklyDiv {
	height: 688px;
	width: 600px;
}
</style>



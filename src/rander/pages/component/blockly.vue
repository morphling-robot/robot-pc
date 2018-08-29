<template>
    <div>
		  <div id="blocklyDiv"></div>
    </div>
</template>

<script>
import Blockly from '@/lib/blockly/browser.js';
import En from '@/lib/blockly/lib/i18n/en';
import Zh from '@/lib/blockly/lib/i18n/zh-hans';
import xmlParser from '@/utils/xmlParser'
import toolboxRaw from './toolbox.xml';
const toolbox = xmlParser(toolboxRaw);window.toolbox = toolbox;
let workspacePlayground;
export default {
	name: 'blockly',
	props: {
    blockStr: {
			type: String
		}
	},
	data() {
		return {
			hello: '1'
		}
	},
	mounted() {
		const self = this;
		workspacePlayground = Blockly.inject('blocklyDiv', {toolbox});

		function myUpdateFunction(event) {
			const code = Blockly.Python.workspaceToCode(workspacePlayground);
			const xml = Blockly.Xml.workspaceToDom(workspacePlayground, true);
			const blockStr = Blockly.Xml.domToPrettyText(xml);
			self.$emit('update', { code, xml, blockStr });
		}
		workspacePlayground.addChangeListener(myUpdateFunction);
	},
	watch: {
		blockStr() {
			const xml = Blockly.Xml.textToDom(this.blockStr);
			console.log(xml);
			Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspacePlayground);
		}
	}
}
</script>

<style lang="less">
#blocklyDiv {
	height: 100%;
	width: 100%;
}
</style>



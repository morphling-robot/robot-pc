<template>
    <div>
		  <div id="blocklyDiv"></div>
    </div>
</template>

<script>
import Blockly from '@/lib/blockly/browser.js';
import xmlParser from '@/utils/xmlParser'
import toolboxRaw from './toolbox.xml';
const toolbox = xmlParser(toolboxRaw);

export default {
	name: 'blockly',
	props: {
    blockStr: {
			type: String
		},
		locale: {
			type: String
		}
	},
	data() {
		return {
			content: Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'),
			editor: null
		}
	},
	methods: {
		render(element, toolbox) {
			if(this.editor) {
				this.editor.removeChangeListener(this.updateCode);
				this.content = Blockly.Xml.workspaceToDom(this.editor);
				this.editor.dispose();
  		}
			this.editor = Blockly.inject(element, {toolbox});

			Blockly.Xml.domToWorkspace(this.content, this.editor);

			this.editor.addChangeListener(this.updateCode);

			return this.editor;
		},
		updateCode() {
			const code = Blockly.Python.workspaceToCode(this.editor);
			const xml = Blockly.Xml.workspaceToDom(this.editor, true);
			const blockStr = Blockly.Xml.domToPrettyText(xml);
			this.$emit('update', { code, xml, blockStr });
		},
		changeLocale(locale) {
			Blockly.setLocale(locale);
			this.render('blocklyDiv', toolbox);
		}
	},
	mounted() {
		this.editor = this.render('blocklyDiv', toolbox);
		this.editor.addChangeListener(this.updateCode);
	},
	watch: {
		blockStr() {
			const xml = Blockly.Xml.textToDom(this.blockStr);
			Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.editor);
		},
		locale() {
			this.changeLocale(this.locale);
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



<template>
  <div id="playground">
    <blockly
      id="blockly-editor"
      class="editor"
      :style="{
        display: mode == 'blockly' ? '' : 'none'
      }"
      @update="onBlocklyUpdate($event)">
    </blockly>
    <brace
      class="brace-editor"
			:editable="mode == 'python'"
      :fontsize="'20px'" 
      :theme="'github'" 
      :mode="'python'"
      :codefolding="'markbegin'"
      :softwrap="'free'"
      :selectionstyle="'text'"
      :highlightline="true"
      :code="python"
      @update="onPythonUpdate($event)">
    </brace>
  </div>
</template>

<script>
import Blockly from './blockly.vue';
import Brace from './brace.vue';

export default {
  name: 'editor',
  computed: {
    mode() {
      return this.$store.state.editor.mode;
    },
    python() {
      return this.$store.state.editor.python.code;
    }
  },
  components: {
    Blockly,
    Brace
  },
  methods: {
    switchMode() {
      const mode = this.mode == 'blockly' ? 'python' : 'blockly'

      this.$store.commit('modeUpdate', mode);
    },
    onBlocklyUpdate({ code, xml }) {
      this.updateBlocklyModel(xml);
      this.updatePythonModel(code);
    },
    onPythonUpdate(code) {
      this.updatePythonModel(code);
    },
    updateBlocklyModel(xml) {
      this.$store.commit('blocklyUpdate', xml);
    },
    updatePythonModel(code) {
      this.$store.commit('pythonUpdate', code);
    }
  }
}
</script>

<style lang="less">
.editor {
  float: left;
}

.brace-editor {
  height: 688px;
}
</style>

<template>
  <div id="playground">
    <blockly
      id="blockly-editor"
      class="editor"
      @update="onBlocklyUpdate($event)">
    </blockly>
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
  </div>
</template>

<script>
import Blockly from './blockly.vue';
import Brace from './brace.vue';

export default {
  name: 'editor',
  data() {
    return {
      python: ''
    }
  },
  components: {
    Blockly,
    Brace
  },
  methods: {
    onBlocklyUpdate({ code, xml }) {
      this.updateBlocklyModel(xml);
      this.updatePythonModel(code);
    },
    updateBlocklyModel(xml) {
      this.$store.commit('blocklyUpdate', xml);
    },
    updatePythonModel(code) {console.log(code);
      this.python = code;
    },
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
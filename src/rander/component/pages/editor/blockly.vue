<template>
  <b-container id="playground" fluid>
    <b-row>
      <b-col cols="6">
        <blockly
          id="blockly-editor"
          class="editor"
          @update="onBlocklyUpdate($event)">
        </blockly>
      </b-col>
      <b-col cols="6">
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
import Blockly from '../utils/blockly.vue';
import Brace from '../utils/brace.vue';

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
#playground {
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
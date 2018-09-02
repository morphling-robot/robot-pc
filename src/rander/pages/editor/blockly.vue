<template>
  <b-container id="playground" fluid>
    <b-row>
      <b-col cols="6">
        <blockly
          id="blockly-editor"
          class="editor"
          :block-str="blockStr"
          :locale="$i18n.locale"
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
import Blockly from '../component/blockly.vue';
import Brace from '../component/brace.vue';

export default {
  name: 'editor',
  data() {
    return {
      python: '',
      cooldown: 500,
      flag: true
    }
  },
  components: {
    Blockly,
    Brace
  },
  methods: {
    onBlocklyUpdate({ code, blockStr }) {
      this.updateBlocklyModel(blockStr);
      this.updatePythonModel(code);
    },
    updateBlocklyModel(blockStr) {
      if (this.flag) {
        this.$store.commit('blocklyUpdateCode', blockStr);
        this.flag = false;
        setTimeout(() => {
          this.flag = true;
        }, this.cooldown) 
      }
    },
    updatePythonModel(code) {
      this.python = code;
    },
  },
  computed: {
    blockStr() {
      return this.$store.state.editor.blockly.content;
    }
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
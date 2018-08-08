<template>
  <div id="playground">
    <brace
      class="brace-editor"
			:editable="true"
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
import Brace from '../utils/brace.vue';

export default {
  name: 'editor',
  components: {
    Brace
  },
  methods: {
    onPythonUpdate(code) {
      this.updatePythonModel(code);
    },
    updatePythonModel(code) {console.log(code);
      // this.$store.commit('pythonUpdate', code);
    }
  },
  mounted() {
    this.python = this.$store.state.editor.python.code;
    console.log(this.python);
  }
}
</script>

<style lang="less">
</style>
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
      :code="content"
      @update="onPythonUpdate($event)">
    </brace>
  </div>
</template>

<script>
import Brace from '../component/brace.vue';

export default {
  name: 'editor',
  components: {
    Brace
  },
  data() {
    return {
      content: this.$store.state.editor.python.code
    }
  },
  methods: {
    onPythonUpdate(code) {
      this.updatePythonModel(code);
    },
    updatePythonModel(code) {
      this.$store.commit('pythonUpdateCode', code);
    }
  }
}
</script>

<style lang="less">
</style>
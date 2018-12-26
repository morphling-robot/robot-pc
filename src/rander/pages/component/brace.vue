<template>
  <div id='brace-editor'></div>
</template>

<script>
import * as brace from 'brace'
import 'brace/ext/modelist'
import 'brace/ext/themelist'
const modelist = brace.acequire('ace/ext/modelist')
const themelist = brace.acequire('ace/ext/themelist')
var editor
const regMap = {
  isInt: new RegExp('^\\d+$')
}
export default {
  name: 'brace',
  model: {
    prop: 'code',
    event: 'update'
  },
  props: {
    code: {
      type: String,
      default: '123'
    },
    editable: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'json',
      validator: (val) => modelist.modes.findIndex((mode) => mode.name === val) > -1
    },
    theme: {
      type: String,
      default: 'github',
      validator: (val) => themelist.themes.findIndex((theme) => theme.name === val) > -1
    },
    // todo editor split
    fontsize: {
      type: String,
      default: '24px',
      validator: (val) => parseInt(val) > 11 && parseInt(val) < 25
    },
    codefolding: {
      type: String,
      default: 'markbegin',
      validator: (val) => ['manual', 'markbegin', 'markbeginend'].includes(val)
    },
    // todo key binding
    softwrap: {
      type: String,
      default: 'free',
      validator: (val) => (['off', 'free'].includes(val) || regMap.isInt.test(val))
    },
    selectionstyle: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'line'].includes(val)
    },
    highlightline: {
      type: Boolean,
      default: true
    }
    // todo a lot of other things...
  },
  methods: {
    setMode () {
      let modeObj = modelist.modesByName[this.mode]
      if (modeObj) {
        require('brace/mode/' + modeObj.name)
        editor.getSession().setMode(modeObj.mode)
      }
    },
    setTheme () {
      let themeObj = themelist.themesByName[this.theme];
      editor.getSession().setTabSize(2);
      if (themeObj) {
        require('brace/theme/' + themeObj.name)
        editor.setTheme(themeObj.theme)
      }
    },
    emitCode () {
      const content = editor.getValue();
      this.$emit('update', content);
    },
    updateCode() {
      editor.setValue(this.code, this.editable ? 1 : 0);
    }
  },
  mounted () {
    editor = brace.edit('brace-editor');
    this.setMode();
    this.setTheme();
    editor.$blockScrolling = Infinity;
    editor.setFontSize(this.fontsize);
    editor.getSession().on('change', this.emitCode);
    editor.setReadOnly(!this.editable);

    this.updateCode(this.code);
  },
  watch: {
    code() {
      this.updateCode();
    },
    mode () {
      this.setMode()
    },
    theme () {
      this.setTheme()
    },
    fontsize (newVal) {
      editor.setFontSize(newVal)
    },
    codefolding (newVal) {
      editor.session.setFoldStyle(newVal)
      editor.setShowFoldWidgets(newVal !== 'manual')
    },
    softwrap (newVal) {
      editor.setOption('wrap', newVal)
    },
    selectionstyle (newVal) {
      editor.setOption('selectionStyle', newVal)
    },
    highlightline (newVal) {
      editor.setHighlightActiveLine(newVal)
    }
  }
}
</script>

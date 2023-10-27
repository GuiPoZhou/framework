<template>
  <div class="monaco-container" ref="codeEditor"></div>
</template>
<script>
import * as monaco from "monaco-editor"

const defaultOptions = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  wordWrap: 'on', // 自动换行 'on','off'
  language: 'javascript', // 常用的有css/html/java/javascript/json/csharp(.net)'
  overviewRulerBorder: false,
  minimap: { // 关闭小地图
    enabled: true,
  },
  autoIndent: true, // 自动布局
  automaticLayout: false, // 自动布局
  theme: 'vs', // vs, hc-black, or vs-dark
  formatOnPaste: true,
  formatOnType: true,
  glyphMargin: true, //字形边缘
  fontSize: 14, // 字体大小
  readOnly: false // 只读
}

function spliceSemiAndDoubleQoute(val) {
  // eslint-disable-next-line no-undef
  return prettier.format(val, {
    parser: 'babel',
    semi: true,
    //字符串用单引号包,裹，开发规范统一
    singleQuote: true,
    useTabs: true,
    //函数后不带空格
    spaceBeforeFunctionParen: false,
    // eslint-disable-next-line no-undef
    plugins: prettierPlugins,
  })
}
const formatProvider = {
  provideDocumentFormattingEdits(model) {
    return [{
      text: spliceSemiAndDoubleQoute(model.getValue()),
      range: model.getFullModelRange()
    }]
  }
}

export default {
  name: 'MonacoEditor',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: this.value,
      monacoEditor: null
    }
  },
  watch: {
    value(val) {
      this.content = val
    },
    options: {
      handler(val) {
        this.monacoEditor.updateOptions({ ...val })
      },
      deep: true
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    spliceSemiAndDoubleQoute(val) {
      // eslint-disable-next-line no-undef
      return prettier.format(val, {
        parser: 'babel',
        //不保留行尾分号去掉，开发规范统一
        semi: true,
        //字符串用单引号包,裹，开发规范统一
        singleQuote: true,

        //函数后不带空格
        spaceBeforeFunctionParen: false,
        // eslint-disable-next-line no-undef
        plugins: prettierPlugins,
      })
    },
    async formatCode() {


    },
    initEditor() {
      // 初始化编辑器实例
      monaco.languages.registerDocumentFormattingEditProvider('javascript', formatProvider)

      this.monacoEditor = monaco.editor.create(this.$refs['codeEditor'], {
        value: this.content,
        autoIndex: true,
        ...defaultOptions,
        ...this.options
      })
      this.monacoEditor.getAction(['editor.action.formatDocument'])._run()
      // 监听编辑器content变化
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit('input', this.monacoEditor.getValue())
      })
    },
    changeEditor(data) {
      this.monacoEditor.setValue(data.value)
      this.monacoEditor.updateOptions({ ...data.options })
      this.monacoEditor.getAction(['editor.action.formatDocument'])._run()
    },
    layout() {
      console.log('重新渲染')
      this.initEditor()
    },
    insert(text) {
      text = text || ''
      var position = this.monacoEditor.getPosition();
      this.monacoEditor.executeEdits('', [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          },
          text: text
        }
      ]);
    },
  }
}

</script>
<style lang="scss" scoped>
.monaco-container {
  height: 900px;
  width: 100%;
  overflow: hidden;
}
</style>
    
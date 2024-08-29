const vDialogSnippets = [{
    label: 'open-v-dialog',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        "_this.kevin_dialog_show('ID',{})"
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Inserts a Vue component skeleton'
}, {
    label: 'close-v-dialog',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        "ctx.\\$emit('back',{name:'方法'})"
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Inserts a Vue component skeleton'
}]
export default vDialogSnippets
const dictSnippets = [{
    label: 'k-dict',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        "ctx.\\$net('/system/dict/data/type/字典类型','get').then(res => {})"
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Inserts a Vue component skeleton'
}]
export default dictSnippets
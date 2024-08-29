const baseTableSnippets = [{
    label: 'k-table-set-data',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        "_this.kevin_table_set_tableData(list,'ID')"
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Inserts a Vue component skeleton'
}, {
    label: 'k-table-get-data',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: [
        "let tableDataList = _this.kevin_table_get_tableData('ID')"
    ].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Inserts a Vue component skeleton'
}]
export default baseTableSnippets
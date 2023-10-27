export default {
    methods: {
        renderELAutoComplete(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let isLangLabel = false
            if (widgetInfo.title, this.getStringWidth(widgetInfo.title) > 12) {
                isLangLabel = true
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    {
                        widgetInfo.vModelType == 'fixed' ?
                            <el-form-item class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={widgetInfo.vModel}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-autocomplete v-model={this.form[widgetInfo.vModel]}
                                    ref="asd"
                                    disabled={widgetInfo.disabled}
                                    trigger-on-focus
                                    fetch-suggestions={(queryString, callback) => {
                                        let ctx = this.context
                                        let _this = this
                                        eval(widgetInfo.events.fetchSuggestions)
                                    }}
                                    onSelect={(data) => this.el_autocomplete_select(data, widgetInfo)}
                                />
                            </el-form-item> :
                            <el-form-item class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}

                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-autocomplete v-model={this.form.extData[widgetInfo.vModel]}
                                    ref="asd"
                                    trigger-on-focus
                                    disabled={widgetInfo.disabled}
                                    fetch-suggestions={(queryString, callback) => {
                                        let ctx = this.context
                                        let _this = this
                                        eval(widgetInfo.events.fetchSuggestions)
                                    }}
                                    onSelect={(data) => this.el_autocomplete_select(data, widgetInfo)}
                                />
                            </el-form-item>
                    }
                </el-col>
            )
        },
        el_autocomplete_fetch(widgetInfo) {
            return (queryString, callback) => {
                queryString == undefined ? (queryString = '') : (queryString = queryString);
                new Function('ctx', '_this', 'widgetInfo', 'queryString', 'callback', widgetInfo.events.fetchSuggestions)(this.context, this, widgetInfo, queryString, callback)
            }
        },
        el_autocomplete_select(data, widgetInfo) {
            new Function('ctx', '_this', 'data', 'widgetInfo', widgetInfo.events.select)(this.context, this, data, widgetInfo)
        }
    }
}
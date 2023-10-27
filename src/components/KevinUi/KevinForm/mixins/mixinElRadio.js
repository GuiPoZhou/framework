export default {
    methods: {
        renderElRadio(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let isLangLabel = false
            if (widgetInfo.title, this.getStringWidth(widgetInfo.title) > 11) {
                isLangLabel = true
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    {
                        widgetInfo.vModelType == 'fixed' ?
                            <el-form-item label={widgetInfo.title} prop={widgetInfo.vModel}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-radio-group disabled={widgetInfo.disabled} v-model={this.form[widgetInfo.vModel]} onInput={(value) => { this.elRadioInputEvents(value, widgetInfo) }}>
                                    {
                                        widgetInfo.options.list.map((radioItemInfo, radioIndex) => {
                                            return (
                                                <el-radio border={widgetInfo.border} label={radioItemInfo.value}>{radioItemInfo.label}</el-radio>
                                            )
                                        })
                                    }
                                </el-radio-group>
                            </el-form-item> : <el-form-item label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-radio-group disabled={widgetInfo.disabled} v-model={this.form.extData[widgetInfo.vModel]} onInput={(value) => { this.elRadioInputEvents(value, widgetInfo) }}>
                                    {
                                        widgetInfo.options.list.map((radioItemInfo, radioIndex) => {
                                            return (
                                                <el-radio border={widgetInfo.border} label={radioItemInfo.value}>{radioItemInfo.label}</el-radio>
                                            )
                                        })
                                    }
                                </el-radio-group>
                            </el-form-item>
                    }
                </el-col>
            )
        },
        elRadioInputEvents(value, widgetInfo) {
            if (widgetInfo.events.input) {
                new Function('ctx', '_this', 'widgetInfo', 'value', widgetInfo.events.input)(this.context, this, widgetInfo, value)
            }
        }
    }
}
export default {
    methods: {
        //  inputnumber
        renderElInputNumber(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let ElInputNumberAttr = {
                placeholder: widgetInfo.placeholder,
                min: widgetInfo.min,
                max: widgetInfo.max,
                step: widgetInfo.step,
                stepStrictly: widgetInfo.stepStrictly,
                precision: widgetInfo.precision,
                disabled: widgetInfo.disabled
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
                            <el-form-item  class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={widgetInfo.vModel}
                                rules={this.configFormItemRules(widgetInfo)}

                            >
                                <el-input-number v-model={this.form[widgetInfo.vModel]} {...{ props: ElInputNumberAttr }}
                                    onChange={(currentValue, oldValue) => { this.elInputNumberChagne(currentValue, oldValue, widgetInfo) }}
                                    onBlur={(event) => { this.elInputNumberBlur(event, widgetInfo) }}
                                    onFocus={(event) => { this.elInputNumberFocus(event, widgetInfo) }}
                                >
                                </el-input-number>
                            </el-form-item> :
                            <el-form-item  class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-input-number v-model={this.form.extData[widgetInfo.vModel]} {...{ props: ElInputNumberAttr }}></el-input-number>
                            </el-form-item>
                    }
                </el-col>
            )
        },
        elInputNumberChagne(currentValue, oldValue, widgetInfo) {
            new Function('ctx', '_this', 'currentValue', 'oldValue', 'widgetInfo', widgetInfo.events.change)(this.context, this, currentValue, oldValue, widgetInfo)
        },
        elInputNumberBlur(event, widgetInfo) {
            new Function('ctx', '_this', 'event', 'widgetInfo', widgetInfo.events.blur)(this.context, this, event, widgetInfo)
        },
        elInputNumberFocus(event, widgetInfo) {
            new Function('ctx', '_this', 'event', 'widgetInfo', widgetInfo.events.focus)(this.context, this, event, widgetInfo)

        }
    }
}
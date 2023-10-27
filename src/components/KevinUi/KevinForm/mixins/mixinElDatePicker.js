export default {
    methods: {
        renderElDatePicker(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let ELDatePickerOptions = {
                placeholder: widgetInfo.placeholder,
                format: widgetInfo.format,
                valueFormat: widgetInfo.valueFormat,
                clearable: widgetInfo.clearable,
                type: widgetInfo.type,
                disabled: widgetInfo.disabled,
                pickerOptions: this.el_date_pickerPicerOptions(widgetInfo)
            }
            let isLangLabel = false
            if (widgetInfo.title, this.getStringWidth(widgetInfo.title) > 11) {
                isLangLabel = true
            }
            if (widgetInfo.type == 'datetimerange' || widgetInfo.type == 'daterange' || widgetInfo.type == 'monthrange') {
                ELDatePickerOptions.defaultTime = eval(widgetInfo.defaultTime)
            } else {
                delete ELDatePickerOptions.defaultTime
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    {
                        widgetInfo.vModelType == 'fixed' ?
                            <el-form-item class={this.context.KevinJson.KevinWidget.formlabelPosition !='top'&&isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={widgetInfo.vModel}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-date-picker
                                    v-model={this.form[widgetInfo.vModel]}

                                    {...{ props: ELDatePickerOptions }}
                                    onChange={(value) => {
                                        this.elDatePickerChange(value, widgetInfo)
                                    }}
                                >
                                </el-date-picker>
                            </el-form-item> : <el-form-item  class={this.context.KevinJson.KevinWidget.formlabelPosition !='top'&&isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-date-picker
                                    v-model={this.form.extData[widgetInfo.vModel]}
                                    {...{ props: ELDatePickerOptions }}
                                    onChange={(value) => {
                                        this.elDatePickerChange(value, widgetInfo)
                                    }}
                                >
                                </el-date-picker>
                            </el-form-item>
                    }
                </el-col>
            )
        },
        // 日期选择框 change事件
        elDatePickerChange(value, widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', 'value', widgetInfo.events.change)(this.context, this, widgetInfo, value)
        },
        el_date_pickerPicerOptions(widgetInfo) {
            if (!widgetInfo.pickerOptions) {
                return {}
            } else {
                return new Function('ctx', '_this', 'widgetInfo', widgetInfo.pickerOptions)(this.context, this, widgetInfo)
            }
        }
    }
}
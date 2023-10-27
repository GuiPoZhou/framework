export default {
    methods: {
        renderElColorPicker(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let ElColorPickerOptions = {
                disabled: widgetInfo.disabled,
                size: widgetInfo.size,
                showAlpha: widgetInfo.showAlpha,
                colorFormat: widgetInfo.colorFormat
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
                                <el-color-picker
                                    v-model={this.form[widgetInfo.vModel]}
                                    {...{ props: ElColorPickerOptions }}
                                    onChange={(value) => {
                                        this.el_color_pickerChage(value, widgetInfo)
                                    }}
                                >
                                </el-color-picker>
                            </el-form-item> :
                            <el-form-item label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <el-color-picker
                                    v-model={this.form.extData[widgetInfo.vModel]}
                                    {...{ props: ElColorPickerOptions }}
                                    onChange={(value) => {
                                        this.el_color_pickerChage(value, widgetInfo)
                                    }}
                                >
                                </el-color-picker>
                            </el-form-item>
                    }
                </el-col>
            )
        },
        el_color_pickerChage(value, widgetInfo) {
            new Function('ctx', '_this', 'value', 'widgetInfo', widgetInfo.events.change)(this.context, this, value, widgetInfo)
        }
    }
}
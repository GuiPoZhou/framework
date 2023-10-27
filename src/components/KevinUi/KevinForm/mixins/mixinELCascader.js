export default {
    methods: {
        renderElCascader(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            let ElCascaderOptions = {
                disabled: widgetInfo.disabled,
                clearable: widgetInfo.clearable,
                showAllLevels: widgetInfo.showAllLevels,
                props: {
                    ...widgetInfo.props
                }
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
                            ><el-cascader
                                    v-model={this.form[widgetInfo.vModel]}
                                    {...{ props: ElCascaderOptions }}
                                    options={widgetInfo.options.list}
                                    onChange={(value) => { this.kevin_el_cascader_change(value, widgetInfo) }}
                                /> </el-form-item> : <el-form-item label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                    rules={this.configFormItemRules(widgetInfo)}
                                > <el-cascader
                                    v-model={this.form.extData[widgetInfo.vModel]}
                                    {...{ props: ElCascaderOptions }}
                                    options={widgetInfo.options.list}
                                /></el-form-item>
                    }
                </el-col>
            )
        },
        kevin_el_cascader_change(value, widgetInfo) {
            new Function('ctx', "_this", 'value', 'widgetInfo', widgetInfo.events.change)(this.context, this, value, widgetInfo)
        }
    }
}
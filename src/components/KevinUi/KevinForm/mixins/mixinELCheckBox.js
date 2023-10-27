export default {
    methods: {
        renderElCheckBox(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            if (this.context.businessEnv == 'add') {

                if (widgetInfo.vModelType == 'fixed' && !this.context.form[widgetInfo.vModel]) {
                    this.context.form[widgetInfo.vModel] = []
                } else if (widgetInfo.vModelType == 'ext' && !this.context.form[widgetInfo.vModel]) {
                    this.context.form.extData[widgetInfo.vModel] = []
                }
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
                        widgetInfo.vModelType == 'fixed' ? <el-form-item class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={widgetInfo.vModel}
                            rules={this.configFormItemRules(widgetInfo)}
                        >
                            <div class="kevin_el_checkbox_utils">
                                <el-button disabled={this.form[widgetInfo.vModel].length == widgetInfo.options.list.length} style="margin-bottom:6px;margin-right:8px" type="primary" size='mini' onClick={() => {
                                    this.kevin_el_checkbox_checkAll(widgetInfo)
                                }}>勾选全部</el-button>
                                <el-checkbox-group
                                    disabled={widgetInfo.disabled}
                                    v-model={this.form[widgetInfo.vModel]}
                                    onChange={(value) => {
                                        this.el_check_box_group_change(value, widgetInfo)
                                    }}
                                >
                                    {
                                        widgetInfo.options.list.map(checkBoxItemInfo => {
                                            return (
                                                <el-checkbox label={checkBoxItemInfo.value} onChange={(value) => {
                                                    this.el_check_box_change(checkBoxItemInfo, value, widgetInfo)
                                                }}>{checkBoxItemInfo.label}</el-checkbox>
                                            )
                                        })
                                    }
                                </el-checkbox-group>
                            </div>

                        </el-form-item> :
                            <el-form-item class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <div class="kevin_el_checkbox_utils">
                                    <el-button disabled={this.form[widgetInfo.vModel].length == widgetInfo.options.list.length} style="margin-bottom:6px;margin-right:8px" type="text" onClick={() => {
                                        this.kevin_el_checkbox_checkAll(widgetInfo)
                                    }}>勾选全部</el-button>
                                    <el-checkbox-group
                                        disabled={widgetInfo.disabled}
                                        v-model={this.form.extData[widgetInfo.vModel]}
                                        onChange={() => {
                                            this.el_check_box_group_change(widgetInfo)
                                        }}
                                    >
                                        {
                                            widgetInfo.options.list.map(checkBoxItemInfo => {
                                                return (
                                                    <el-checkbox label={checkBoxItemInfo.value}>{checkBoxItemInfo.label}</el-checkbox>
                                                )
                                            })
                                        }
                                    </el-checkbox-group>
                                </div>

                            </el-form-item>
                    }
                </el-col>
            )
        },
        kevin_el_checkbox_checkAll(widgetInfo) {
            let valueList = widgetInfo.options.list.map(item=>{
                return item.value
            })
            if(widgetInfo.vModelType == 'fixed'){
                this.form[widgetInfo.vModel] = valueList
            }else{
                this.form.extData[widgetInfo.vModel] = valueList
            }
        },
        el_check_box_change(item, value, widgetInfo) {
            
            new Function('ctx', '_this', 'item', 'value', 'widgetInfo', widgetInfo.events.boxChange)(this.context, this, item, value, widgetInfo)

        },
        el_check_box_group_change(value, widgetInfo) {
            new Function('ctx', '_this', 'value', 'widgetInfo', widgetInfo.events.change)(this.context, this, value, widgetInfo)
        }
    }
}
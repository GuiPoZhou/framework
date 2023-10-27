export default {
    methods: {

        //        渲染ElInput
        renderELInput(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide && !this.draggableOpen) {
                return ''
            }
            let ElInputAttr = {
                placeholder: widgetInfo.placeholder,
                clearable: widgetInfo.clearable,
                disabled: widgetInfo.disabled,
                readonly: widgetInfo.readonly,
                type: widgetInfo.type,
                rows: widgetInfo.rows || 2,
                autosize:widgetInfo.autosize
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
                        widgetInfo.vModelType == 'fixed' ? <el-form-item class={this.context.KevinJson.KevinWidget.formlabelPosition !='top'&&isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={widgetInfo.vModel}
                            rules={this.configFormItemRules(widgetInfo)}
                        >
                            <el-input v-model={this.form[widgetInfo.vModel]}  {...{ props: ElInputAttr }}
                                onBlur={($event) => {
                                    this.elInputBlur(widgetInfo, $event)
                                }}
                                onFocus={($event) => {
                                    this.elInputFocus(widgetInfo, $event)
                                }}
                                onChange={(changeValue) => {
                                    this.elInputChange(widgetInfo, changeValue)
                                }}
                                onClear={() => {
                                    this.elInputClear(widgetInfo)
                                }}
                                onInput={(inputValue) => {
                                    this.elInputInput(widgetInfo, inputValue)
                                }}
                                nativeOnKeyup={(keyInfo) => {
                                    this.elInputKeyUpEvents(widgetInfo, keyInfo)
                                }}
                            >
                                {
                                    widgetInfo.slot.isSlot ? this.renderElInputSlot(widgetInfo) : ''
                                }
                            </el-input>
                        </el-form-item> : <el-form-item class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                            rules={this.configFormItemRules(widgetInfo)}
                        >
                            <el-input v-model={this.form.extData[widgetInfo.vModel]}  {...{ props: ElInputAttr }}
                                onBlur={($event) => {
                                    this.elInputBlur(widgetInfo, $event)
                                }}
                                onFocus={($event) => {
                                    this.elInputFocus(widgetInfo, $event)
                                }}
                                onChange={(changeValue) => {
                                    this.elInputChange(widgetInfo, changeValue)
                                }}
                                onClear={() => {
                                    this.elInputClear(widgetInfo)
                                }}
                                onInput={(inputValue) => {
                                    this.elInputInput(widgetInfo, inputValue)
                                }}
                                nativeOnKeyup={(keyInfo) => {
                                    this.elInputKeyUpEvents(widgetInfo, keyInfo)
                                }}
                            >
                                {
                                    widgetInfo.slot.isSlot ? this.renderElInputSlot(widgetInfo) : ''
                                }
                            </el-input>
                        </el-form-item>
                    }

                </el-col>

            )
        },
        //        elinput 键盘事件  目前只实现回车
        elInputKeyUpEvents(widgetInfo, keyInfo) {
            if (keyInfo.keyCode == 13) {
                new Function('ctx', '_this', 'widgetInfo', widgetInfo.events.enter)(this.context, this, widgetInfo)
            }
        },
        //        elinput input事件
        elInputInput(widgetInfo, inputValue) {
            new Function('ctx', '_this', 'widgetInfo', 'inputValue', widgetInfo.events.input)(this.context, this, widgetInfo, inputValue)
        },
        //        elinput clear事件
        elInputClear(widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.events.clear)(this.context, this, widgetInfo)
        },
        //        elinput change事件  注：input的change事件 是在blur时
        elInputChange(widgetInfo, changeValue) {
            new Function('ctx', '_this', 'widgetInfo', 'changeValue', widgetInfo.events.change)(this.context, this, widgetInfo, changeValue)
        },
        //        elinput focus事件
        elInputFocus(widgetInfo, $event) {
            new Function('ctx', '_this', 'widgetInfo', '$event', widgetInfo.events.focus)(this.context, this, widgetInfo, $event)

        },
        //        elinput bulur事件
        elInputBlur(widgetInfo, $event) {
            new Function('ctx', '_this', 'widgetInfo', '$event', widgetInfo.events.blur)(this.context, this, widgetInfo, $event)
        },
        //        input 插槽渲染
        renderElInputSlot(widgetInfo) {
            switch (widgetInfo.slot.slotType) {
                case "button":
                    return (this.inputSlotButton(widgetInfo))
                case "icon":
                    return (this.inputSlotIcon(widgetInfo))
                case 'text':
                    return (this.inputSlotText(widgetInfo))
                case 'select':
                    return (this.inputSlotSelect(widgetInfo))
            }
        },
        inputSlotSelect(widgetInfo) {
            if (widgetInfo.slot.vModelType == 'fixed') {
                return (
                    <el-select style="width:4rem" slot="append" v-model={this.form[widgetInfo.slot.vModel]} placeholder=''>
                        {
                            widgetInfo.slot.options.list.map((slotSelectOptionsInfo, slotSelectOptionsIndex) => {
                                return (
                                    <el-option
                                        label={slotSelectOptionsInfo.label}
                                        value={slotSelectOptionsInfo.value}>
                                    </el-option>
                                )
                            })
                        }
                    </el-select>
                )
            } else {
                return (
                    <el-select style="width:4rem" slot="append" v-model={this.form.extData[widgetInfo.slot.vModel]} placeholder=''>
                        {
                            widgetInfo.slot.options.list.map((slotSelectOptionsInfo, slotSelectOptionsIndex) => {
                                return (
                                    <el-option
                                        label={slotSelectOptionsInfo.label}
                                        value={slotSelectOptionsInfo.value}>
                                    </el-option>
                                )
                            })
                        }
                    </el-select>
                )


            }
        },
        inputSlotText(widgetInfo) {
            return (
                <template slot="append">{widgetInfo.slot.slotSpanContent}</template>
            )
        },
        inputSlotIcon(widgetInfo) {
            return (
                <i slot="suffix" class={widgetInfo.slot.slotIconName}></i>
            )
        },
        inputSlotButton(widgetInfo) {
            return (
                <el-button slot="append" icon={widgetInfo.slot.slotButtonIcon} onClick={() => { this.elInputSlotButtonEvents(widgetInfo) }}></el-button>
            )
        },
        //        elinput 插槽按钮 点击事件
        elInputSlotButtonEvents(widgetInfo) {
            if (widgetInfo.slot.events.slotButtonEvents) {
                let callBackEvents = widgetInfo.slot.events.callBackEvents
                new Function('ctx', '_this', 'callBackEvents', 'widgetInfo', widgetInfo.slot.events.slotButtonEvents)(this.context, this, callBackEvents, widgetInfo)
            }
        },
    }
}
export default {
    methods: {
        renderElButton(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol RenderCol_Button' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showELButtonEditArea(widgetIndex, widgetInfo)
                    }
                    <el-row>
                        <el-col span={24} style="margin:10px 0">
                            <draggable list={widgetInfo.children} forceFallback={true}
                                group={{
                                    name: `Block${new Date().getTime()}`,
                                    animation: 180,
                                    pull: false,
                                    put: false
                                }} ghostClass={this.ghostClass}
                                disabled={!this.draggableOpen}
                                className="drag-wrapper"
                            >
                                {
                                    widgetInfo.children.map((buttonWidgetInfo, buttonIndex) => {
                                        if ((!buttonWidgetInfo.isHide && this.kevin_el_buttonPerm(buttonWidgetInfo)) || this.draggableOpen) {
                                            return (
                                                <div class="renderButtonArea">
                                                    {
                                                        this.showButtonEditArea(buttonWidgetInfo)
                                                    }
                                                    <el-button
                                                        type={buttonWidgetInfo.type}
                                                        size={buttonWidgetInfo.size}
                                                        disabled={buttonWidgetInfo.disabled}
                                                        onClick={() => {
                                                            this.executeButtonFunc(buttonWidgetInfo.events)
                                                        }}>{buttonWidgetInfo.title}</el-button>
                                                </div>

                                            )
                                        }

                                    })
                                }
                            </draggable>

                        </el-col>
                    </el-row>
                </el-col>

            )
        },
        kevin_el_buttonPerm(buttonWidgetInfo) {
            if (!buttonWidgetInfo.perm) {
                return true
            } else {
                return this.$checkPermi([buttonWidgetInfo.perm])
            }
        },
        executeButtonFunc(buttonEvents) {
            new Function('ctx', '_this', buttonEvents)(this.context, this)
        },
    }
}
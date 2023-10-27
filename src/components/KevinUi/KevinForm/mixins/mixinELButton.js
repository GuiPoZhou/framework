export default {
    methods: {
        renderElButton(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol emptyTop' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showELButtonEditArea(widgetIndex, widgetInfo)
                    }
                    <el-row>
                        <el-col span={24} style="margin:10px 0">
                            {
                                widgetInfo.children.map((buttonWidgetInfo, buttonIndex) => {
                                    if (!buttonWidgetInfo.isHide || this.draggableOpen) {
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
                        </el-col>
                    </el-row>
                </el-col>

            )
        },
        executeButtonFunc(buttonEvents) {
            new Function('ctx', '_this', buttonEvents)(this.context, this)
        },
    }
}
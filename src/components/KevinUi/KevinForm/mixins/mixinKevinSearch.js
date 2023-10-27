export default {
    methods: {
        renderKevinSearch(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol KevinSearchRender' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showKevinSearchEditArea(widgetIndex, widgetInfo)
                    }
                    <el-row>
                        <div style="width:100%">
                            <draggable list={widgetInfo.children} forceFallback={true}
                                group={{
                                    name: `Block${new Date().getTime()}`,
                                    animation: 180,
                                    pull: true,
                                    put: true
                                }} ghostClass={this.ghostClass}
                                disabled={!this.draggableOpen}
                                className="drag-wrapper"
                            >
                                {
                                    this.renderImport(widgetInfo.children)
                                }
                            </draggable>
                            <el-col span={widgetInfo.searchAreaCol} style="margin-top:2px;">
                                <el-button style="margin-left:0.7rem" size="small" type="primary" icon="el-icon-search" onClick={() => {
                                    this.kevin_search_do(widgetInfo)
                                }}>搜索</el-button>
                                <el-button size="small" onClick={() => {
                                    this.kevin_search_repeat_do(widgetInfo)
                                }}>重置</el-button>
                            </el-col>
                        </div>

                    </el-row>
                </el-col>
            )
        },
        kevin_search_do(widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.events.search)(this.context, this, widgetInfo)
        },
        kevin_search_repeat_do(widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.events.repeat)(this.context, this, widgetInfo)

        },
        showKevinSearchEditArea(index, params) {
            if (this.draggableOpen) {
                return (
                    <div class="eidt_area">
                        <el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
                            onClick={() => {
                                this.copyWidgetId()
                            }}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
                        <el-button style="color:red" type='text' onClick={() => {
                            this.removeTabsWidget(params)
                        }}>删除组件
                        </el-button>
                        <el-button type='text' onClick={() => {
                            this.editWidget(params)
                        }}>编辑组件
                        </el-button>

                    </div>
                )
            }
        },
    }
}
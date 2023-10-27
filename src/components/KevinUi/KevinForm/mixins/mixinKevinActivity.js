export default {
    methods: {
        renderKevinActivity(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditKevinActivity(widgetIndex, widgetInfo)
                    }
                    <kevinActivity approvalProcess={widgetInfo.businessData} />
                </el-col>
            )
        },
        showEditKevinActivity(index, params) {
            if (this.draggableOpen) {
                return (
                    <div class="eidt_area">
                        <el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
                            onClick={() => {
                                this.copyWidgetId()
                            }}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
                        <el-button type='text' onClick={() => {
                            this.removeTabsWidget(params)
                        }}>删除组件
                        </el-button>
                    </div>
                )
            }
        },

        // ============================工具方法🔽=====================================//
        kevinactivity_set_data(dataList, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            widgetInfo.businessData = dataList
        },
        // ============================工具方法🔼=====================================//
    }
}
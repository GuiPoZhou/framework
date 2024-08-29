export default {
    methods: {
        renderKevinEquipmentChart(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide && !this.draggableOpen) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {

                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <kevinEquipmentChart
                        context={this.context}
                        data={widgetInfo.data}
                        height={widgetInfo.height}
                        total={widgetInfo.total}
                        handleStatusColor={widgetInfo.events.handleStatusColor}
                        handleStatusLabel={widgetInfo.events.handleStatusLabel}
                        onLazyLoad={() => {
                            this.kevin_equipment_chart_load(widgetInfo)
                        }}
                        onChagneStatus={(data) => {
                            this.kevin_equipment_chanageStatus(data, widgetInfo)
                        }}
                    />
                </el-col>
            )
        },
        kevin_equipment_chart_load(widgetInfo) {
            if (widgetInfo.events.load) {
                new Function('ctx', '_this', 'widgetInfo', widgetInfo.events.load)(this.context, this, widgetInfo)
            } else {
                throw new Error('未配置懒加载脚本')
            }
        },
        kevin_equipment_chanageStatus(data, widgetInfo) {
            if (widgetInfo.events.changeStatus) {
                new Function('ctx', '_this', 'data', 'widgetInfo', widgetInfo.events.changeStatus)(this.context, this, data, widgetInfo)
            } else {
                throw new Error('未配置修改状态脚本')
            }
        }
    }
}
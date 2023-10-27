export default {
    methods: {
        renderKevinBatch(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    {
                        widgetInfo.vModelType == 'fixed' ?
                            <el-form-item label={widgetInfo.title}>
                                <kevinBatch
                                    interval={this.form[widgetInfo.options.intervalKey]}
                                    unit={this.form[widgetInfo.options.unitKey]}
                                    count={Number(this.form[widgetInfo.options.intervalCountKey])}
                                    editButtonTile={widgetInfo.editButtonTile}
                                    actionLabel={widgetInfo.actionLabel}
                                    unitList={widgetInfo.unitList}
                                    options={widgetInfo.options}
                                    onSelect={(value) => {
                                        this.kevin_batch_select(value, widgetInfo)
                                    }}
                                />
                            </el-form-item> : <el-form-item label={widgetInfo.title}>
                                <kevinBatch
                                    interval={this.form.extData[widgetInfo.options.intervalKey]}
                                    unit={this.form.extData[widgetInfo.options.unitKey]}
                                    count={this.form.extData[widgetInfo.options.intervalCountKey]}
                                    editButtonTile={widgetInfo.editButtonTile}
                                    actionLabel={widgetInfo.actionLabel}
                                    unitList={widgetInfo.unitList}
                                    options={widgetInfo.options}
                                    onSelect={(value) => {
                                        this.kevin_batch_select(value, widgetInfo)
                                    }}
                                />
                            </el-form-item>
                    }

                </el-col>
            )
        },
        kevin_batch_select(value, widgetInfo) {
            new Function('ctx', '_this', 'value', 'widgetInfo', widgetInfo.events.select)(this.context, this, value, widgetInfo)
            this.$forceUpdate()
        }
    }
}
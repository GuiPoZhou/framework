export default {
    methods: {
        renderKevinTreeSelect(widgetInfo, widgetIndex) {
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
                            <el-form-item label={widgetInfo.title} prop={widgetInfo.vModel}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <Treeselect
                                    v-model={this.form[widgetInfo.vModel]}
                                    disabled={widgetInfo.disabled}
                                    append-to-body={false}
                                    showCount={widgetInfo.showCount}
                                    normalizer={this.kevin_tree_selectNormalizer(widgetInfo)}
                                    clearable={widgetInfo.clearable}
                                    options={widgetInfo.options.list}
                                    onSelect={(node, instanceId) => {
                                        this.kevintreeselect_select(node, instanceId, widgetInfo)
                                    }}
                                />
                            </el-form-item> :
                            <el-form-item label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                rules={this.configFormItemRules(widgetInfo)}
                            >
                                <Treeselect
                                    v-model={this.form.extData[widgetInfo.vModel]}
                                    disabled={widgetInfo.disabled}
                                    append-to-body={false}
                                    showCount={widgetInfo.showCount}
                                    clearable={widgetInfo.clearable}
                                    normalizer={this.kevin_tree_selectNormalizer(widgetInfo)}
                                    options={widgetInfo.options.list}
                                    onSelect={(node, instanceId) => {
                                        this.kevintreeselect_select(node, instanceId, widgetInfo)
                                    }}
                                />
                            </el-form-item>
                    }
                </el-col>
            )
        },
        kevin_tree_selectNormalizer(widgetInfo) {
            return ((node) => {
                return new Function('node', widgetInfo.events.normalizer)(node)

            })
        },
        kevintreeselect_select(node, instanceId, widgetInfo) {
            new Function('ctx', '_this', 'node', 'instanceId', 'widgetInfo', widgetInfo.events.select)(this.context, this, node, instanceId, widgetInfo)
        }
    }
}
export default {
    methods: {
        renderElTableTree(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide == true) {
                return ('')
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol RenderColTable' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <kevinTreeTable
                        border
                        ref={widgetInfo.WIDGETID}
                        key={widgetInfo.WIDGETID}
                        row-key={widgetInfo.rowKey}
                        tree-props={eval(JSON.parse(widgetInfo.treeProps))}
                        height={widgetInfo.height ? (this.innerHeight * (widgetInfo.height / 100)) : '600'}
                        columns={widgetInfo.tableColumns}
                        data={widgetInfo.tableData}
                        parentContext={{ ctx: this.context, _this: this }}
                        checkSelectable={widgetInfo.events.checkSelectable}
                        onSelectionChange={(e) => {
                            this.kevin_base_table_selectionChange(e, widgetInfo)
                        }}
                        scopedSlots={this.getTableScopedSlots(widgetInfo)}
                    />
                    {
                        widgetInfo.openPagination ?
                            <kevinPagination
                                total={widgetInfo.paginationOptions.total}
                                page={widgetInfo.paginationOptions.page}
                                limit={eval(widgetInfo.paginationOptions.pageSizes)[0]}
                                pageSizes={eval(widgetInfo.paginationOptions.pageSizes)}
                                onPagination={(pageInfo) => {
                                    this.kevin_paggination_change(pageInfo, widgetInfo)
                                }}
                            /> : ''

                    }
                </el-col>
            )
        },
    }
}
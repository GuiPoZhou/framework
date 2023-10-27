export default {
    methods: {
        renderKevinGrid(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide && !this.draggableOpen) {
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol KevinGridEdit' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <div class="kevin_grid" style={{ height: this.kevin_grid_height(widgetInfo) + 'px',backgroundColor:widgetInfo.backgroundColor }}>
                        {
                            widgetInfo.children.map((kevinGridInfo, kevinGridIndex) => {
                                return (
                                    <div class={kevinGridInfo.components} style={{width:kevinGridInfo.colSpan+'%'}}>
                                        <draggable list={kevinGridInfo.children} forceFallback={true}
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
                                                this.renderImport(kevinGridInfo.children)
                                            }
                                        </draggable>
                                    </div>
                                )
                            })
                        }
                    </div>

                </el-col>
            )
        },
        kevin_grid_height(widgetInfo) {
            return window.innerHeight * (widgetInfo.height / 100)
        }
    }
}
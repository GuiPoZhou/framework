export default {
    methods: {
        renderELTabs(widgetInfo, widgetIndex) {
            if(widgetInfo.isHide && !this.draggableOpen){
                return ''
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol TabsEditArea' : ''} key={widgetIndex}
                    span={widgetInfo.colSpan}>
                    {
                        this.showTabsEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <el-tabs
                        editable={this.draggableOpen && widgetInfo.children.length > 1}
                        onEdit={(targetName, action) => {
                            this.handleTabsEdit(targetName, action, widgetInfo)
                        }}
                        v-model={widgetInfo.active} type={widgetInfo.attributes.type}
                        tabPosition={widgetInfo.attributes.tabPosition}
                        before-leave={this.tabsbeforeLeave(widgetInfo)}
                        v-on:tab-click={()=>{
                            this.handleTabClick(widgetInfo)
                        }}
                    >
                        {
                            !widgetInfo.children ? widgetInfo.children = [] : ''
                        }
                        {
                            widgetInfo.children.map((tabInfo, tabIndex) => {
                                if (tabInfo.isHide == false || this.draggableOpen) {
                                    return (
                                        <el-tab-pane label={tabInfo.title} name={String(tabIndex)}>
                                            <el-row>
                                                <div style="width:100%">
                                                    <draggable list={tabInfo.children} forceFallback={true}
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
                                                            this.renderImport(tabInfo.children)
                                                        }
                                                    </draggable>
                                                </div>

                                            </el-row>

                                        </el-tab-pane>
                                    )
                                }

                            })
                        }

                    </el-tabs>
                </el-col>
            )
        },
        handleTabClick(widgetInfo){
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.attributes.events.tabClick)(this.context, this, widgetInfo)

        },
        // 输入性质表单的可视化编辑
        showTabsEditEnterNode(index, params) {
            // 动态添加的dom 在jsx中应当使用箭头函数执行具体的执行方法 防止添加完dom后 方法自动执行
            if (this.draggableOpen) {
                return (
                    <div class="eidt_area">
                        <el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
                            onClick={() => {
                                this.copyWidgetId()
                            }}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
                        <el-button type="text" onClick={() => {
                            this.addNewTab(params)
                        }}>新增Tab
                        </el-button>
                        <el-button type='text' onClick={() => {
                            this.editTabs(params)
                        }}>编辑Tab组件
                        </el-button>
                        <el-button style="color:red" type='text' onClick={() => {
                            this.removeTabsWidget(params)
                        }}>删除组件
                        </el-button>
                    </div>
                )
            }
        },
        tabsbeforeLeave(widgetInfo) {
            return (activeName, oldActiveName) => {
                if (!widgetInfo.attributes.events.beforeLeaveEvents) {
                    return true
                } else {
                    return new Function('ctx', '_this', 'widgetInfo','activeName','oldActiveName', widgetInfo.attributes.events.beforeLeaveEvents)(this.context, this, widgetInfo,activeName, oldActiveName)
                }
            }
        },
    }
}
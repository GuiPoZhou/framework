export default {
    methods: {
        renderKevinDiaLog(widgetInfo, widgetIndex) {
            if (this.draggableOpen) {
                return (
                    <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                        {

                            this.showEditKevinDialog(widgetIndex, widgetInfo)
                        }
                        <div class="kevin_dialog_edit">
                            <img class="k_d_e_icon" src={this.kevinDialogIcon}></img>
                            <span class="k_d_e_label">{widgetInfo.title}</span>
                        </div>
                    </el-col>
                )
            } else {
                return (
                    widgetInfo.canOpen ?
                        <kevinDiaLog
                            ref={widgetInfo.WIDGETID}
                            widgetId={widgetInfo.quoteId}
                            onBack={(data) => {
                                this.kevin_dialog_callback(data, widgetInfo)
                            }}
                        /> : ''
                )
            }
        },
        showEditKevinDialog(index, params) {
            // 动态添加的dom 在jsx中应当使用箭头函数执行具体的执行方法 防止添加完dom后 方法自动执行
            if (this.draggableOpen) {
                return (
                    <div class="eidt_area">
                        <el-button style="color:#f5222d" type='text' onClick={() => {
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
        kevin_dialog_callback(data, widgetInfo) {
            if (!data || !data.name) {
                throw new Error("低码弹框回调格式不对，参考：data={name:'事件名称key',params:回调参数}")
            }
            let callbackInfo = widgetInfo.callback.filter(item => {
                return item.label == data.name
            })
            if (callbackInfo.length != 0) {
                new Function('ctx', '_this', 'data', 'widgetInfo', callbackInfo[0].events)(this.context, this, data, widgetInfo)
            } else {
                throw new Error(`${widgetInfo.title}弹框 组件${widgetInfo.WIDGETID}未配置${data.name}回调事件`)

            }
        },
        kevin_dialog_show(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.canOpen = true;
                this.$nextTick(() => {
                    this.$refs[widgetInfo.WIDGETID].init()
                })
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
    }
}
export default {
    methods: {
        renderKevinVerficationPlan(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditKevinVerficationPlan(widgetIndex, widgetInfo)
                    }
                    <verificationPlanModule
                        ref='kevinVerificationPlanModule'
                        context={this.context}
                        widgetOptions={widgetInfo.options}
                        onConfirmAcceptList={(list) => { this.e_confirmAcceptList(list, widgetInfo) }}
                        onDeviceTableEvents={({ scope, activeName }) => {
                            this.e_deviceTableEvents({ scope, activeName }, widgetInfo)
                        }}
                        onConfirmKevinDeviceTableComponents={({ data, editTableDataIndex, activeName }) => { this.e_confirmKevinDeviceTableComponents({ data, editTableDataIndex, activeName }, widgetInfo) }}
                        onAddNewData={({ params, activeName }) => {
                            this.e_KevinDeviceTableAddNewData({ params, activeName }, widgetInfo)
                        }}
                        onConfirmModel={({ data, activeName }) => {
                            this.e_confirmModel({ data, activeName }, widgetInfo)
                        }}
                        onRemoceAcceptType={(code) => {
                            this.e_remoceAcceptType(code, widgetInfo)
                        }}
                        onRefresh={(arr) => {
                            this.e_kevinDeviceAcceptancerefresh(arr, widgetInfo)
                        }}
                    />
                </el-col>
            )
        },
        showEditKevinVerficationPlan(index, params) {
            if (this.draggableOpen) {
                return (
                    <div class="eidt_area">
                        {/* <el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
                            onClick={() => {
                                this.copyWidgetId()
                            }}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag> */}
                        <el-button style="color:red" type='text' onClick={() => {
                            this.removeTabsWidget(params)
                        }}>删除组件
                        </el-button>
                        {/* <el-button type='text' onClick={() => {
                            this.editWidget(params)
                        }}>编辑组件
                        </el-button> */}
                    </div>
                )
            }
        },
        // 获取当前组件的数据 
        kevinVerficationPlan_get_data(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                console.log('验收组件', widgetInfo)
                let responseParams = {}
                // 获取验收的code 按顺序 逗号排开
                let codeList = widgetInfo.options.dataSource.list.map(item => {
                    return item.code
                })
                responseParams.code = codeList.join(',')
                // 根据当前验收类型 获取表单
                let formData = widgetInfo.options.dataSource.list.filter(item => {
                    return item.code == this.context.accepttanceType
                })
                responseParams.form = { ...formData[0].form }
                // 获取当前验收类型的模板数据
                responseParams.acceptanceFormData = formData[0].content.tableData
                console.log('验收组件数据', responseParams)
                return responseParams
            } else {

            }

        },
        // 获取当前组件的json
        kevinVerficationPlan_get_json(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            return widgetInfo
        },
        kevinVerficationPlan_set_json(jsonData, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            widgetInfo.options
                = jsonData.options
        },
    }
}
export default {
    methods: {
        renderKevinDeviceAcceptance(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide) {
                return
            }
            widgetInfo.options.dataSource.list.forEach(LL=>{
                if(!LL.form){
                    LL.form = {
                        acceptTime:'',
                        acceptUser:'',
                        allAcceptResult:'',
                        inspectDate:'',
                        inspectResult:'',
                        remark:''
                    }
                }
            })
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditKevinDeviceAcceptance(widgetIndex, widgetInfo)
                    }
                    <kevinDeviceAcceptance
                        ref='kevinDeviceAcceptance'
                        context={this.context}
                        disabled={widgetInfo.disabled}
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
        e_kevinDeviceAcceptancerefresh(arr, widgetInfo) {
            this.$set(widgetInfo.options.dataSource, 'list', arr)
        },
        e_remoceAcceptType(code, widgetInfo) {
            widgetInfo.options.dataSource.list = widgetInfo.options.dataSource.list.filter(item => {
                return item.code != code
            })
        },
        e_confirmModel({ data, activeName }, widgetInfo) {
            widgetInfo.options.dataSource.list.forEach(item => {
                if (item.code == activeName) {
                    item.content.tableData = []
                    item.content.tableColumns = []
                    data.tableData.forEach((tdInfo, tdIndex) => {
                        this.$set(item.content.tableData, tdIndex, tdInfo)
                    })
                    data.tableColumns.forEach((tcInfo, tcIndex) => {
                        if (tcInfo.vModelActionOptions) {
                            if (tcIndex == 1) {
                                tcInfo.vModelActionOptions.disabled = widgetInfo.options.disabled
                            }

                        }
                        this.$set(item.content.tableColumns, tcIndex, tcInfo)
                    })
                }
            })
        },
        e_KevinDeviceTableAddNewData({ params, activeName }, widgetInfo) {
            widgetInfo.options.dataSource.list.forEach(item => {
                if (item.code == activeName) {
                    item.content.tableData.push(params)
                }
            })
        },
        e_confirmKevinDeviceTableComponents({ data, editTableDataIndex, activeName }, widgetInfo) {
            widgetInfo.options.dataSource.list.forEach(item => {
                if (item.code == activeName) {
                    item.content.tableData[editTableDataIndex]
                    if (data.vModelActionType == 'input') {
                        item.content.tableData[editTableDataIndex].vModelActionType = 'input'
                    } else {
                        item.content.tableData[editTableDataIndex].vModelActionType = data.vModelActionType
                        item.content.tableData[editTableDataIndex].vModelActionOptions = data.vModelActionOptions
                    }
                }
            })
        },
        e_deviceTableEvents({ scope, activeName }, widgetInfo) {
            widgetInfo.options.dataSource.list.forEach(item => {
                if (item.code == activeName) {
                    item.content.tableData.splice(scope.$index, 1)
                }
            })
            widgetInfo = { ...widgetInfo }
        },
        e_confirmAcceptList(list, widgetInfo) {
            widgetInfo.options.dataSource.list = list
        },
        showEditKevinDeviceAcceptance(index, params) {
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
                        <el-button type='text' onClick={() => {
                            this.editWidget(params)
                        }}>编辑组件
                        </el-button>
                    </div>
                )
            }
        },


        //================================ 工具方法🔽 ==========================
        // 组件 整体是的模式 可编辑 不可编辑---  采购时不让编辑
        kevindeviceacceptance_option_disabled(WIDGETID, disabled = true) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            this.$set(widgetInfo.options, 'disabled', disabled)
            widgetInfo.options.dataSource.list.forEach(item => {
                item.content.tableColumns.forEach((tcInfo, tcIndex) => {
                    if (!tcInfo.vModelActionOptions) {
                        tcInfo.vModelActionOptions = {}
                    }
                    if (tcIndex == 0) {
                        tcInfo.vModelActionOptions.disabled = false
                        this.$set(item.content.tableColumns, tcInfo, tcIndex)
                    } else if (tcIndex == 1) {
                        tcInfo.vModelActionOptions.disabled = true
                        this.$set(item.content.tableColumns, tcInfo, tcIndex)
                    }

                })
            })
        },
        // 获取当前组件的数据 
        kevindeviceacceptance_get_data(WIDGETID) {
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
        kevindeviceacceptance_get_json(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            return widgetInfo
        },
        // 替换当前组件的的json
        kevindeviceacceptance_set_json(jsonData, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            widgetInfo.options
                = jsonData.options
        },
        // 根据是否在采购时选择是否需要计量 来删除计量验收这个节点
        kevindeviceaccept_deletejiliang(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            widgetInfo.options.dataSource.list = widgetInfo.options.dataSource.list.filter(item => {
                return item.code != 'METROLOGY_ACCEPTANCE'
            })
        },
        //================================ 工具方法🔼 ==========================
    }
}
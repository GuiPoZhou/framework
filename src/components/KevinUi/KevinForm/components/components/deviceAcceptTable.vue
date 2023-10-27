<script>
import kevinTable from '../kevinTable.vue'
import selComponent from './selComponent.vue'
export default {
    components: {
        kevinTable,
        selComponent,
    },
    props: {
        tableColumns: Array,
        tableData: Array,
        tableActions: Array,
        context: Object,
        widgetOptions: Object,
        activeName: String
    },
    data() {
        return {
            showselComponent: false,
            editTableDataIndex: -1,
            modelOptions: {}
        }
    },
    watch: {
        widgetOptions: {
            async handler() {
                // 获取验收类型
                this.modelOptions = this.widgetOptions
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        confirmCom(data) {
            this.showselComponent = false
            this.$emit('confirmTableComponents', { data, editTableDataIndex: this.editTableDataIndex })
        },
        e_openSelCom(scope) {
            this.editTableDataIndex = scope.$index
            this.showselComponent = true
            this.$nextTick(() => {
                this.$refs.selComponent.init()
            })
        },
        mainTableActionButtonEvents(slotButtonInfo, scope, columnInfo) {
            this.$emit('deviceTableEvents', { slotButtonInfo, scope })
        },
        appendCommonTableActionColumn(scopedSlots, columnInfo) {
            scopedSlots['action'] = (scope) => {
                return (
                    <div>
                        {
                            this.tableActions.map(slotButtonInfo => {
                                if (!slotButtonInfo.isHide) {
                                    return (
                                        <el-button type="text"
                                            onClick={() => {
                                                this.mainTableActionButtonEvents(slotButtonInfo, scope, columnInfo)
                                            }}
                                        >{slotButtonInfo.title}</el-button>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }

        },
        checkcommonTableSlotInputRender(columnInfo) {
            if (this.context.accepttanceType && this.activeName == this.context.accepttanceType) {
                return false
            } else if (this.context.accepttanceType) {
                return true
            }
            return columnInfo.vModelActionOptions.disabled
        },
        commonTableSlotInputRender(scope, columnInfo) {
            return (
                <el-input className="tableSlotInput" v-model={scope.row[columnInfo['prop']]} disabled={this.checkcommonTableSlotInputRender(columnInfo, scope)}></el-input>
            )
        },
        commonTableSlotRadioRender(scope, columnInfo) {
            return (
                <el-radio-group
                    v-model={scope.row[columnInfo['prop']]}
                    disabled={this.checkcommonTableSlotInputRender(columnInfo)}
                >
                    {
                        scope.row.vModelActionOptions.dataSource.list.map((radioOptions, radioIndex) => {
                            return (
                                <el-radio label={radioOptions.value}>{radioOptions.label}</el-radio>
                            )
                        })
                    }
                </el-radio-group>
            )
        },
    },
    render(createElement, context) {
        let scopedSlots = {}
        this.tableColumns.forEach((columnInfo) => {
            if (columnInfo.slotName == 'action') {
                // 操作列
                this.appendCommonTableActionColumn(scopedSlots, columnInfo)
            } else {
                scopedSlots[columnInfo['slotName']] = (scope) => {
                    if (columnInfo.canEditCellFormType && scope.row.vModelActionType == '-') {
                        return (
                            <el-button type="text" onClick={() => { this.e_openSelCom(scope) }}>选择组件</el-button>
                        )
                    } else if (!columnInfo.canEditCellFormType && scope.row.vModelActionType == 'input') {
                        return this.commonTableSlotInputRender(scope, columnInfo)
                    } else if (columnInfo.canEditCellFormType) {
                        switch (scope.row.vModelActionType) {
                            case 'input':
                                return this.commonTableSlotInputRender(scope, columnInfo)
                            case 'radio':
                                return this.commonTableSlotRadioRender(scope, columnInfo)
                        }
                    } else {
                        return this.commonTableSlotInputRender(scope, columnInfo)
                    }

                }
            }

        })
        return (
            <div>
                <kevinTable
                    scopedSlots={scopedSlots}
                    ref="diyTable"
                    columns={this.tableColumns}
                    data={this.tableData}
                    border
                >
                </kevinTable>
                {
                    this.showselComponent ? <selComponent ref="selComponent" onClose={() => { this.showselComponent = false }} onSave={(data) => { this.confirmCom(data) }} /> : ''
                }
            </div>
        )
    }
}
</script>

<style></style>
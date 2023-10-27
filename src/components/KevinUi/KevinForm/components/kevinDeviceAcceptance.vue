<template>
    <div class="kevinDeviceAcceptance">
        <!-- 除去 到货验收 -->
        <el-tabs v-if="context.accepttanceType != 'ARRIVAL_ACCEPTANCE'" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in list" :key="item.code" :label="item.type" :name="item.code"></el-tab-pane>
        </el-tabs>
        <!-- 到货验收 以编辑的形式来展示 -->
        <div v-if="context.accepttanceType == 'ARRIVAL_ACCEPTANCE'" class="kda_area">
            <draggable v-model="widgetOptions.dataSource.list" :disabled="false" filter=".forbid" style="width: 100%;"
                chosen-class="chosen" :force-fallback="true" group="people" :move="onMove">
                <el-tag :class="item.code == 'ARRIVAL_ACCEPTANCE' ? 'forbid' : ''" effect="dark"
                    v-for="item in widgetOptions.dataSource.list" :key="item.code"
                    :type="item.code == 'ARRIVAL_ACCEPTANCE' ? 'success' : 'info'"
                    :closable="item.code != 'ARRIVAL_ACCEPTANCE'" @click="e_selAccetpt(item)"
                    @close="e_remoceAcceptType(item)">{{ item.type
                    }}</el-tag>
                <el-button type="warning" size="small" icon="el-icon-refresh" @click="e_refresh">重置</el-button>
            </draggable>

        </div>
        <div class="kda_ctrlarea">
            <div class="kcl_left" v-if="!context.accepttanceType || activeName == context.accepttanceType">
                <el-button size="small" type="primary" @click="e_selModel">选择模板</el-button>
                <el-button size="small" type="warning" @click="e_addNewData">新增行</el-button>
            </div>
            <div class="kcl_right" v-if="context.accepttanceType">
                <div class=" actimearea">
                    <span>验收时间:</span>
                    <el-date-picker style="width: 200px;" :disabled="widgetOptions.dataSource.list.filter(item => {
                        return item.code == activeName
                    })[0].code != this.context.accepttanceType" v-model="widgetOptions.dataSource.list.filter(item => {
    return item.code == activeName
})[0].form.inspectDate" size="mini" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
                <div class="actimearea">
                    <span>整体验收结果:</span>

                    <el-radio-group v-if="widgetOptions.dataSource.list.filter(item => {
                        return item.code == activeName
                    })[0].code == this.context.accepttanceType" v-model="widgetOptions.dataSource.list.filter(item => {
    return item.code == activeName
})[0].form.inspectResult">
                        <el-radio label="通过">通过</el-radio>
                        <el-radio label="不通过">不通过</el-radio>
                    </el-radio-group>
                    <span style="font-weight: 600;" v-else>{{ widgetOptions.dataSource.list.filter(item => {
                        return item.code == activeName
                    })[0].form.inspectResult }}</span>
                </div>
                <div class="actimearea" v-if="widgetOptions.dataSource.list.filter(item => {
                    return item.code == activeName
                })[0].form.inspectResult == '不通过'">
                    <span>不通过原因:</span>
                    <el-input v-model="widgetOptions.dataSource.list.filter(item => {
                        return item.code == activeName
                    })[0].form.inspectReason"></el-input>
                </div>
            </div>
        </div>
        <deviceAcceptTable :activeName="activeName" :widgetOptions="widgetOptions" :context="context" :tableColumns="list.filter(item => {
            return item.code == this.activeName
        })[0].content.tableColumns
            " :tableData="list.filter(item => {
        return item.code == this.activeName
    })[0].content.tableData
        " :tableActions="list.filter(item => {
        return item.code == this.activeName
    })[0].content.tableActions
        " @deviceTableEvents="e_deviceTableEvents" @confirmTableComponents="e_confirmTableComponents" />
        <!-- 选择模板 -->
        <selAcceptTableModel ref="selAcceptTableModel" :typeName="currentType" :code="activeName"
            v-if="shoselAcceptTableModel" @close="shoselAcceptTableModel = false" @confirmModel="e_confirmModel" />
    </div>
</template>

<script>
import deviceAcceptTable from './components/deviceAcceptTable.vue'
import selAcceptTableModel from './components/selAcceptTableModel.vue'
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
        deviceAcceptTable,
        selAcceptTableModel
    },
    props: {
        widgetOptions: Object,
        context: Object
    },

    watch: {
        widgetOptions: {
            async handler() {
                // 获取验收类型
                this.list = this.widgetOptions.dataSource.list
                if (this.context.accepttanceType && this.context.accepttanceType != 'ARRIVAL_ACCEPTANCE') {
                    const orderOfAcceptance = this.context.form.orderOfAcceptance
                    let findPrefix = this.findPrefix(this.context.accepttanceType, orderOfAcceptance)
                    let findPrefixList = findPrefix.split(',')
                    this.list = this.list.filter(item => {
                        return findPrefixList.indexOf(item.code) != -1 || item.code == this.context.accepttanceType
                    })
                    this.activeName = this.context.accepttanceType
                }
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            shoselAcceptTableModel: false,
            list: [],
            activeName: 'ARRIVAL_ACCEPTANCE',
            currentType: '',
            tableColumns: [],
            tableData: [],
            tableActions: []
        }
    },
    async mounted() {
        if (this.widgetOptions.dataSource.executionMethod == 'auto' && this.widgetOptions.dataSource.list.length == 0) {
            await this.e_getDeviceAcceptType()
        } else {
            this.RunAutoEvents()
        }
    },
    methods: {
        e_refresh() {
            this.$confirm('确定重置验收类型配置?').then(async re => {
                let response = await this.$net('/equipment/v1/inspect/config/list?status=1', 'get')
                let arr = []
                response.data.forEach((item, index) => {
                    if (index != 0) {
                        let obj = {
                            code: item.code,
                            type: item.type,
                        }

                        if (!item.detailList || item.detailList.length == 0) {
                            obj.content = {
                                components: 'kevin-accept-table',
                                title: "设备验收业务表格",
                                WIDGETID: '',
                                height: 30,
                                colSpan: 24,
                                tableData: [],
                                tableColumns: [
                                    {
                                        label: '验收要求',
                                        prop: 'acceptanceCriteria',
                                        slotName: 'acceptanceCriteria',
                                        vModelType: 'fixed',
                                        vModelActionType: 'input',
                                        canEditCellFormType: false,
                                        vModelActionOptions: {
                                            disabled: false
                                        }
                                    }, {
                                        label: '验收情况',
                                        prop: 'acceptanceStatus',
                                        slotName: 'acceptanceStatus',
                                        vModelType: 'fixed',
                                        canEditCellFormType: true,
                                        vModelActionType: 'input',
                                        vModelActionOptions: {
                                            disabled: true
                                        }
                                    }, {
                                        type: 'action',
                                        fixed: 'right',
                                        prop: 'action',
                                        label: '操作',
                                        slotName: 'action'
                                    }
                                ],
                                tableSelectData: [],
                                tableActions: [
                                    {
                                        title: '移除',
                                        isHide: false,
                                        events: "_this.$confirm('确定移除该行?').then(() => { widgetInfo.tableData.splice(scope.$index,1) })"
                                    }
                                ]
                            }
                        } else {
                            let isDefaultList = item.detailList.filter(ddInfo => {
                                return ddInfo.isDefault == 1
                            })
                            if (isDefaultList.length == 0) {
                                obj.content = {
                                    components: 'kevin-accept-table',
                                    title: "设备验收业务表格",
                                    WIDGETID: '',
                                    height: 30,
                                    colSpan: 24,
                                    tableData: [],
                                    tableColumns: [
                                        {
                                            label: '验收要求',
                                            prop: 'acceptanceCriteria',
                                            slotName: 'acceptanceCriteria',
                                            vModelType: 'fixed',
                                            vModelActionType: 'input',
                                            canEditCellFormType: false,
                                            vModelActionOptions: {
                                                disabled: false
                                            }
                                        }, {
                                            label: '验收情况',
                                            prop: 'acceptanceStatus',
                                            slotName: 'acceptanceStatus',
                                            vModelType: 'fixed',
                                            canEditCellFormType: true,
                                            vModelActionType: 'input',
                                            vModelActionOptions: {
                                                disabled: true
                                            }
                                        }, {
                                            type: 'action',
                                            fixed: 'right',
                                            prop: 'action',
                                            label: '操作',
                                            slotName: 'action'
                                        }
                                    ],
                                    tableSelectData: [],
                                    tableActions: [
                                        {
                                            title: '移除',
                                            isHide: false,
                                            events: "_this.$confirm('确定移除该行?').then(() => { widgetInfo.tableData.splice(scope.$index,1) })"
                                        }
                                    ]
                                }
                            } else {
                                let info = isDefaultList[0].content
                                let formDataStr = JSON.stringify(info)
                                let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                                obj.content = JSON.parse(resultDataStr)
                            }
                        }
                        arr.push(obj)
                    }
                })
                let ARRIVAL_ACCEPTANCEInfo = this.widgetOptions.dataSource.list.filter(item => {
                    return item.code == 'ARRIVAL_ACCEPTANCE'
                })
                arr.unshift(ARRIVAL_ACCEPTANCEInfo[0])
                this.$emit('refresh', arr)
            })
        },
        findPrefix(inputString, charList) {
            // 使用逗号分割字符串并创建字符数组
            const charArray = charList.split(',');

            // 查找输入字符在数组中的索引位置
            const index = charArray.indexOf(inputString);

            // 如果找到输入字符，返回该字符前面的所有内容，否则返回错误消息
            if (index !== -1 && index > 0) {
                return charArray.slice(0, index).join(',');
            } else {
                return "输入字符未找到或没有前置字符。";
            }
        },
        e_remoceAcceptType(item) {
            this.$confirm('确定移除该验收类型?').then(() => {
                this.$emit('remoceAcceptType', item.code)
            })
        },
        //禁止拖动到id为1的对象
        onMove(e) {
            if (e.relatedContext.element.code == 'ARRIVAL_ACCEPTANCE') return false;
            return true;
        },
        e_confirmModel(data) {
            this.shoselAcceptTableModel = false
            this.tableColumns = data.tableColumns
            this.tableData = data.tableData
            this.$emit('confirmModel', { data, activeName: this.activeName })
        },
        e_selModel() {
            this.shoselAcceptTableModel = true
            this.$nextTick(() => {
                this.$refs.selAcceptTableModel.init()
            })
        },
        e_addNewData() {
            let params = {
                acceptanceCriteria: "",
                acceptanceStatus: "",
                vModelActionType: '-',
            }
            // this.tableData.push(params)
            this.$emit('addNewData', { params, activeName: this.activeName })
        },
        e_confirmTableComponents({ data, editTableDataIndex }) {

            this.$emit('confirmKevinDeviceTableComponents', { data, editTableDataIndex, activeName: this.activeName })
        },
        e_deviceTableEvents({ slotButtonInfo, scope }) {
            this.$confirm('确定删除该行?').then(() => {
                this.$emit('deviceTableEvents', { scope: scope, activeName: this.activeName })
            })
        },
        e_selAccetpt(item) {
            if (item.code == 'ARRIVAL_ACCEPTANCE') {
                this.activeName = item.code
            }

        },
        handleClick(e) {
            let info = this.widgetOptions.dataSource.list.filter(item => {
                return item.code == this.activeName
            })
            console.log('info', info)
        },
        // 执行 自动函数
        RunAutoEvents() {
            if (this.widgetOptions.autoEvents && this.widgetOptions.autoEvents.length != 0) {
                this.widgetOptions.autoEvents.forEach(item => {
                    new Function('ctx', '_this', 'widgetOptions', item.events)(this.context, this, this.widgetOptions)
                })
            }
        },
        // 被动执行 赋值列与值
        handelEvents(widgetOptions) {
        },
        async e_getDeviceAcceptType() {
            let response = await this.$net('/equipment/v1/inspect/config/list', 'get')
            let resFilterList = response.data.filter(item => {
                return item.status == 1
            })
            let arr = []
            resFilterList.forEach(item => {
                let obj = {
                    code: item.code,
                    type: item.type,
                    form: {
                        inspectResult: '',//整体验收结果
                        inspectDate: '',//验收时间
                        inspectReason: '',//验收人
                        inspectUserName: '',//整体验收结果不通过的原因
                        inspectUserId: '',
                    }
                }

                if (!item.detailList || item.detailList.length == 0) {
                    obj.content = {
                        components: 'kevin-accept-table',
                        title: "设备验收业务表格",
                        WIDGETID: '',
                        height: 30,
                        colSpan: 24,
                        tableData: [],
                        tableColumns: [
                            {
                                label: '验收要求',
                                prop: 'acceptanceCriteria',
                                slotName: 'acceptanceCriteria',
                                vModelType: 'fixed',
                                vModelActionType: 'input',
                                canEditCellFormType: false,
                                vModelActionOptions: {
                                    disabled: false
                                }
                            }, {
                                label: '验收情况',
                                prop: 'acceptanceStatus',
                                slotName: 'acceptanceStatus',
                                vModelType: 'fixed',
                                canEditCellFormType: true,
                                vModelActionType: 'input',
                                vModelActionOptions: {
                                    disabled: true
                                }
                            }, {
                                type: 'action',
                                fixed: 'right',
                                prop: 'action',
                                label: '操作',
                                slotName: 'action'
                            }
                        ],
                        tableSelectData: [],
                        tableActions: [
                            {
                                title: '移除',
                                isHide: false,
                                events: "_this.$confirm('确定移除该行?').then(() => { widgetInfo.tableData.splice(scope.$index,1) })"
                            }
                        ]
                    }
                } else {
                    let isDefaultList = item.detailList.filter(ddInfo => {
                        return ddInfo.isDefault == 1
                    })
                    if (isDefaultList.length == 0) {
                        obj.content = {
                            components: 'kevin-accept-table',
                            title: "设备验收业务表格",
                            WIDGETID: '',
                            height: 30,
                            colSpan: 24,
                            tableData: [],
                            tableColumns: [
                                {
                                    label: '验收要求',
                                    prop: 'acceptanceCriteria',
                                    slotName: 'acceptanceCriteria',
                                    vModelType: 'fixed',
                                    vModelActionType: 'input',
                                    canEditCellFormType: false,
                                    vModelActionOptions: {
                                        disabled: false
                                    }
                                }, {
                                    label: '验收情况',
                                    prop: 'acceptanceStatus',
                                    slotName: 'acceptanceStatus',
                                    vModelType: 'fixed',
                                    canEditCellFormType: true,
                                    vModelActionType: 'input',
                                    vModelActionOptions: {
                                        disabled: true
                                    }
                                }, {
                                    type: 'action',
                                    fixed: 'right',
                                    prop: 'action',
                                    label: '操作',
                                    slotName: 'action'
                                }
                            ],
                            tableSelectData: [],
                            tableActions: [
                                {
                                    title: '移除',
                                    isHide: false,
                                    events: "_this.$confirm('确定移除该行?').then(() => { widgetInfo.tableData.splice(scope.$index,1) })"
                                }
                            ]
                        }
                    } else {
                        let info = isDefaultList[0].content
                        let formDataStr = JSON.stringify(info)
                        let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        obj.content = JSON.parse(resultDataStr)
                    }
                }
                arr.push(obj)

            })
            this.$emit('confirmAcceptList', arr)
            this.RunAutoEvents()
        },
    }
}
</script>

<style scoped lang="scss">
.kevinDeviceAcceptance {
    width: 100%;
}

.kda_area {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.8rem;

    /deep/.el-tag {
        margin-right: 1rem;
        cursor: pointer;
    }
}

.kda_ctrlarea {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .kcl_left {
        width: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .kcl_right {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        .actimearea {
            width: 40rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            span {
                display: block;
                width: 8rem;
                margin-right: 0.7rem;
                text-align: right;
            }
        }
    }
}
</style>
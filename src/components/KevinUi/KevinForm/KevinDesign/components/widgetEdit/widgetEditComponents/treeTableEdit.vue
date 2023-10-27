<template>
    <div style="width: 100%;height: 100%;">
        <widgetEditContainer>
            <el-form slot="wecLeft" label-position="top" :model="editParams" ref="editParams" label-width="130px"
                class="demo-ruleForm">
                <el-divider content-position="left">表格基础信息</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="表格标题" prop="title"
                            :rules="[{ required: true, message: '请输入表格标题', trigger: 'blur' }]">
                            <el-input v-model="editParams.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组件占据列数" prop="colSpan">
                            <el-input-number v-model="editParams.colSpan" :min="1" :max="24"
                                label="组件占据列数"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否隐藏" prop="isHide">
                            <el-radio-group v-model="editParams.isHide" @change="editParams = { ...editParams }">
                                <el-radio :label="false">否</el-radio>
                                <el-radio :label="true">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="表格占屏幕百分比" prop="height">
                            <el-input-number v-model="editParams.height" :min="30" :max="100"
                                label="组件占据列数"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="渲染嵌套数据的配置选项" prop="treeProps">
                            <el-input v-model="editParams.treeProps" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="rowKey" prop="rowKey">
                            <el-input v-model="editParams.rowKey"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-divider content-position="left">表格列属性维护</el-divider>
                <el-button type="primary" size="mini" style="margin-bottom: 0.7rem;"
                    @click="e_addNewColumns">添加普通列</el-button>
                <el-button type="warning" size="mini" style="margin-bottom: 0.7rem;"
                    @click="e_addActionColumn">添加操作列</el-button>
                <el-button type="warning" size="mini" style="margin-bottom: 0.7rem;"
                    @click="e_addSelection">添加多选列</el-button>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="editParams.tableColumns" style="width: 100%" border>
                            <el-table-column prop="label" label="列名(label)" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.label"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prop" label="固定位置" align="center">
                                <template slot-scope="scope">
                                    <el-select :disabled="scope.row.type != 'action'" v-model="scope.row.fixed">
                                        <el-option label="左侧" value="left"></el-option>
                                        <el-option label="右侧" value="right"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prop" label="字段名(prop)" align="center">
                                <template slot-scope="scope">
                                    <el-input :disabled="scope.row.type == 'action'" v-model="scope.row.prop"
                                        @blur="e_confirmColumnsProp(scope.row)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prop" label="字段类型" align="center">
                                <template slot-scope="scope">
                                    <el-select :disabled="scope.row.type == 'action'" v-model="scope.row.vModelType">
                                        <el-option label="固定字段" value="fixed"></el-option>
                                        <el-option label="扩展字段" value="ext"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="checked" label="是否默认展示" align="center">
                                <template slot-scope="scope">
                                    <el-select :disabled="scope.row.type == 'action' || scope.row.type == 'index'"
                                        v-model="scope.row.checked">
                                        <el-option label="展示" :value="true"></el-option>
                                        <el-option label="隐藏" :value="false"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prop" label="行内组件" align="center">
                                <template slot-scope="scope">
                                    <div style="display: flex;
                                flex-direction: row;align-items: center;justify-content: space-between;">
                                        <el-select :disabled="scope.row.type == 'action'"
                                            v-model="scope.row.vModelActionType" style="flex: 1;"
                                            @change="e_selColumsModelType(scope.row)">
                                            <el-option label="普通展示" value="-"></el-option>
                                            <el-option label="输入框" value="input"></el-option>
                                            <el-option label="选择框" value="select"></el-option>
                                            <el-option label="数字输入框" value="inputNumber"></el-option>
                                            <el-option label="单选框" value="radio"></el-option>
                                        </el-select>
                                        <el-link :disabled="scope.row.type == 'action'" type="primary"
                                            style="width: 2rem;margin-left: 0.7rem;"
                                            v-if="scope.row.vModelActionType != '-'" :underline="false"
                                            @click="configTableSlot(scope)">配置</el-link>
                                    </div>

                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_deleteColumns(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-divider content-position="left">表格操作列按钮</el-divider>
                <el-button type="primary" size="mini" style="margin-bottom: 0.7rem;"
                    @click="e_addActionButton">添加按钮</el-button>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="editParams.tableActions" style="width: 100%" border>
                            <el-table-column prop="title" label="按钮名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.title"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="title" label="条件脚本" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_editActionStatEvents(scope)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="title" label="事件脚本" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_editActionEvents(scope)">编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="title" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_deleteActionButton(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-divider content-position="left">表格全局事件配置</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="控制是否可以勾选" prop="events.checkSelectable">
                            <el-input v-model="editParams.events.checkSelectable" readonly>
                                <el-button slot="append" size="small" @click="e_editCheckSelectTableEvents">编辑</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="表格勾选事件" prop="events.selectionChange">
                            <el-input v-model="editParams.events.selectionChange" readonly>
                                <el-button slot="append" size="small" @click="e_editselectionChange">编辑</el-button>
                            </el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left">表格扩展属性</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="是否开启分页" prop="openPagination">
                            <el-radio-group v-model="editParams.openPagination">
                                <el-radio :label="false">否</el-radio>
                                <el-radio :label="true">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="每页显示个数" prop="paginationOptions.pageSizes">
                            <el-input v-model="editParams.paginationOptions.pageSizes"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分页事件脚本" prop="paginationEvents">
                            <el-input v-model="editParams.paginationEvents" readonly>
                                <el-button slot="append" @click="e_editPaginationEvents">编辑</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />
        </widgetEditContainer>
        <!-- table 行内 input框属性编辑 -->
        <tableSlotInputEdit ref="tableSlotInputEdit" v-if="showtableSlotInputEdit" @close="showtableSlotInputEdit = false"
            @save="e_saveSlotInputEdit" />
        <!-- table 行内 select组件编辑 -->
        <tableSlotSelectEdit ref="tableSlotSelectEdit" v-if="showtableSlotSelectEdit"
            @close="showtableSlotSelectEdit = false" @save="e_saveSlotSelectEdit" />
        <tableSlotInputNumberEdit ref="tableSlotInputNumberEdit" v-if="showtableSlotInputNumberEdit"
            @close="showtableSlotInputNumberEdit = false" @save="e_saveSlotInputNumberEdit" />
        <tableSlotRadioEdit ref="tableSlotRadioEdit" v-if="showtableSlotRadioEdit" @close="showtableSlotRadioEdit = false"
            @save="e_saveSlotRadioEdit" />
    </div>
</template>

<script>
import KevinEditors from '../../../../../../KevinEditor/index'
import widgetEditContainer from '../components/widgetEditContainer.vue'

import tableSlotInputEdit from './components/tableSlotInputEdit.vue'
import tableSlotSelectEdit from './components/tableSlotSelectEdit.vue'
import tableSlotInputNumberEdit from './components/tableSlotInputNumberEdit.vue'
import tableSlotRadioEdit from './components/tableSlotRadioEdit.vue'
export default {
    components: {
        KevinEditors,
        widgetEditContainer,
        tableSlotInputEdit,
        tableSlotSelectEdit,
        tableSlotInputNumberEdit,
        tableSlotRadioEdit
    },
    data() {
        return {
            showtableSlotRadioEdit: false,
            showtableSlotInputNumberEdit: false,
            showtableSlotSelectEdit: false,
            showtableSlotInputEdit: false,
            tableSlotEditIndex: -1,
            editParams: {
                events: {},
                paginationOptions: {}
            },
            editType: '',
            editIndex: ''
        }
    },
    methods: {
        e_editselectionChange() {
            this.editType = 'selectionChange'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.selectionChange || 'widgetInfo.tableSelectData = selectList' });
        },
        e_editCheckSelectTableEvents() {
            this.editType = 'CheckSelectTableEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.checkSelectable || '' });
        },
        e_editPaginationEvents() {
            this.editType = 'paginEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.paginationEvents || '' });
        },
        e_editActionEvents(scope) {
            this.editType = 'tableActionEvents'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.events || '' });
        },
        e_editActionStatEvents(scope) {
            this.editType = 'tableActionStatusEvents'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.actionStatusEvents || '' });
        },
        handleEditorInput(code) {
            if (this.editType == 'tableActionStatusEvents') {
                this.editParams.tableActions[this.editIndex].actionStatusEvents = this.formatCode(code)
            } else if (this.editType == 'tableActionEvents') {
                this.editParams.tableActions[this.editIndex].events = this.formatCode(code)
            } else if (this.editType == 'paginEvents') {
                this.editParams.paginationEvents = this.formatCode(code)
            } else if (this.editType == 'CheckSelectTableEvents') {
                this.editParams.events.checkSelectable = this.formatCode(code)
            } else if (this.editType == 'selectionChange') {
                this.editParams.events.selectionChange = this.formatCode(code)
            }
        },
        e_deleteActionButton(index) {
            this.$confirm('确定删除该按钮').then(() => {
                this.editParams.tableActions.splice(index, 1)
            })
        },
        e_addActionButton() {
            let params = {
                title: '按钮1',
                isHide: false,
                actionStatusEvents: '',
                events: ''
            }
            this.editParams.tableActions.push(params)
        },
        e_addSelection() {
            let params = {
                "prop": "selection",
                "type": "selection",
                checked: true,
                "fixed": "left",
                "label": "选择",
            }
            this.editParams.tableColumns.push(params)
        },
        e_addActionColumn() {
            let params = {
                type: 'action',
                checked: true,
                fixed: 'right',
                prop: 'action',
                label: '操作',
                slotName: 'action'
            }
            this.editParams.tableColumns.push(params)
        },
        e_addNewColumns() {
            let params = {
                label: "新列",
                prop: "prop",
                slotName: "prop",
                checked: true,
                vModelType: 'fixed',
                vModelActionType: "-",
                vModelActionOptions: {}
            }
            this.editParams.tableColumns.push(params)

        },
        e_selColumsModelType(row) {
            if (row.vModelActionType == '-') {
                row.vModelActionOptions = {}
            } else if (row.vModelActionType == 'input') {
                row.vModelActionOptions = {
                    disabled: false,
                    readonly: false,
                    placeholder: "请输入内容",
                    events: {
                        focus: '',
                        blur: '',
                        enter: '',
                        clear: ''
                    }
                }
            } else if (row.vModelActionType == 'inputNumber') {
                row.vModelActionOptions = {
                    disabled: false,
                    readonly: false,
                    min: 1,
                    max: 100,
                    step: 1,
                    stepStrictly: false,
                    placeholder: "请输入内容",
                    precision: NaN,
                    events: {
                        change: '',
                        blur: '',
                        focus: ''
                    }
                }
            } else if (row.vModelActionType == 'select') {
                row.vModelActionOptions = {
                    disabled: false,
                    readonly: false,
                    multiple: false,
                    multipleLimit: 0,
                    filterable: false,
                    dataSource: {
                        executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                        optionsGetEvents: '',
                        list: [],
                    },
                    events: {
                        change: '',
                    }
                }
            } else if (row.vModelActionType == 'radio') {
                row.vModelActionOptions = {
                    disabled: false,
                    dataSource: {
                        executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                        optionsGetEvents: '',
                        list: [],
                    },
                    events: {
                        input: '',
                    }
                }
            }
        },
        e_confirmColumnsProp(row) {
            row.slotName = row.prop
        },
        e_saveSlotRadioEdit(params) {
            this.showtableSlotRadioEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveSlotInputNumberEdit(params) {
            this.showtableSlotInputNumberEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveSlotSelectEdit(params) {
            this.showtableSlotSelectEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveSlotInputEdit(params) {
            this.showtableSlotInputEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        configTableSlot(scope) {
            this.tableSlotEditIndex = scope.$index
            if (scope.row.vModelActionType == 'input') {
                this.showtableSlotInputEdit = true
                this.$nextTick(() => {
                    this.$refs.tableSlotInputEdit.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'select') {
                this.showtableSlotSelectEdit = true
                this.$nextTick(() => {
                    this.$refs.tableSlotSelectEdit.init(scope.row.vModelActionOptions || {})
                })

            } else if (scope.row.vModelActionType == 'inputNumber') {
                this.showtableSlotInputNumberEdit = true
                this.$nextTick(() => {
                    this.$refs.tableSlotInputNumberEdit.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'radio') {
                this.showtableSlotRadioEdit = true
                this.$nextTick(() => {
                    this.$refs.tableSlotRadioEdit.init(scope.row.vModelActionOptions || {})
                })
            }

        },

        formatCode(code) {
            // 去除开头和结尾的空白字符
            code = code.trim();

            // 在大括号前后添加空格
            code = code.replace(/\s*{\s*/g, ' { ').replace(/\s*}\s*/g, ' } ');

            // 在逗号前后添加空格
            // code = code.replace(/,(\S)/g, ', $1');

            // 返回格式化后的代码
            return code;
        },
        e_deleteColumns(index) {
            this.$confirm('确定删除该列？').then(() => {
                this.editParams.tableColumns.splice(index, 1)
            })
        },
        e_save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('save', this.editParams)
                }
            })
        },
        init(widgetInfo) {
            this.editParams = widgetInfo
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
            if (!this.editParams.paginationOptions) {
                this.editParams.paginationOptions = {
                    page: 1,
                    total: 0,
                    pageSizes: '[10, 20, 30, 40, 50]'
                }
            }
        }
    }
}
</script>

<style></style>
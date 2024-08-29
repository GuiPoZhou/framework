<template>
    <div>
        <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="90%" dia-log-title="表格展开行内容编辑【基础表格】" @close="e_close">
            <template slot="bologbody">
                <div class="b_b_container">
                    <div class="b_b_c_left">
                        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px"
                            class="demo-ruleForm">
                            <el-divider content-position="left">展开行表格基础信息</el-divider>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="是否默认展开所有">
                                        <el-select size="mini" v-model="editParams.expandAll">
                                            <el-option label="是" :value="true"></el-option>
                                            <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="表格数据key" prop="tableDataKey"
                                        :rules="[{ required: true, message: '请输入展开行表格取值key', trigger: 'blur' }]">
                                        <el-input v-model="editParams.tableDataKey"></el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-divider content-position="left">展开行表格列信息</el-divider>
                            <el-button type="primary" size="mini" style="margin-bottom: 0.7rem;"
                                @click="e_addNewColumns">添加普通列</el-button>
                            <el-button type="warning" size="mini" style="margin-bottom: 0.7rem;"
                                @click="e_addActionIndex">添加序号列</el-button>
                            <el-button type="warning" size="mini" style="margin-bottom: 0.7rem;"
                                @click="e_addActionColumn">添加操作列</el-button>
                            <el-button type="warning" size="mini" style="margin-bottom: 0.7rem;"
                                @click="e_addSelection">添加多选列</el-button>
                            <el-row>
                                <el-col :span="24">
                                    <el-table ref="tableColumns" class="tableColumns" :data="editParams.tableColumns"
                                        style="width: 100%" border>
                                        <el-table-column type="expand">
                                            <template slot-scope="scope">
                                                <el-form style="padding:0.6rem" label-position="top" inline
                                                    class="demo-table-expand">
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <el-form-item label="固定位置">
                                                                <el-select size="mini"
                                                                    :disabled="scope.row.type != 'action'"
                                                                    v-model="scope.row.fixed">
                                                                    <el-option label="左侧" value="left"></el-option>
                                                                    <el-option label="右侧" value="right"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <el-form-item label="是否默认展示">
                                                                <el-select size="mini"
                                                                    :disabled="scope.row.type == 'action' || scope.row.type == 'index'"
                                                                    v-model="scope.row.checked">
                                                                    <el-option label="展示" :value="true"></el-option>
                                                                    <el-option label="隐藏" :value="false"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'action' && scope.row.type != 'index'">
                                                            <el-form-item label="是否开启排序">
                                                                <el-select size="mini" v-model="scope.row.sortable">
                                                                    <el-option label="关闭排序" :value="false"></el-option>
                                                                    <el-option label="自定义排序" :value="true"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'action' && scope.row.type != 'index' && scope.row.sortable == true">
                                                            <el-form-item label="自定义排序脚本">
                                                                <el-input size="mini" v-model="scope.row.sortMethod"
                                                                    readonly>
                                                                    <el-button slot="append"
                                                                        @click="e_editColumsSortMethod(scope)">编辑</el-button>
                                                                </el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <el-form-item label="列宽">
                                                                <el-input-number size="mini" v-model="scope.row.width"
                                                                    :min="5" :max="300"></el-input-number>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'selection' && scope.row.type != 'action' && scope.row.type != 'index'">
                                                            <el-form-item label="行内组件">
                                                                <div style="display: flex;
                                flex-direction: row;align-items: center;justify-content: space-between;">
                                                                    <el-select size="mini"
                                                                        v-model="scope.row.vModelActionType"
                                                                        style="flex: 1;"
                                                                        @change="e_selColumsModelType(scope.row)">
                                                                        <el-option label="普通展示" value="-"></el-option>
                                                                        <el-option label="输入框组件" value="input"></el-option>
                                                                        <el-option label="选择框组件" value="select"></el-option>
                                                                        <el-option label="数字框组件"
                                                                            value="inputNumber"></el-option>
                                                                        <el-option label="单选框组件" value="radio"></el-option>
                                                                        <el-option label="开关组件" value="switch"></el-option>
                                                                        <el-option label="日期框组件"
                                                                            value="datePicker"></el-option>
                                                                        <el-option label="上传组件" value="upload"></el-option>
                                                                        <el-option label="超链接组件" value="elLink"></el-option>
                                                                        <el-option label="脚本组件"
                                                                            value="codeHandle"></el-option>
                                                                        <!-- <el-option label="自定义组件" value="customize"></el-option> -->
                                                                    </el-select>
                                                                    <el-link
                                                                        :disabled="scope.row.type == 'action' || scope.row.type == 'selection'"
                                                                        type="primary"
                                                                        style="width: 2rem;margin-left: 0.7rem;"
                                                                        v-if="scope.row.vModelActionType != '-'"
                                                                        :underline="false"
                                                                        @click="configTableSlot(scope)">配置</el-link>
                                                                </div>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6" v-if="scope.row.type == 'selection'">
                                                            <el-form-item label="是否保留勾选数据">
                                                                <el-select size="mini" v-model="scope.row.reserveSelection">
                                                                    <el-option label="是" :value="true"></el-option>
                                                                    <el-option label="否" :value="false"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'selection' && scope.row.type != 'action' && scope.row.type != 'index'">
                                                            <el-form-item label="是否处理超长内容">
                                                                <el-select size="mini"
                                                                    v-model="scope.row.showOverFlowToolTip">
                                                                    <el-option label="是" :value="true"></el-option>
                                                                    <el-option label="否" :value="false"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'selection' && scope.row.type != 'action' && scope.row.type != 'index'">
                                                            <el-form-item label="是否自定义表头">
                                                                <el-select size="mini" v-model="scope.row.handleHeader">
                                                                    <el-option label="是" :value="true"></el-option>
                                                                    <el-option label="否" :value="false"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="6"
                                                            v-if="scope.row.type != 'selection' && scope.row.type != 'action' && scope.row.type != 'index' && scope.row.handleHeader">
                                                            <el-form-item label="自定表头脚本">
                                                                <el-input size="mini" v-model="scope.row.handleHeaderCode"
                                                                    readonly>
                                                                    <el-button slot="append"
                                                                        @click="e_editHandleHeaderCode(scope)">编辑</el-button>
                                                                </el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                </el-form>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="label" label="列名(label)" align="center">
                                            <template slot-scope="scope">
                                                <el-input :disabled="scope.row.type == 'expand'" size="mini"
                                                    v-model="scope.row.label"></el-input>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="prop" label="字段名(prop)" align="center">
                                            <template slot-scope="scope">
                                                <div style="display: flex;
                                flex-direction: row;align-items: center;justify-content: space-between;">
                                                    <el-input size="mini"
                                                        :disabled="scope.row.type == 'action' || scope.row.type == 'selection' || scope.row.type == 'index'"
                                                        v-model="scope.row.prop"
                                                        @blur="e_confirmColumnsProp(scope.row)"></el-input>
                                                    <el-button :disabled="scope.row.type == 'expand'" type="text"
                                                        style="margin-left: 0.7rem;"
                                                        @click="e_selDbTable(scope.$index)">选择</el-button>
                                                </div>

                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="prop" label="字段类型" align="center">
                                            <template slot-scope="scope">
                                                <el-select size="mini"
                                                    :disabled="scope.row.type == 'action' || scope.row.type == 'selection' || scope.row.type == 'index'"
                                                    v-model="scope.row.vModelType">
                                                    <el-option label="固定字段" value="fixed"></el-option>
                                                    <el-option label="扩展字段" value="ext"></el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="tableName" label="主表名称" align="center"></el-table-column>
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
                                    <el-table ref="tableActions" class="tableActions" :data="editParams.tableActions"
                                        style="width: 100%" border>
                                        <el-table-column prop="title" label="按钮名称" align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.title"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="perm" label="权限标识" align="center">
                                            <template slot-scope="scope">
                                                <div class="perm_area">
                                                    <el-popover placement="top-start" width="200" trigger="click"
                                                        :content="scope.row.perm">
                                                        <el-input slot="reference" type="text"
                                                            v-model="scope.row.perm"></el-input>
                                                    </el-popover>
                                                    <el-button class="p_a_button" type="text"
                                                        @click="e_editActionButtonPerm(scope)">选择</el-button>
                                                </div>
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
                                                <el-button type="text"
                                                    @click="e_deleteActionButton(scope.$index)">删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                            <el-divider content-position="left">表格全局事件维护</el-divider>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="表格勾选事件" prop="events.selectionChange">
                                        <el-input v-model="editParams.events.selectionChange" readonly>
                                            <el-button slot="append" size="small"
                                                @click="e_editselectionChange">编辑</el-button>
                                        </el-input>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="表格排序事件" prop="events.sortChange">
                                        <el-input v-model="editParams.events.sortChange" readonly>
                                            <el-button slot="append" size="small" @click="e_editsortChange">编辑</el-button>
                                        </el-input>

                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                    </div>
                    <div class="b_b_c_right">
                        <KevinEditors ref="KevinEditors" @input="handleEditorInput" />
                    </div>
                </div>
            </template>
            <template slot="bologfooter">
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button size="small" @click="e_close">取消</el-button>
            </template>
        </KevinLog>

        <dbTables ref="dbTable" v-if="showDbTable" @close="showDbTable = false" @confirm="setDbTable" />
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

        <!-- 表格扩展组件 属性编辑 -->
        <component v-if="showComponent" ref="component" :is="conponentsName" @close="showComponent = false"
            @save="e_saveVmoduleEdit" @confirmPerm="setPerm"></component>
    </div>
</template>

<script>
import KevinLog from '../../../../../../../KevinLog/index.vue'
import KevinEditors from '../../../../../../../../KevinEditor/index.vue'

import Sortable from "sortablejs";
import tableSlotInputEdit from '../tableSlotInputEdit.vue'
import tableSlotSelectEdit from '../tableSlotSelectEdit.vue'
import tableSlotInputNumberEdit from '../tableSlotInputNumberEdit.vue'
import tableSlotRadioEdit from '../tableSlotRadioEdit.vue'
import tableDatePickerEdit from '../tableDatePickerEdit.vue';
import tableSlotUpload from '../tableSlotUpload.vue';
import tableSlotSwitchEdit from '../tableSlotSwitchEdit.vue';
import tableSlotElLinkEdit from '../tableSlotElLinkEdit.vue';
import tableSlotCodeHandleEdit from '../tableSlotCodeHandleEdit.vue';
import dbTables from '../../../components/dbTables.vue';
import menuPerms from '../../../components/menuPerm.vue';

export default {
    components: {
        KevinLog,
        KevinEditors,
        tableSlotInputEdit,
        tableSlotSelectEdit,
        tableSlotInputNumberEdit,
        tableSlotRadioEdit,
        tableDatePickerEdit,
        tableSlotUpload,
        tableSlotSwitchEdit,
        tableSlotElLinkEdit,
        tableSlotCodeHandleEdit,
        Sortable,
        dbTables,
        menuPerms
    },
    data() {
        return {
            showmenuPerm: false,
            showDbTable: false,
            showComponent: false,
            conponentsName: "",
            showtableSlotRadioEdit: false,
            showtableSlotInputNumberEdit: false,
            showtableSlotSelectEdit: false,
            showtableSlotInputEdit: false,
            tableSlotEditIndex: -1,
            showLog: false,
            editParams: {
                events: {},
            },
            editType: '',
            editIndex: ''
        }
    },
    methods: {
        e_editsortChange() {
            this.editType = 'sortChange'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.sortChange || "console.log('column', column); console.log('prop', prop); console.log('order', order); console.log('widgetInfo', widgetInfo); " });

        },
        e_editselectionChange() {
            this.editType = 'selectionChange'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.selectionChange || ' widgetInfo.tableSelect[parentWidgetInfo.prop].tableSelectData = selectList' });
        },
        setPerm(perm) {
            this.showComponent = false
            if (this.editType == 'editActionButtonPerm') {
                let obj = this.editParams.tableActions[this.editIndex];
                obj.perm = perm
                this.$set(this.editParams.tableActions, this.editIndex, obj)
            }
            this.editParams = { ...this.editParams }
        },
        e_editActionButtonPerm(scope) {
            console.log('scope', scope)
            this.editType = 'editActionButtonPerm'
            this.editIndex = scope.$index
            this.showComponent = true
            this.conponentsName = 'menuPerms'
            this.$nextTick(() => {
                this.$refs.component.init()
            })
        },
        e_deleteActionButton(index) {
            this.$confirm('确定删除该按钮').then(() => {
                this.editParams.tableActions.splice(index, 1)
            })
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
        e_addActionButton() {
            let params = {
                title: '按钮1',
                isHide: false,
                actionStatusEvents: '',
                events: ''
            }
            this.editParams.tableActions.push(params)
        },
        e_saveSlotInputEdit(params) {
            this.showtableSlotInputEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveSlotSelectEdit(params) {
            console.log('表格插槽下拉框组件编辑', params)
            this.showtableSlotSelectEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveSlotInputNumberEdit(params) {
            this.showtableSlotInputNumberEdit = false
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params
        },
        e_saveVmoduleEdit(params) {
            this.showComponent = false
            console.log('表格插槽组件编辑', params)
            this.editParams.tableColumns[this.tableSlotEditIndex].vModelActionOptions = params

        },
        e_editColumsSortMethod(scope) {
            this.editType = 'editSortMethod'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.sortMethod || "return 1" });

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
            } else if (scope.row.vModelActionType == 'datePicker') {
                this.showComponent = true
                this.conponentsName = 'tableDatePickerEdit'
                this.$nextTick(() => {
                    this.$refs.component.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'upload') {
                this.showComponent = true
                this.conponentsName = 'tableSlotUpload'
                this.$nextTick(() => {
                    this.$refs.component.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'switch') {
                this.showComponent = true
                this.conponentsName = 'tableSlotSwitchEdit'
                this.$nextTick(() => {
                    this.$refs.component.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'elLink') {
                this.showComponent = true
                this.conponentsName = 'tableSlotElLinkEdit'
                this.$nextTick(() => {
                    this.$refs.component.init(scope.row.vModelActionOptions || {})
                })
            } else if (scope.row.vModelActionType == 'codeHandle') {
                this.showComponent = true
                this.conponentsName = 'tableSlotCodeHandleEdit'
                this.$nextTick(() => {
                    this.$refs.component.init(scope.row.vModelActionOptions || {})
                })
            }

        },
        e_editHandleHeaderCode(scope) {
            this.editType = 'editHandleHeaderCode'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.handleHeaderCode || "return h('div', [ h( 'el-button', { props: { type: 'warning', size: 'small' }, style: 'color:#fff;', on: { click: function () { console.log('ctx', ctx); console.log('_this', _this); console.log('widgetInfo', widgetInfo); }, }, }, '自定义表头' ), ]); " });
        },
        setDbTable(params) {
            this.showDbTable = false
            let info = this.editParams.tableColumns[this.editIndex]
            info.prop = params.keyName
            info.vModelType = params.type
            info.tableName = params.tableName
            this.$set(this.editParams.tableColumns, this.editIndex, info)
        },
        e_selDbTable(index) {
            this.editIndex = index
            this.showDbTable = true
            this.$nextTick(() => {
                this.$refs.dbTable.init()
            })
        },
        e_confirmColumnsProp(row) {
            row.slotName = row.prop
        },
        e_deleteColumns(index) {
            this.$confirm('确定删除该列？').then(() => {
                this.editParams.tableColumns.splice(index, 1)
            })
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
        e_addActionIndex() {
            let params = {
                type: 'index',
                fixed: 'left',
                checked: true,
                prop: 'index',
                label: '序号',
                slotName: 'index'
            }
            this.editParams.tableColumns.push(params)
        },
        e_addActionColumn() {
            let params = {
                type: 'action',
                fixed: 'right',
                checked: true,
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
                checked: true,
                slotName: "prop",
                vModelType: 'fixed',
                vModelActionType: "-",
                vModelActionOptions: {}
            }
            this.editParams.tableColumns.push(params)

        },
        handleEditorInput(code) {
            if (this.editType == 'tableActionStatusEvents') {
                this.editParams.tableActions[this.editIndex].actionStatusEvents = this.formatCode(code)
            } else if (this.editType == 'tableActionEvents') {
                this.editParams.tableActions[this.editIndex].events = this.formatCode(code)
            } else if (this.editType == 'paginEvents') {
                this.editParams.paginationEvents = this.formatCode(code)
            } else if (this.editType == 'selectionChange') {
                this.editParams.events.selectionChange = this.formatCode(code)
            } else if (this.editType == 'editHandleHeaderCode') {
                this.editParams.tableColumns[this.editIndex].handleHeaderCode = this.formatCode(code)
            } else if (this.editType == 'sortChange') {
                this.editParams.events.sortChange = this.formatCode(code)
            } else if (this.editType == 'editSortMethod') {
                this.editParams.tableColumns[this.editIndex].sortMethod = this.formatCode(code)
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
        save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('confirm', this.editParams)
                }
            })
        },
        e_close() {
            this.$emit('close')
        },
        init(params) {
            this.$refs.KevinLog.isFullScreen = true
            this.showLog = true
            this.editParams = JSON.parse(JSON.stringify(params))
            if (!this.editParams.events) {
                this.editParams.events = {}
            }
        }
    }
}
</script>

<style scoped lang="scss">
.b_b_container {
    width: 100%;
    display: flex;
    flex-direction: row;

    .b_b_c_left {
        width: 50%;

    }

    .b_b_c_right {
        flex: 1;
        margin-left: 0.7rem;
    }
}
</style>
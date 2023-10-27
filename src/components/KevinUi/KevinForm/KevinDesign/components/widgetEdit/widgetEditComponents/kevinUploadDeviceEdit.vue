<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="100px" class="demo-ruleForm">
            <el-divider content-position="left">附件类型维护</el-divider>
            <el-row style="margin:0.7rem 0">
                <el-col :span="24">
                    <el-button size="small" type="primary" style="margin-bottom: 0.7rem;"
                        @click="e_addType">新增类型</el-button>
                </el-col>
                <el-col :span="24">
                    <el-table :data="editParams.typeList" style="width: 100%" border>
                        <el-table-column prop="label" label="类型名称" align="center"></el-table-column>
                        <el-table-column prop="value" label="类型值" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="e_deletetype(scope.$index)">删除</el-button>
                                <el-button type="text" @click="e_setDefaultType(scope.row)">设为默认类型</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12" style="margin-top: 0.7rem;">
                    <el-form-item label="默认附件类型">
                        <el-input v-model="editParams.selectType" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">附件基础维护</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上传地址" prop="options.action"
                        :rules="[{ required: true, message: '请维护好附件上传的Api地址', trigger: 'blur' }]">
                        <el-input v-model="editParams.options.action"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">附件列表操作维护</el-divider>
            <el-row style="margin:0.7rem 0">
                <el-col :span="24">
                    <el-button size="small" type="primary" style="margin-bottom: 0.7rem;"
                        @click="e_addActionButton">新增操作</el-button>
                </el-col>
                <el-col :span="24">
                    <el-table :data="editParams.actionList" style="width: 100%" border>
                        <el-table-column prop="label" label="类型名称" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.label"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态脚本" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    :style="{ color: editType == 'statusEvents' && editIndex == scope.$index ? 'red' : '' }"
                                    type="text" @click="e_editStatusEvents(scope)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="事件脚本" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    :style="{ color: editType == 'clickEvents' && editIndex == scope.$index ? 'red' : '' }"
                                    type="text" @click="e_editClickEvents(scope)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="e_deleteActionButton(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
        <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />
    </widgetEditContainer>
</template>

<script>
import KevinEditors from '../../../../../../KevinEditor/index'
import widgetEditContainer from '../components/widgetEditContainer.vue'

export default {
    components: {
        KevinEditors,
        widgetEditContainer
    },
    data() {
        return {
            editParams: {
                typeList: [],
                actionList: [],
                options: {}
            },
            editType: '',
            editIndex: '',
        }
    },
    methods: {
        handleEditorInput(code) {
            if (this.editType == 'statusEvents') {
                this.editParams.actionList[this.editIndex].statusEvents = this.formatCode(code)
            } else if (this.editType == 'clickEvents') {
                this.editParams.actionList[this.editIndex].clickEvents = this.formatCode(code)
            }
        },
        e_editClickEvents(scope) {
            this.editIndex = scope.$index
            this.editType = 'clickEvents'
            this.$refs.KevinEditors.changeEditor({ value: scope.row.clickEvents });
        },
        e_editStatusEvents(scope) {
            this.editIndex = scope.$index
            this.editType = 'statusEvents'
            this.$refs.KevinEditors.changeEditor({ value: scope.row.statusEvents });
        },
        e_deleteActionButton(index) {
            this.$confirm('确定删除该操作按钮').then(() => {
                this.editParams.actionList.splice(index, 1)
            })
        },
        e_addActionButton() {
            let params = {
                label: '按钮',
                statusEvents: '',
                clickEvents: ''
            }
            this.editParams.actionList.push(params)
        },
        e_setDefaultType(row) {
            this.$confirm(`确定设定【${row.label}】为组件的默认上传附件类型`).then(() => {
                this.editParams.selectType = row.label
            })
        },
        e_deletetype(index) {
            this.$confirm('确定删除已添加的业务类型，删除类型并不会影响已绑定类型数据的展示').then(() => {
                this.editParams.typeList.splice(index, 1)
            })
        },
        e_addType() {
            this.$prompt('请输入新的附件类型', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'text',
                inputValidator: (value) => {
                    if (!value) {
                        return '类型名称不能为空';
                    }
                }
            }).then(({ value }) => {
                let checkList = this.editParams.typeList.filter(item => {
                    return item.label == value
                })
                if (checkList.length == 0) {
                    let params = {
                        label: value,
                        value
                    }
                    this.editParams.typeList.push(params)
                } else {
                    this.$message.error('该类型已存在')
                }
            })
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
        e_editButtonEvents() {
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events });

        },
        e_save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('save', this.editParams)
                }
            })
        },
        e_close() {
            this.$emit('close')
        },
        init(widgetInfo) {
            this.editParams = widgetInfo
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
        }
    }
}
</script>

<style></style>
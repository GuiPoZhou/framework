<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="8">
                <el-form-item label="组件标题" prop="title" :rules="[{ required: true, message: '请输入组件标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="占据的列数" prop="colSpan">
                    <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="是否默认隐藏" prop="isHide">
                    <el-radio-group v-model="editParams.isHide">
                        <el-radio :label="false">否</el-radio>
                        <el-radio :label="true">是</el-radio>
                    </el-radio-group>

                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="频次key" prop="options.intervalKey"
                    :rules="[{ required: true, message: '请输入频次key', trigger: 'blur' }]">
                    <el-input v-model="editParams.options.intervalKey"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="频次单位key" prop="options.unitKey"
                    :rules="[{ required: true, message: '请输入频次单位key', trigger: 'blur' }]">
                    <el-input v-model="editParams.options.unitKey"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="频次数量key" prop="options.intervalCountKey"
                    :rules="[{ required: true, message: '请输入频次数量key', trigger: 'blur' }]">
                    <el-input v-model="editParams.options.intervalCountKey"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24" style="margin: 0.7rem 0;">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%" border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="label" label="名称">
                    </el-table-column>
                    <el-table-column prop="value" label="值">
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="24">
                <el-form-item label="选定频次事件" prop="events.select"
                    :rules="[{ required: true, message: '请编辑按钮事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events.select" readonly>
                        <el-button slot="append" size="small" @click="e_editButtonEvents">编辑</el-button>
                    </el-input>

                </el-form-item>
            </el-col>
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
            tableData: [
                {
                    label: '秒',
                    value: 'SECOND'
                }, {
                    label: '分钟',
                    value: 'MINUTE'
                }, {
                    label: '小时',
                    value: 'HOUR'
                }, {
                    label: '天',
                    value: 'DAY'
                }, {
                    label: '周',
                    value: 'WEEK'
                }, {
                    label: '月',
                    value: 'MONTH'
                }, {
                    label: '季度',
                    value: 'QUARTER'
                }, {
                    label: '年',
                    value: 'YEAR'
                },
            ],
            editParams: {
                options: {},
                events: {

                }
            }
        }
    },
    methods: {
        handleSelectionChange(e) {
            this.editParams.unitList = e
        },
        handleEditorInput(code) {
            this.editParams.events.select = this.formatCode(code)
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
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.select });

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
            this.selTable()
        },
        selTable() {
            this.$nextTick(() => {
                let selInfo = JSON.parse(JSON.stringify(this.editParams.unitList))
                console.log('selInfo', selInfo)
                let value = selInfo.map(item => {
                    return item.value
                })
                this.tableData.forEach(item => {
                    if (value.indexOf(item.value) != -1) {
                        this.$refs.multipleTable.toggleRowSelection(item);
                    }

                })
            })

        }
    }
}
</script>

<style></style>
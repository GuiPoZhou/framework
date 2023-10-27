<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="12">
                <el-form-item label="占据的列数" prop="colSpan">
                    <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-table :data="editParams.options.autoEvents" style="width: 100%" border>
                    <el-table-column prop="title" label="名称" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.title"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="事件编辑" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="e_editAutoEvents(scope)">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="e_delete(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
            editParams: {
                options: {

                }
            },
            editType: '',
            editIndex: -1
        }
    },
    methods: {
        e_editAutoEvents(scope) {
            this.editIndex = scope.$index
            this.editType = 'autoEvents'
            this.$refs.KevinEditors.changeEditor({ value: scope.row.events });
        },
        e_delete(index) {
            this.$confirm('确定删除该脚本事件').then(() => {
                this.editParams.options.autoEvents.splice(index, 1)
            })
        },
        handleEditorInput(code) {
            if (this.editType == 'autoEvents') {
                this.editParams.options.autoEvents[this.editIndex].events = this.formatCode(code)
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
<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">

            <el-col :span="12">
                <el-form-item label="按钮标题" prop="title" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="表格占屏幕百分比" prop="height">
                    <el-input-number v-model="editParams.height" :min="30" :max="100" label="组件占据列数"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="是否默认隐藏" prop="isHide">
                    <el-radio-group v-model="editParams.isHide">
                        <el-radio :label="false">否</el-radio>
                        <el-radio :label="true">是</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="处理状态值颜色" prop="events.handleStatusColor"
                    :rules="[{ required: true, message: '请编辑事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events.handleStatusColor" readonly>
                        <el-button slot="append" size="small" @click="e_handleStatusColor">编辑</el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="处理状态值名称" prop="events.handleStatusLabel"
                    :rules="[{ required: true, message: '请编辑事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events.handleStatusLabel" readonly>
                        <el-button slot="append" size="small" @click="e_handleStatusLabel">编辑</el-button>
                    </el-input>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="懒加载脚本" prop="events.load"
                    :rules="[{ required: true, message: '请编辑事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events.load" readonly>
                        <el-button slot="append" size="small" @click="e_load">编辑</el-button>
                    </el-input>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="修改状态" prop="events.changeStatus"
                    :rules="[{ required: true, message: '请编辑事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events.changeStatus" readonly>
                        <el-button slot="append" size="small" @click="e_changeStatus">编辑</el-button>
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
            editParams: {
                events: {}
            },
            editType: ''
        }
    },
    methods: {
        setPerm(perm) {
            this.$set(this.editParams, 'perm', perm)
        },
        e_editPerm() {
            this.$emit('selPerm')
        },
        handleEditorInput(code) {
            if (this.editType == 'handleStatusColor') {
                this.$set(this.editParams.events, 'handleStatusColor', this.formatCode(code))
            } else if (this.editType == 'handleStatusLabel') {
                this.$set(this.editParams.events, 'handleStatusLabel', this.formatCode(code))
            } else if (this.editType == 'load') {
                this.$set(this.editParams.events, 'load', this.formatCode(code))
            } else if (this.editType == 'changeStatus') {
                this.$set(this.editParams.events, 'changeStatus', this.formatCode(code))
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
        e_load() {
            this.editType = 'load'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.load });
        },
        e_changeStatus() {
            this.editType = 'changeStatus'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.changeStatus });
        },
        e_handleStatusColor() {
            this.editType = 'handleStatusColor'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.handleStatusColor });
        },
        e_handleStatusLabel() {
            this.editType = 'handleStatusLabel'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.handleStatusLabel });
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
            console.log('widgetInfo', widgetInfo)
            this.editParams = widgetInfo
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
        }
    }
}
</script>

<style></style>
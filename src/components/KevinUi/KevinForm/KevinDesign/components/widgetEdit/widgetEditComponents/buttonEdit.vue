<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="24">
                <el-form-item label="效果展示" prop="title">
                    <el-button style="margin-left: 2rem;" :type="editParams.type" :size="editParams.size"
                        @click="$message.info('效果展示')">{{ editParams.title }}</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="按钮标题" prop="title" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="按钮类型" prop="type" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-select v-model="editParams.type">
                        <el-option label="默认按钮" value="-"></el-option>
                        <el-option label="主要按钮" value="primary"></el-option>
                        <el-option label="成功按钮" value="success"></el-option>
                        <el-option label="信息按钮" value="info"></el-option>
                        <el-option label="警告按钮" value="warning"></el-option>
                        <el-option label="危险按钮" value="danger"></el-option>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="按钮尺寸" prop="size" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-select v-model="editParams.size">
                        <el-option label="中等按钮" value="medium"></el-option>
                        <el-option label="小型按钮" value="small"></el-option>
                        <el-option label="超小按钮" value="mini"></el-option>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="是否默认禁用" prop="disabled">
                    <el-select v-model="editParams.disabled">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
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
                <el-form-item label="按钮事件" prop="events"
                    :rules="[{ required: true, message: '请编辑按钮事件', trigger: 'change' }]">
                    <el-input v-model="editParams.events" readonly>
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
            editParams: {}
        }
    },
    methods: {
        handleEditorInput(code) {
            this.editParams.events = this.formatCode(code)
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
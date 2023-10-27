<template>
    <widgetEditContainer :showLeft="false">
        <el-form slot="wecRight" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="24">
                <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
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
        </el-form>
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
        handleEditorInput(code) {
            this.editParams.events[this.editType] = this.formatCode(code)
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
        e_editButtonEvents(type) {
            this.editType = type

            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events[type] });

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
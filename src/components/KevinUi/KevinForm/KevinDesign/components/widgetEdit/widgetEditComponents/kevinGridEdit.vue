<template>
    <widgetEditContainer :show-left="false">
        <el-form slot="wecRight" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="栅格高度比" prop="height"
                        :rules="[{ required: true, message: '请输入栅格高度', trigger: 'blur' }]">
                        <el-input-number v-model="editParams.height" :min="30" :max="100"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="栅格背景颜色" prop="backgroundColor"
                        :rules="[{ required: true, message: '请选择背景颜色', trigger: 'change' }]">
                        <el-color-picker v-model="editParams.backgroundColor"></el-color-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs type="card" v-model="activeName">
                <el-tab-pane v-for="(gridInfo, gridIndex) in editParams.children" :key="gridIndex"
                    :label="gridInfo.components" :name="gridInfo.components">
                    <el-row>
                        <el-col :span="12" v-if="gridInfo.colSpan != 'flex'">
                            <el-form-item label="子项宽度比"
                                :rules="[{ required: true, message: '请输入子项宽度比', trigger: 'blur' }]">
                                <el-input-number v-model="gridInfo.colSpan" :min="5" :max="50"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

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
            editParams: {},
            activeName: 'kevin-row-left'
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
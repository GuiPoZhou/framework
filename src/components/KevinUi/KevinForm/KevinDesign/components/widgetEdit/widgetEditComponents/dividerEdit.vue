<template>
    <widgetEditContainer :showLeft="false">
        <el-form slot="wecRight" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="24">
                <el-form-item label="分割线标题" prop="title"
                    :rules="[{ required: true, message: '请输入分割线标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="标题位置" prop="contentPosition"
                    :rules="[{ required: true, message: '请选择分割线标题位置', trigger: 'change' }]">
                    <el-select v-model="editParams.contentPosition">
                        <el-option label="左侧" value="left"></el-option>
                        <el-option label="右侧" value="right"></el-option>
                        <el-option label="居中" value="center"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

        </el-form>
    </widgetEditContainer>
</template>

<script>
import widgetEditContainer from '../components/widgetEditContainer.vue'

export default {
    components: {
        widgetEditContainer
    },
    data() {
        return {
            editParams: {}
        }
    },
    methods: {
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
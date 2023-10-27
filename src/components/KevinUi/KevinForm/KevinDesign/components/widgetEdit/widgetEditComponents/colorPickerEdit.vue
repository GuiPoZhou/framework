<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-col :span="12">
                <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-input v-model="editParams.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="尺寸" prop="size" :rules="[{ required: true, message: '请输入按钮标题', trigger: 'blur' }]">
                    <el-select v-model="editParams.size">
                        <el-option label="中等" value="medium"></el-option>
                        <el-option label="小型" value="small"></el-option>
                        <el-option label="超小" value="mini"></el-option>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否设置透明度" prop="showAlpha">
                    <el-radio-group v-model="editParams.showAlpha">
                        <el-radio :label="false">否</el-radio>
                        <el-radio :label="true">是</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="绑定值类型" prop="vModelType">
                    <el-select v-model="editParams.vModelType">
                        <el-option label="固定参数" value="fixed"></el-option>
                        <el-option label="扩展参数" value="ext"></el-option>

                    </el-select>
                </el-form-item>
            </el-col>
           
            <el-col :span="12">
                <el-form-item label="颜色格式" prop="colorFormat">
                    <el-select v-model="editParams.colorFormat">
                        <el-option label="hsl" value="hsl"></el-option>
                        <el-option label="hsv" value="hsv"></el-option>
                        <el-option label="hex" value="hex"></el-option>
                        <el-option label="rgb" value="rgb"></el-option>

                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否默认禁用" prop="disabled">
                    <el-select v-model="editParams.disabled">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否默认隐藏" prop="isHide">
                    <el-radio-group v-model="editParams.isHide">
                        <el-radio :label="false">否</el-radio>
                        <el-radio :label="true">是</el-radio>
                    </el-radio-group>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否必填" prop="rules.isValidate">
                    <el-select v-model="editParams.rules.isValidate">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" v-if="editParams.rules.isValidate">
                <el-form-item label="表单验证触发方式" prop="rules.validateType">
                    <el-select v-model="editParams.rules.validateType">
                        <el-option label="Blur" value="blur"></el-option>
                        <el-option label="Change" value="change"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" v-if="editParams.rules.isValidate">
                <el-form-item label="表单验证提示语" prop="rules.validateTitle"
                    :rules="[{ required: true, message: '请输入表单验证提示语', trigger: 'blur' }]">
                    <el-input v-model="editParams.rules.validateTitle"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="事件" prop="events.change">
                    <el-input v-model="editParams.events.change" readonly>
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
            editParams: {
                events:{}
            }
        }
    },
    methods: {
        handleEditorInput(code) {
            this.editParams.events.change = this.formatCode(code)
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
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.change });

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
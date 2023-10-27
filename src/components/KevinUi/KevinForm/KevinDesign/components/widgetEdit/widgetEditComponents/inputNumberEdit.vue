<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm"
            label-position="top">
            <el-divider content-position="left">计数器组件基本属性</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="计数器组件标题" prop="title"
                        :rules="[{ required: true, message: '请输入计数器组件标题', trigger: 'blur' }]">
                        <el-input v-model="editParams.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="占据的列数" prop="colSpan">
                        <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="绑定值(vModel)" prop="vModel"
                        :rules="[{ required: true, message: '请输入绑定值', trigger: 'blur' }]">
                        <el-input v-model="editParams.vModel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="绑定值类型(vModelType)" prop="vModelType">
                        <el-select v-model="editParams.vModelType">
                            <el-option label="固定参数" value="fixed"></el-option>
                            <el-option label="扩展参数" value="ext"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="占位文本(placeholder)" prop="placeholder">
                        <el-input v-model="editParams.placeholder"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否默认隐藏" prop="isHide">
                        <el-select v-model="editParams.isHide">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否默认禁用" prop="disabled">
                        <el-select v-model="editParams.disabled">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计数器允许的最小值" prop="min">
                        <el-input-number v-model="editParams.min"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计数器允许的最大值" prop="max">
                        <el-input-number v-model="editParams.max"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计数器步长" prop="step">
                        <el-input-number v-model="editParams.step"></el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否只能输入 step 的倍数" prop="stepStrictly">
                        <el-select v-model="editParams.stepStrictly">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="数值精度" prop="precision">
                        <el-input-number v-model="editParams.precision"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否必填" prop="rules.isValidate">
                        <el-select v-model="editParams.rules.isValidate">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editParams.rules.isValidate">
                    <el-form-item label="表单验证触发方式" prop="rules.validateType">
                        <el-select v-model="editParams.rules.validateType">
                            <el-option label="Blur" value="blur"></el-option>
                            <el-option label="Change" value="change"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editParams.rules.isValidate">
                    <el-form-item label="表单验证提示语" prop="rules.validateTitle"
                        :rules="[{ required: true, message: '请输入表单验证提示语', trigger: 'blur' }]">
                        <el-input v-model="editParams.rules.validateTitle"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">计数器组件事件</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Blur" prop="events.blur">
                        <el-input v-model="editParams.events.blur" readonly>
                            <el-button slot="append" size="small" @click="e_editInputEvents('blur')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Focus" prop="events.focus">
                        <el-input v-model="editParams.events.focus" readonly>
                            <el-button slot="append" size="small" @click="e_editInputEvents('focus')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Change" prop="events.change">
                        <el-input v-model="editParams.events.change" readonly>
                            <el-button slot="append" size="small" @click="e_editInputEvents('change')">编辑</el-button>
                        </el-input>
                    </el-form-item>
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
                rules: {
                    isValidate: false
                },
                events:{}
            },
            editType: ''
        }
    },
    methods: {
        e_editInputEvents(type) {
            this.editType = type
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events[type] || 'console.log("事件")' });

        },
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
        e_save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('save', this.editParams)
                }
            })
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
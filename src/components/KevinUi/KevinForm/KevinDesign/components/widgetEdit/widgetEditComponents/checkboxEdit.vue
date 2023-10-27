<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" label-position="top" ref="editParams" label-width="130px"
            class="demo-ruleForm">
            <el-divider content-position="left">多选框基本属性</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="CheckBox标题" prop="title"
                        :rules="[{ required: true, message: '请输入组件标题', trigger: 'blur' }]">
                        <el-input v-model="editParams.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="占据的列数" prop="colSpan">
                        <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否默认隐藏" prop="isHide">
                        <el-select v-model="editParams.isHide">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="绑定值(vModel)" prop="vModel"
                        :rules="[{ required: true, message: '请输入绑定值', trigger: 'blur' }]">
                        <el-input v-model="editParams.vModel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="绑定值类型(vModelType)" prop="vModelType">
                        <el-select v-model="editParams.vModelType">
                            <el-option label="固定参数" value="fixed"></el-option>
                            <el-option label="扩展参数" value="ext"></el-option>

                        </el-select>
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
                <el-col :span="12">
                    <el-form-item label="是否默认禁用" prop="disabled">
                        <el-select v-model="editParams.disabled">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">多选框数据源配置</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="获取远程数据脚本" prop="options.optionsGetEvents">
                        <el-input v-model="editParams.options.optionsGetEvents" readonly>
                            <el-button slot="append" size="small" @click="e_editSelectServerEvents">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="远程脚本执行方式" prop="options.executionMethod">
                        <el-select v-model="editParams.options.executionMethod">
                            <el-option label="自动执行" value="auto"></el-option>
                            <el-option label="被动执行" value="manually"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="margin-bottom: 0.3rem;">
                    <el-button size="mini" type="success" @click="e_tastOptionsGetEvents">远程脚本测试</el-button>
                </el-col>
                <el-col :span="24">
                    <el-table :data="editParams.options.list" style="width: 100%" border>
                        <el-table-column prop="label" label="标题(label)" align="center">
                        </el-table-column>
                        <el-table-column prop="value" label="值(value)" align="center">
                        </el-table-column>
                    </el-table>
                </el-col>


            </el-row>
            <el-divider content-position="left">多选框事件配置</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="CheckboxGroupChange事件" prop="events.change">
                        <el-input v-model="editParams.events.change" readonly>
                            <el-button slot="append" @click="e_editChange">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="CheckboxChange事件" prop="events.boxChange">
                        <el-input v-model="editParams.events.boxChange" readonly>
                            <el-button slot="append" @click="e_editBoxChange">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />
    </widgetEditContainer>
</template>

<script>
import widgetEditContainer from '../components/widgetEditContainer.vue'
import KevinEditors from '../../../../../../KevinEditor/index'
export default {
    components: {
        widgetEditContainer,
        KevinEditors
    },
    data() {
        return {
            editParams: {
                rules:{},
                events: {}
            },
            editType: ''
        }
    },
    methods: {
        e_editBoxChange(){
            this.editType = 'boxchangeEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.boxChange || "console.log('选择check')" });
        },
        e_editChange() {
            this.editType = 'changeEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.change || "console.log('选择check')" });
        },
        e_editSelectServerEvents() {
            this.editType = 'serverDataEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.options.optionsGetEvents || "let params = { label: '测试', value: 0, }; widgetInfo.options.list = [params]; " });
        },
        e_tastOptionsGetEvents() {
            if (this.editParams.options.optionsGetEvents == '') {
                this.$message.error('请先编码数据源远程获取脚本')
                return
            }
            new Function('ctx', 'widgetInfo', this.editParams.options.optionsGetEvents)(window.KevinContext, this.editParams)
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
        handleEditorInput(code) {
            if (this.editType == 'changeEvents') {
                this.$set(this.editParams.events, 'change', this.formatCode(code))
            } else if (this.editType == 'serverDataEvents') {
                this.editParams.options.optionsGetEvents = this.formatCode(code)
            }else if(this.editType == 'boxchangeEvents'){
                this.$set(this.editParams.events, 'boxChange', this.formatCode(code))

            }

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

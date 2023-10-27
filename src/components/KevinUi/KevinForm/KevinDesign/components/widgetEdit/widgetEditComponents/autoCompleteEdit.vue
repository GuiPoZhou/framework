<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm"
            label-position="top">
            <el-divider>输入框基本属性</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="输入框标题" prop="title"
                        :rules="[{ required: true, message: '请输入输入框标题', trigger: 'blur' }]">
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
            <el-divider>输入框事件</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="获取远程数据脚本" prop="events.fetchSuggestions">
                        <el-input v-model="editParams.events.fetchSuggestions" readonly>
                            <el-button slot="append" size="small"
                                @click="e_editInputEvents('fetchSuggestions')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="选择项脚本" prop="events.select">
                        <el-input v-model="editParams.events.select" readonly>
                            <el-button slot="append" size="small" @click="e_editInputEvents('select')">编辑</el-button>
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
                slot: {
                    isSlot: false,
                    options: {
                        list: []
                    }
                },
                events: {

                }
            },
            editType: ''
        }
    },
    methods: {
        e_deleteSlotSelectData(index) {
            this.$confirm('确定删除选择的数据?').then(() => {
                this.editParams.slot.options.list.splice(index, 1)
            })
        },
        e_addSlotSelectData() {
            let params = {
                label: '选项',
                value: '选项'
            }
            this.editParams.slot.options.list.push(params)
        },
        e_selInutSlot() {
            if (this.editParams.slot.slotType == 'select') {
                this.editParams.slot = {
                    isSlot: true,
                    slotType: 'select',
                    vModel: 'slotvModel',
                    vModelType: 'ext',
                    options: {
                        list: []
                    }
                }
            } else if (this.editParams.slot.slotType == 'button') {
                this.editParams.slot = {
                    isSlot: true,
                    slotType: 'button',
                    events: {

                    }
                }
            }
            this.editParams = { ...this.editParams }
        },
        handleEditorInput(code) {
            if (this.editType == 'slotButton') {
                this.editParams.slot.events.slotButtonEvents = this.formatCode(code)
            } else if (this.editType == 'slotButtonCallBack') {
                this.editParams.slot.events.callBackEvents = this.formatCode(code)
            } else {
                this.editParams.events[this.editType] = this.formatCode(code)
            }
            // this.editParams = {...this.editParams}
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
        e_editInputEvents(type) {
            this.editType = type
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events[type] || 'console.log("事件")' });

        },
        e_editSlotButtonCallBackEvents() {
            this.editType = 'slotButtonCallBack'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.slot.events.callBackEvents || 'console.log("插槽按钮回调事件")' });

        },
        e_editSlotButtonEvents() {
            this.editType = 'slotButton'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.slot.events.slotButtonEvents || 'console.log("插槽按钮事件")' });

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
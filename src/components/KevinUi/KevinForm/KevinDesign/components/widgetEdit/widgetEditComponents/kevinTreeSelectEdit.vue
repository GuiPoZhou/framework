<template>
    <div class="selectEditArea">
        <div class="s_e_a_left">
            <el-form :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm" label-position="top">
                <el-divider>树形下拉组件基本属性</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="选择框标题" prop="title"
                            :rules="[{ required: true, message: '请输入选择框标题', trigger: 'blur' }]">
                            <el-input v-model="editParams.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="占据的列数" prop="colSpan">
                            <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
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
                        <el-form-item label="占位文本(placeholder)" prop="placeholder">
                            <el-input v-model="editParams.placeholder"></el-input>
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
                        <el-form-item label="是否可清空" prop="clearable">
                            <el-select v-model="editParams.clearable">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>

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
                </el-row>
                <el-divider>树形下拉组件数据源配置</el-divider>
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

                <el-divider>树形下拉组件事件</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内容值normalizer" prop="events.normalizer">
                            <el-input v-model="editParams.events.normalizer" readonly>
                                <el-button slot="append" size="small"
                                    @click="e_editSelectEvents('normalizer')">编辑</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="选择事件脚本" prop="events.select">
                            <el-input v-model="editParams.events.select" readonly>
                                <el-button slot="append" size="small" @click="e_editSelectEvents('select')">编辑</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
        </div>
        <div class="s_e_a_right">
            <KevinEditors ref="KevinEditors" @input="handleEditorInput" />
        </div>
    </div>
</template>

<script>
import KevinEditors from '../../../../../../KevinEditor/index'

export default {
    components: {
        KevinEditors
    },
    data() {
        return {
            editParams: {
                rules: {
                    isValidate: false
                },
                slot: {
                    isSlot: false
                },
                props: {},
                options: {},
                events: {}
            },
            editType: ''
        }
    },
    methods: {
        handleEditorInput(code) {
            if (this.editType == 'slotButton') {
                this.editParams.slot.events.slotButtonEvents = this.formatCode(code)
            } else if (this.editType == 'slotButtonCallBack') {
                this.editParams.slot.events.callBackEvents = this.formatCode(code)
            } else if (this.editType == 'serverDataEvents') {
                this.editParams.options.optionsGetEvents = this.formatCode(code)
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
        e_tastOptionsGetEvents() {
            if (this.editParams.options.optionsGetEvents == '') {
                this.$message.error('请先编码数据源远程获取脚本')
                return
            }
            new Function('ctx', 'widgetInfo', this.editParams.options.optionsGetEvents)(window.KevinContext, this.editParams)
        },
        e_editSelectServerEvents() {
            this.editType = 'serverDataEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.options.optionsGetEvents || "let params = { label: '测试', value: 0, }; widgetInfo.options.list = [params]; " });
        },
        e_editSelectEvents(type) {
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
            console.log('this.editParams ', this.editParams)
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.selectEditArea {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;

    .s_e_a_left {
        width: 50%;
        height: 100%;
        background-color: #fff;

        overflow: auto;
        padding: 0.7rem;
        padding-bottom: 3rem;
        border-radius: 10px;
        scrollbar-width: none;
        /* 隐藏标准滚动条（适用于Firefox） */
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            width: 0;
            /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
        }
    }

    .s_e_a_right {
        flex: 1;
        height: 100%;
        padding: 0.7rem 0;
        margin-left: 0.7rem;
        border-radius: 10px;
        overflow: auto;
        background-color: #fff;
    }

}
</style>

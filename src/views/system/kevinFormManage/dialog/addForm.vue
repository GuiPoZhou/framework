<template>
    <BoDialog ref="BoDialog" :diaLogShow="showdiaLogShow" @close="e_close" diaLogTitle="低码维护" width="40%">
        <template slot="bologbody">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>

                    <el-col :span="24">
                        <el-form-item label="模块名称" prop="name"
                            :rules="[{ required: true, message: '请选择项目名称', trigger: 'change' }]">
                            <el-select v-model="ruleForm.name">
                                <el-option label="基础模块（Foundation）" value="foundation"></el-option>
                                <el-option label="通用模块（Generic）" value="generic"></el-option>
                                <el-option label="项目独立模块（Project）" value="project"></el-option>
                                <el-option label="基座模块（Framework）" value="framework"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label="功能菜单" prop="extData.menu"
                            :rules="[{ required: true, message: '请选择项目名称', trigger: 'change' }]">
                            <el-select v-model="ruleForm.extData.menu">
                                <el-option label="委托" value="委托"></el-option>
                                <el-option label="设备" value="设备"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label="标题" prop="title"
                            :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.title"
                                placeholder="标题应当提现出模块所属关系（建议：foundation-委托协议-委托编制弹框）"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="低码类型" prop="remark"
                            :rules="[{ required: true, message: '请选择低码类型', trigger: 'chagne' }]">
                            <el-select v-model="ruleForm.remark" :disabled="showType == 'edit'">
                                <el-option label="低码表单" value="lowcode_form"></el-option>
                                <el-option label="低码插件" value="lowcode_project"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="唯一键" prop="id"
                            :rules="[{ required: true, message: '请输入唯一键', trigger: 'blur' }, { validator: validateKeyName, trigger: 'blur' }]">
                            <el-input :disabled="showType == 'edit'" v-model="ruleForm.id"></el-input>
                        </el-form-item>
                    </el-col>



                </el-row>
            </el-form>
        </template>
        <template slot="bologfooter">
            <el-button type="primary" size="small" @click="e_save">保存</el-button>
            <el-button size="small" @click="e_close">关闭</el-button>
        </template>
    </BoDialog>
</template>
<script>
export default {
    data() {
        return {
            showdiaLogShow: false,
            ruleForm: {
                id: undefined,
                title: undefined,
                namePre: '',
                name: undefined,
                remark: 'lowcode_form',
                config: {
                    KevinJson: {
                        KevinWidget: {
                            title: "表单设计",
                            formlabelPosition: "top",
                            autoEvents: {},
                            manuallyEvents: {},
                            diaLogFooterButton: [],
                            children: []
                        },
                        KevinLogWidgets: []
                    }
                },
                extData: {}
            },
            LowCodeFormConfig: {
                KevinJson: {
                    KevinWidget: {
                        title: "表单设计",
                        formlabelPosition: "right",
                        autoEvents: {},
                        manuallyEvents: {},
                        diaLogFooterButton: [],
                        children: []
                    },
                    KevinLogWidgets: []
                }
            },
            ProjectOnlyConfig: {
                mainHomeButtons: [],
                mainTableButtons: [],
                mainDialogBottomButtons: [],
                businessCode: {}
            },
            showType: 'add'
        }
    },
    watch: {
        "ruleForm.remark"(val) {
            if (val == 'lowcode_form') {
                this.ruleForm.config = this.LowCodeFormConfig
            } else if (val == 'lowcode_project') {
                this.ruleForm.config = this.ProjectOnlyConfig
            }
            console.log('this.ruleForm.config', this.ruleForm.config)
        }
    },
    methods: {
        e_close() {
            this.$emit('close')
        },
        validateKeyName(rule, value, callback) {
            if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value)) {
                callback();
            } else {
                callback(new Error('键名不符合 JavaScript 标识符规范'));
            }
        },
        e_save() {
            this.$refs.ruleForm.validate(v => {
                if (v) {
                    let config = this.ruleForm.config
                    let formLayoutConfigStr = JSON.stringify(config)
                    let resultStr = formLayoutConfigStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    this.ruleForm.config = JSON.parse(resultStr)
                    this.$net('/formLayout/v2/saveOrUpdateFormLayoutConfig', 'post', this.ruleForm).then(re => {
                        if (re.code == 200) {
                            this.$message.success('保存成功')
                            this.$emit('reload')
                            this.e_close()
                        } else {
                            this.$message.error(re.msg)
                        }
                    })
                }
            })
        },
        init() {
            this.showdiaLogShow = true
            this.$refs.BoDialog.isFullScreen = false
        },
        editInit(row) {
            this.$refs.BoDialog.isFullScreen = false
            this.showType = 'edit'
            this.showdiaLogShow = true
            this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: row.id }).then(re => {

                this.ruleForm = {
                    id: re.data.id,
                    title: re.data.title,
                    name: re.data.name,
                    remark: re.data.remark,
                    extData:re.data.extData ||{}
                }
                if (re.data.remark == 'lowcode_form') {
                    this.ruleForm.config = re.data.config
                } else if (re.data.remark == 'lowcode_project') {
                    this.ProjectOnlyConfig = re.data.config
                }
            })
        }
    }
}
</script>
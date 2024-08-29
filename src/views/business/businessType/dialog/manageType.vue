<template>
    <bo-dialog :dia-log-show="showlog" :dia-log-title="'维护业务类型'" :diaLogWidth="'60%'" @close="e_close"
        :fullScreen="isFullScreen">
        <template slot="bologbody">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属分支" prop="belongToBranch"
                            :rules="[{ required: true, message: '请输入所属分支', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.belongToBranch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务类型编码" prop="businessTypeCode"
                            :rules="[{ required: true, message: '请输入业务类型编码', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.businessTypeCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务类型名称" prop="businessTypeName"
                            :rules="[{ required: true, message: '请输入业务类型名称', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.businessTypeName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="显示顺序" prop="orderNum">
                            <el-input-number v-model="ruleForm.orderNum" :min="1"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否可见" prop="visible"
                            :rules="[{ required: true, message: '请选择是否可见', trigger: 'change' }]">
                            <el-select v-model="ruleForm.visible" placeholder="请选择">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </template>
        <template slot="bologfooter">
            <el-button size="small" type="primary" @click="e_save" :loading="buttonLoading">保存</el-button>
            <el-button size="small" @click="e_close" :loading="buttonLoading">取消</el-button>
        </template>
    </bo-dialog>
</template>

<script>
import boDialog from '../../../../components/Boshland/BoContainer/boDialog.vue'
export default {
    components: { boDialog },
    data() {
        return {
            buttonLoading: false,
            showlog: false,
            ruleForm: {},
            isFullScreen: true
        }
    },
    methods: {
        e_save() {
            this.$refs.ruleForm.validate(v => {
                if (v) {
                    let url = ''
                    if (this.ruleForm.id) {
                        url = '/businessType/edit'
                    } else {
                        url = '/businessType/save'
                    }
                    this.buttonLoading = true
                    setTimeout(() => {
                        this.buttonLoading = false
                    }, 2500)
                    this.$net(url, 'post', this.ruleForm).then(re => {
                        this.buttonLoading = false
                        if (re.code == 200) {
                            this.$message.success('保存成功')
                            this.$emit('saveReload')
                        } else {
                            this.$message.error(re.msg)
                        }
                    })
                }
            })
        },
        init() {
            this.showlog = true
            this.isFullScreen = false
        },
        editInit(row) {
            this.showlog = true
            this.isFullScreen = false
            this.ruleForm = row
        },
        e_close() {
            this.$emit('close')
        }
    }
}
</script>

<style></style>
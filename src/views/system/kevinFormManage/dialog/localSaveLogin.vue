<template>
    <div>
        <el-dialog title="推送远程账户授权" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false"
            @close="e_close">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="授权账户" prop="username"
                            :rules="[{ required: true, message: '请输入授权账户名称', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="账户密码" prop="password"
                            :rules="[{ required: true, message: '请输入授权账户密码', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="验证码" prop="verifyCode"
                            :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                            <el-input v-model="ruleForm.verifyCode">
                                <div slot="append" class="svg" v-html="verifyCodeImg" @click="e_getCaptcha"></div>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="e_close">取 消</el-button>
                <el-button type="primary" @click="e_login">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default {
    props: {
        localSaveHost: String
    },
    data() {
        return {
            dialogVisible: false,
            verifyCodeImg: '',
            ruleForm: {
                captchaId: ''
            }
        }
    },
    methods: {
        init() {
            this.dialogVisible = true
            this.ruleForm.captchaId = uuidv4()
            this.e_getCaptcha()
        },
        e_close() {
            this.$emit('close')
        },
        e_getCaptcha() {
            axios.get(this.localSaveHost + '/admin/base/open/captcha?height=40&width=150').then(re => {
                this.verifyCodeImg = re.data.data.data
            })
        },
        e_login() {
            this.$refs.ruleForm.validate(v => {
                if (v) {
                    axios.post(this.localSaveHost + '/admin/base/open/login', this.ruleForm).then(re => {
                        if (re.data.code == 1000) {
                            this.$message.success('授权账户有效')
                            this.$emit('localLoginSuccess')
                            sessionStorage.setItem('localAccountToken', re.data.data.token)
                        } else {
                            this.$message.error(re.data.message)
                            this.e_getCaptcha()
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.svg {
    height: 34px;
    position: relative;
    cursor: pointer;
}
</style>
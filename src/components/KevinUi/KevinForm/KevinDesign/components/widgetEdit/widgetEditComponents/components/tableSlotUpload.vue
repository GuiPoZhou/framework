<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内Select组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form slot="wecLeft" :model="slotParams" label-position="top" ref="slotParams" label-width="130px"
                        class="demo-ruleForm">
                        <el-divider content-position="left">表格上传组件基本属性</el-divider>
                        <el-row>

                            <el-col :span="12">
                                <el-form-item label="是否默认隐藏" prop="isHide">
                                    <el-select v-model="slotParams.isHide">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否默认禁用" prop="disabled">
                                    <el-select v-model="slotParams.disabled">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="上传地址" prop="action"
                                    :rules="[{ required: true, message: '请输入文件上传地址', trigger: 'blur' }]">
                                    <el-input v-model="slotParams.action" placeholder="/******"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">上传组件事件配置</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="上传成功回调" prop="events.onSuccess">
                                    <el-input v-model="slotParams.events.onSuccess" readonly>
                                        <el-button slot="append" @click="e_editonSuccess">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="下载按钮事件" prop="events.downloadFile">
                                    <el-input v-model="slotParams.events.downloadFile" readonly>
                                        <el-button slot="append" @click="e_editdownloadFile">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="删除按钮事件" prop="events.removeUploadFile">
                                    <el-input v-model="slotParams.events.removeUploadFile" readonly>
                                        <el-button slot="append" @click="e_editremoveUploadFile">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
                <div class="b_b_c_right">
                    <KevinEditors ref="KevinEditors" @input="handleEditorInput" />
                </div>
            </div>
        </template>
        <template slot="bologfooter">
            <el-button type="primary" size="small" @click="save">保存</el-button>
            <el-button size="small" @click="e_close">取消</el-button>
        </template>

    </KevinLog>
</template>

<script>
import KevinLog from '../../../../../../KevinLog/index.vue'
import KevinEditors from '../../../../../../../KevinEditor/index.vue'
export default {
    components: {
        KevinLog,
        KevinEditors
    },
    data() {
        return {
            showLog: false,
            slotParams: {
                events: {}
            },
            editType: ""
        }
    },
    methods: {
        e_editremoveUploadFile() {
            this.editType = 'removeUploadFile'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.removeUploadFile || "ctx.$confirm('确定删除该文件吗？').then(_=>{let list=JSON.parse(JSON.stringify(widgetInfo.fileList));const arr=list.filter(fileInfo=>{return fileInfo.uid!==prop.file.uid});widgetInfo.fileList=arr})" });
        },
        e_editdownloadFile() {
            this.editType = 'downloadFile'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.downloadFile || "let fileInfo = prop.file; window.location.href = window.globalEnv.VUE_APP_BASE_API + '/common/uploadFileDownload?fileName=' + fileInfo.fileName + '&filePath=' + fileInfo.url + '&Authorization=' + getToken() + '&MenuId=' + localStorage.getItem('menuId');" });
        },
        e_editonSuccess() {
            this.editType = 'onSuccess'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.onSuccess || 'console.log("上传回调",res)' });
        },
        handleEditorInput(code) {
            if (this.editType == 'onSuccess') {
                this.slotParams.events.onSuccess = this.formatCode(code)
            } else if (this.editType == 'downloadFile') {
                this.slotParams.events.downloadFile = this.formatCode(code)
            } else if (this.editType == 'removeUploadFile') {
                this.slotParams.events.removeUploadFile = this.formatCode(code)
            }
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
        e_close() {
            this.$emit('close')
        },
        init(slotParams) {
            console.log('slotParams', slotParams)
            this.slotParams = JSON.parse(JSON.stringify(slotParams))
            if (!this.slotParams.events) {
                this.slotParams.events = {}
            }
            this.showLog = true
            this.$refs.KevinLog.isFullScreen = true
        },
        save() {
            this.$emit('save', this.slotParams)
        }
    }
}
</script>

<style scoped lang="scss">
.b_b_container {
    width: 100%;
    display: flex;
    flex-direction: row;

    .b_b_c_left {
        width: 50%;

    }

    .b_b_c_right {
        flex: 1;
        margin-left: 0.7rem;
    }
}
</style>
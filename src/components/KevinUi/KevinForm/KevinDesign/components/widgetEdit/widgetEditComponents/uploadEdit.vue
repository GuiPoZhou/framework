<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" label-position="top" ref="editParams" label-width="130px"
            class="demo-ruleForm">
            <el-divider content-position="left">文件上传组件基本属性</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="标题" prop="title"
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
                    <el-form-item label="是否默认禁用" prop="disabled">
                        <el-select v-model="editParams.disabled">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="最大允许上传个数" prop="limit">
                        <el-input-number v-model="editParams.limit" :min="1"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否允许拖拽上传" prop="drag">
                        <el-select v-model="editParams.drag">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上传地址" prop="action"
                        :rules="[{ required: true, message: '请输入文件上传地址', trigger: 'blur' }]">
                        <el-input v-model="editParams.action" placeholder="/******"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支持的文件类型" prop="accept">
                        <el-input v-model="editParams.accept" placeholder="例：.png,.mp4,"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">上传组件事件配置</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上传成功回调" prop="events.onSuccess">
                        <el-input v-model="editParams.events.onSuccess" readonly>
                            <el-button slot="append" @click="e_editonSuccess">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="文件超出个数限制时的钩子" prop="events.onExceed">
                        <el-input v-model="editParams.events.onExceed" readonly>
                            <el-button slot="append" @click="e_editonExceed">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="下载按钮事件" prop="events.downloadFile">
                        <el-input v-model="editParams.events.downloadFile" readonly>
                            <el-button slot="append" @click="e_editdownloadFile">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="删除按钮事件" prop="events.removeUploadFile">
                        <el-input v-model="editParams.events.removeUploadFile" readonly>
                            <el-button slot="append" @click="e_editremoveUploadFile">编辑</el-button>
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
                events: {}
            },
            editType: ''
        }
    },
    methods: {
        e_editremoveUploadFile() {
            this.editType = 'removeUploadFile'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.removeUploadFile || "ctx.$confirm('确定删除该文件吗？').then(_=>{let list=JSON.parse(JSON.stringify(widgetInfo.fileList));const arr=list.filter(fileInfo=>{return fileInfo.uid!==prop.file.uid});widgetInfo.fileList=arr})" });
        },
        e_editdownloadFile() {
            this.editType = 'downloadFile'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.downloadFile || "let fileInfo = prop.file; window.location.href = window.globalEnv.VUE_APP_BASE_API + '/common/uploadFileDownload?fileName=' + fileInfo.fileName + '&filePath=' + fileInfo.url + '&Authorization=' + getToken() + '&MenuId=' + localStorage.getItem('menuId');" });
        },
        e_editonExceed() {
            this.editType = 'onExceed'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.onExceed || 'console.log("上传超出")' });
        },
        e_editonSuccess() {
            this.editType = 'onSuccess'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.onSuccess || 'res.name=res.fileName;widgetInfo.fileList.push(res);' });
        },
        handleEditorInput(code) {
            if (this.editType == 'onSuccess') {
                this.editParams.events.onSuccess = this.formatCode(code)
            } else if (this.editType == 'downloadFile') {
                this.editParams.events.downloadFile = this.formatCode(code)
            } else if (this.editType == 'removeUploadFile') {
                this.editParams.events.removeUploadFile = this.formatCode(code)
            }else if(this.editType == 'onExceed'){
                this.editParams.events.onExceed = this.formatCode(code)
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
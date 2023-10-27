<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内超链接组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px"
                        class="demo-ruleForm">
                        <el-divider content-position="left">超链接基础属性</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="是否禁止操作" prop="disabled">
                                    <el-select v-model="slotParams.disabled">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否下划线" prop="underline">
                                    <el-select v-model="slotParams.underline">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="类型" prop="type">
                                    <el-select v-model="slotParams.type">
                                        <el-option label="默认" value="default"></el-option>
                                        <el-option label="主要颜色" value="primary"></el-option>
                                        <el-option label="成功颜色" value="success"></el-option>
                                        <el-option label="信息颜色" value="info"></el-option>
                                        <el-option label="警告颜色" value="warning"></el-option>
                                        <el-option label="危险颜色" value="danger"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="图标类名" prop="icon">
                                    <el-input v-model="slotParams.icon"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">超链接事件</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="点击事件" prop="events.click">
                                    <el-input v-model="slotParams.events.click" readonly>
                                        <el-button slot="append" @click="e_editClick">编辑</el-button>
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
            editType: {}
        }
    },
    methods: {
        e_editClick() {
            this.editType = 'editClick'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.click || "console.log('scope',scope)" });
        },
        handleEditorInput(code) {
            if (this.editType == 'editClick') {
                this.$set(this.slotParams.events, 'click', this.formatCode(code))
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
            if(!this.slotParams.events){
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
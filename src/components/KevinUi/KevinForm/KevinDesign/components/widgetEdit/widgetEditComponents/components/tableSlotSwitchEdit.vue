<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内Switch组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px"
                        class="demo-ruleForm">
                        <el-divider content-position="left">Switch基础属性</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="Switch值的类型" prop="valueType">
                                    <el-select v-model="valueType">
                                        <el-option label="Boolean" value="Boolean"></el-option>
                                        <el-option label="String" value="String"></el-option>
                                        <el-option label="Number" value="Number"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">Switch值的设定</el-divider>
                        <el-row v-if="valueType == 'Boolean'">
                            <el-col :span="12">
                                <el-form-item label="Switch打开时的值" prop="activeValue">
                                    <el-select v-model="slotParams.activeValue">
                                        <el-option label="True" :value="true"></el-option>
                                        <el-option label="False" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Switch关闭时的值" prop="inactiveValue">
                                    <el-select v-model="slotParams.inactiveValue">
                                        <el-option label="True" :value="true"></el-option>
                                        <el-option label="False" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="valueType == 'Number'">
                            <el-col :span="12">
                                <el-form-item label="Switch打开时的值" prop="activeValue">
                                    <el-input-number v-model="slotParams.activeValue" label="描述文字"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Switch关闭时的值" prop="inactiveValue">
                                    <el-input-number v-model="slotParams.inactiveValue" label="描述文字"></el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="valueType == 'String'">
                            <el-col :span="12">
                                <el-form-item label="Switch打开时的值" prop="activeValue">
                                    <el-input v-model="slotParams.activeValue" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Switch关闭时的值" prop="inactiveValue">
                                    <el-input v-model="slotParams.inactiveValue" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">Switch事件</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="Change事件" prop="events.change">
                                    <el-input v-model="slotParams.events.change" readonly>
                                        <el-button slot="append" @click="e_editChange">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="状态脚本" prop="events.statusCode">
                                    <el-input v-model="slotParams.events.statusCode" readonly>
                                        <el-button slot="append" @click="e_editStatusCode">编辑</el-button>
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
            valueType: 'Number',
            editType: {}
        }
    },
    methods: {
        e_editStatusCode() {
            this.editType = 'statusCode'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.statusCode || 'return false' });
        },
        e_editChange() {
            this.editType = 'editChange'
            console.log('this.slotParams', this.slotParams)
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.change || 'console.log("选择开关")' });
        },
        handleEditorInput(code) {
            if (this.editType == 'editChange') {
                this.$set(this.slotParams.events, 'change', this.formatCode(code))
            } else if (this.editType == 'statusCode') {
                this.$set(this.slotParams.events, 'statusCode', this.formatCode(code))
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
            this.slotParams = JSON.parse(JSON.stringify(slotParams))
            this.valueType = this.slotParams.valueType || 'Number'
            if (!this.slotParams.events) {
                this.slotParams.events = {}
            }
            this.showLog = true
            this.$refs.KevinLog.isFullScreen = true
        },
        save() {
            this.slotParams.valueType = this.valueType
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
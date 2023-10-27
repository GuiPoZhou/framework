<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内InputNumber组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px"
                        class="demo-ruleForm">
                        <el-divider content-position="left">InputNumber基础属性</el-divider>
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
                                <el-form-item label="输入提示" prop="placeholder">
                                    <el-input v-model="slotParams.placeholder"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="计数器允许的最小值" prop="min">
                                    <el-input-number v-model="slotParams.min"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="计数器允许的最大值" prop="max">
                                    <el-input-number v-model="slotParams.max"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="计数器步长" prop="step">
                                    <el-input-number v-model="slotParams.step"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否只能输入 step 的倍数" prop="stepStrictly">
                                    <el-select v-model="slotParams.stepStrictly">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="数值精度" prop="precision">
                                    <el-input-number v-model="slotParams.precision"></el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">InputNumber事件</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="Focus事件" prop="events.focus">
                                    <el-input v-model="slotParams.events.focus" readonly>
                                        <el-button slot="append" @click="e_editFocus">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Blur事件" prop="events.blur">
                                    <el-input v-model="slotParams.events.blur" readonly>
                                        <el-button slot="append" @click="e_editBlur">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="Change事件" prop="events.change">
                                    <el-input v-model="slotParams.events.change" readonly>
                                        <el-button slot="append" @click="e_editChange">编辑</el-button>
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
        e_editChange() {
            this.editType = 'editChange'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.change || '' });
            
        },
        e_editBlur() {
            this.editType = 'editBlur'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.blur || '' });
        },
        e_editFocus() {
            this.editType = 'editFocus'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.focus || '' });
        },
        handleEditorInput(code) {
            if (this.editType == 'editFocus') {
                this.slotParams.events.focus = this.formatCode(code)
            } else if (this.editType == 'editBlur') {
                this.slotParams.events.blur = this.formatCode(code)
            } else if (this.editType == 'editChange') {
                this.slotParams.events.change = this.formatCode(code)
            }
            this.slotParams = {...this.slotParams}
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
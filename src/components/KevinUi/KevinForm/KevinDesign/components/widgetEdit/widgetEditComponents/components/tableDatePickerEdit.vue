<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内日期框组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form slot="wecLeft" :model="slotParams" label-position="top" ref="slotParams" label-width="130px"
                        class="demo-ruleForm">
                        <el-col :span="12">
                            <el-form-item label="是否默认禁用" prop="disabled">
                                <el-select v-model="slotParams.disabled">
                                    <el-option label="是" :value="true"></el-option>
                                    <el-option label="否" :value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="显示类型" prop="type">
                                <el-select v-model="slotParams.type" @change="e_selectType">
                                    <el-option label="date" value="date"></el-option>
                                    <el-option label="year" value="year"></el-option>
                                    <el-option label="month" value="month"></el-option>
                                    <el-option label="dates" value="dates"></el-option>
                                    <el-option label="months" value="months"></el-option>
                                    <el-option label="years" value="years"></el-option>
                                    <el-option label="week" value="week"></el-option>
                                    <el-option label="datetime" value="datetime"></el-option>
                                    <el-option label="datetimerange" value="datetimerange"></el-option>
                                    <el-option label="daterange" value="daterange"></el-option>
                                    <el-option label="monthrange" value="monthrange"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="显示日期格式" prop="format">
                                <el-select v-model="slotParams.format">
                                    <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
                                    <el-option label="yyyy-MM-dd HH:mm" value="yyyy-MM-dd HH:mm"></el-option>
                                    <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
                                    <el-option label="yyyy" value="yyyy"></el-option>
                                    <el-option label="yyyy 第 WW 周" value="yyyy 第 WW 周"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="绑定值格式" prop="valueFormat">
                                <el-select v-model="slotParams.valueFormat">
                                    <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
                                    <el-option label="yyyy-MM-dd HH:mm" value="yyyy-MM-dd HH:mm"></el-option>
                                    <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
                                    <el-option label="yyyy" value="yyyy"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12"
                            v-if="slotParams.type == 'datetimerange' || slotParams.type == 'daterange' || slotParams.type == 'monthrange'">
                            <el-form-item label="defaultTime" prop="defaultTime">
                                <el-input v-model="slotParams.defaultTime" readonly>
                                    <el-button slot="append" @click="e_editdefaultTime">编辑</el-button>
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
            editType: {},
            defaultTime:""
        }
    },
    methods: {
        e_selectType() {
            if (this.slotParams.type == 'datetimerange' || this.slotParams.type == 'daterange' || this.slotParams.type == 'monthrange') {
                this.showdefaultTime = true
                this.slotParams.defaultTime = this.defaultTime
            } else {
                this.showdefaultTime = false
                this.slotParams.defaultTime = "(function statusForEdit() { return '-'; })();"
            }
        },
        e_editdefaultTime() {
            this.editType = 'defaultTime'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.defaultTime || "(function defaultTime() { var date = new Date(); var hour = date.getHours(); var minute = date.getMinutes(); var second = date.getSeconds(); let time = []; time.push('00:00:00'); time.push('23:59:59'); return time; })(); " });

        },
        e_editChange() {
            this.editType = 'change'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.change ||'console.log("选择时间")' });
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
        handleEditorInput(code) {
            if (this.editType == 'change') {
                this.$set(this.slotParams.events, 'change', this.formatCode(code))
            } else if (this.editType == 'defaultTime') {
                this.$set(this.slotParams, 'defaultTime', this.formatCode(code))
                this.defaultTime = this.formatCode(code)
            }
            
        },
        e_close() {
            this.$emit('close')
        },
        init(slotParams) {
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
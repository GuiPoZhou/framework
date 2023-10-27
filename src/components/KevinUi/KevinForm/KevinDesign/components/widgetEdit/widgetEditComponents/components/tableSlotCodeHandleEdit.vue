<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内脚本处理组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px"
                        class="demo-ruleForm">
                        <el-divider content-position="left">脚本处理组件基础属性</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="处理后展示组件" prop="showComponent">
                                    <el-select v-model="slotParams.showComponent">
                                        <el-option label="Span" value="Span"></el-option>
                                        <!-- <el-option label="Tag" value="Tag"></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="处理后返回值类型" prop="valueType">
                                    <el-select v-model="slotParams.valueType">
                                        <el-option label="字符串" value="string"></el-option>
                                        <!-- <el-option label="数组" value="array"></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="12">
                                <el-form-item label="是否为展示组件增加点击事件" prop="clickHandle">
                                    <el-select v-model="slotParams.clickHandle">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                        </el-row>
                        <el-divider content-position="left">脚本处理组件事件</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="返回值脚本" prop="events.handle">
                                    <el-input v-model="slotParams.events.handle" read only>
                                        <el-button slot="append" @click="e_editHandle">编辑</el-button>
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
        e_editHandle() {
            this.editType = 'editHandle'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.handle || 'return scope.row' });
        },
        handleEditorInput(code) {
            if (this.editType == 'editHandle') {
                this.$set(this.slotParams.events, 'handle', this.formatCode(code))
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
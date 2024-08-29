<template>
    <div class="b_b_container">
        <div class="b_b_c_left">
            <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px" class="demo-ruleForm">
                <el-divider content-position="left">内容处理</el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="返回值脚本" prop="renderOptions.events.handle">
                            <el-input v-model="slotParams.renderOptions.events.handle" readonly>
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

<script>
import KevinEditors from '@/components/KevinEditor/index'
export default {
    components: {
        KevinEditors
    },
    data() {
        return {
            slotParams: {
                renderOptions: {
                    events: {}
                }
            }
        }
    },
    methods: {
        handleEditorInput(code) {
            this.$set( this.slotParams.renderOptions.events,'handle',this.formatCode(code))
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
        e_editHandle() {
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.renderOptions.events.handle || `return row['${this.slotParams.slotName}']` });
        },
        init(params) {
            this.slotParams = params
        },
        save() {
            this.$refs.slotParams.validate(v => {
                if (v) {
                    this.$emit('save', this.slotParams)
                }
            })
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
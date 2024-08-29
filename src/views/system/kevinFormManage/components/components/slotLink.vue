<template>
    <div class="b_b_container">
        <div class="b_b_container">
            <div class="b_b_c_left">
                <el-form :model="slotParams" ref="slotParams" label-position="top" label-width="100px"
                    class="demo-ruleForm">
                    <el-divider content-position="left">超链接基础属性</el-divider>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否下划线" prop="renderOptions.underline">
                                <el-select v-model="slotParams.renderOptions.underline">
                                    <el-option label="是" :value="true"></el-option>
                                    <el-option label="否" :value="false"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型" prop="renderOptions.type">
                                <el-select v-model="slotParams.renderOptions.type">
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
                            <el-form-item label="返回值的类型" prop="renderOptions.valueType">
                                <el-select v-model="slotParams.renderOptions.valueType">
                                    <el-option label="字符串" value="string"></el-option>
                                    <!-- <el-option label="数组" value="array"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider content-position="left">显示内容处理</el-divider>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="内容处理脚本" prop="renderOptions.events.propCode">
                                <el-input v-model="slotParams.renderOptions.events.propCode" readonly>
                                    <el-button slot="append" @click="e_editPropCode">编辑</el-button>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item label="数组返回值赋值脚本" prop="renderOptions.events.arrayPropCode">
                                <el-input v-model="slotParams.renderOptions.events.arrayPropCode" readonly>
                                    <el-button slot="append" @click="e_editarrayPropCode">编辑</el-button>
                                </el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-divider content-position="left">超链接事件</el-divider>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="点击事件" prop="renderOptions.events.click">
                                <el-input v-model="slotParams.renderOptions.events.click" readonly>
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
        e_editarrayPropCode() {
            this.editType = 'editArrayPropCode'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.arrayPropCode || "return slotLinkInfo.label" });

        },
        e_editPropCode() {
            this.editType = 'editPropCode'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.renderOptions.events.propCode || `return row['${this.slotParams.slotName}']` });
        },
        e_editClick() {
            console.log('this.slotParams.renderOptions.events.click',this.slotParams.renderOptions.events.click)
            this.editType = 'editClick'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.renderOptions.events.click || "console.log('row',row)" });
        },
        handleEditorInput(code) {
            if (this.editType == 'editClick') {
                this.$set(this.slotParams.renderOptions.events, 'click', this.formatCode(code))
            } else if (this.editType == 'editPropCode') {
                this.$set(this.slotParams.renderOptions.events, 'propCode', this.formatCode(code))

            } else if (this.editType == 'editArrayPropCode') {
                this.$set(this.slotParams.renderOptions.events, 'arrayPropCode', this.formatCode(code))
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
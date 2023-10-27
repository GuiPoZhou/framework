<template>
    <el-dialog title="选择组件" :visible.sync="dialogVisible" width="30%" :append-to-body="true" @close="e_close"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="组件类型" prop="vModelActionType"
                            :rules="[{ required: true, message: '请选择组件类型', trigger: 'change' }]">
                            <el-select v-model="ruleForm.vModelActionType" placeholder="请选择组件类型">
                                <el-option label="输入框" value="input"></el-option>
                                <el-option label="单项框" value="radio"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="ruleForm.vModelActionType == 'radio'">
                        <el-button size="small" type="primary" @click="e_addOp" style="margin-bottom: 0.7rem;">
                            新增选项
                        </el-button>
                        <el-table :data="ruleForm.vModelActionOptions.dataSource.list" style="width: 100%" border>
                            <el-table-column prop="label" label="选项" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.label" @blur="e_blur(scope.row)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label="选项值" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.value" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_delete(scope.$index)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="e_confirm">确 定</el-button>
            <el-button @click="e_close">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                vModelActionType: '',
                vModelActionOptions: {
                    disabled: false,
                    dataSource: {
                        list: []
                    }
                }
            }
        }
    },
    methods: {
        e_blur(row) {
            if (row.label) {
                let labelList = this.ruleForm.vModelActionOptions.dataSource.list.filter(item => { return item.label.match(row.label) })
                if (labelList.length != 1) {
                    row.label = `${row.label}${labelList.length - 1}`
                }
                row.value = row.label
            } else {
                row.value = ''
            }
        },
        e_delete(index) {
            this.$confirm('确定删除该选项').then(() => {
                this.ruleForm.vModelActionOptions.dataSource.list.splice(index, 1)
            })
        },
        e_addOp() {
            let params = {
                label: '',
                value: ''
            }
            this.ruleForm.vModelActionOptions.dataSource.list.push(params)
        },
        init() {
            this.dialogVisible = true
        },
        e_confirm() {
            this.$refs.ruleForm.validate(v => {
                if (v) {
                    if (this.ruleForm.vModelActionType == 'radio' && this.ruleForm.vModelActionOptions.dataSource.list.length == 0) {
                        this.$message.error('请配置数据选项')
                        return
                    }
                    let emptyLabelList = this.ruleForm.vModelActionOptions.dataSource.list.filter(item => { return item.label == '' })
                    if (emptyLabelList.length != 0) {
                        this.$message.error('选择内容不能为空')
                        return
                    }
                    this.$emit('save', this.ruleForm)
                }
            })
        },
        e_close() {
            this.$emit('close')
        }
    }
}
</script>

<style></style>
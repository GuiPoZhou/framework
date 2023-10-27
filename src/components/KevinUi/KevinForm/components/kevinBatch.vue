<template>
    <div class="kevin_batch">
        <span class="kevin_batch_value">每{{ interval || 0 }}{{ checkUnit() }}{{ actionLabel }}{{ count || 0
        }}次</span>
        <el-popover placement="top" title="设置频次" trigger="click">
            <div class="kevin_batch_form_area" style="display: flex;
            flex-direction: column;align-items: center;">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="每" prop="interval"
                                :rules="[{ required: true, message: '频次', trigger: 'blur' }]">
                                <el-input-number size='mini' style="width: 80px;" v-model="ruleForm.interval" :min="1"
                                    :controls="false"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="unit" :rules="[{ required: true, message: '频次单位', trigger: 'blur' }]">
                                <el-select size='mini' style="width: 100%;" v-model="ruleForm.unit">
                                    <el-option v-for="item in unitList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="actionLabel + '(次)'" prop="count"
                                :rules="[{ required: true, message: '频次数量', trigger: 'blur' }]">
                                <el-input-number size='mini' style="width: 80px;" v-model="ruleForm.count" :min="1"
                                    :controls="false"></el-input-number>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-form>
                <div class="kevin_batch_form_area_button">
                    <el-button size="mini" type="primary" @click="e_confirm">确定</el-button>
                </div>
            </div>

            <el-button slot="reference" type="text" class="kevin_batch_button">{{ editButtonTile }}</el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    props: {
        editButtonTile: String,
        options: Object,
        unitList: Array,
        actionLabel: String,
        interval: Number,
        unit: String,
        count: Number
    },
    data() {
        return {
            ruleForm: {
                interval: 0,
                unit: 'DAY',
                count: 0
            },
            unitLabel:'',
        }
    },

    watch: {
        unit(val) {
            console.log('编号',val)
        },
    },
    methods: {
        e_confirm() {
            this.$refs.ruleForm.validate(v => {
                if (v) {
                    this.$emit('select', { interval: this.ruleForm.interval, unit: this.ruleForm.unit, count: this.ruleForm.count })
                }
            })
        },
        checkUnit() {
            if (!this.unit) {
                return '未知'
            }
            let unitInfo = this.unitList.filter(item => { return item.value == this.unit })
            return unitInfo[0].label
        },
    }
}
</script>

<style  lang="scss">
.kevin_batch {
    width: 100%;
    height: 36px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .kevin_batch_button {
        width: fit-content;
        margin-right: 8px;
    }

    .kevin_batch_value {
        flex: 1;
        margin-left: 8px;
        color: #606266;
    }

    .el-popover .kevin_batch_form_area {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

}
</style>
<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="60%" dia-log-title="表格行内Select组件编辑" @close="e_close">
        <template slot="bologbody">
            <div class="b_b_container">
                <div class="b_b_c_left">
                    <el-form :model="slotParams" ref="slotParams" label-width="100px" class="demo-ruleForm">
                        <el-divider content-position="left">Select基础属性</el-divider>
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
                                <el-form-item label="是否只读" prop="readonly">
                                    <el-select v-model="slotParams.readonly">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否可清空" prop="clearable">
                                    <el-select v-model="slotParams.clearable">
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
                                <el-form-item label="是否支持多选" prop="multiple">
                                    <el-select v-model="slotParams.multiple">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>

                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否可搜索" prop="filterable">
                                    <el-select v-model="slotParams.filterable">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>

                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">Select数据源配置</el-divider>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="获取远程数据脚本" prop="dataSource.optionsGetEvents">
                                    <el-input v-model="slotParams.dataSource.optionsGetEvents" readonly>
                                        <el-button slot="append" size="small"
                                            @click="e_editSelectServerEvents">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="远程脚本执行方式" prop="dataSource.executionMethod">
                                    <el-select v-model="slotParams.dataSource.executionMethod">
                                        <el-option label="自动执行" value="auto"></el-option>
                                        <el-option label="被动执行" value="manually"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" style="margin-bottom: 0.3rem;">
                                <el-button size="mini" type="success" @click="e_tastOptionsGetEvents">远程脚本测试</el-button>
                                <el-button size="mini" type="warning" @click="e_addOptions">手动新增</el-button>

                            </el-col>
                            <el-col :span="24">
                                <el-table :data="slotParams.dataSource.list" style="width: 100%" border>
                                    <el-table-column prop="label" label="标题(label)" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.label" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="value" label="值(value)" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.value" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作(删除只对手动添加方式生效)" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="e_deleteSource(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                        <el-divider content-position="left">Select事件</el-divider>
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
                                <el-form-item label="回车事件" prop="events.enter">
                                    <el-input v-model="slotParams.events.enter" readonly>
                                        <el-button slot="append" @click="e_editEnter">编辑</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="slotParams.clearable">
                                <el-form-item label="Clear事件" prop="events.clear">
                                    <el-input v-model="slotParams.events.clear" readonly>
                                        <el-button slot="append" @click="e_editClear">编辑</el-button>
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
                dataSource: {},
                events: {}
            },
            editType: {}
        }
    },
    methods: {
        e_deleteSource(index) {
            this.$confirm('确定删除该条数据源').then(() => {
                this.slotParams.dataSource.list.splice(index, 1)
            })
        },
        e_addOptions() {
            let params = {
                label: '选项',
                value: '选项'
            }
            if (this.slotParams.dataSource.optionsGetEvents) {
                this.$confirm('检测到你已配置远程数据获取，如果通过手动方式新增，远程获取数据源脚本将被清空，是否继续？').then(() => {
                    this.slotParams.dataSource.optionsGetEvents = ''
                    this.slotParams.dataSource.list.push(params)
                })
            } else {
                this.slotParams.dataSource.list.push(params)
            }
        },
        e_tastOptionsGetEvents() {
            if (this.slotParams.dataSource.optionsGetEvents == '') {
                this.$message.error('请先编码数据源远程获取脚本')
                return
            }
            new Function('ctx', 'columnsInfo', this.slotParams.dataSource.optionsGetEvents)(window.KevinContext, this.slotParams)
        },
        e_editSelectServerEvents() {
            this.editType = 'serverDataEvents'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.dataSource.optionsGetEvents || "let params = { label: '测试', value: 0, }; columnsInfo.dataSource.list = [params]; " });
        },
        e_editEnter() {
            this.editType = 'editEnter'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.enter });
        },
        e_editClear() {
            this.editType = 'editClear'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.clear });
        },
        e_editBlur() {
            this.editType = 'editBlur'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.blur });
        },
        e_editFocus() {
            this.editType = 'editFocus'
            this.$refs.KevinEditors.changeEditor({ value: this.slotParams.events.focus });
        },
        handleEditorInput(code) {
            if (this.editType == 'editFocus') {
                this.slotParams.events.focus = this.formatCode(code)
            } else if (this.editType == 'editBlur') {
                this.slotParams.events.blur = this.formatCode(code)
            } else if (this.editType == 'editClear') {
                this.slotParams.events.clear = this.formatCode(code)
            } else if (this.editType == 'serverDataEvents') {
                this.slotParams.dataSource.optionsGetEvents = this.formatCode(code)
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
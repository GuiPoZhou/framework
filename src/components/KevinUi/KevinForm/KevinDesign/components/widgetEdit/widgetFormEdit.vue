<template>
    <div class="widgetFormEdit">
        <div class="wfe_left">
            <el-form :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="表单标题" prop="title"
                            :rule="[{ required: true, message: '请输入表单标题', trigger: 'blur' }]">
                            <el-input v-model="editParams.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="表单标签位置" prop="formlabelPosition">
                            <el-select v-model="editParams.formlabelPosition">
                                <el-option label="左侧" value="left"></el-option>
                                <el-option label="右侧" value="right"></el-option>
                                <el-option label="顶部" value="top"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="弹框宽度百分比" prop="width">
                            <el-input-number v-model="editParams.width" :min="30" :max="100"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left">表单自动执行脚本</el-divider>
                        <el-button size="mini" type="success" style="margin-bottom: 1rem;"
                            @click="e_addAutoEvents">新增自动脚本</el-button>
                        <el-row>
                            <el-col>
                                <el-tag hit effect="dark" style="cursor: pointer;margin-right: 2rem;"
                                    v-for="(autoItem, autoKey) in editParams.autoEvents" :key="autoKey"
                                    :type="editIndex == autoKey ? 'warning' : 'primary'" closable
                                    @close="e_deleteAutoEvents(autoKey)" @click="e_editAutoEvents(autoItem, autoKey)">{{
                                        autoKey }}</el-tag>
                            </el-col>
                        </el-row>

                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left">表单手动执行脚本</el-divider>
                        <el-button size="mini" type="success" style="margin-bottom: 1rem;"
                            @click="e_addManuallyEvents">新增手动脚本</el-button>
                        <el-row>
                            <el-col>
                                <el-tag hit effect="dark" style="cursor: pointer;margin-right: 2rem;"
                                    v-for="(manuallyItem, manuallyKey) in editParams.manuallyEvents" :key="manuallyKey"
                                    :type="editIndex == manuallyKey ? 'warning' : 'primary'" closable
                                    @close="e_deletemanuallyEvents(manuallyKey)"
                                    @click="e_editmanuallyEvents(manuallyItem, manuallyKey)">{{
                                        manuallyKey }}</el-tag>
                            </el-col>
                        </el-row>

                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left">表单底部操作按钮管理</el-divider>
                        <el-button size="mini" type="success" style="margin-bottom: 1rem;"
                            @click="e_adddiaLogFooterButton">新增底部按钮</el-button>
                        <el-table :data="editParams.diaLogFooterButton" style="width: 100%" border
                            :row-class-name="currentEditRow">
                            <el-table-column prop="title" label="按钮名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.title"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label="按钮类型" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.type">
                                        <el-option label="默认按钮" value="-"></el-option>
                                        <el-option label="主要按钮" value="primary"></el-option>
                                        <el-option label="成功按钮" value="success"></el-option>
                                        <el-option label="信息按钮" value="info"></el-option>
                                        <el-option label="警告按钮" value="warning"></el-option>
                                        <el-option label="危险按钮" value="danger"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="size" label="按钮大小" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.size">
                                        <el-option label="中等按钮" value="medium"></el-option>
                                        <el-option label="小型按钮" value="small"></el-option>
                                        <el-option label="超小按钮" value="mini"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态脚本" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_editFooterButtonStatusEvents(scope)">编辑脚本</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="e_editFooterButtonEvents(scope)">编辑事件</el-button>
                                    <el-button type="text" @click="e_deleteFooterButton(scope.$index)">删除按钮</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="wfe_left">
            <KevinEditors ref="KevinEditors" @input="handleEditorInput" />
        </div>

    </div>
</template>

<script>
import KevinEditors from '../../../../../KevinEditor/index'
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
        KevinEditors
    },
    data() {
        return {
            showDrawer: true,
            editParams: {},
            editTag: '',
            editIndex: ''
        }
    },
    methods: {
        currentEditRow({ row, rowIndex }) {
            // 在这个方法中根据某个值来设置行的CSS类
            if (this.editTag == 'footerButton' && rowIndex == this.editIndex) {
                return 'highscore'; // 自定义CSS类名
            } else {
                return ''; // 默认样式
            }
        },
        e_editFooterButtonStatusEvents(scope) {
            this.editTag = 'footerButtonStatus'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.statusEvents || 'return true' });
        },
        e_editFooterButtonEvents(scope) {
            this.editTag = 'footerButton'
            this.editIndex = scope.$index
            this.$refs.KevinEditors.changeEditor({ value: scope.row.events });
        },
        e_deleteFooterButton(index) {
            this.$confirm('确定删除该底部操作按钮').then(() => {
                this.editParams.diaLogFooterButton.splice(index, 1)
            })
        },
        e_adddiaLogFooterButton() {
            let params = {
                title: '新增按钮',
                type: 'primary',
                size: 'small',
                statusEvents: 'return true',
                events: "console.log('新增的底部按钮')",
                WIDGETID: uuidv4()
            }
            this.editParams.diaLogFooterButton.push(params)
        },
        e_editAutoEvents(autoItem, autoKey) {
            this.editTag = 'autoEvents'
            this.editIndex = autoKey
            this.$refs.KevinEditors.changeEditor({ value: autoItem });
        },
        e_editmanuallyEvents(manuallyItem, manuallyKey) {
            this.editTag = 'manuallyEvents'
            this.editIndex = manuallyKey
            this.$refs.KevinEditors.changeEditor({ value: manuallyItem });
        },
        handleEditorInput(code) {
            if (this.editTag == 'autoEvents') {
                this.editParams.autoEvents[this.editIndex] = this.formatCode(code)
            } else if (this.editTag == 'manuallyEvents') {
                this.editParams.manuallyEvents[this.editIndex] = this.formatCode(code)
            } else if (this.editTag == 'footerButton') {
                this.editParams.diaLogFooterButton[this.editIndex].events = this.formatCode(code)
            } else if (this.editTag == 'footerButtonStatus') {
                this.editParams.diaLogFooterButton[this.editIndex].statusEvents = this.formatCode(code)
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
        e_deletemanuallyEvents(manuallyKey) {
            this.$confirm('确定删除这个自动执行事件？').then(() => {
                delete this.editParams.manuallyEvents[manuallyKey]
                this.editParams = { ...this.editParams }
            })
        },
        e_deleteAutoEvents(autoKey) {
            this.$confirm('确定删除这个自动执行事件？').then(() => {
                delete this.editParams.autoEvents[autoKey]
                this.editParams = { ...this.editParams }
            })
        },
        e_addManuallyEvents() {
            this.$prompt('请输入脚本名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'test',
            }).then(({ value }) => {
                const regex = /^[a-zA-Z0-9_]+$/;
                if (regex.test(value)) {
                    if (!this.editParams.manuallyEvents.hasOwnProperty(value)) {
                        this.$set(this.editParams.manuallyEvents, value, "console.log('新增手动执行脚本')")
                    } else {
                        this.$message.error('请勿重复命名')
                    }

                } else {
                    this.$message.error('输入内容必须符合javascript对象key的命名规范')
                }
            })
        },
        e_addAutoEvents() {
            this.$prompt('请输入脚本名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'test',
            }).then(({ value }) => {
                const regex = /^[a-zA-Z0-9_]+$/;
                if (regex.test(value)) {
                    if (!this.editParams.autoEvents.hasOwnProperty(value)) {
                        this.$set(this.editParams.autoEvents, value, "console.log('新增自动执行脚本')")
                    } else {
                        this.$message.error('请勿重复命名')
                    }

                } else {
                    this.$message.error('输入内容必须符合javascript对象key的命名规范')
                }
            })
        },
        init(editParams) {
            this.showDrawer = true
            this.editParams = JSON.parse(JSON.stringify(editParams))
        },
        close() {
            this.$emit('close')
        },
        e_save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('saveWidgetBasicInfo', this.editParams)
                }
            })
        }
    }

}
</script>

<style scoped lang="scss">
.widgetFormEdit {
    width: 100%;
    height: 100%;
    padding: 0.3rem;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;

    .wfe_left {
        width: 50%;
        height: 100%;
        background-color: #fff;
        padding: 0.8rem;
        overflow: auto;
        border-radius: 10px;
    }

    .wfe_left {
        flex: 1;
        height: 100%;
        margin-left: 0.3rem;
        border-radius: 10px;
    }
}

.highscore {
    background-color: red;
}

.customerdraw {
    padding: 0 1rem;
}

.el-drawer__header {
    font-size: 1rem;
    color: #000;
    font-weight: bold;
}
</style>
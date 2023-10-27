<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm">
            <el-row>
                <el-divider>Tabs基础信息</el-divider>
                <el-col :span="24">
                    <el-form-item label="Tabs组件标题" prop="title"
                        :rules="[{ required: true, message: '请输入Tabs组件标题', trigger: 'blur' }]">
                        <el-input v-model="editParams.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="组件占据列数" prop="colSpan">
                        <el-input-number v-model="editParams.colSpan" :min="1" :max="24" label="组件占据列数"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="是否隐藏" prop="isHide">
                        <el-radio-group v-model="editParams.isHide" @change="editParams = { ...editParams }">
                            <el-radio :label="false">否</el-radio>
                            <el-radio :label="true">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Tabs风格类型" prop="attributes.type">
                        <el-select v-model="editParams.attributes.type">
                            <el-option label="默认类型" value="-"></el-option>
                            <el-option label="卡片式" value="card"></el-option>
                            <el-option label="边框卡片式" value="border-card"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Tabs位置" prop="attributes.tabPosition">
                        <el-select v-model="editParams.attributes.tabPosition">
                            <el-option label="上" value="top"></el-option>
                            <el-option label="下" value="bottom"></el-option>
                            <el-option label="左" value="left"></el-option>
                            <el-option label="右" value="right"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="切换标签之前的钩子" prop="attributes.events.beforeLeaveEvents">
                        <el-input v-model="editParams.attributes.events.beforeLeaveEvents" readonly>
                            <el-button slot="append" size="small" @click="e_editTabsbeforeLeaveEvents">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Tabs选中事件" prop="attributes.events.tabClick">
                        <el-input v-model="editParams.attributes.events.tabClick" readonly>
                            <el-button slot="append" size="small" @click="e_editTabsClickEvents">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-divider>Tabs业务信息</el-divider>
                <el-button type="success" size="small" style="margin-bottom: 0.3rem;"
                    @click="e_addTabsChild">新增页签</el-button>
                <el-col :span="24">
                    <el-table ref="mainHomeButtons" class="mainHomeButtons" :data="editParams.children" style="width: 100%"
                        border>
                        <el-table-column prop="title" label="标题" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.title"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isHide" label="是否隐藏" align="center">
                            <template slot-scope="scope">
                                <el-radio-group v-model="scope.row.isHide">
                                    <el-radio :label="false">否</el-radio>
                                    <el-radio :label="true">是</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" v-if="editParams.children.length > 1"
                                    @click="e_deleteTabsChild(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-col>

            </el-row>
        </el-form>
        <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />
    </widgetEditContainer>
</template>

<script>
import KevinEditors from '../../../../../../KevinEditor/index'
import { v4 as uuidv4 } from 'uuid';
import widgetEditContainer from '../components/widgetEditContainer.vue'
import Sortable from "sortablejs";

export default {
    components: {
        KevinEditors,
        widgetEditContainer,
        Sortable
    },
    data() {
        return {
            editParams: {},
            editType: '',
            editIndex: ''
        }
    },

    methods: {
        rowDropmainHomeButtons() {
            const that = this;
            const tbody = document.querySelector(
                '.mainHomeButtons .el-table__body-wrapper tbody',
            );

            new Sortable(tbody, {
                animation: 150,  //定义排序动画的时间  单位是ms 
                ghostClass: 'blue-background-class',   //drop placeholder的css类名  可以不设置
                //开始拖拽
                onStart: function (e) {
                    e.oldIndex;  // 父元素索引
                },
                //结束拖拽
                onEnd: function (obj) {
                    const list = JSON.parse(
                        JSON.stringify(that.editParams.children),
                    );
                    that.$set(that.editParams, 'children', [])
                    const temp = list.splice(obj.oldIndex, 1)[0];
                    list.splice(obj.newIndex, 0, temp);
                    that.$nextTick(() => {
                        that.$set(that.editParams, 'children', list)
                        that.$refs.mainHomeButtons.doLayout()
                    })
                },
            });
        },
        e_save() {
            this.$refs.editParams.validate(v => {
                if (v) {
                    this.$emit('save', this.editParams)
                }
            })
        },
        e_close() {
            this.$emit('close')
        },
        e_addTabsChild() {
            this.$confirm('确定新增一个页签').then(() => {
                let child = {
                    title: '新增页签',
                    isHide: false,
                    WIDGETID: uuidv4(),
                    children: [{
                        components: "el-row",
                        title: "Layout布局",
                        WIDGETID: uuidv4(),
                        colSpan: 24,
                        children: []
                    },]
                }
                this.editParams.children.push(child)
            })
        },
        e_deleteTabsChild(index) {
            this.$confirm('删除页签请谨慎操作（页签内可能包含N多节点信息）?').then(() => {
                this.editParams.children.splice(index, 1)
            })
        },
        e_editTabsbeforeLeaveEvents() {
            this.editType = 'beforeLeavelick'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.attributes.events.beforeLeaveEvents || 'return true' });
        },
        e_editTabsClickEvents() {
            this.editType = 'tabclick'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.attributes.events.tabClick || 'console.log("选中事件")' });
        },
        handleEditorInput(code) {
            if (this.editType == 'tabclick') {
                this.editParams.attributes.events.tabClick = this.formatCode(code)
            } else if (this.editType == 'beforeLeavelick') {
                this.editParams.attributes.events.beforeLeaveEvents = this.formatCode(code)
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
        init(widgetInfo) {
            console.log('widgetInfo', widgetInfo)
            this.editParams = widgetInfo
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
            let _this = this;
            _this.$nextTick(() => {
                _this.rowDropmainHomeButtons();
            });
        }
    }
}
</script>

<style></style>
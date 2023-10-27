<template>
    <widgetEditContainer>
        <el-form slot="wecLeft" :model="editParams" ref="editParams" label-width="130px" class="demo-ruleForm"
            label-position="top">
            <el-divider>树形组件基本属性</el-divider>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="输入框标题" prop="title"
                        :rules="[{ required: true, message: '请输入输入框标题', trigger: 'blur' }]">
                        <el-input v-model="editParams.title"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="占据的列数" prop="colSpan">
                        <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否默认隐藏" prop="isHide">
                        <el-select v-model="editParams.isHide">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否开启多选框" prop="showCheckbox">
                        <el-select v-model="editParams.showCheckbox">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editParams.showCheckbox">
                    <el-form-item label="取消父子联动选择" prop="checkStrictly">
                        <el-select v-model="editParams.checkStrictly">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="节点图标" prop="iconClass">
                        <el-input v-model="editParams.iconClass"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否默认展开所有" prop="defaultExpandAll">
                        <el-select v-model="editParams.defaultExpandAll">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="点击节点的时候展开或者收缩节点" prop="expandOnClickNode">
                        <el-select v-model="editParams.expandOnClickNode">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="点击节点的时候选中节点" prop="checkOnClickNode">
                        <el-select v-model="editParams.checkOnClickNode">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="展开子节点的时候是否自动展开父节点" prop="autoExpandParent">
                        <el-select v-model="editParams.autoExpandParent">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="相邻级节点间的水平缩进" prop="indent">
                        <el-input-number v-model="editParams.indent" :min="1"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="每次只打开一个同级树节点展开" prop="accordion">
                        <el-select v-model="editParams.accordion">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="高亮当前选中节点" prop="highlightCurrent">
                        <el-select v-model="editParams.highlightCurrent">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="懒加载子节点" prop="lazy">
                        <el-select v-model="editParams.lazy">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="editParams.lazy">
                    <el-form-item label="懒加载脚本" prop="load"
                        :rules="[{ required: true, message: '请输入懒加载脚本', trigger: 'change' }]">
                        <el-input v-model="editParams.load">
                            <el-button slot="append" @click="e_editLoad">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider>树形组件扩展属性</el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="指定节点标签为节点对象的某个属性值(label)" prop="props.label"
                        :rules="[{ required: true, message: '请指定节点标签为节点对象的某个属性值', trigger: 'blur' }]">
                        <el-input v-model="editParams.props.label"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="指定子树为节点对象的某个属性值(children)" prop="props.children"
                        :rules="[{ required: true, message: '请指定子树为节点对象的某个属性值', trigger: 'blur' }]">
                        <el-input v-model="editParams.props.children"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效(isLeaf)" prop="props.isLeaf">
                        <el-input v-model="editParams.props.isLeaf"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider>树形组件的插槽属性</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否开启插槽" prop="slotInfo.openSlot">
                        <el-select v-model="editParams.slotInfo.openSlot">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="editParams.slotInfo.openSlot">
                    <el-form-item label="插槽形式" prop="slotInfo.slotType">
                        <el-select v-model="editParams.slotInfo.slotType">
                            <el-option label="普通" value="common"></el-option>
                            <el-option label="编码" value="code"></el-option>

                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider>树形组件事件</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="节点被点击时的脚本" prop="events.nodeClick">
                        <el-input v-model="editParams.events.nodeClick">
                            <el-button slot="append" @click="e_editEvents('nodeClick')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点选中状态发生变化时的脚本" prop="events.checkChange">
                        <el-input v-model="editParams.events.checkChange">
                            <el-button slot="append" @click="e_editEvents('checkChange')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="复选框被点击的脚本" prop="events.check">
                        <el-input v-model="editParams.events.check">
                            <el-button slot="append" @click="e_editEvents('check')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="当前选中节点变化时的脚本" prop="events.currentChange">
                        <el-input v-model="editParams.events.currentChange">
                            <el-button slot="append" @click="e_editEvents('currentChange')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点被展开时触发的脚本" prop="events.nodeExpand">
                        <el-input v-model="editParams.events.nodeExpand">
                            <el-button slot="append" @click="e_editEvents('nodeExpand')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点被关闭时触发的脚本" prop="events.nodeCollapse">
                        <el-input v-model="editParams.events.nodeCollapse">
                            <el-button slot="append" @click="e_editEvents('nodeCollapse')">编辑</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />

    </widgetEditContainer>
</template>

<script>
import KevinEditors from '../../../../../../KevinEditor/index'
import widgetEditContainer from '../components/widgetEditContainer.vue'
export default {
    components: {
        KevinEditors,
        widgetEditContainer
    },
    data() {
        return {
            editParams: {
                props: {

                },
                slotInfo: {
                    openSlot: false,
                    slotType: 'common',//common 固定的格式  code 编码脚本html自定义形式
                },
                events: {

                }
            },
            editType: ''
        }
    },
    methods: {
        e_deleteSlotSelectData(index) {
            this.$confirm('确定删除选择的数据?').then(() => {
                this.editParams.slot.options.list.splice(index, 1)
            })
        },
        e_addSlotSelectData() {
            let params = {
                label: '选项',
                value: '选项'
            }
            this.editParams.slot.options.list.push(params)
        },
        e_selInutSlot() {
            if (this.editParams.slot.slotType == 'select') {
                this.editParams.slot = {
                    isSlot: true,
                    slotType: 'select',
                    vModel: 'slotvModel',
                    vModelType: 'ext',
                    options: {
                        list: []
                    }
                }
            } else if (this.editParams.slot.slotType == 'button') {
                this.editParams.slot = {
                    isSlot: true,
                    slotType: 'button',
                    events: {

                    }
                }
            }
            this.editParams = { ...this.editParams }
        },
        handleEditorInput(code) {
            if (this.editType == 'lazyLoad') {
                this.editParams.load = this.formatCode(code)
            }else{
                this.$set(this.editParams.events,this.editType,this.formatCode(code))
            }
            // this.editParams = {...this.editParams}
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
        e_editEvents(type) {
            this.editType = type
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.events[type] || "console.log('事件')" });
        },
        e_editLoad() {
            this.editType = 'lazyLoad'
            this.$refs.KevinEditors.changeEditor({ value: this.editParams.load || "return resolve([{ name: 'region' }])" });
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
        init(widgetInfo) {
            this.editParams = widgetInfo
            if (!this.editParams.isHide) {
                this.editParams.isHide = false
            }
            if(!this.editParams.events){
                this.editParams.events = {}
            }
        }
    }
}
</script>

<style></style>
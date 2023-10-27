<template>
    <div style="overflow: hidden;">
        <KevinDrawer :show="showKevinLog" :stepList="stepList" :stepIndex="stepIndex" :title="KevinJson.KevinWidget.title">
            <template slot="topbuttons">
                <el-button size="small" :disabled="stepIndex == 0" @click="e_goPrevious">上一步</el-button>
                <el-button size="small" :disabled="stepIndex == stepList.length - 1" @click="e_goNext">下一步</el-button>
                <el-button size="small" :disabled="stepIndex == 0" type="primary" @click="e_save">保存</el-button>
                <el-button size="small" @click="e_close">取消</el-button>
                <el-button size="small" type="warning" icon="el-icon-document" @click="e_openApiDoc">Api文档</el-button>
            </template>
            <!-- 表单全局配置 -->
            <widgetFormEdit ref="widgetFormEdit" v-if="stepIndex == 0" @close="showwidgetFormEdit = false"
                @saveWidgetBasicInfo="e_saveWidgetBasicInfo" />
            <div class="kevin_desgin_body" v-if="stepIndex == 1">
                <div class="kevin_desgin_left">
                    <kevinComponents @appendWidget="e_appendWidget" />

                </div>
                <div class="kevin_desgin_right">
                    <div class="k_d_r_top">
                        <el-link :underline="false" type="warning" icon="el-icon-cpu" style="margin-bottom: 0.5rem;"
                            @click="e_showForm">表单预览</el-link>
                        <!-- <el-link :underline="false" type="success" icon="el-icon-notebook-2" style="margin-bottom: 0.5rem;"
                            @click="e_showwidgetTree">表单JSON</el-link> -->
                        <el-link :underline="false" type="primary" icon="el-icon-notebook-2" style="margin-bottom: 0.5rem;"
                            @click="e_showwidgetTree">表单组件树</el-link>
                    </div>
                    <div class="k_d_r_content">
                        <el-form :model="form" ref="form" label-width="100px" :form="form" class="demo-ruleForm"
                            @submit.native.prevent :label-position="KevinJson.KevinWidget.formlabelPosition">
                            <el-row>
                                <KevinRenders ref="KevinRenders" :context="context" :form="form"
                                    :Widget="KevinJson.KevinWidget.children" :draggableOpen="true" @editTabs="e_editTabs"
                                    @editWidget="e_editWidget" @saveWidgetNodeEdit="e_saveWidgetNodeEdit" />
                            </el-row>
                        </el-form>
                    </div>

                </div>
            </div>
        </KevinDrawer>

        <!-- 单个组件编辑 -->
        <widgetNodeEdit ref="widgetNodeEdit" v-if="showwidgetNodeEdit" @close="showwidgetNodeEdit = false"
            @save="e_saveWidgetNodeEdit" />
        <widgetTree ref="widgetTree" v-if="showwidgetTree" @close="showwidgetTree = false" />
        <!-- 表单预览 -->
        <showForm ref="showForm" v-if="showshowForm" @close="showshowForm = false" />
        <!-- api文档 -->
        <apiDoc ref="apiDoc" v-if="showapiDoc" @close="showapiDoc = false" />
    </div>
</template>
<script>
import kevinLog from '../../KevinLog/index.vue'
import KevinDrawer from '../../KevinDrawer/index.vue'
import KevinRenders from '../kevinRender.vue'
import kevinComponents from './components/kevinComponents.vue'
import widgetFormEdit from './components/widgetEdit/widgetFormEdit.vue';
import widgetTree from './components/widgetEdit/components/widgetTree.vue';
import { v4 as uuidv4 } from 'uuid';
import widgetNodeEdit from './components/widgetEdit/widgetNodeEdit.vue';
import showForm from './dialog/showForm.vue';
import apiDoc from './doc/kevinDoc.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 选择需要的样式
import Vue from 'vue'
export default {
    components: {
        kevinLog,
        KevinRenders,
        kevinComponents,
        widgetFormEdit,
        widgetTree,
        widgetNodeEdit,
        KevinDrawer,
        showForm,
        apiDoc,
    },
    props: {
        widgetId: {
            typeof: String,
            default: ''
        }
    },
    data() {
        return {
            showapiDoc: false,
            showshowForm: false,
            stepList: [
                {
                    label: '表单基础信息',
                    value: 0,
                }, {
                    label: '表单设计',
                    value: 1,
                }
            ],
            stepIndex: 0,
            context: null,
            showwidgetNodeEdit: false,
            showwidgetTree: false,
            showwidgetFormEdit: false,
            showKevinLog: false,
            fullScreen: false,
            businessEnv: 'add',
            form: {
                extData: {}
            },
            KevinJson: {
                KevinWidget: {
                    title: "表单设计",
                    formlabelPosition: "right",
                    autoEvents: {},
                    manuallyEvents: {},
                    diaLogFooterButton: [],
                    children: []
                },
                KevinLogWidgets: []
            },
        }
    },
    created() {
        window.KevinContext = this
        this.context = this
    },
    methods: {
        e_openApiDoc() {
            this.showapiDoc = true
            this.$nextTick(() => {
                this.$refs.apiDoc.init()
            })
        },
        e_showForm() {
            this.showshowForm = true
            this.$nextTick(() => {
                this.$refs.showForm.init(this.KevinJson)
            })
        },
        e_saveWidgetNodeEdit(widgetInfo) {
            this.showwidgetNodeEdit = false
            this.modifyNodeByWIDGETID(this.KevinJson.KevinWidget.children, widgetInfo.WIDGETID, widgetInfo)
            console.log('修改结果', this.KevinJson)
            this.form = {
                extData: {}
            }
            this.$refs.KevinRenders.getWidgetServerData(this.KevinJson.KevinWidget.children)
        },
        e_editWidget(widgetInfo) {
            this.showwidgetNodeEdit = true
            this.$nextTick(() => {
                this.$refs.widgetNodeEdit.init(widgetInfo)
            })
        },
        e_editTabs(tabInfo) {
            this.showwidgetNodeEdit = true
            this.$nextTick(() => {
                this.$refs.widgetNodeEdit.init(tabInfo)
            })
        },
        e_showwidgetTree() {
            this.showwidgetTree = true
            this.$nextTick(() => {
                this.$refs.widgetTree.init(this.KevinJson.KevinWidget.children)
            })
        },
        e_saveWidgetBasicInfo(info) {
            this.KevinJson.KevinWidget.title = info.title
            this.KevinJson.KevinWidget.formlabelPosition = info.formlabelPosition
            this.KevinJson.KevinWidget.autoEvents = info.autoEvents
            this.KevinJson.KevinWidget.manuallyEvents = info.manuallyEvents
            this.KevinJson.KevinWidget.diaLogFooterButton = info.diaLogFooterButton
            this.KevinJson.KevinWidget.width = info.width
            this.showwidgetFormEdit = false
        },
        e_editWidgetForm() {
            let editParams = {
                title: this.KevinJson.KevinWidget.title,
                formlabelPosition: this.KevinJson.KevinWidget.formlabelPosition,
                autoEvents: this.KevinJson.KevinWidget.autoEvents,
                manuallyEvents: this.KevinJson.KevinWidget.manuallyEvents,
                width: this.KevinJson.KevinWidget.width || 30,
                diaLogFooterButton: this.KevinJson.KevinWidget.diaLogFooterButton,
            }
            this.$nextTick(() => {
                this.$refs.widgetFormEdit.init(editParams)
            })
        },
        modifyNodeByWIDGETID(nodeList, targetWIDGETID, newData) {
            for (let i = 0; i < nodeList.length; i++) {
                const node = nodeList[i];
                if (node.WIDGETID === targetWIDGETID) {
                    // 找到了匹配的节点，进行修改
                    for (const key in newData) {
                        if (newData.hasOwnProperty(key)) {
                            node[key] = newData[key];
                        }
                    }
                    return true; // 返回 true 表示成功找到并修改节点
                } else if (node.children) {
                    // 递归遍历子节点
                    if (this.modifyNodeByWIDGETID(node.children, targetWIDGETID, newData)) {
                        return true; // 返回 true 表示在子节点中找到并修改节点
                    }
                }
            }
            return false; // 返回 false 表示未找到匹配的节点
        },
        init() {
            this.showKevinLog = true
            this.e_getWidgetInfo()
        },
        e_appendWidget(widgetInfo) {
            this.e_assignmentWidgetId(widgetInfo)
            console.log('hello', widgetInfo)
            this.KevinJson.KevinWidget.children.push(widgetInfo)
        },
        e_assignmentWidgetId(widgetInfo) {
            widgetInfo.WIDGETID = uuidv4()
            if (widgetInfo.children && widgetInfo.children.length != 0) {
                widgetInfo.children.forEach(childWidget => {
                    this.e_assignmentWidgetId(childWidget)
                })
            }
        },
        e_close() {
            this.$confirm('取消操作将不会保存编辑的内容，确认执行？').then(() => {
                this.$emit('close')
            })

        },
        // 保存时初始化一部分东西
        e_Initialize(widgetList) {
            widgetList.forEach(item => {
                switch (item.components) {
                    case 'el-tabs':
                        item.active = '0'
                        break;
                    case 'kevin-upload-device':
                        item.fileList = []
                        break;
                }
                if (item.children && item.children.length != 0) {
                    this.e_Initialize(item.children)
                }
            })
        },

        e_save() {
            this.$confirm('确定完成表单编制进行保存').then(() => {
                this.e_Initialize(this.KevinJson.KevinWidget.children)
                let config = this.KevinJson
                let formLayoutConfigStr = JSON.stringify(config)
                let resultStr = formLayoutConfigStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                let params = {
                    id: this.widgetId,
                    config: { KevinJson: JSON.parse(resultStr) }
                }
                this.$net('/formLayout/v2/saveOrUpdateFormLayoutConfig', 'post', params).then(re => {
                    if (re.code == 200) {
                        this.$message.success('保存成功')
                        this.$emit('close')
                    } else {
                        this.$message.error(re.msg)
                    }
                })
            })

        },
        e_getWidgetInfo() {
            this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: this.widgetId }).then(re => {
                let formDataStr = re.data.configStr
                let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                let info = JSON.parse(resultDataStr)
                this.KevinJson = info.KevinJson

                this.e_editWidgetForm()
            })
        },
        e_goPrevious() {
            if (this.stepIndex > 0) {
                this.stepIndex--;
                this.e_editWidgetForm()
            }
        },
        e_goNext() {
            if (this.stepIndex < this.stepList.length) {
                this.stepIndex++;
                this.$refs.widgetFormEdit.e_save()
                this.$nextTick(() => {
                    this.$refs.KevinRenders.getWidgetServerData(this.KevinJson.KevinWidget.children)
                })

            }
        }

    },
}
</script>
<style scoped lang="scss">
.kevin_desgin_body {
    width: 100%;
    height: 100%;
    padding: 0.3rem 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    .kevin_desgin_left {
        width: 20%;
        height: auto;
        overflow: auto;
    }

    .kevin_desgin_right {
        flex: 1;
        overflow: hidden;
        background-color: #fff;
        margin-left: 0.4rem;
        padding: 2.7rem 0.7rem;
        border-radius: 10px;
        position: relative;

        .k_d_r_top {
            width: 100%;
            position: absolute;
            height: 2.5rem;
            border-bottom: 2px solid #EBEEF5;
            z-index: 11;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            /deep/.el-link {
                margin-bottom: 0 !important;
                margin-right: 2rem;
            }
        }

        .k_d_r_content {
            height: 100%;
            overflow: auto;
            scrollbar-width: none;
            /* 隐藏标准滚动条（适用于Firefox） */
            -ms-overflow-style: none;

            /* 隐藏IE和Edge浏览器的滚动条 */
            &::-webkit-scrollbar {
                width: 0;
                /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
            }
        }


    }
}
</style>
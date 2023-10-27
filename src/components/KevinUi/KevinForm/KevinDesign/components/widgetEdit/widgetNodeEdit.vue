<template>
    <div>
        <kevindrawer :show="showDrawer" :title="title" direction="rtl" :size="size">
            <template slot="topbuttons">
                <el-button size="small" type="primary" @click="$refs.component.e_save()">保存</el-button>
                <el-button size="small" @click="close">取消</el-button>
                <el-button size="small" type="warning" icon="el-icon-document" @click="e_openApiDoc">Api文档</el-button>
            </template>
            <div class="widgetEditArea">
                <component ref="component" :is="conponentsName" @close="close" @save="save"></component>
            </div>
        </kevindrawer>
        <kevinDoc ref="kevinDoc" v-if="showkevinDoc" @close="showkevinDoc = false" />
    </div>
</template>

<script>
import kevinDoc from '../../doc/kevinDoc.vue'
import kevindrawer from '../../../../KevinDrawer/kevindrawer.vue'
import tabsEdit from './widgetEditComponents/tabsEdit.vue'
import dividerEdit from './widgetEditComponents/dividerEdit.vue'
import buttonEdit from './widgetEditComponents/buttonEdit.vue'
import inputEdit from './widgetEditComponents/inputEdit.vue'
import selectEdit from './widgetEditComponents/selectEdit.vue'
import datePickerEdit from "./widgetEditComponents/datePicker.vue";
import radioEdit from './widgetEditComponents/radioEdit.vue'
import uploadEdit from './widgetEditComponents/uploadEdit.vue'
import inputNumberEdit from './widgetEditComponents/inputNumberEdit.vue'
import baseTableEdit from './widgetEditComponents/baseTableEdit.vue'
import kevinUploadDeviceEdit from './widgetEditComponents/kevinUploadDeviceEdit.vue'
import kevinDeviceAcceptanceEdit from './widgetEditComponents/kevinDeviceAcceptanceEdit.vue'
import cascaderEdit from './widgetEditComponents/cascaderEdit.vue'
import kevinTreeSelectEdit from './widgetEditComponents/kevinTreeSelectEdit.vue'
import kevinBatchEdit from './widgetEditComponents/kevinBatchEdit.vue'
import autoCompleteEdit from './widgetEditComponents/autoCompleteEdit.vue'
import kevinSearchEdit from './widgetEditComponents/kevinSearchEdit.vue'
import colorPickerEdit from './widgetEditComponents/colorPickerEdit.vue'
import treeTableEdit from './widgetEditComponents/treeTableEdit.vue'
import checkboxEdit from './widgetEditComponents/checkboxEdit.vue'
import kevinContainerEdit from './widgetEditComponents/kevinContainerEdit.vue'
import kevinGridEdit from './widgetEditComponents/kevinGridEdit.vue'
import eLTreeEdit from './widgetEditComponents/eLTreeEdit.vue'
export default {
    components: {
        kevinDoc,
        kevindrawer,
        tabsEdit,
        dividerEdit,
        buttonEdit,
        inputEdit,
        selectEdit,
        datePickerEdit,
        radioEdit,
        uploadEdit,
        inputNumberEdit,
        baseTableEdit,
        kevinUploadDeviceEdit,
        kevinDeviceAcceptanceEdit,
        cascaderEdit,
        kevinTreeSelectEdit,
        kevinBatchEdit,
        autoCompleteEdit,
        kevinSearchEdit,
        colorPickerEdit,
        treeTableEdit,
        checkboxEdit,
        kevinContainerEdit,
        kevinGridEdit,
        eLTreeEdit
    },
    data() {
        return {
            showkevinDoc: false,
            showDrawer: false,
            conponentsName: '',
            size: '95%',
            title: ''
        }
    },
    methods: {
        e_openApiDoc() {
            this.showkevinDoc = true
            this.$nextTick(() => {
                this.$refs.kevinDoc.init()
            })
        },
        init(widgetInfo) {
            this.showDrawer = true
            this.renderSignleEdit(JSON.parse(JSON.stringify(widgetInfo)))
        },
        renderSignleEdit(widgetInfo) {
            switch (widgetInfo.components) {
                case 'el-tree':
                    this.conponentsName='eLTreeEdit'
                    this.title = '树形组件编辑'
                    this.size='80%'
                    break;
                case 'el-tabs':
                    this.conponentsName = 'tabsEdit'
                    this.title = '标签组件编辑'
                    break
                case 'el-divider':
                    this.conponentsName = 'dividerEdit'
                    this.title = '分割线组件编辑'
                    this.size = '40%'
                    break
                case 'el-button':
                    this.conponentsName = 'buttonEdit'
                    this.title = '按钮组件编辑'
                    break;
                case 'el-input':
                    this.conponentsName = 'inputEdit'
                    this.title = '输入框组件编辑'
                    break;
                case 'el-autocomplete':
                    this.conponentsName = 'autoCompleteEdit'
                    this.title = '远程搜索框组件编辑'
                    break;
                case 'el-input-number':
                    this.conponentsName = 'inputNumberEdit'
                    this.title = '计数器组件编辑'
                    break;
                case 'el-select':
                    this.conponentsName = 'selectEdit'
                    this.title = '下拉框组件编辑'
                    this.size = '70%'
                    break;
                case 'el-cascader':
                    this.conponentsName = 'cascaderEdit'
                    this.title = '级联组件编辑'
                    this.size = '70%'
                    break;
                case 'kevin-tree-select':
                    this.conponentsName = 'kevinTreeSelectEdit'
                    this.title = '树形下拉组件编辑'
                    this.size = '70%'
                    break;
                case 'el-date-picker':
                    this.conponentsName = 'datePickerEdit'
                    this.title = '日期时间组件编辑'
                    this.size = '90%'
                    break;
                case 'el-radio':
                    this.conponentsName = 'radioEdit'
                    this.title = '单选框组件编辑'
                    this.size = '80%'
                    break;
                case 'el-upload':
                    this.conponentsName = 'uploadEdit'
                    this.title = '文件上传组件编辑'
                    this.size = '80%'
                    break;
                case 'el-table':
                    this.conponentsName = 'baseTableEdit'
                    this.title = '基础表格编辑'
                    this.size = '100%'
                    break;
                case 'el-table-tree':
                    this.conponentsName = 'treeTableEdit'
                    this.title = '树形表格编辑'
                    this.size = '100%'
                    break;
                case 'kevin-upload-device':
                    this.conponentsName = 'kevinUploadDeviceEdit'
                    this.title = '业务上传组件(设备版)编辑'
                    this.size = '70%'
                    break;
                case 'kevin-device-acceptance':
                    this.conponentsName = 'kevinDeviceAcceptanceEdit'
                    this.title = '设备验收组件编辑'
                    this.size = '70%'
                    break;
                case 'kevin-batch':
                    this.conponentsName = 'kevinBatchEdit'
                    this.title = '频次组件编辑'
                    break;
                case 'kevin-search':
                    this.conponentsName = 'kevinSearchEdit'
                    this.title = '搜索套件编辑'
                    this.size = '50%'
                    break;
                case 'el-color-picker':
                    this.conponentsName = 'colorPickerEdit'
                    this.title = '颜色选择组件编辑'
                    this.size = '70%'
                    break;
                case 'el-checkbox':
                    this.conponentsName = 'checkboxEdit'
                    this.title = '多选框组件编辑'
                    this.size = '70%'
                    break;
                case 'kevin-container':
                    this.conponentsName = 'kevinContainerEdit'
                    this.title = '业务区域编辑'
                    this.size = '30%'
                    break;
                case 'kevin-grid':
                    this.conponentsName ='kevinGridEdit'
                    this.title = '栅格布局编辑'
                    this.size = '50%'
                default:
                    this.showDev = true
                    break
            }
            this.$nextTick(() => {
                this.$refs.component.init(widgetInfo)
            })
        },
        close() {
            this.showDrawer = false
            this.$emit('close')
        },
        save(widgetInfo) {
            this.$emit('save', widgetInfo)
        },
    }

}
</script>

<style lang="scss" scoped>
.widgetEditArea {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.widgetEditArea div {
    scrollbar-width: none;
    /* 隐藏标准滚动条（适用于Firefox） */
    -ms-overflow-style: none;


}

.widgetEditArea div::-webkit-scrollbar {
    width: 0;
    /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
}

.widgetNodeEdit {
    /deep/.el-form-item {
        padding-right: 20px !important;
    }
}
</style>
# 低码表单模板


### 弹框版
```
<template>
    <div>
        <BoDialog :diaLogShow="showKevinLog" :fullScreen="fullScreen" :diaLogTitle="dialogTitle" @close="e_close">
            <template slot="bologbody">
                <el-form :model="form" ref="form" label-width="100px" @submit.native.prevent :form="form" class="demo-ruleForm"
                    :label-position="KevinJson.KevinWidget.formlabelPosition || 'top'">
                    <el-row v-if="!nullKevinJson">
                        <KevinRender ref="KevinRender" :context="context" :Widget="renderWidget" :form="form" />
                    </el-row>
                    <el-empty v-else :description="`请配置【${widgetId}】低码唯一键`"></el-empty>
                </el-form>
            </template>
            <template slot="bologfooter">
                <el-button :type="buttonInfo.type" :size="buttonInfo.size"
                    v-for="(buttonInfo, buttonIndex) in dialogFooterButtons" :key="buttonIndex"
                    :loading="buttonInfo.isLoading" @click="e_dialogButtonEvents(buttonInfo)">
                    {{ buttonInfo.title }}
                </el-button>
            </template>
        </BoDialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showKevinLog: false,
            fullScreen: false,
            dialogTitle: '',
            renderWidget: [],
            dialogFooterButtons: [],
            KevinJson: {
                KevinWidget: {}
            },
            nullKevinJson: false,
            context: this,
            form: {
                extData: {}
            },
            runKevinRender: false,
            widgetId: '取系统管理-低码业务-低码表单唯一键', // 记得对应好低码唯一键
            businessEnv:'add', //add 新增  edit 编辑   detail 详情
            container: null,
        }
    },
    methods: {
        init() {
            this.showKevinLog = true
            this.e_getWidgetInfo()
        },
        async editInit(data, businessEnv = 'edit') {
            this.businessEnv = businessEnv
            this.showKevinLog = true
            await this.e_getWidgetInfo()
         },
        async e_getWidgetInfo() {
            let re = await this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: this.widgetId })
            try{
                let formDataStr = re.data.configStr
                let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                let info = JSON.parse(resultDataStr)
                let KevinJson = info.KevinJson
                this.KevinJson = KevinJson
                this.showKevinLog = true
                this.dialogTitle = KevinJson.KevinWidget.title
                this.renderWidget = KevinJson.KevinWidget.children
                KevinJson.KevinWidget.diaLogFooterButton.forEach(dfb => {
                   if (!dfb.statusEvents || new Function('ctx', '_this', dfb.statusEvents)(this, this.$refs.KevinRender)) {
                     this.dialogFooterButtons.push(dfb)
                   }
                })
                this.fullScreen = true
                this.$nextTick(() => {
                    this.runWidgetAutoEvents(KevinJson.KevinWidget.autoEvents)
                    this.$refs.KevinRender.getWidgetServerData(this.renderWidget)
                    this.container = this.$refs.KevinRender
                })
            } catch {
                this.nullKevinJson = true
            } 
        },
        // 弹框底部动态按钮事件执行
        e_dialogButtonEvents(widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.events)(this, this.$refs.KevinRender, widgetInfo)
            this.$forceUpdate()
        },
        // 执行动态表单自动执行脚本
        runWidgetAutoEvents(autoEvents) {
            if (autoEvents) {
                for (let key in autoEvents) {
                    new Function('ctx', '_this', autoEvents[key])(this, this.$refs.KevinRender)
                }
            }
            this.form = {...this.form}
        },
        e_close() {
            this.$emit('close')
        }
    }
}
</script>

<style></style>
```
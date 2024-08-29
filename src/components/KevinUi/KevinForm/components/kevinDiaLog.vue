<template>
    <div class="fox-dialog">
        <el-dialog :visible.sync="diaLogShows" :close-on-click-modal="false" :width="`${KevinJson.KevinWidget.width}%`"
            :fullscreen="isFullScreen" class="fox-dialog" :class="!isFullScreen ? 'minClass' : 'fox-dialog'"
            :show-close="false" @close="e_dialogClose" @open="e_dialogOpen" ref="el_dialog123" :append-to-body="true">
            <div slot="title" class="dialog-title">
                <span class="topTilte">{{ dialogTitle }}</span>
                <div class="topRight">
                    <!-- 最小化 -->
                    <i class="el-icon-minus rightIcon" v-if="isFullScreen" @click="e_changeBox(false)"></i>
                    <!-- 最大化 -->
                    <i class="el-icon-full-screen rightIcon" v-if="!isFullScreen" @click="e_changeBox(true)"></i>
                    <!-- 关闭 -->
                    <i class="el-icon-close rightIcon" @click="e_dialogClose"></i>
                </div>
            </div>
            <!-- 弹框中间内容区域 -->
            <div class="foxlogbody">
                <el-form :model="form" ref="form" label-width="100px" :form="form" class="demo-ruleForm"
                    :label-position="KevinJson.KevinWidget.formlabelPosition || 'top'">
                    <el-row>
                        <!-- <KevinLogRender ref="KevinLogRender" :context="context" :Widget="renderWidget" :form="form" /> -->
                    </el-row>
                </el-form>
            </div>
            <!-- 弹框底部按钮区域 -->
            <div slot="footer" class="dialog-footer">
                <el-button :type="buttonInfo.type" :size="buttonInfo.size"
                    v-for="(buttonInfo, buttonIndex) in dialogFooterButtons" :key="buttonIndex"
                    :loading="buttonInfo.isLoading" @click="e_dialogButtonEvents(buttonInfo)">
                    {{ buttonInfo.title }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            isFullScreen: true,
            diaLogShows: false,
            form: {
                extData: {}
            },
            context: this,
            renderWidget: [],
            dialogFooterButtons: [],
            KevinJson: {
                KevinWidget: {}
            },
            dialogTitle: "内置弹框",
            businessEnv: 'add', //add 新增  edit 编辑   detail 详情

        }
    },
    props: {
        widgetId: String
    },
    watch: {
        fullScreen(v) {
            this.isFullScreen = v
        },
        diaLogShow(val) {
            this.diaLogShows = val
        }
    },
    methods: {
        async init() {
            this.diaLogShows = true
            await this.e_getWidgetInfo()
        },
        async e_getWidgetInfo() {
            let re = await this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: this.widgetId })
            let formDataStr = re.data.configStr
            let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            let info = JSON.parse(resultDataStr)
            let KevinJson = info.KevinJson
            this.KevinJson = KevinJson
            this.showKevinLog = true
            this.dialogTitle = KevinJson.KevinWidget.title
            this.renderWidget = KevinJson.KevinWidget.children
            this.dialogFooterButtons = []
            KevinJson.KevinWidget.diaLogFooterButton.forEach(dfb => {
                if (!dfb.statusEvents || new Function('ctx', '_this', dfb.statusEvents)(this, this.$refs.KevinLogRender)) {
                    this.dialogFooterButtons.push(dfb)
                }
            })
            this.fullScreen = true
            this.$nextTick(() => {
                this.runWidgetAutoEvents(KevinJson.KevinWidget.autoEvents)
                this.$refs.KevinLogRender.getWidgetServerData(this.renderWidget)
                this.container = this.$refs.KevinLogRender
            })
        },
        // 弹框底部动态按钮事件执行
        e_dialogButtonEvents(widgetInfo) {
            new Function('ctx', '_this', 'widgetInfo', widgetInfo.events)(this, this.$refs.KevinLogRender, widgetInfo)
            this.$forceUpdate()
        },
        // 执行动态表单自动执行脚本
        runWidgetAutoEvents(autoEvents) {
            if (autoEvents) {
                for (let key in autoEvents) {
                    new Function('ctx', '_this', autoEvents[key])(this, this.$refs.KevinLogRender)
                }
            }
            this.form = { ...this.form }
        },
        /*
         *@author: 焦政
         *@date: 2022-02-21 09:15:45
         *@description:关闭弹框
         */
        e_dialogClose() {
            this.$emit('back', { name: 'close' })
        },
        e_dialogOpen() {
            this.$emit('open')
        },
        // 是否全屏
        e_changeBox(type) {
            this.isFullScreen = type
            if (type == false) {
                this.$nextTick(() => {
                    let DialogHeight = this.$store.state.boshland.boContainerHeight - 250
                    this.$store.commit("set_boDialogHeight", DialogHeight);
                });
            } else {
                this.$nextTick(() => {
                    let DialogHeight = this.$store.state.boshland.boContainerHeight - 100
                    this.$store.commit("set_boDialogHeight", DialogHeight);
                });
            }
        }
    }
}
</script>

<style lang="scss">
.el-dialog__wrapper {
    right: -14px;
    top: -15px;
    bottom: -15px;
    left: -14px;
}

.fox-dialog .el-input {
    // width: 220px;
}

.fox-dialog .el-form--inline .el-form-item {
    width: 100%;
}

.fox-dialog .el-form-item__content {
    width: calc(100% - 120px);
}

.fox-dialog .el-date-editor.el-input,
.fox-dialog .el-date-editor.el-input__inner {
    width: 100% !important;
}

.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
    width: 220px;
}

.fox-dialog .el-select {
    width: 100%;
}

.fox-dialog .el-autocomplete {
    width: 100%;
}

.fox-dialog .el-dialog__body .el-col {
    margin-bottom: 10px !important;
}

// 百叶窗标题部分
.fox-dialog .foxlogbody .el-collapse-item__header {
    background-color: #f5f6f7 !important;
    padding-left: 0.5rem;
    height: 2.3rem;
}

// 百叶窗内容部分
.fox-dialog .foxlogbody .el-collapse-item__content {
    padding-bottom: 0 !important;
    padding: 0.5rem !important;
}

.fox-dialog .el-dialog__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.fox-dialog .el-dialog {
    // width: 75%;
    border-radius: 0px !important;
    padding: 0 0.4rem;
    padding-top: 3.4rem;
    // margin: 0 auto !important;
    // top: 50%;
    height: 100% !important;
    overflow: hidden;
    padding-bottom: 3.4rem;
    display: flex;
    margin-right: 80%;
    flex-direction: column;
}

.minClass .el-dialog {
    // width: 75%;
    border-radius: 0px !important;
    padding: 0 0.4rem;
    padding-top: 3.4rem;
    // margin: 0 auto !important;
    // top: 48%;
    max-height: 80%;
    overflow: hidden;
    padding-bottom: 3.4rem;
    display: flex;
    margin-right: 80%;
    flex-direction: column;
}

.fox-dialog .el-dialog__body {
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
    border: 1px solid #dcdee1;
    padding: 0.5rem;
}

.fox-dialog .el-dialog__header {
    width: 100%;
    position: absolute;
    height: 50px;
    top: 0;
    background-color: #f1f2f3;
    line-height: 50px;
    left: 0;
}

.fox-dialog .el-dialog__body::-webkit-scrollbar {
    /*display: none;*/
    /*隐藏滚动条*/
}

.el-dialog__headerbtn {
    margin-top: 0px;
}

.fox-dialog .el-dialog__footer {
    height: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #f5f6f7;
    z-index: 11;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #dcdee1;
    padding: 0 20px;
    left: 0;
}

.fox-dialog .el-dialog__title {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333;
}

.fox-dialog .el-dialog--center .el-dialog__body {
    padding: 13px 25px 30px;
}

.fox-dialog .el-dialog__body .el-tabs__nav-wrap::after {
    background: none !important;
}

// 弹框内容中卡片tab样式修改

// .el-dialog__body .el-tabs--card > .el-tabs__header{
//   border: none;
// }
// .el-dialog__body .el-tabs--card > .el-tabs__header .el-tabs__nav{
//   border: none;
// }
// .el-dialog__body .el-tabs--card > .el-tabs__header .el-tabs__item{
//   border: none;
// }

// .el-dialog__body .el-tabs__item.is-active{
//   background-color: #F7F9FC;
// }

// 弹框中 table样式修改
.fox-dialog .el-dialog__body .el-table tr {
    /*background: none;*/
}

.fox-dialog .el-dialog__body .el-table .el-table__header-wrapper th,
.el-table .el-table__fixed-header-wrapper th {
    background-color: #f7f9fc;
}

.fox-dialog .el-dialog__body .el-table {
    background-color: #f7f9fc;
}

.fox-dialog .el-collapse-item__wrap {
    border-bottom: none;
}

.fox-dialog .el-radio-group {
    padding-left: 15px;
}

.fox-dialog .el-textarea__inner {
    /*border: none;*/
}

.fox-dialog .el-upload--picture-card {
    width: 120px;
    height: 120px;
    margin: 10px 0;
    line-height: 128px;
}

.fox-dialog .el-upload {
    margin: 10px;
}

/*label过长*/
.overLable .el-form-item--medium .el-form-item__label {
    line-height: 20px;
    text-align: right;
    padding-left: 10px;
}

.fox-dialog .el-input-number--medium {
    width: 100%;
}

.fox-dialog .el-dialog__headerbtn {
    top: 0;
}

.dialog-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.fox-dialog .el-tree-node.is-current>.el-tree-node__content {
    background-color: #4468EE !important;
    color: #FFD55E;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 0.2rem;
}
</style>

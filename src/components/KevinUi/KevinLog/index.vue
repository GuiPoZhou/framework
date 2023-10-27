<template>
    <div class="kevi-dialog" ref="KevinLog">
        <el-dialog :visible.sync="diaLogShows" :close-on-click-modal="false" :width="diaLogWidth" :fullscreen="isFullScreen"
            class="kevi-dialog" :class="!isFullScreen ? 'minClass' : 'kevi-dialog'" :show-close="false" @close="e_dialogClose"
            @open="e_dialogOpen" ref="el_dialog123" :append-to-body="true">
            <div slot="title" class="dialog-title">
                <span class="topTilte">{{ diaLogTitle }}</span>
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
            <div class="foxlogbody" ref="foxlogbody">
                <slot name="bologbody"></slot>
            </div>
            <!-- 弹框底部按钮区域 -->
            <div slot="footer" class="dialog-footer">
                <slot name="bologfooter"></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diaLogShows: false,
            isFullScreen: false
        }
    },
    props: {
        diaLogWidth: {
            typeof: String,
            default: '50%'
        },
        diaLogTitle: {
            typeof: String,
            default: '弹框'
        },
        diaLogShow: {
            typeof: Boolean,
            default: false
        },
        fullScreen: {
            typeof: Boolean,
            default: false
        }
    },
    watch: {
        fullScreen(val) {
            this.isFullScreen = val
        },
        diaLogShow(val) {
            this.diaLogShows = val
        }
    },
    mounted(){
        console.log('KevinLog',this.$refs.KevinLog.clientHeight)
     
    },
    methods: {
        /*
         *@author: 焦政
         *@date: 2022-02-21 09:15:45
         *@description:关闭弹框
         */
        e_dialogClose() {
            this.$emit('close')
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

.kevi-dialog .el-input {
    // width: 220px;
}

.kevi-dialog .el-form--inline .el-form-item {
    width: 100%;
}

.kevi-dialog .el-form-item__content {
    width: calc(100% - 120px);
}

.kevi-dialog .el-date-editor.el-input,
.kevi-dialog .el-date-editor.el-input__inner {
    width: 100% !important;
}

.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
    width: 220px;
}

.kevi-dialog .el-select {
    width: 100%;
}

.kevi-dialog .el-autocomplete {
    width: 100%;
}

.kevi-dialog .el-dialog__body .el-col {
    margin-bottom: 10px !important;
}

// 百叶窗标题部分
.kevi-dialog .foxlogbody .el-collapse-item__header {
    background-color: #f5f6f7 !important;
    padding-left: 0.5rem;
    height: 2.3rem;
}

// 百叶窗内容部分
.kevi-dialog .foxlogbody .el-collapse-item__content {
    padding-bottom: 0 !important;
    padding: 0.5rem !important;
}

.kevi-dialog .el-dialog__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.kevi-dialog .el-dialog {
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

.kevi-dialog .el-dialog__body {
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
    border: 1px solid #dcdee1;
    padding: 0.5rem;
}

.kevi-dialog .el-dialog__header {
    width: 100%;
    position: absolute;
    height: 50px;
    top: 0;
    background-color: #f1f2f3;
    line-height: 50px;
    left: 0;
}

.kevi-dialog .el-dialog__body::-webkit-scrollbar {
    /*display: none;*/
    /*隐藏滚动条*/
}

.el-dialog__headerbtn {
    margin-top: 0px;
}

.kevi-dialog .el-dialog__footer {
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

.kevi-dialog .el-dialog__title {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333;
}

.kevi-dialog .el-dialog--center .el-dialog__body {
    padding: 13px 25px 30px;
}

.kevi-dialog .el-dialog__body .el-tabs__nav-wrap::after {
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
.kevi-dialog .el-dialog__body .el-table tr {
    /*background: none;*/
}

.kevi-dialog .el-dialog__body .el-table .el-table__header-wrapper th,
.el-table .el-table__fixed-header-wrapper th {
    background-color: #f7f9fc;
}

.kevi-dialog .el-dialog__body .el-table {
    background-color: #f7f9fc;
}

.kevi-dialog .el-collapse-item__wrap {
    border-bottom: none;
}

.kevi-dialog .el-radio-group {
    padding-left: 15px;
}

.kevi-dialog .el-textarea__inner {
    /*border: none;*/
}

.kevi-dialog .el-upload--picture-card {
    width: 120px;
    height: 120px;
    margin: 10px 0;
    line-height: 128px;
}

.kevi-dialog .el-upload {
    margin: 10px;
}

/*label过长*/
.overLable .el-form-item--medium .el-form-item__label {
    line-height: 20px;
    text-align: right;
    padding-left: 10px;
}

.kevi-dialog .el-input-number--medium {
    width: 100%;
}

.kevi-dialog .el-dialog__headerbtn {
    top: 0;
}
</style>

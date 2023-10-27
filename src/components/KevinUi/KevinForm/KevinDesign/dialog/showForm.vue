<template>
    <BoDialog ref="BoDialog" :diaLogShow="showdiaLogShow" @close="e_close" :diaLogTitle="dialogTitle" width="40%">
        <template slot="bologbody">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" :label-position="KevinJson.KevinWidget.formlabelPosition">
                <KevinRenders ref="KevinRender" :context="context" :Widget="renderWidget" :form="form" />
            </el-form>
        </template>
        <template slot="bologfooter">
            <el-button :type="buttonInfo.type" :size="buttonInfo.size"
                v-for="(buttonInfo, buttonIndex) in dialogFooterButtons" :key="buttonIndex"
                @click="e_dialogButtonEvents(buttonInfo.events)">
                {{ buttonInfo.title }}
            </el-button>
        </template>
    </BoDialog>
</template>

<script>
import KevinRenders from '../../kevinRender.vue'
export default {
    components: {
        KevinRenders
    },
    data() {
        return {
            showdiaLogShow: false,
            renderWidget: [],
            context: this,
            dialogFooterButtons: [],
            dialogTitle: '',
            KevinJson: {
                KevinWidget:{}
            },
            form: {
                extData: {}
            },
            businessEnv:'add'
        }
    },
    methods: {
        init(KevinJson) {
            this.KevinJson = JSON.parse(JSON.stringify(KevinJson))
            console.log('this.KevinJson',this.KevinJson)
            this.dialogTitle = KevinJson.KevinWidget.title
            this.renderWidget = KevinJson.KevinWidget.children
            this.dialogFooterButtons = KevinJson.KevinWidget.diaLogFooterButton
            this.fullScreen = true
            this.showdiaLogShow = true
            this.$nextTick(() => {
                this.runWidgetAutoEvents(this.KevinJson.KevinWidget.autoEvents)
            })
            
        },
        runWidgetAutoEvents(autoEvents) {
            if (autoEvents) {
                for (let key in autoEvents) {
                    new Function('ctx', '_this', autoEvents[key])(this, this.$refs.KevinRender)
                }
            }
            this.form = { ...this.form }
        },
        e_close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

.el-row {
  display: flex;
  flex-wrap: wrap;
}
.el-row div{
    width: 100%;
    display: flex;
  flex-wrap: wrap;
}
</style>
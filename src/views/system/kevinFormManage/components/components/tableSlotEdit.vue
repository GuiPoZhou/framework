<template>
    <div>
        <bo-dialog :dia-log-show="showLog" :dia-log-title="title" :dia-log-width="'60%'" @close="e_close">
            <template slot="bologbody">
                <component ref="component" :is="conponentsName" @selPerm="e_selPerm" @close="e_close" @save="save">
                </component>
            </template>
            <template slot="bologfooter">
                <el-button size="small" type="primary" @click="e_doSave">保存</el-button>
                <el-button size="small" @click="e_close">取消</el-button>
            </template>
        </bo-dialog>
    </div>
</template>

<script>
import boDialog from '../../../../../components/Boshland/BoContainer/boDialog.vue'
import slotSpan from './slotSpan.vue'
import slotLink from './slotLink.vue'
export default {
    components: { boDialog, slotSpan, slotLink },
    data() {
        return {
            showLog: false,
            title: '',
            conponentsName: ''
        }
    },
    methods: {
        e_selPerm() {

        },
        e_doSave() {
            this.$refs.component.save()
        },
        save(params) {
            this.$emit('save', params)
        },
        e_close() {
            this.$confirm('取消操作将不会保存当前编辑，是否关闭?').then(() => {
                this.$emit('close')
            })
        },
        init(params) {
            this.showLog = true
            switch (params.renderType) {
                case "span":
                    this.conponentsName = 'slotSpan'
                    this.title = '配置文本组件'
                    break;
                case 'elLink':
                    this.conponentsName = 'slotLink'
                    this.title = '配置按钮组件'
                    break
            }
            this.$nextTick(() => {
                this.$refs.component.init(params)
            })
        }
    }
}
</script>

<style></style>
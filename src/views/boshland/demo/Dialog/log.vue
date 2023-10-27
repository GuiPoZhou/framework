<template>
    <BoDialog :diaLogShow="diaLogShow" diaLogTitle="样例" @close="e_close">
        <template slot="bologbody"></template>
        <template slot="bologfooter">
            <el-button type="primary" size="small">保存</el-button>
            <el-button type="danger" size="small" @click="e_close">关闭</el-button>
        </template>
    </BoDialog>
</template>
<script>
export default {
    data() {
        return {
            diaLogShow: false
        }
    },
    methods: {
        //
        init() {
            this.diaLogShow = true
        },
        e_close() {
            this.$emit('close')
        }
    }
}
</script>

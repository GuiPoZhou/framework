<template>
    <div class="kevin_upload_device">
        <div class="k_u_d_top" style="margin-bottom: 0.7rem;">
            <el-select v-model="selectType" placeholder="请选择" size="small" style="margin-right: 0.7rem;width: 200px;">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-upload class="upload-demo" :action="action" :show-file-list="false" :on-success="onSuccess">
                <el-button size="small" type="primary" icon="el-icon-folder-opened">点击上传</el-button>
            </el-upload>
        </div>
        <el-table :data="fileList" style="width: 100%" border>
            <el-table-column prop="fileType" label="附件类型" align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="附件名称" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button v-for="(item, index) in actionList" :key="index" type="text"
                        @click="e_actionClick(item, scope)">{{
                            item.label }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        widgetInfo: Object
    },
    watch: {
        widgetInfo: {
            handler() {
                this.selectType = this.widgetInfo.selectType
                this.typeList = this.widgetInfo.typeList
                this.action = window.globalEnv.VUE_APP_BASE_API + this.widgetInfo.options.action + '?Authorization=' + localStorage.getItem('Admin-Token') + '&MenuId=' + localStorage.getItem('menuId')
                this.fileList = this.widgetInfo.fileList
                this.actionList = this.filterActionList(this.widgetInfo.actionList)
            },
            immediate: true,
            deep: true
        },
        context: Object
    },
    data() {
        return {
            selectType: '',
            typeList: [],
            action: '',
            fileList: [],
            actionList: []
        }
    },
    methods: {
        onSuccess(response, file, fileList) {
            let uploadInfo = file.response
            uploadInfo.fileType = this.selectType
            this.$emit('success', uploadInfo)
        },
        filterActionList(list) {
            if (list && list.length != 0) {
                let arr = []
                list.forEach(item => {
                    if (!item.statusEvents || new Function('ctx', item.statusEvents)(this.context)) {
                        arr.push(item)
                    }
                })
                return arr
            }
            return []
        },
        e_actionClick(actionButtonInfo, scope) {
            this.$emit('actionClick', { actionButtonInfo, scope })
        }
    }
}
</script>

<style lang="scss" scoped>
.kevin_upload_device {
    width: 100%;
    border: 1px solid #EBEBEB;
    padding: 0.3rem;
    border-radius: 3px;

    .k_u_d_top {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}
</style>
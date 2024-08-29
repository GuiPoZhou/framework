<template>
    <div class="kevin_upload_device">
        <div class="k_u_d_top" style="margin-bottom: 0.7rem;" v-if="!disabled">
            <el-select v-model="selectType" placeholder="请选择" size="small" style="margin-right: 0.7rem;width: 200px;">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-upload class="upload-demo" :action="action" :show-file-list="false" :on-success="onSuccess">
                <el-button size="small" type="primary" icon="el-icon-folder-opened">点击上传</el-button>
            </el-upload>
        </div>
        <el-table :data="fileList" style="width: 100%" border>
            <el-table-column :prop="widgetInfo.typeProp" label="附件类型" align="center">
                <template slot-scope="scope">
                    <span>{{ handlerType(scope.row[widgetInfo.typeProp]) }}</span>
                </template>
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
// import { getToken } from '@/utils/auth'
const getToken = ()=>{
    return localStorage.getItem('Admin-Token')
}
export default {
    props: {
        widgetInfo: Object,
        context: Object,
        disabled: {
            typeof: Boolean,
            default: false
        }
    },
    watch: {
        widgetInfo: {
            handler() {
                this.action = window.globalEnv.VUE_APP_BASE_API + this.widgetInfo.options.action + '?Authorization=' + localStorage.getItem('Admin-Token') + '&MenuId=' + localStorage.getItem('menuId')
                this.fileList = this.widgetInfo.fileList
                this.actionList = this.filterActionList(this.widgetInfo.actionList)
                this.selectType = this.widgetInfo.typeList[0].value
            },
            deep: true
        },

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
    mounted() {
        this.typeList = this.widgetInfo.typeList
    },
    methods: {

        handlerType(type) {
            let typeInfo = this.typeList.filter(item => {
                return item.value == type
            })
            if (typeInfo.length != 0) {
                return typeInfo[0].label
            } else {
                return '未知类型，查看是否字典内容丢失或改变'
            }

        },
        onSuccess(response, file, fileList) {
            if (file.response.code == 200) {
                let uploadInfo = file.response
                uploadInfo[this.widgetInfo.typeProp] = this.selectType
                uploadInfo.filePath = uploadInfo.url
                this.$emit('success', uploadInfo)
            } else {
                this.$message.error(file.response.msg)

            }

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
<template>
    <KevinLog ref="KevinLog" :dia-log-show="showLog" diaLogWidth="90%" dia-log-title="获取权限" @close="e_close">
        <template slot="bologbody">
            <widgetEditContainer :showLeft="false">
                <div slot="wecRight" class="per_area">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="LIMS" name="0"></el-tab-pane>
                        <el-tab-pane label="ELN" name="1"></el-tab-pane>
                        <el-tab-pane label="物联网" name="2"></el-tab-pane>
                    </el-tabs>
                    <el-table v-loading="loading" :data="menuList" row-key="menuId" :default-expand-all="isExpandAll"
                        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" border>
                        <el-table-column prop="menuName" label="菜单名称"></el-table-column>

                        <el-table-column prop="perms" label="权限标识" align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.perms" type="primary" effect="dark" size="small">{{ scope.row.perms
                                }}
                                </el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center" fixed="right" width="230">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.menuType == 'F'" size="mini" type="text"
                                    @click="e_selPerm(scope.row)">选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </widgetEditContainer>
        </template>

    </KevinLog>
</template>

<script>
import KevinLog from '../../../../../KevinLog/index.vue'
import widgetEditContainer from '@/components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/widgetEditContainer.vue'
import { listMenu } from "@/api/system/menu";

export default {
    components: {
        KevinLog,
        widgetEditContainer
    },
    data() {
        return {
            showLog: false,
            activeName: '0',
            loading: false,
            menuList: [],
            isExpandAll: false,
            queryParams: {}
        }
    },
    methods: {
        handleClick() {
            this.getList()
        },
        e_selPerm(row) {
            this.$emit('confirmPerm', row.perms)
        },
        e_close() {
            this.$emit('close')
        },
        init() {
            console.log('aa')
            this.showLog = true
            this.$refs.KevinLog.isFullScreen = true
            this.getList()
        },
        getList() {
            this.loading = true;
            this.queryParams.sysType = this.activeName
            listMenu(this.queryParams).then(response => {
                this.menuList = this.handleTree(response.data, "menuId");
                this.loading = false;
            });
        },
    }
}
</script>

<style scoped lang="scss">
.per_area {
    padding: 0 0.7rem;
}
</style>
<template>
    <KevinDrawer size="50%" title="选择业务类型" :show="showDrawer" direction="ltr">
        <template slot="topbuttons">
            <el-button size="small" @click="close">关闭</el-button>
        </template>
        <widgetEditContainer :showLeft="false">
            <div slot="wecRight" class="per_area">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="业务类型编码">
                                <el-input v-model="form.businessTypeCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="业务类型名称">
                                <el-input v-model="form.businessTypeName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button size="small" type="primary" @click="getList">查询</el-button>
                                <el-button size="small" @click="e_reset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="tableData" style="width: 100%" border :height="innerHeight">
                    <el-table-column prop="belongToBranch" label="所属分支" align="center">
                    </el-table-column>
                    <el-table-column prop="businessTypeCode" label="业务类型编码" align="center">
                    </el-table-column>
                    <el-table-column prop="businessTypeName" label="业务类型名称" align="center">
                    </el-table-column>
                    <el-table-column prop="orderNum" label="显示顺序" align="center">
                    </el-table-column>
                    <el-table-column prop="readonly" label="是否只读" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.readonly == 1">是</span>
                            <span v-if="scope.row.readonly == 0">否</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="used" label="使用状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.used == 1">已使用</span>
                            <span v-if="scope.row.used == 0">未使用</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="visible" label="是否可见" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.visible == 1">是</span>
                            <span v-if="scope.row.visible == 0">否</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="e_sel(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :pageSizes="[50, 100, 150, 200]" :page.sync="form.pageNum"
                    :limit.sync="form.pageSize" @pagination="getList" />
            </div>

        </widgetEditContainer>
    </KevinDrawer>
</template>

<script>
import KevinDrawer from '@/components/KevinUi/KevinDrawer/kevindrawer'
import widgetEditContainer from '@/components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/widgetEditContainer.vue'
import { listMenu } from "@/api/system/menu";

export default {
    components: {
        KevinDrawer,
        widgetEditContainer
    },
    data() {
        return {
            form: {
                pageNum: 1,
                pageSize: 50
            },
            total: 0,
            tableData: [],
            showDrawer: false,
            activeName: '0',
            loading: false,
            menuList: [],
            isExpandAll: false,
            queryParams: {},
            innerHeight: 0,
        }
    },
    methods: {
        e_sel(row){
            this.$emit('confirm',row)
        },
        handleClick() {
            this.getList()
        },
        e_selPerm(row) {
            this.$emit('confirm', row.perms)
        },
        close() {
            this.$emit('close')
        },
        init() {

            this.showDrawer = true
            this.innerHeight = window.innerHeight - 200
            this.getList()
        },
        e_reset() {
            this.form = {
                pageNum: 1,
                pageSize: 50
            }
            this.getList()
        },
        getList() {
            this.$net('/businessType/list', 'get', this.form).then(re => {
                this.tableData = re.data.list
                this.total = re.data.total
            })
        },
    }
}
</script>

<style scoped lang="scss">
.per_area {
    padding: 0 0.7rem;
}
</style>
<template>
    <KevinDrawer size="80%" title="选择低码表单" :show="showDrawer" direction="ltr">
        <template slot="topbuttons">
            <el-button size="small" @click="close">关闭</el-button>
        </template>
        <widgetEditContainer :showLeft="false">
            <div slot="wecRight" class="per_area">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="标题">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="唯一键">
                                <el-input v-model="form.id"></el-input>
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
                <el-table highlight-current-row :data="tableData" style="width: 100%" :height="innerHeight" border>
                    <el-table-column prop="id" label="唯一键" align="center"></el-table-column>
                    <!-- <el-table-column prop="businessTypeName" label="业务类型" align="center">
                            </el-table-column>
                            <el-table-column prop="businessTypeCode" label="业务编码" align="center">
                            </el-table-column> -->
                    <!-- <el-table-column prop="tableName" label="数据主表" align="center">
                            </el-table-column> -->
                    <el-table-column prop="title" label="标题" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="应用名称" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.name == 'foundation'">基础模块(foundation)</span>
                            <span v-if="scope.row.name == 'generic'">通用模块(generic)</span>
                            <span v-if="scope.row.name == 'project'">项目独立模块(project)</span>
                            <span v-if="scope.row.name == 'framework'">基座模块(framework)</span>
                            <span v-if="scope.row.name == '复制内容'">复制内容</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="低码类型" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.remark == 'lowcode_form'">低码表单</span>
                            <span v-if="scope.row.remark == 'lowcode_project'">低码插件</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="e_saveLocal(scope.row)">选择</el-button>
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
import widgetEditContainer from './widgetEditContainer.vue'
import KevinDrawer from '../../../../../KevinDrawer/kevindrawer.vue'
export default {
    components: {
        widgetEditContainer,
        KevinDrawer
    },
    data() {
        return {
            form: {
                pageNum: 1,
                pageSize: 50,
                remark: "lowcode_form"
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
        handleClick() {
            this.getList()
        },
        e_saveLocal(row) {
            this.$emit('confirm', row)
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
                pageSize: 50,
                remark: "lowcode_form"
            }
            this.getList()
        },
        getList() {
            this.$net('/formLayout/v2/getFormLayoutList', 'post', this.form).then(re => {
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
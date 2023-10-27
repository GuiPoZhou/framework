
<template>
    <div class="typecontainer">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="platformName"
                align="center"
                label="平台名称">
            </el-table-column>
            <el-table-column
                prop="platformNameCode"
                align="center"
                label="平台编码">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
            >
                <template slot-scope="scope">
                    <router-link :to="'/system/menuManage/index?platFormType=' + scope.row.platformNameCode" class="link-type">管理菜单</router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    platformName: 'LIMS',
                    platformNameCode: '0'
                }, {
                    platformName: 'ELN',
                    platformNameCode: '1'
                },{
                    platformName: '物联网',
                    platformNameCode: '2'
                },{
                    platformName: 'App',
                    platformNameCode: '3'
                },
            ]
        }
    },
    created() {

    },
    methods:{
        /**
        * @author Coder
        * @date 2022/12/29
        * @des 管理菜单
        */
        e_menuManage(row){
            this.$router.push('/system/menuManage/index')
        }
    }
}
</script>
<style scoped>
.typecontainer{
    width: 100%;
    height: 98vh;
    background-color: #fff;
    padding: 20px;
}
</style>

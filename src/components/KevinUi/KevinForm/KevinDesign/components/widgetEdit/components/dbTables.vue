<template>
    <div>
        <BoDialog :diaLogShow="shwolog" diaLogTitle="表 字段选择" diaLogWidth="80%" @close="e_close">
            <template slot="bologbody">
                <div class="db_table_body" ref="kevin_drawer_body" :style="{ height: innerHeight + 'px' }">
                    <div class="k_d_b_left">
                        <el-divider content-position="left">业务主表</el-divider>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom: 0.7rem;">
                        </el-input>
                        <el-tree ref="tree" height="400px" :data="getTableListInfoList" :filter-node-method="filterNode"
                            @node-click="handleMainCheckChange" :render-content="renderMainTable">
                        </el-tree>
                    </div>
                    <div class="k_d_b_center">
                        <el-divider content-position="left">业务主表固定字段</el-divider>
                        <el-input v-model="mainColumnSearchName" placeholder="请输入属性名称" clearable size="small"
                            prefix-icon="el-icon-search" style="margin-bottom: 20px" />
                        <el-tree hight="400px" ref="mainColumnTree" :check-on-click-node="true"
                            :data="getMainColumnListInfoList" :filter-node-method="filterColumnNode"
                            :render-content="renderMainColumnContent">
                        </el-tree>
                    </div>
                    <div class="k_d_b_right">
                        <el-divider content-position="left">业务主表扩展字段</el-divider>
                        <el-input v-model="mainExtColumnSearchName" placeholder="请输入属性名称" clearable size="small"
                            prefix-icon="el-icon-search" style="margin-bottom: 20px" />
                        <el-tree hight="400px" ref="mainExtColumnTree" :data="getMainExtColumnListInfoList"
                            :filter-node-method="filterExtColumnNode" :render-content="renderMainExtColumnContent">
                        </el-tree>
                    </div>
                </div>
            </template>
            <template slot="bologfooter">
                <el-button size="small" @click="e_close">关闭</el-button>
            </template>
        </BoDialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shwolog: false,
            innerHeight: 0,
            tableListInfo: [],
            filterText: "",
            mainColumnSearchName: '',
            mainExtColumnSearchName: '',
            businessConfigList: [],
            mainColumnListInfo: [],
            mainExtColumnListInfo: [],
            columnExSearchName: "",
            exDataOptions: [],
            mainTableName: '',
        }
    },
    computed: {
        getTableListInfoList() {
            let result = [];
            this.tableListInfo.forEach(item => {
                let record = {
                    id: item.tableName,
                    label: item.tableName + ' | (' + item.tableComment + ')',
                    // label: item.tableComment ,
                }
                result.push(record);
            })
            return result;
        },
        getMainColumnListInfoList() {
            let result = [];
            this.mainColumnListInfo.forEach(item => {
                let record = {
                    id: item.columnName,
                    label: item.columnName + ' | (' + item.columnComment + ')',
                    // label: item.columnComment ,
                }
                result.push(record);
            })
            return result;
        },
        getMainExtColumnListInfoList() {
            let result = [];
            this.mainExtColumnListInfo.forEach(item => {
                let record = {
                    id: item.key,
                    label: item.label + ' | (' + item.key + ')',
                }
                result.push(record);
            })
            return result;
        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        mainColumnSearchName(val) {
            this.$refs.mainColumnTree.filter(val);
        },
        mainExtColumnSearchName(val) {
            this.$refs.mainExtColumnTree.filter(val);
        },
    },
    methods: {
        changeSamllHump(str, tag) {
            var arr = str.split(tag);
            for (var i = 1; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
            }
            return arr.join("");
        },
        selMainTable(data) {
            let params = {
                tableName: data.id,
                type: 'fixed',
                keyName: ''
            }
            this.$emit('confirm', params)
        },
        selMainExtColumn(data) {
            let params = {
                tableName: this.mainTableName,
                type: 'ext',
                keyName: this.changeSamllHump(data.id, '_')
            }
            this.$emit('confirm', params)
        },
        selMainColumn(data) {
            let params = {
                tableName: this.mainTableName,
                type: 'fixed',
                keyName: this.changeSamllHump(data.id, '_')
            }
            this.$emit('confirm', params)
        },
        renderMainExtColumnContent(h, { node, data, store }) {
            return (
                <div class="custom-tree-node">
                    <span>{node.label}</span>
                    <el-button size="mini" type="text" on-click={() => this.selMainExtColumn(data)}> 选择</el-button>
                </div>);
        },
        renderMainColumnContent(h, { node, data, store }) {
            return (
                <div class="custom-tree-node">
                    <span>{node.label}</span>
                    <el-button size="mini" type="text" on-click={() => this.selMainColumn(data)}> 选择</el-button>
                </div>);
        },
        renderMainTable(h, { node, data, store }) {
            return (
                <div class="custom-tree-node">
                    <span>{node.label}</span>
                    <el-link type="warning" underline={false} on-click={() => this.selMainTable(data)}> 选择</el-link>
                </div>);
        },
        filterExtColumnNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        filterColumnNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleMainColumnCheckChange(data) {

        },
        handleMainCheckChange(data) {
            this.mainTableName = data.id
            this.$net(`/dbConfig/getColumnInfo/${data.id}`, 'get').then(res => {
                this.$set(this, 'mainColumnListInfo', res.data);
            })
            this.$net(`/dbConfig/getExColumnConfigList/${data.id}`, 'get').then(res => {
                this.$set(this, 'mainExtColumnListInfo', res.data);
            })
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        init() {
            this.shwolog = true
            this.innerHeight = window.innerHeight - 140
            this.getList()
        },
        e_close() {
            this.$emit('close')
        },
        getList() {
            this.$net('/dbConfig/getTableInfo', 'get').then(re => {
                this.tableListInfo = re.data
            })
        },
    }
}
</script>
<style scoped lang="scss">
.db_table_body {
    width: 100%;
    height: 100%;
    background-color: #EBEEF5;
    overflow: hidden;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .k_d_b_left {
        width: 32%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: auto;
        padding: 0.7rem;

        /deep/.el-tree-node.is-current>.el-tree-node__content {

            background-color: #4468EE !important;
            color: #FFD55E;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 0.2rem;

        }
    }

    .k_d_b_center {
        width: 32%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        margin: 0 0.7rem;
        padding: 0.7rem;
        overflow: auto;

        /deep/.el-tree-node.is-current>.el-tree-node__content {

            background-color: #4468EE !important;
            color: #FFD55E;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 0.2rem;

        }


    }

    .k_d_b_right {
        flex: 1;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        padding: 0.7rem;
        // margin-left: 0.7rem;
        overflow: auto;

        /deep/.el-table {
            width: 100%;

            .el-table__header-wrapper table,
            .el-table__body-wrapper table {
                width: 100% !important;
            }

            .el-table__body,
            .el-table__footer,
            .el-table__header {
                table-layout: fixed;
            }
        }
    }
}

/deep/.custom-tree-node {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>
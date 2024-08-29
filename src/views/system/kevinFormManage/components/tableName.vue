<template>
    <KevinDrawer size="50%" title="选择数据主表" :show="showDrawer" direction="ltr">
        <template slot="topbuttons">
            <el-button size="small" @click="close">关闭</el-button>
        </template>
        <widgetEditContainer :showLeft="false">
            <div slot="wecRight" class="per_area">
                <div class="table_tree_area" :style="{ height: innerHeight + 'px' }">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom: 0.7rem;">
                    </el-input>
                    <el-tree ref="tree" height="400px" :data="getTableListInfoList" :filter-node-method="filterNode"
                        @node-click="handleMainCheckChange">
                    </el-tree>
                </div>

            </div>
        </widgetEditContainer>
    </KevinDrawer>
</template>

<script>
import KevinDrawer from '@/components/KevinUi/KevinDrawer/kevindrawer'
import widgetEditContainer from '@/components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/widgetEditContainer.vue'
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
            tableListInfo: [],
            showDrawer: false,
            activeName: '0',
            loading: false,
            menuList: [],
            isExpandAll: false,
            queryParams: {},
            innerHeight: 0,
            filterText: ""
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
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleMainCheckChange(data) {
            this.$emit('confirm', data)
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
            this.innerHeight = window.innerHeight
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
            this.$net('/dbConfig/getTableInfo', 'get').then(re => {
                this.tableListInfo = re.data
            })
        },
    }
}
</script>

<style scoped lang="scss">
.per_area {
    padding: 0 0.7rem;
}

.table_tree_area {
    width: 100%;
}
</style>
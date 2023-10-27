<template>
    <KevinDrawer :show="showDrawer" :title="`选择验收模板·${typeName}`" size="40%" direction="ltr">
        <el-button slot="topbuttons" size="small" @click="close" style="margin-left: 3rem;">关闭</el-button>
        <widgetEditContainer :showLeft="false">
            <div slot="wecRight" style="padding: 0.7rem;">
                <el-table ref="ElTable" :data="tableData" style="width: 100%" border>
                    <el-table-column prop="code" label="编号" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="模板名称" align="center">
                    </el-table-column>
                    <el-table-column prop="isDefault" label="是否默认" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isDefault" disabled :active-value="1" :inactive-value="0"
                                active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="e_selModel(scope.row.content)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </widgetEditContainer>
    </KevinDrawer>
</template>

<script>
import KevinDrawer from '../../../KevinDrawer/kevindrawer.vue'
import widgetEditContainer from '../../KevinDesign/components/widgetEdit/components/widgetEditContainer.vue'
export default {
    props: {
        typeName: String,
        code: String
    },
    components: {
        KevinDrawer,
        widgetEditContainer
    },
    data() {
        return {
            showDrawer: false,
            tableData: []
        }
    },
    methods: {
        e_selModel(content) {
            let formDataStr = JSON.stringify(content)
            let resultDataStr = formDataStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            this.$emit('confirmModel', JSON.parse(resultDataStr))
        },
        init() {
            this.showDrawer = true
            console.log('code', this.code)
            this.$net(`/equipment/v1/inspect/config/list?code=${this.code}`, 'get').then(re => {
                this.tableData = re.data[0].detailList
            })
        },
        close() {
            this.$emit('close')
        }
    }

}
</script>

<style></style>
<template>
    <div>
        <BoContainer pageTitle="样本" :total="tableData.length">
            <template slot="boMain">
                <BoMain>
                    <template slot="botabs">
                        <el-tabs v-model="activeName">
                            <el-tab-pane
                                label="待审核"
                                name="1"
                            ></el-tab-pane>
                            <el-tab-pane
                                label="已审核"
                                name="2"
                            ></el-tab-pane>
                        </el-tabs>
                    </template>
                    <template slot="bosearch">
                        <el-form :model="queryParams"
                                 ref="queryFrom"
                                 :inline="true"
                                 class="searchform"
                        >
                            <!--              提报厂区-->
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="factoryArea"
                                >
                                    <el-input v-model="queryParams.factoryArea" clearable/>
                                </el-form-item>
                            </div>
                            <!--              提报人-->
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <!-- <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div> -->
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="createBy"
                                >
                                    <el-input v-model="queryParams.createBy" clearable/>
                                </el-form-item>
                            </div>

                            <!--                备品名称-->
                            <div class="intBor">
                                <el-form-item
                                    label="查询1"
                                    prop="spareName"
                                >
                                    <el-input v-model="queryParams.spareName" clearable/>
                                </el-form-item>
                            </div>
                            <!--              搜索-->
                            <el-form-item>
                                <el-button type="primary" size="mini" icon="el-icon-search"
                                >{{ Lang[lang]['searchBtn'] }}
                                </el-button>
                                <!--                重置-->
                                <el-button size="mini" icon="el-icon-refresh"
                                >重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                    <template slot="bobutton">
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button size="small" type="primary" @click="e_showLog">{{ Lang[lang]['addBtn'] }}</el-button>
                                <el-button size="small" type="info">{{ Lang[lang]['editBtn'] }}</el-button>
                                <el-button size="small" type="danger">{{ Lang[lang]['deleteBtn'] }}</el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot="botable">
                        <el-table
                            :height="mainTableHeight"
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            border
                        >
                            <el-table-column
                                label="序号"
                                type="index"
                                width="180"
                            />
                            <el-table-column
                                prop="date"
                                label="日期"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址"
                            >
                            </el-table-column>
                        </el-table>
                    </template>

                </BoMain>
            </template>
        </BoContainer>
        <Log ref="Log" v-if="showLog" @close="showLog = false"/>
    </div>

</template>
<script>
import BoContainerMixin from '@/mixins/boContainer'
import Log from './Dialog/log'
import Lang from './Lang'
export default {
    mixins: [BoContainerMixin],
    components: {
        Log
    },
    data() {
        return {
            Lang,
            showLog:false,
            activeName: '1',
            queryParams: {},
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            },]
        }
    },
    mounted() {
    },
    methods: {
        e_showLog(){
            this.showLog = true
            this.$nextTick(()=>{
                this.$refs.Log.init()
            })
        }
    }
}
</script>

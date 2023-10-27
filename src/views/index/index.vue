<!--
 * @Autor: 焦政
 * @Date: 2021-01-08 10:31:44
 * @Description:
-->
<template>
    <div class="dashboard-editor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData"/>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="12">
                <!--委托订单数据-->
                <div class="chart-wrapper">
                    <BlockTitle title="委托订单数据统计" @updateCurrentTabId="updateCurrentTabId" :statIndex="0"/>
                    <WeiTOrderLine :currentTabId="currentTabId[0]"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <BlockTitle title="检测报告数据统计" @updateCurrentTabId="updateCurrentTabId" :statIndex="1"/>
                    <JianCeReport :currentTabId="currentTabId[1]"/>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <BlockTitle title="样品交接数据情况分析" @updateCurrentTabId="updateCurrentTabId" :statIndex="2"/>
                    <SampleJiaoJie :currentTabId="currentTabId[2]"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="12">
                <div class="chart-wrapper">
                    <BlockTitle title="检验样品数据情况分析" @updateCurrentTabId="updateCurrentTabId" :statIndex="3"/>
                    <SampleData :currentTabId="currentTabId[3]"/>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="6">
                <div class="chart-wrapper">
                    <BlockTitle title="超期预警" @updateCurrentTabId="updateCurrentTabId" :statIndex="4"/>
                    <ChaoQYujing :currentTabId="currentTabId[4]"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="18">
                <div class="chart-wrapper">
                    <BlockTitle title="采样情况" :showTab="false"/>
                    <CaiYangData/>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import PanelGroup from "@/views/dashboard/PanelGroup";
import LineChart from "@/views/dashboard/LineChart";
import RaddarChart from "@/views/dashboard/RaddarChart";
import PieChart from "@/views/dashboard/PieChart";
import BarChart from "@/views/dashboard/BarChart";
import BlockTitle from '@/components/dashbord/blockTitle'

import WeiTOrderLine from "@/views/dashboard/ant/WeiTOrderLine";
import JianCeReport from "@/views/dashboard/ant/JianCeReport";
import SampleJiaoJie from "@/views/dashboard/ant/SampleJiaoJie";
import SampleData from "@/views/dashboard/ant/SampleData";
import ChaoQYujing from "@/views/dashboard/ant/ChaoQYujing";
import CaiYangData from "@/views/dashboard/ant/CaiYangData";
const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
};

export default {
    name: "Index",
    components: {
        PanelGroup,
        LineChart,
        RaddarChart,
        PieChart,
        BarChart,
        BlockTitle,
        WeiTOrderLine,
        JianCeReport,
        SampleJiaoJie,
        SampleData,
        ChaoQYujing,
        CaiYangData,
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis,
            //天数查询条件  0-7天,1-30天, 2-12月
            currentTabId:[1,1,1,1,1]
        };
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type];
        },
        updateCurrentTabId(type, val){
            this.$set(this.currentTabId, type, val);
        }
    }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 4px 10px;
    position: relative;

    .chart-wrapper {
        background: #fff;
        //background: url('../assets/image/datavbgi.png') no-repeat center;
        //background-size: 100% 100%;
        padding: 16px 16px 0;
        margin-bottom: 1rem;
        border-radius: 10px;
    }
}

@media (max-width: 1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>

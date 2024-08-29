<template>
<div class="containter">
  <div class="fixedTop">
    <div class="noticeBox">
        <img src="../../assets/images/icon_idea.png" alt="">
        <div class="noticeInfo">
            <vue-seamless-scroll
                    :data="listData"
                    :class-option="classOption"
                    class="warp"
            >
                <ul class="ul-item">
                    <li class="li-item" v-for="(item, index) in listData" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </vue-seamless-scroll>
        </div>
    </div>
    <div class="tabsBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人" name="1" v-if="$checkPermi(['personalKanban']) == true"></el-tab-pane>
            <el-tab-pane label="全局" name="2" v-if="$checkPermi(['GlobalKanban']) == true"></el-tab-pane>
        </el-tabs>
    </div>
  </div>
    <div class="content">
      <!--  委托数据    -->
        <entrustData :entrustData="entrustData" :activeName="activeName"></entrustData>
        <div class="flexBox">
            <!--  样品数据   -->
            <sampleData :dataDetail="dataDetail" :activeName="activeName"></sampleData>
            <!--  检测数据  -->
            <detectionData :dataDetail="dataDetail" :activeName="activeName"></detectionData>
        </div>
        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-botttom">
            <!--  检测任务数据统计    -->
                <dataStatistics ref="chart" :activeName="activeName"></dataStatistics>
            </div></el-col>
            <el-col :span="16"><div class="grid-botttom">
            <!--  报告数据     -->
                <reportData :dataDetail="dataDetail" :activeName="activeName"></reportData>
            </div></el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import entrustData from './components/entrustData.vue'
import sampleData from './components/sampleData.vue'
import detectionData from './components/detectionData.vue'
import dataStatistics from './components/dataStatistics.vue'
import reportData from './components/reportData.vue'
import moment from "moment";
export default {
    components: {
        vueSeamlessScroll, entrustData,sampleData,detectionData, dataStatistics, reportData
    },
    data () {
        return {
            listData: ['2023年11月27日，关于纳通LIMS服务器重启说明！'],
            classOption: {
                limitMoveNum: 2,
                direction: 2,
                step: 0.3
            },
            activeName: '1',
            tagList: [],
            numberData: [
                {
                    "id": "样品数据-接收",
                    "info": {
                        "filter": "样品数据,接收,待接收|已接收",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "样品数据-领用",
                    "info": {
                        "filter": "样品数据,领用,待领用|已领用",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "样品数据-回库",
                    "info": {
                        "filter": "样品数据,回库,待回库|已回库",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "样品数据-处置",
                    "info": {
                        "filter": "样品数据,处置,待处置|已处置",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "检测数据-分配",
                    "info": {
                        "filter": "检测数据,分配,待分配|已分配",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "检测数据-接收",
                    "info": {
                        "filter": "检测数据,接收,待接收|被退回",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "检测数据-录入",
                    "info": {
                        "filter": "检测数据,录入,待录入|已完成",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "检测数据-审批",
                    "info": {
                        "filter": "检测数据,审批,待审批|已审批",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-分配",
                    "info": {
                        "filter": "报告数据,分配,待分配|已分配",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-编制",
                    "info": {
                        "filter": "报告数据,编制,待编制|被退回",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-提交",
                    "info": {
                        "filter": "报告数据,提交,待提交|已提交",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-审批",
                    "info": {
                        "filter": "报告数据,审批,待审批|已审批",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-批准",
                    "info": {
                        "filter": "报告数据,批准,待批准|已批准",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-发布",
                    "info": {
                        "filter": "报告数据,发布,待发布|已发布",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                },
                {
                    "id": "报告数据-归档",
                    "info": {
                        "filter": "报告数据,归档,待归档|已归档",
                        "resultType": 0,
                        "packageType": -1,
                        "time": moment().format('YYYY-MM-DD'),
                        "resultData": []
                    }
                }
            ],
            dataDetail: [],
            entrustData: [],
        }
    },
    mounted () {
        window.addEventListener("resize", () => {
            this.$refs.chart.myEcharts.resize();
        }, false)
        this.getData()
        setInterval(() => {
            this.getData()
        },300000)
        console.log('checkPermi',this.$checkPermi(['GlobalKanban']))
        if (this.$checkPermi(['GlobalKanban']) == true) {
            this.activeName = '2'
        }
        if (this.$checkPermi(['personalKanban']) == true) {
            this.activeName = '1'
        }
    },
    methods: {
        handleClick () {
            this.getData()
        },
        // 获取大屏数据
        getData () {
            var url = ''
            if (this.activeName == 1) {
                url = '/board/getBoardIndex?userId=' + this.$store.state.user.userInfo.userId
            } else {
                url = '/board/getBoardIndex'
            }
            const params = {
                numberData: this.numberData
            }
            this.$net(url, 'post', params).then(res => {
              this.dataDetail = res.data.numberData
                this.entrustData = res.data.customData.entrustAgreementList
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/homepage';
</style>
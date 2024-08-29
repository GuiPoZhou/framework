<template>
<div class="statisticsBox">
    <div class="titleBox">
        <div class="line"></div>
        <div class="name">检测任务数据统计</div>
        <div class="dateBox">
            <div class="list" v-for="(item, index) in dateList">
                <span class="dateItem" @click="handleMoth(index)" :class="{'isActive': active == index + 1}">{{item.label}}</span>
                <el-divider direction="vertical"></el-divider>
            </div>
        </div>
    </div>
    <div ref="charts" style="width:100%;height:215px"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: {
        activeName:{
            type: String
        }
    },
    data () {
        return {
            dateList: [
                {label: '近1周', value: 1},
                {label: '近1月', value: 2},
                {label: '近1年', value: 3},
            ],
            active: 1,
            myEcharts: null,
            url:'',
            parentActive: '1'
        }
    },
    mounted() {
        // this.url = `/v1/homeStatistics/entrustAgreement/${this.active}?userId=${this.$store.state.user.userInfo.userId}`
        this.getCharts()
    },
    watch: {
        activeName (val) {
            this.parentActive = val
            this.getCharts()
        }
    },
    methods: {
        handleMoth (index) {
          this.active = index + 1
            this.getCharts()
        },
        getCharts () {
            if (this.parentActive == 1) {
                this.url = `/v1/homeStatistics/entrustAgreement/${this.active}?userId=${this.$store.state.user.userInfo.userId}`
            } else {
                this.url = `/v1/homeStatistics/entrustAgreement/${this.active}`
            }
            this.$net(this.url, 'get').then(res => {
                var legendlist = res.data.map(item => {
                    return item.type
                })
                var dataX = []
                res.data.map(item => {
                    item.infoList.map(item => {
                        dataX.push(item.date)
                    })
                })
                var series = res.data.map(item => ({
                    name: item.type,
                    data: item.infoList.map(info => info.value),
                    type: 'line',
                    smooth: true
                }));
                dataX= [...new Set(dataX)];
                this.myEcharts = echarts.init(this.$refs.charts);
                var option = {
                    grid: {
                        top: '30%',//生成的echarts图片和顶部的距离
                        bottom: '-1%',//echarts图片和底部的距离
                        left: '1%',//echarts图片和左边的距离
                        right: '2%',//echarts图片和右边的间距,
                        containLabel: true//当containLabel:为ture时，以上设置生效
                    },
                    legend: {
                        right: '0',
                        top: '10%',
                        data: legendlist,
                        itemWidth: 10,  // 设置宽度
                        itemHeight: 10, // 设置高度
                    },
                    xAxis: {
                        type: 'category',
                        data: dataX,
                        axisLine: {//x轴线的颜色以及宽度
                            show: true,
                            lineStyle: {
                                color: "#D6D6D6",
                                type: "solid"
                            },
                        },
                        axisLabel: {//x轴文字的配置
                            show: true,
                            textStyle: {
                                color: "#999999",
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed'
                            }
                        },
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel: {//y轴文字的配置
                            textStyle: {
                                color: "#999999",
                            },
                        },
                    },
                    color: ['#3377FF', '#F98DB4', '#D08B0D'], // 自定义颜色
                    tooltip: {
                        trigger: 'axis'
                    },
                    series: series
                };

                option && this.myEcharts.setOption(option);
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/homepage';
/deep/.el-divider--vertical {
  margin: 0 15px;
  top: -2px;
}
</style>
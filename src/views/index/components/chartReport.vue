<template>
  <div id="chartReport"></div>
</template>

<script>
  export default {
    name: "chartReport",
    data () {
      return {
        datalist: []
      }
    },
    props: {
      chartreportList: Array
    },
    mounted() {
      // this.chartList()
    },
    watch: {
      chartreportList (val) {
        this.datalist = val
        this.chartList(this.datalist)
      }
    },
    methods: {
      chartList (data) {
        this.linePlot1 = new G2Plot.Line('chartReport', {
          data: data,
          height: 290,
          xField: 'date',
          yField: 'count',
          seriesField: 'name',
          yAxis: {
            label: {
              formatter: (datum) => {
                return `${datum}`;
              },
            },
          },
          legend: {
            position: 'top-right',
          },
          smooth: true,
          // @TODO 后续会换一种动画方式
          animation: {
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          },
          color: ['#4BCBD6', '#FEAB3F'],
        });

        this.linePlot1.render();
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div id="acceptance"></div>
</template>

<script>
  export default {
    name: "chartAcceptance",
    data () {
      return {
        datalist: []
      }
    },
    props: {
      chartacceptList: Array
    },
    watch: {
      chartacceptList (val) {
        this.datalist = val
        this.chartList(this.datalist)
      }
    },
    mounted() {
    },
    methods: {
      chartList (data) {
        this.linePlot = new G2Plot.Line('acceptance', {
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
              animation: 'wave-in',
              duration: 5000,
            },
          },
          color: ['#4BCBD6', '#3C8DBC'],
        });

        this.linePlot.render();
      }
    }
  }
</script>

<style scoped>

</style>

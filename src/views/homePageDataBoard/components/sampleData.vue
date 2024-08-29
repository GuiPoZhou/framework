<template>
<div class="flexItem">
    <div class="titleBox">
        <div class="line"></div>
        <div class="name">样品数据</div>
    </div>
    <ul class="flexSample">
        <li v-for="item in dataList">
            <div class="titleBox">
                <img :src="item.img" alt="">
                <div class="name">样品 -  <span>{{item.name}}</span></div>
            </div>
            <div class="numBox">
                <div class="spFlex" v-for="items in item.chaild">
                    <span class="sp1">{{items.name}}</span>
                    <span class="sp2" :style="{cursor:(activeName==1 && items.value > 0?'pointer':'default')}" @click="handleUrl(items)">
                      <CountTo
                        :startVal='startVal'
                        :endVal='items.value'
                        :duration='duration'
                    /></span>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import CountTo from "vue-count-to";

export default {
    components: {CountTo},
    props: {
        dataDetail: {
            type: Array,
            default: []
        },
      activeName: String
    },
    data () {
        return {
            dataList: [],
            duration: 3000,
            startVal: 0,
        }
    },
    watch: {
        dataDetail (val) {
            var list = []
            val.map(item => {
                if (item.id == '样品数据-接收') {
                    list.push({
                        name: '接收',
                        img: require('@/assets/images/icon_bookmark.png'),
                        chaild: [
                            {
                              name: '待接收',
                          value: item.info.resultData[0].name == '待接收' ? item.info.resultData[0].value :
                              item.info.resultData[1].name == '待接收' ? item.info.resultData[1].value : '',
                              url: '/micFoundation/receiveSample?type=wait',
                        },
                          {
                            name: '已接收',
                            value: item.info.resultData[1].name == '已接收' ? item.info.resultData[1].value :
                                item.info.resultData[0].name == '已接收' ? item.info.resultData[0].value : '',
                            url: '/micFoundation/receiveSample?type=done',
                          }
                        ]
                    })
                }
                if (item.id == '样品数据-领用') {
                    list.push({
                        name: '领用',
                        img: require('@/assets/images/icon_download_thi.png'),
                      chaild: [
                        {
                          name: '待领用',
                          value: item.info.resultData[0].name == '待领用' ? item.info.resultData[0].value :
                              item.info.resultData[1].name == '待领用' ? item.info.resultData[1].value : '',
                          url: '/micFoundation/sampleOutbound?type=1',
                        },
                        {
                          name: '已领用',
                          value: item.info.resultData[1].name == '已领用' ? item.info.resultData[1].value :
                              item.info.resultData[0].name == '已领用' ? item.info.resultData[0].value : '',
                          url: '/micFoundation/sampleOutbound?type=2',
                        }
                      ]
                    })
                }
                if (item.id == '样品数据-回库') {
                    list.push({
                        name: '回库',
                        img: require('@/assets/images/icon_download_sec.png'),
                      chaild: [
                        {
                          name: '待回库',
                          value: item.info.resultData[0].name == '待回库' ? item.info.resultData[0].value :
                              item.info.resultData[1].name == '待回库' ? item.info.resultData[1].value : '',
                          url: '/micFoundation/sampleReturn',
                        },
                        {
                          name: '已回库',
                          value: item.info.resultData[1].name == '已回库' ? item.info.resultData[1].value :
                              item.info.resultData[0].name == '已回库' ? item.info.resultData[0].value : '',
                          url: '/micFoundation/sampleInventory',
                        }
                      ]
                    })
                }
                if (item.id == '样品数据-处置') {
                    list.push({
                        name: '处置',
                        img: require('@/assets/images/icon_clean.png'),
                      chaild: [
                        {
                          name: '待处置',
                          value: item.info.resultData[0].name == '待处置' ? item.info.resultData[0].value :
                              item.info.resultData[1].name == '待处置' ? item.info.resultData[1].value : '',
                          url: '/micFoundation/sampleInventory',
                        },
                        {
                          name: '已处置',
                          value: item.info.resultData[1].name == '已处置' ? item.info.resultData[1].value :
                              item.info.resultData[0].name == '已处置' ? item.info.resultData[0].value : '',
                          url: '/micFoundation/processingRecords',
                        }
                      ]
                    })
                }
            })
            this.dataList = list
          console.log('this.dataList',this.dataList)
        }
    },
  methods: {
    handleUrl (item) {
      if (item.value > 0) {
        this.$router.replace({ path: item.url })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/homepage';
</style>
<template>
<div class="entrustBox">
  <ul class="item">
      <li v-for="item in entrustData">
          <div class="titleBox">
              <div class="line"></div>
<!--              <div class="name">委托报检 - <span>试验</span></div>-->
              <div class="name">{{item.entrustTypeStr}}</div>
          </div>
          <p class="total">今日{{item.orderStr == 0 ? '报检' : '受理'}}总数</p>
        <span :style="{cursor:(activeName==1 && item.totalNumber > 0?'pointer':'default')}" @click="handleUrl(item, 'totalNumber')">
           <CountTo
               class="number"
               :startVal='startVal'
               :endVal='item.totalNumber'
               :duration='duration'
           />
        </span>

          <div class="classBox">
              <div class="classfull">
                  <p>{{item.orderStr == 0 ? '待提交' : '待受理'}}</p>
                  <p :style="{cursor:(activeName==1 && item.unsubmitNumber > 0?'pointer':'default')}" @click="handleUrl(item, 'unsubmitNumber')">
                      <CountTo
                          :startVal='startVal'
                          :endVal='item.unsubmitNumber'
                          :duration='duration'
                      /></p>
              </div>
              <div class="classfull">
                  <p>{{item.orderStr == 0 ? '被退回' : '待提交'}}</p>
                  <p :style="{cursor:(activeName==1 && item.returnedNumber > 0?'pointer':'default')}" @click="handleUrl(item, 'returnedNumber')">
                      <CountTo
                          :startVal='startVal'
                          :endVal='item.returnedNumber'
                          :duration='duration'
                      /></p>
              </div>
              <div class="classfull">
                  <p>{{item.orderStr == 0 ? '受理中' : '已提交'}}</p>
                  <p :style="{cursor:(activeName==1 && item.finishNumber > 0?'pointer':'default')}" @click="handleUrl(item, 'finishNumber')">
                      <CountTo
                          :startVal='startVal'
                          :endVal='item.finishNumber'
                          :duration='duration'
                      /></p>
              </div>
          </div>
      </li>
  </ul>
</div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
    components: {CountTo},
    props: {
        entrustData: {
            type: Array,
            default: []
        },
      activeName: String
    },
    data () {
        return {
            config1:{
                number: [0],
                content: '{nt}',
                textAlign: 'left',
                style: {
                    // fontSize: 32,
                    fill: '#333',
                    fontWeight: 'bold',
                }
            },
            duration: 3000,
            startVal: 0,
        }
    },
    mounted() {
    },
    methods: {
      handleUrl (item, type) {
        if (type == 'totalNumber') {
          if (item.totalNumber == 0) {
            return
          }
        }
        if (type == 'unsubmitNumber') {
          if (item.unsubmitNumber == 0) {
            return
          }
        }
        if (type == 'returnedNumber') {
          if (item.returnedNumber == 0) {
            return
          }
        }
        if (type == 'finishNumber') {
          if (item.finishNumber == 0) {
            return
          }
        }
        this.$router.replace({ path: item.url })
      }
    }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/homepage';
</style>
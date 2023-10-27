<template>
  <div class="statisticsbox">
    <ul>
      <li v-for="(item, index) in datas" :key="index" @click="goDetail(item.url, item.hasPermission)">
        <p>{{item.title}}<i class="el-icon-caret-right"></i></p>
        <div class="statisticNum">
          <img :src="item.icon" alt="">
          <span>{{item.count}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "dataStatistics",
    props: {
      dataObj: Array
    },
    data () {
      return {
        datas: [],
      }
    },
    watch: {
      dataObj (newval) {
       this.datas = newval
      }
    },
    methods: {
      goDetail (url, hasPermission) {
        if (hasPermission === 1) {
          this.$router.push({ path: url})
        } else {
          this.$message.warning('您没有此权限')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .statisticsbox {
    background: #ffffff;
    border: 1px solid #EEEEEE;
    margin: 22px 0;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0;
      margin-bottom: 0;
    }
    li {
      width: 20%;
      display: inline-block;
      text-align: center;
      /*border-right: 1px solid #eee;*/
      border-bottom: 1px solid #eee;
      position: relative;
      padding: 24px 0;
      cursor: pointer;
      p {
        font-size: 15px;
        color: #365670;
        font-weight: 600;
      }
      .statisticNum {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 26px;
          height: 26px;
        }
        span {
          font-size: 20px;
          color: #365670;
          padding-left: 10px;
        }
      }
    }
    li::before{
      content: '';
      width: 1px;
      height: 60%;
      position: absolute;
      border-right: 1px solid #eee;
      right: 0;
    }
    li:nth-child(5)::before, li:nth-child(10)::before{
      border-right: none;
    }
    li:nth-child(n+6){
      border-bottom: none;
    }

    ul:after {
      content: "";
      width: 20%;
      height: 0px;
      visibility: hidden;
    }
  }
</style>

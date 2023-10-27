<template>
  <div :class="isFullScreen ? screenName : ''">
    <el-dialog
        class="elDialog"
        center
        width="60%"
        @open="openEvent"
        :visible.sync="dialogShow"
        :fullscreen="isFullScreen"
        :modal-append-to-body="false"
        :modal="false"
        :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <span class="topTilte">查看公告</span>
        <div class="topRight">
          <!-- 最小化 -->
          <i
              class="el-icon-minus rightIcon"
              v-if="isFullScreen"
              @click="e_changeBox(false)"
          ></i>
          <!-- 最大化 -->
          <i
              class="el-icon-full-screen rightIcon"
              v-if="!isFullScreen"
              @click="e_changeBox(true)"
          ></i>
          <!-- 关闭 -->
          <i class="el-icon-close rightIcon" @click="cancelbtn"></i>
        </div>
      </div>
      <div class="contbox">
        <p class="notice-p">{{queryParams.noticeTitle}}</p>
        <p class="notice-time">日期：{{queryParams.time}}</p>
        <div class="noticeCont">
          <span v-html="queryParams.noticeContent"></span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbtn">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Editor from '@/components/Editor';
  export default {
    name: "notices",
    components: {
      Editor
    },
    data () {
      return {
        isFullScreen: true,
        screenName: "fullScreen",
        dialogShow: false,
        queryParams: {},
        radio: '1',
        noticeContent: ''
      }
    },
    computed: {
      getLeftWidth() {
        return this.$store.state.app.leftWidth;
      }
    },
    mounted() {
      let width = this.$store.state.app.leftWidth;
      if (width < 200) {
        this.screenName = "bigFullScreen";
      } else {
        this.screenName = "fullScreen";
      }
    },
    watch: {
      getLeftWidth() {
        let width = this.$store.state.app.leftWidth;
        if (width < 200) {
          this.screenName = "bigFullScreen";
        } else {
          this.screenName = "fullScreen";
        }
      },
    },
    methods: {
      openEvent () {

      },
      init (params) {
        if (params) {
          this.queryParams = {
            ...params,
          };
        }
        this.dialogShow = true
      },
      e_changeBox(type) {
        this.isFullScreen = type;
      },
      cancelbtn() {
        this.$emit('close')
      },
    }
  }
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .contbox {
    padding: 10px 30px;
  }
  .notice-p {
    font-weight: bold;
    font-size: 25px;
    color: #000;
    text-align: center;
  }
  .notice-time {
    text-align: center;
    font-size: 14px;
    color: #666666;
    margin-top: 5px;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
  }
  .noticeCont {
    font-size: 16px;
    padding-top: 15px;
    text-indent: 2em;
  }
  /deep/.el-dialog.is-fullscreen {
    height: 100% !important;
  }
</style>

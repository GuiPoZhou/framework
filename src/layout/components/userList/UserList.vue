<template>
  <div>
    <el-drawer title="内部聊天" :visible.sync="drawer" direction="rtl" append-to-body
      class="contacts-drawer QMS-common-drawer" size="280px" :modal="true" :wrapperClosable="false"
      :before-close="handleClose" ref="drawer">
      <el-tabs v-model="activeTab" class="center-tabs" stretch>
        <el-tab-pane label="消息" name="reply">
          <div class="userList replyList" v-loading="replyLoading && listQuery.currentPage==1">
            <div v-if="replyList.length">
              <div v-for="(item,i) in replyList" :key="i" class="userList-item"
                @contextmenu.prevent=openMenu(item,$event) @click="readInfo(item,true) ">
                <el-avatar :size="36" :src="avaterUrl(item.avatar)">
                </el-avatar>
                <div class="userList-txt">
                  <p class="title">
                    <span>{{item.nickName}}/{{item.userName}}</span>
                    <el-badge :value="item.unreadMessage" :hidden="!item.unreadMessage" />
                  </p>
                  <p class="name">
                    <span class="content">{{getMsgText(item.latestMessage,item.messageType)}}</span>
                    <span class="time">{{ toDateText(item.latestDate) }}</span>
                  </p>
                </div>
                <!-- <el-badge :value="item.unreadMessage" :hidden="!item.unreadMessage"></el-badge> -->
              </div>
            </div>
            <p class="noData-txt" v-else>暂无数据</p>
            <ul v-show="visibleMenu" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
              <li @click="relocation()">移除</li>
              <li @click="deleteChatRecord()">删除聊天记录</li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系人" name="contacts">
          <el-input v-model="listQuery.keyword" placeholder="搜索：请输入关键词" clearable
            @keyup.enter.native="search()" class="search-input">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search" title="搜索" />
          </el-input>
          <div class="userList" v-loading="loading && listQuery.currentPage==1" ref="userList">
            <div v-if="userList.length">
              <div v-for="(item,i) in userList" :key="i" class="userList-item"
                @click="readInfo(item)">
                <el-avatar :size="36" :src="avaterUrl(item.avatar)">
                </el-avatar>
                <div class="userList-txt">
                  <p class="title">{{item.nickName}}/{{item.userName}}</p>
                  <p class="name">
                    <span>{{item.deptName}}</span>
                  </p>
                </div>
              </div>
            </div>
            <p class="noData-txt" v-else>暂无数据</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      <Im ref="QMSIm" append-to-body />
    </el-drawer>
  </div>
</template>

<script>
import Im from './Im'
export default {
  name: 'UserList',
  components: { Im },
  data() {
    return {
      top: 0,
      left: 0,
      selectedTag: {},
      visitedViews: '',
      drawer: false,
      activeTab: 'reply',
      userList: [],
      replyList: [],
      loading: false,
      replyLoading: false,
      visibleMenu: false,
      visible: false,
      finish: false,
      listQuery: {
        keyword: '',
        currentPage: 1,
        pageSize: 20
      }
    }
  },
  created() {
   },
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo
    }
  },
  watch: {
    activeTab(val) {
      if (val === 'contacts' && !this.userList.length) {
        this.getUserList()
      }
    },
    visibleMenu(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    avaterUrl(url){
      return window.globalEnv.VUE_APP_BASE_API +'/' + url
    },
    closeMenu() {
      this.visibleMenu = false
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left -280 // container margin left
      // const offsetWidth = this.$el.offsetWidth // container width
      const offsetWidth = 174
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 30 // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - 95
      this.visibleMenu = true
      this.selectedTag = tag
    },
    relocation() {
      this.$refs.QMSIm.closeIM()
      this.$net(`/api/message/imreply/relocation/${this.selectedTag.id}`,'delete').then((res) => {
        const list = this.replyList.filter(o => o.id !== this.selectedTag.id)
        this.replyList = list
      });
    },
    deleteChatRecord() {
      this.$refs.QMSIm.closeIM()
      this.$confirm("是否清空当前聊天的所有记录?", "提示", {
        type: "warning",
      }).then(() => {
        this.$net(`/api/message/imreply/deleteChatRecord/${this.selectedTag.id}`,'delete').then((res) => {
          for (let index = 0; index < this.replyList.length; index++) {
            const element = this.replyList[index];
            if (element.id === this.selectedTag.id) {
              element.unreadMessage = ''
              element.latestMessage = ''
              element.messageType = ''
            }
          }
        });
      }).catch(() => { });
    },
    init() {
      this.finish = false
      this.drawer = true
      this.listQuery.currentPage = 1
      this.listQuery.keyword = ''
      this.activeTab = 'reply'
      this.userList = []
      this.replyList = []
      this.getReplyList()
      this.$nextTick(() => {
        this.bindScroll()
      })
    },
    toDateText(dateTimeStamp) {
      if (!dateTimeStamp) return ''
      let result = ''
      let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
      let hour = minute * 60;
      let day = hour * 24;
      let week = day * 7;
      let halfamonth = day * 15;
      let month = day * 30;
      let now = new Date().getTime(); //获取当前时间毫秒
      let diffValue = now - dateTimeStamp; //时间差
      if (diffValue < 0) return "刚刚"
      let minC = diffValue / minute; //计算时间差的分，时，天，周，月
      let hourC = diffValue / hour;
      let dayC = diffValue / day;
      let weekC = diffValue / week;
      let monthC = diffValue / month;
      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
      } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
      } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
      } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
      } else {
        let datetime = new Date();
        datetime.setTime(dateTimeStamp);
        let Nyear = datetime.getFullYear();
        let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
    },
    bindScroll() {
      let _this = this,
        vBody = _this.$refs.userList;
      vBody.addEventListener("scroll", function () {
        if (vBody.scrollHeight - vBody.clientHeight - vBody.scrollTop <= 300 && !_this.loading && !_this.finish) {
          _this.listQuery.currentPage += 1
          _this.getUserList()
        }
      });
    },
    getReplyList() {
      this.replyLoading = true
      this.$net('/api/message/imreply','get').then(res => {
        this.replyList = res.data.list
        this.replyLoading = false
      })
    },
    getUserList() {
      this.loading = true
      this.$net('/api/message/imreply/ImUser','get',this.listQuery).then(res => {
        if (res.data.list.length < this.listQuery.pageSize) this.finish = true
        //排除自己
        this.userList = [...this.userList, ...res.data.list].filter(o => o.userId!==this.userInfo.userId)
        this.loading = false
      })
    },
    search() {
      this.userList = []
      this.finish = false
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.getUserList()
    },
    updateReply(data, isAdd) {
      let boo = false
      const len = this.replyList.length
      for (let i = 0; i < len; i++) {
        if (data.formUserId === this.replyList[i].userId) {
          if (isAdd) this.replyList[i].unreadMessage += 1
          this.replyList[i].latestMessage = data.formMessage
          this.replyList[i].messageType = data.messageType
          this.replyList[i].latestDate = data.latestDate
          boo = true
          break
        }
      }
      if (boo) return
      if (isAdd) data.unreadMessage = 1
      data.latestMessage = data.formMessage
      data.id = data.formUserId
      this.replyList.unshift(data)
    },
    updateLatestMessage(data) {
      let boo = false
      const len = this.replyList.length
      for (let i = 0; i < len; i++) {
        if (data.toUserId === this.replyList[i].id) {
          this.replyList[i].latestMessage = data.toMessage
          this.replyList[i].messageType = data.messageType
          this.replyList[i].latestDate = data.latestDate
          boo = true
          break
        }
      }
      if (boo) return
      const item = {
        account: data.toAccount,
        userName : data.toAccount,
        headIcon: data.toHeadIcon,
        id: data.toUserId,
        userId: data.toUserId,
        latestDate: data.latestDate,
        latestMessage: data.toMessage,
        messageType: data.messageType,
        realName: data.toRealName,
        nickName: data.toRealName,
        unreadMessage: 0
      }
      this.replyList.unshift(item)
    },
    toggleBlink() {
      const boo = this.replyList.some(o => o.unreadMessage)
      this.$emit('changeTwinkle', boo)
    },
    readInfo(item, isReply) {
      let socket = this.$store.getters.socket
      let updateReadMessage = {
        method: "UpdateReadMessage",
        formUserId: item.userId,
        token: this.$store.getters.token
      }
      socket.send(JSON.stringify(updateReadMessage));
      if (isReply) {
        item.unreadMessage = 0
      } else {
        for (let i = 0; i < this.replyList.length; i++) {
          if (item.userId === this.replyList[i].userId) {
            this.replyList[i].unreadMessage = 0
            break
          }
        }
      }
      this.toggleBlink()
      this.$refs.QMSIm.list = []
      //获取消息列表
      var messageList = {
        method: "MessageList",
        toUserId: item.userId,
        formUserId: this.userInfo.userId,
        token: this.$store.getters.token,
        currentPage: 1,
        pageSize: 30,
        sord: "desc"
      }
      socket.send(JSON.stringify(messageList));
      this.$refs.QMSIm.init(item)
    },
    getMsgText(text, type) {
      let message = ''
      switch (type) {
        case 'voice':
          message = '[语音]'
          break;
        case 'image':
          message = '[图片]'
          break;
        default:
          message = text
          break;
      }
      return message
    },
    handleClose(done) {
      this.$refs.QMSIm.closeIM()
      let vBody = this.$refs.userList;
      vBody.removeEventListener("scroll", function () { });
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
.contacts-drawer {
  /deep/ .el-tabs {
    height: 100%;
    .el-tabs__header {
      margin-bottom: 0 !important;
    }

    .el-tabs__item {
      width: 50%;
      text-align: center;
      color: #303133 !important;
    }

    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__content {
      height: calc(100% - 40px);
    }
    .el-tab-pane {
      height: 100%;
      overflow: hidden;
    }
  }
  .noData-txt {
    font-size: 15px;
    color: #909399;
    line-height: 20px;
    text-align: center;
    padding-top: 20px;
  }
  .search-input {
    /deep/ .el-input__inner {
      border-radius: 0;
      border-right: none;
      border-left: none;
      border-top: none;
    }
    .el-input__icon {
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
  /deep/ .el-drawer__header {
    border: none;
  }
  /deep/ .el-drawer__body {
    overflow: hidden;
    .userList {
      overflow: auto;
      overflow-x: hidden;
      position: relative;
      height: calc(100% - 32px);
      &.replyList {
        height: 100%;
        .title {
          overflow: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 20px;
        }
      }
      .el-badge {
        margin-top: 10px;
      }
      /deep/ .el-loading-mask {
        top: 100px;
      }
    }
    .userList-item {
      position: relative;
      display: block;
      padding: 0 20px;
      background-color: #fff;
      border-bottom: 1px solid #f5f7f9;
      height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .offLine {
        filter: grayscale(1);
      }
      &:hover {
        background-color: #f5f7f9;
      }
      .userList-txt {
        margin-left: 14px;
        overflow: hidden;
        flex: 1;
        padding-top: 1px;
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
          line-height: 20px;
          margin: 0 0 5px 0;
        }
        .name {
          font-size: 15px;
          color: #999;
          margin: 0;
          .content {
            display: inline-block;
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            float: right;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

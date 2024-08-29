<template>
  <div
    class="navbar"
    ref="navbar"
    :style="{
      backgroundColor: $store.state.system.systemInfo.extData.navClickColor
        ? $store.state.system.systemInfo.extData.navClickColor
        : '#fff',
    }"
  >
    <!--左侧菜单收起按钮-->
    <hamburger
      ref="hamburger"
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!--        tagview区域-->
    <div
      class="navbar-tagviews"
      :style="{
        minWidth: tagviewsHeight + 'px',
        backgroundColor: $store.state.system.systemInfo.extData.navClickColor
          ? $store.state.system.systemInfo.extData.navClickColor
          : '#fff',
      }"
    >
      <tags-view />
    </div>

    <div class="right-menu" ref="rightMenu">
      <search
        id="header-search"
        class="right-menu-item"
        @showSearch="e_showSearch"
      />
      <el-button
        v-show="$store.state.system.systemInfo.extData.dataScreen"
        v-hasPermi="['micProject:photoIndex:dataScreen']"
        size="mini"
        style="margin-right: 10px"
        @click="e_showDataScreen"
        >数据大屏</el-button
      >

      <!--            <tags-view />-->
      <!--            <el-popover-->
      <!--                placement="bottom"-->
      <!--                trigger="hover">-->
      <!--                <div style="display: flex;flex-direction: column;align-items: center;cursor: pointer">-->
      <!--                    <p style="color: #333;font-size: 14px;font-weight: bold" v-for="(v,i) in languageList" :key="i"-->
      <!--                       @click="e_selLang(v)">{{ v.label }}</p>-->
      <!--                </div>-->
      <!--                <div class="languageArea" slot="reference">-->
      <!--                    <img class="translate" src="./translate.png" alt="">-->
      <!--                    <span v-if="!showPathSearch">{{ languageList.filter(item=>{return item.value == lang})[0].label }}</span>-->
      <!--                </div>-->
      <!--            </el-popover>-->
      <div
        v-if="$store.state.system.systemInfo.extData.systemMessage"
        class="znxarea"
        :class="businessMessageCount > 0 ? 'znxareaActive' : ''"
        @click="e_showMessage"
      >
        <el-badge :value="businessMessageCount" class="item" type="warning">
          <i class="el-icon-bell zhanneixin"></i>
        </el-badge>
      </div>
      <el-tooltip
        content="聊天"
        placement="bottom"
        v-show="$store.state.system.systemInfo.extData.openIM"
      >
        <div class="znxarea">
          <i
            class="el-icon-s-comment"
            @click="openUserList()"
            :class="{ twinkle: isTwinkle }"
          ></i>
        </div>
      </el-tooltip>
      <div
        class="avatar-wrapper"
        v-if="!showPathSearch"
        :style="{
          color: $store.state.system.systemInfo.extData.navTopFountColor
            ? $store.state.system.systemInfo.extData.navTopFountColor
            : '#000',
        }"
      >
        <span>{{ $store.state.user.userInfo.nickName }}</span>
      </div>
      <el-dropdown
        v-if="!showPathSearch"
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 站内消息 -->
    <message ref="message" v-if="showmessage" @close="showmessage = false" />
    <!-- 用户聊天  -->
    <UserList ref="UserList" @changeTwinkle="changeTwinkle" />
  </div>
</template>

<script>
import ChineseIcon from "./chinese.png";
import EnglishIcon from "./english.png";
import TagsView from "./TagsView/index";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import BoContainerMixin from "@/mixins/boContainer";
import message from "./message.vue";
import UserList from "./userList/UserList";
import ReconnectingWebSocket from "reconnecting-websocket";
import SpeechQueue from "@/utils/SpeechQueue";

export default {
  mixins: [BoContainerMixin],
  data() {
    return {
      isTwinkle: false,
      showmessage: false,
      showPathSearch: false,
      ChineseIcon,
      EnglishIcon,
      langIcon: ChineseIcon,
      menuOpenWidth: 0,
      tagviewsHeight: 0, //中间
      languageList: [
        {
          label: "简体中文",
          value: "SimplifiedChinese",
        },
        {
          label: "繁体中文",
          value: "TraditionalChinese",
        },
        {
          label: "English",
          value: "English",
        },
      ],
      businessMessageCount: 0,
      autoGet: null,
      speechQueue: null,
    };
  },
  components: {
    TagsView,
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    message,
    UserList,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },

  created() {
    if (this.$store.state.system.systemInfo.extData.openIM) {
      this.initWebSocket();
    }
    if (this.$store.state.system.systemInfo.extData.openVoice) {
      // 在组件挂载后创建 SpeechQueue 实例
      this.playVoice();
    }
  },
  mounted() {
    if (localStorage.getItem("lang") == "chinese") {
      this.langIcon = this.ChineseIcon;
    } else {
      this.langIcon = this.EnglishIcon;
    }
    this.menuOpenWidth = this.$refs.hamburger.$el.clientWidth;
    this.tagviewsHeight =
      this.$refs.navbar.clientWidth -
      this.$refs.hamburger.$el.clientWidth -
      this.$refs.rightMenu.clientWidth -
      200;
    if (this.$store.state.system.systemInfo.extData.systemMessage) {
      this.e_autoGetMessage();
      this.e_getBusinessNoReadCount();
    }
  },
  beforeDestroy() {
    clearInterval(this.autoGet);
  },
  methods: {
    playVoice() {
      this.voiceSocket = this.$store.getters.voiceSocket || null;
      if ("WebSocket" in window) {
        if (!this.voiceSocket) {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const isDev = process.env.NODE_ENV === "development";

          const url = isDev
            ? window.globalEnv.VUE_APP_BASE_API +
              "/api/voiceBroadcast/websocket/" +
              userInfo.userId
            : window.location.origin + "/websocket/" + userInfo.userId;
          const webSocketUrl = url
            .replace("https://", "wss://")
            .replace("http://", "ws://");
          this.voiceSocket = new ReconnectingWebSocket(webSocketUrl);
          this.$store.commit("SET_VOICESOCKET", this.voiceSocket);
        }
        //添加事件监听
        let socket = this.voiceSocket;
        socket.onopen = () => {
          var onConnection = {
            method: "OnConnection",
            token: this.$store.getters.token,
            mobileDevice: false,
          };
          socket.send(JSON.stringify(onConnection));
        };
        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          this.doVoice(data);
          //断开websocket连接
          if (data.method == "closeSocket") {
            if (this.voiceSocket) {
              this.voiceSocket.close();
              this.voiceSocket = null;
              this.$store.commit("user/SET_VOICESOCKET", this.voiceSocket);
            }
          }
        };
      } else {
        console.log("当前浏览器设备不支持websocket");
      }
    },
    doVoice(data) {
      this.$nextTick(() => {
        console.log("data", data);
        if (data.templateCode == "MY_WAIT_AUDIT") {
          let str = `${data.deptName}的${data.userName},于${data.time},发起紧急委托,委托编号为${data.entrustCode},待审批，请及时处理`;
          this.$store.getters.speechQueue.addToQueue(str);
        } else if (data.templateCode == "PENDING_ENTRUST") {
          let str = `${data.deptName}的${data.userName},于${data.time},发起委托报检,委托编号为${data.entrustCode},待受理，请及时处理`;
          this.$store.getters.speechQueue.addToQueue(str);
        }
      });
    },
    initWebSocket() {
      this.socket = this.$store.getters.socket || null;
      if ("WebSocket" in window) {
        if (!this.socket) {
          const isDev = process.env.NODE_ENV === "development";
          const token = this.$store.getters.token;
          const url = isDev
            ? window.globalEnv.VUE_APP_BASE_API +
              "/api/message/websocket/" +
              token
            : window.location.origin + "/websocket/" + token;
          const webSocketUrl = url
            .replace("https://", "wss://")
            .replace("http://", "ws://");
          this.socket = new ReconnectingWebSocket(webSocketUrl);
          this.$store.commit("SET_SOCKET", this.socket);
        }
        //添加事件监听
        let socket = this.socket;
        socket.onopen = () => {
          var onConnection = {
            method: "OnConnection",
            token: this.$store.getters.token,
            mobileDevice: false,
          };
          socket.send(JSON.stringify(onConnection));
        };
        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          if (data.method == "initMessage") {
            this.messageCount =
              data.unreadMessageCount +
              data.unreadNoticeCount +
              data.unreadSystemMessageCount;
            this.isTwinkle = !!data.unreadNums.length;
          }
          //用户在线
          if (data.method == "Online") {
          }
          //用户离线
          if (data.method == "Offline") {
          }
          //消息推送（消息公告用的）
          if (data.method == "messagePush") {
            this.messageCount += data.unreadNoticeCount;
            if (this.$refs.MessageList.visible) this.$refs.MessageList.init();
          }
          //用户过期
          if (data.method == "logout") {
            if (this.socket) {
              this.socket.close();
              this.socket = null;
              this.$store.commit("user/SET_SOCKET", this.socket);
            }
            this.$message({
              message: data.msg || "登录过期,请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$store.dispatch("LogOut").then(() => {
                  location.reload();
                });
              },
            });
          }
          //断开websocket连接
          if (data.method == "closeSocket") {
            if (this.socket) {
              this.socket.close();
              this.socket = null;
              this.$store.commit("user/SET_SOCKET", this.socket);
            }
          }
          //接收对方发送的消息
          if (data.method == "receiveMessage") {
            //判断是否打开窗口
            if (
              this.$refs.UserList &&
              this.$refs.UserList.$refs.QMSIm &&
              this.$refs.UserList.$refs.QMSIm.visible
            ) {
              if (this.$refs.UserList.$refs.QMSIm.info.id === data.formUserId) {
                let messItem = {
                  userId: data.formUserId,
                  messageType: data.messageType,
                  message: data.formMessage,
                  dateTime: this.toDate(data.dateTime),
                };
                this.$refs.UserList.$refs.QMSIm.addItem(messItem);
                //更新已读
                let updateReadMessage = {
                  method: "UpdateReadMessage",
                  formUserId: data.formUserId,
                  token: this.$store.getters.token,
                };
                socket.send(JSON.stringify(updateReadMessage));
                this.$refs.UserList.updateReply(data);
              } else {
                this.$refs.UserList.updateReply(data, 1);
                this.isTwinkle = true;
              }
            } else {
              this.$refs.UserList.updateReply(data, 1);
              this.isTwinkle = true;
            }
          }
          //显示自己发送的消息
          if (data.method == "sendMessage") {
            if (this.$refs.UserList.$refs.QMSIm.info.userId != data.toUserId)
              return;
            //添加到客户端
            let messItem = {
              userId: data.UserId,
              messageType: data.messageType,
              message: data.toMessage,
              dateTime: this.toDate(data.dateTime),
            };
            this.$refs.UserList.updateLatestMessage(data);
            this.$refs.UserList.$refs.QMSIm.addItem(messItem);
          }
          //消息列表
          if (data.method == "messageList") {
            this.$refs.UserList.$refs.QMSIm.getList(data);
          }
          //刷新页面
          if (data.method == "refresh") {
            location.reload();
          }
        };
      }
    },
    toDate(v, format) {
      format = format ? format : "yyyy-MM-dd HH:mm";
      if (!v) return "";
      var d = v;
      if (typeof v === "string") {
        if (v.indexOf("/Date(") > -1)
          d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
          d = new Date(
            Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0])
          );
      } else {
        d = new Date(v);
      }
      var o = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "H+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        S: d.getMilliseconds(),
      };
      if (/(y+)/.test(format)) {
        format = format.replace(
          RegExp.$1,
          (d.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return format;
    },
    openUserList() {
      this.$refs.UserList.init();
    },
    changeTwinkle(boo) {
      this.isTwinkle = boo;
    },
    e_showDataScreen() {
      this.$router.push({
        path: "/dataScreen",
      });
    },
    e_autoGetMessage() {
      this.autoGet = setInterval(() => {
        this.e_getBusinessNoReadCount();
      }, 5000);
    },
    e_getBusinessNoReadCount() {
      this.$net("/message/unReadCount", "get")
        .then((re) => {
          this.businessMessageCount = re.data;
        })
        .catch((e) => {
          clearInterval(this.autoGet);
        });
    },

    e_showMessage() {
      this.showmessage = true;
      this.$nextTick(() => {
        this.$refs.message.init();
      });
    },
    e_showSearch(e) {
      this.showPathSearch = e;
    },
    /**
     * @author Coder
     * @date 2022/12/14
     * @des 切换语言环境
     */
    e_selLang(v) {
      this.$store.commit("set_lang", v.value);
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then((re) => {
            if (re.msg && (re.msg.match("http") || re.msg.match("https"))) {
              window.location.href = re.msg;
            } else {
              this.$message.success("退出成功");
              location.href = "/index";
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    //float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .navbar-tagviews {
    height: 100%;
    flex: 1;
    //background-color: #1ab394;
  }

  .right-menu {
    //float: right;
    height: 100%;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }

  .languageArea {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 15px;
    cursor: pointer;
  }

  .translate {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }

  .langIcon {
    margin-top: -26px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 2px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}

.znxarea {
  margin-right: 10px;
  font-size: 1.2rem;
  cursor: pointer;

  .item {
    /deep/.el-badge__content.is-fixed {
      top: 9px;
    }
  }

  .zhanneixin {
  }
}

.znxareaActive {
  animation: shake 2s infinite ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

/* 定义keyframe动画，命名为blink */
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.01% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.twinkle {
  animation: blink 0.5s linear infinite;
}
</style>

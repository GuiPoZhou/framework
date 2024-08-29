<template>
  <div id="app" @click="e_zhucespeechQueue">
    <router-view />
  </div>
</template>

<script>
import BoContainerMixin from "@/mixins/boContainer";

export default {
  mixins: [BoContainerMixin],
  name: "App",
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
  methods: {
    e_zhucespeechQueue() {
      if (!this.$store.getters.speechQueue) {
        this.$store.commit("SET_SpeechQueue");
      }
    },
    IcoCreate() {
      var link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      let icoName = "";
      if (!this.$store.state.system.systemInfo.extData.icoName) {
        icoName = `defaultfavicon.ico`;
      } else {
        icoName = `${this.$store.state.system.systemInfo.extData.icoName}favicon.ico`;
      }

      link.href = `/icos/${icoName}`;
      document.getElementsByTagName("head")[0].appendChild(link);
    },

    CreateOnlyOfficeSource() {
      if (this.$store.state.system.systemInfo.extData.onlineOfficeServer) {
        var scriptNode = document.createElement("script");
        scriptNode.type = "text/javascript";
        scriptNode.src = `${this.$store.state.system.systemInfo.extData.onlineOfficeServer}/web-apps/apps/api/documents/api.js`;
        document.getElementsByTagName("head")[0].appendChild(scriptNode);
        var styleLinkNode = document.createElement("link");
        styleLinkNode.rel = "stylesheet";
        styleLinkNode.href = `${this.$store.state.system.systemInfo.extData.onlineOfficeServer}/sdkjs-plugins/plugins.css`;
        document.getElementsByTagName("head")[0].appendChild(styleLinkNode);
      }
    },

    // handleBeforeUnload(event) {
    //     // 在页面关闭前触发的逻辑
    //     event.returnValue = '您确定要关闭页面吗？'; // 这一行将触发浏览器弹出确认框
    // },
  },
  mounted() {
    // window.addEventListener('beforeunload', this.handleBeforeUnload);
    // 监听浏览器后退和前进事件
    window.addEventListener("popstate", function (event) {
      if (event.isTrusted) {
        window.location.reload();
      }
    });
  },
  async created() {
    document.title = this.$store.state.system.systemInfo.title;
    this.$store.dispatch("getSystemInfo");
    await this.$store.dispatch("getSystemThem");
    this.IcoCreate();
    // this.CreateOnlyOfficeSource()
    this.CreatePageOffice();
    document.documentElement.style.setProperty(
      "--my-btnPrimaryColor",
      this.butBgColorPrimary
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-otehrPrimary",
      this.otehrPrimary
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty("--my-navClick", this.navClick); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-menuActiveColor",
      this.menuActiveColor
    ); // 菜单选中 hover背景颜色
    document.documentElement.style.setProperty(
      "--my-navFontColor",
      this.navFontColor
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-navBgColor",
      this.navBgColor
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-navTopFountColor",
      this.navTopFountColor
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-navFountSize",
      this.navFountSize
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-formFountSize",
      this.formFountSize
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-baseMenuLeftBg",
      this.baseMenuLeftBg
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-navTopNoFount",
      this.navTopNoFountColor
    ); // 将myValue赋值给CSS变量
    document.documentElement.style.setProperty(
      "--my-logoFountSize",
      this.logoFountSize
    ); // 将myValue赋值给CSS变量
  },
  computed: {
    menuActiveColor() {
      if (this.$store.state.system.systemInfo.extData.menuActiveColor) {
        return this.$store.state.system.systemInfo.extData.menuActiveColor;
      } else {
        return "#6d79ff";
      }
    },
    navClick() {
      if (this.$store.state.system.systemInfo.extData.navClickColor) {
        return this.$store.state.system.systemInfo.extData.navClickColor;
      } else {
        return "#6d79ff";
      }
    },
    navFontColor() {
      if (this.$store.state.system.systemInfo.extData.navFontColor) {
        return this.$store.state.system.systemInfo.extData.navFontColor;
      } else {
        return "#f4f4f5";
      }
    },
    navBgColor() {
      if (this.$store.state.system.systemInfo.extData.navBgColor) {
        return this.$store.state.system.systemInfo.extData.navBgColor;
      } else {
        return "rgba(0, 0, 0, 0.06)";
      }
    },
    baseMenuLeftBg() {
      if (this.$store.state.system.systemInfo.extData.navBgColor) {
        return this.$store.state.system.systemInfo.extData.navBgColor;
      } else {
        return "#0E1438";
      }
    },
    navTopFountColor() {
      if (this.$store.state.system.systemInfo.extData.navTopFountColor) {
        return this.$store.state.system.systemInfo.extData.navTopFountColor;
      } else {
        return "#000";
      }
    },
    butBgColorPrimary() {
      console.log(
        "this.$store.state.system.systemInfo",
        this.$store.state.system.systemInfo
      );
      if (this.$store.state.system.systemInfo.extData.butBgColor) {
        return this.$store.state.system.systemInfo.extData.butBgColor;
      } else {
        return "#1890ff";
      }
    },
    otehrPrimary() {
      if (this.$store.state.system.systemInfo.extData.butBgColor) {
        return this.$store.state.system.systemInfo.extData.butBgColor;
      } else {
        return "#409EFF";
      }
    },
    navFountSize() {
      if (this.$store.state.system.systemInfo.extData.navFountSize) {
        return this.$store.state.system.systemInfo.extData.navFountSize + "px";
      } else {
        return "0.8rem";
      }
    },
    formFountSize() {
      if (this.$store.state.system.systemInfo.extData.formFountSize) {
        return this.$store.state.system.systemInfo.extData.formFountSize + "px";
      } else {
        return "14px";
      }
    },
    navTopNoFountColor() {
      if (this.$store.state.system.systemInfo.extData.navTopNoFountColor) {
        return this.$store.state.system.systemInfo.extData.navTopNoFountColor;
      } else {
        return "#495060";
      }
    },
    logoFountSize() {
      if (this.$store.state.system.systemInfo.extData.navFountSize) {
        return this.$store.state.system.systemInfo.extData.navFountSize + "px";
      } else {
        return "14px";
      }
    },
  },
};
</script>


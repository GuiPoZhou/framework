<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar ref="navbar" @showDataScreen="showDataScreen=true"/>
        <!--        <tags-view v-if="needTagsView" />-->
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>

  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import variables from "@/assets/styles/variables.scss";
import { setDefaultMountApp, start } from 'qiankun'
export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  data() {
    return {
      showDataScreen: false
    }
  },
  mixins: [ResizeMixin],
  async mounted() {
    // const app = await Garfish.loadApp('dashboard', {
    //   entry: 'http://localhost:9091/',
    //   basename: '/dashboard',
    //   domGetter: '#subcontainer',
    //   sandbox: {
    //     fixBaseUrl: true,
    //   },
    //   props: {
    //     msg: 'hello world221',
    //   },
    // });
    // app.mounted ? app.show() : await app.mount();


    this.caluateWidth();
    // var that = this;
    // // 浏览器窗口变化 实时监听
    // window.addEventListener(
    //     "resize",
    //     () => {
    //         setTimeout(() => {
    //             that.caluateWidth();
    //         }, 1000);
    //     },
    //     false
    // );
    start({ singular: false })
    // this.$router.push('/micGenric/index')
    // setDefaultMountApp('/micGenric/index');


  },
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
      sideTheme: (state) => state.settings.sideTheme,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    variables() {
      return variables;
    },
  },
  methods: {
    // 计算实时宽度
    caluateWidth() {
      let windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let rightTopHeight = this.$refs.navbar.$el.offsetHeight;
      let mainHeight = windowHeight - rightTopHeight;
      this.$store.commit("set_boContainerHeight", mainHeight);
      let DialogHeight = mainHeight - 100;
      this.$store.commit("set_boDialogHeight", DialogHeight);
    },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>

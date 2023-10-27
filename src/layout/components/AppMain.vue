<template>
  <div>
    <section class="app-main" v-if="!isChildApp">
      <transition name="fade-transform" mode="out-in">
        <!--                <keep-alive :include="cachedViews">-->
        <router-view :key="key"/>
        <!--                </keep-alive>-->
      </transition>
    </section>
    <div v-if="isChildApp" class="app-main" id="subcontainer"></div>
    <div id="appContainer2" v-show="false"></div>
    <div id="appElnContainer" v-show="false"></div>
  </div>
</template>

<script>

  export default {
    name: 'AppMain',
    computed: {
      /**
       * @author Coder
       * @date 2022/10/25
       * @des 通过动态匹配路由关键词 来确定当前打开的应用是基座应用 还是 子应用
       */
      isChildApp() {
        if (this.$route.path.match('mic')) {
          return true;
        } else {
          return false;
        }
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-top: 40px;
  }

  .fixed-header + .app-main {
    padding-top: 30px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
    }

    .fixed-header {
      padding-top: 84px;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      //padding-right: 17px;
    }
  }
</style>

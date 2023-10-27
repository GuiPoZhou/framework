<template>
    <div class="navbar" ref="navbar">
        <!--左侧菜单收起按钮-->
        <hamburger ref="hamburger" id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
                   @toggleClick="toggleSideBar" />
        <!--        tagview区域-->
        <div class="navbar-tagviews" :style="{ minWidth: tagviewsHeight + 'px' }">
            <tags-view />
        </div>

        <div class="right-menu" ref="rightMenu">
            <el-button v-if="$store.state.system.systemInfo.extData.dataScreen" size="mini" style="margin-right: 10px"
                       @click="e_showDataScreen">数据大屏</el-button>
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
            <div v-if="$store.state.system.systemInfo.extData.systemMessage" class="znxarea"
                 :class="businessMessageCount > 0 ? 'znxareaActive' : ''" @click="e_showMessage">
                <el-badge :value="businessMessageCount" class="item" type="warning">
                    <i class="el-icon-bell zhanneixin"></i>
                </el-badge>
            </div>

            <div class="avatar-wrapper">
                <span>{{ $store.state.user.userInfo.nickName }}</span>
            </div>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar" class="user-avatar">
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
    </div>
</template>

<script>
import ChineseIcon from './chinese.png'
import EnglishIcon from './english.png'
import TagsView from './TagsView/index'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import BoContainerMixin from '@/mixins/boContainer'
import message from './message.vue'
export default {
    mixins: [BoContainerMixin],
    data() {
        return {
            showmessage: false,
            showPathSearch: false,
            ChineseIcon,
            EnglishIcon,
            langIcon: ChineseIcon,
            menuOpenWidth: 0,
            tagviewsHeight: 0,//中间
            languageList: [
                {
                    label: '简体中文',
                    value: 'SimplifiedChinese'
                },
                {
                    label: '繁体中文',
                    value: 'TraditionalChinese'
                },
                {
                    label: 'English',
                    value: 'English'
                },
            ],
            businessMessageCount: 0,
            autoGet: null
        }
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
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'device'
        ]),
        setting: {
            get() {
                return this.$store.state.settings.showSettings
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'showSettings',
                    value: val
                })
            }
        },
        topNav: {
            get() {
                return this.$store.state.settings.topNav
            }
        }
    },
    mounted() {
        if (localStorage.getItem('lang') == 'chinese') {
            this.langIcon = this.ChineseIcon
        } else {
            this.langIcon = this.EnglishIcon
        }
        this.menuOpenWidth = this.$refs.hamburger.$el.clientWidth
        this.tagviewsHeight = this.$refs.navbar.clientWidth - this.$refs.hamburger.$el.clientWidth - this.$refs.rightMenu.clientWidth - 200
        if (this.$store.state.system.systemInfo.extData.systemMessage) {
            this.e_autoGetMessage()
            this.e_getBusinessNoReadCount()
        }

    },
    beforeDestroy() {
        clearInterval(this.autoGet)
    },
    methods: {
        e_showDataScreen() {
            this.$router.push({
                path: '/dataScreen'
            })
        },
        e_autoGetMessage() {
            this.autoGet = setInterval(() => {
                this.e_getBusinessNoReadCount()
            }, 5000)
        },
        e_getBusinessNoReadCount() {
            this.$net('/message/unReadCount', 'get').then(re => {
                this.businessMessageCount = re.data
            }).catch(e => {
                console.log('查看后台获取站内消息服务是否正常')
                clearInterval(this.autoGet)
            })
        },

        e_showMessage() {
            this.showmessage = true
            this.$nextTick(() => {
                this.$refs.message.init()
            })
        },
        e_showSearch(e) {
            this.showPathSearch = e
        },
        /**
         * @author Coder
         * @date 2022/12/14
         * @des 切换语言环境
         */
        e_selLang(v) {
            console.log(v)
            this.$store.commit("set_lang", v.value);
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            this.$confirm('确定注销并退出系统吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    location.href = '/index'
                })
            }).catch(() => {
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .hamburger-container {
    line-height: 40px;
    height: 100%;
    //float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
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
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
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

  .zhanneixin {}
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
</style>

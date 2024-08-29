<template>
  <div>
    <ml-login
      ref="mlLogin"
      :loginBgi="$store.state.system.defaultTheme"
      :themeTypeName="$store.state.system.themeTypeName"
      :config="$store.state.system.systemInfo"
      @doLogin="handleLogin"
    />
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import userIcon from "@/assets/images/login/userIcon.png";
import pwdIcon from "@/assets/images/login/pwdIcon.png";
import codeIcon from "@/assets/images/login/codeIcon.png";
import BaseSlider from "@/components/BaseSlider";
import { getInfo } from "@/api/login";
import BoContainerMixin from "@/mixins/boContainer";
import changePwd from "./dialog/changePwd.vue";
import { updateUserPwd } from "@/api/system/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import axios from "axios";
import { Encrypt } from "@/utils/encryp.js";
export default {
  name: "Login",
  mixins: [BoContainerMixin],
  components: {
    BaseSlider,
    changePwd,
  },
  data() {
    return {
      LoginLang: {
        chineseSimplified: {
          loginUserPlaceHolder: "请输入账号",
          loginPassWordPlaceHolder: "请输入密码",
          loginSiderLabel: "拖动滑块到最右边",
          loginBtnLabel: "登录",
        },
        chineseTraditional: {
          loginUserPlaceHolder: "請輸入賬號",
          loginPassWordPlaceHolder: "請輸入密碼",
          loginSiderLabel: "拖動滑塊到右邊",
          loginBtnLabel: "登錄",
        },
      },
      loginThemeUrl: "",
      speed: 5, //轮播速度  秒为单位
      autoChange: {},
      options: [
        {
          value: "chineseSimplified",
          label: "简体中文",
        },
        {
          value: "chineseTraditional",
          label: "繁體中文",
        },
      ],
      dialogShow: false,
      status: false,
      loginBgi: "",
      logo: "",
      logo1: "",
      bottomSign: "",
      userIcon,
      pwdIcon,
      codeIcon,
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        uuid: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          {
            required: true,
            trigger: "change",
            message: "验证码不能为空",
          },
        ],
      },
      loading: false,
      redirect: undefined,
      instance: {},
      done: {},
      oldPassword: "",
      newPassword: "",
      token: "",
      // 验证码开关
      // captchaOnOff: true,
    };
  },
  computed: {
    lang() {
      return this.$store.state.boshland.lang;
    },
    checked() {
      return this.$store.state.boshland.autoChangeTheme;
    },
    themeIndex() {
      return this.$store.state.boshland.loginThemeIndex;
    },
    getDefault() {
      return this.$store.state.system.themeList;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
    checked(val) {
      console.log("ddd", val);
      localStorage.setItem("autoChangeTheme", val);
      if (val) {
        this.e_autoChangeTheme();
      } else {
        clearInterval(this.autoChange);
      }
    },
    getDefault(val) {
      this.loginThemeUrl = val[0];
    },
  },
  mounted() {
    this.loginThemeUrl = this.$store.state.system.themeList[this.themeIndex];
  },

  created() {
    // this.open();
    // console.log(this.lang);
    this.getCookie();
  },
  methods: {
    // getCode() {
    //     getCodeImg().then(res => {
    //         this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    //         if (this.captchaOnOff) {
    //             this.codeUrl = "data:image/gif;base64," + res.img;
    //             this.loginForm.uuid = res.uuid;
    //         }
    //     });
    // },
    updatePwd() {
      this.instance.confirmButtonLoading = true;
      axios
        .put(
          `${window.globalEnv.VUE_APP_BASE_API}/system/user/profile/updatePwd?oldPassword=${this.oldPassword}&newPassword=${this.newPassword}`,
          {},
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .then((response) => {
          this.instance.confirmButtonLoading = false;

          if (response.data.code == 200) {
            this.$message.success("修改成功,请重新登录");
            this.resetForm();
            this.done();
          } else {
            this.$message.error(response.msg);
          }
        })
        .finally(() => {
          this.instance.confirmButtonLoading = false;
        });
      // updateUserPwd(this.oldPassword, this.newPassword)
      //   .then((response) => {
      //     this.instance.confirmButtonLoading = false;

      //     if (response.code == 200) {
      //       this.$modal.msgSuccess("修改成功");
      //       this.done();
      //     } else {
      //     }
      //   })
      //   .finally(() => {
      //     this.instance.confirmButtonLoading = false;
      //   });
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "请及时更换密码",
        message: h("div", null, [
          h("changePwd", {
            ref: "changePwd",
            on: {
              confirm: (pwdInfo) => {
                this.oldPassword = pwdInfo.oldPassword;
                this.newPassword = pwdInfo.newPassword;
                this.updatePwd();
              },
            },
          }),
        ]),
        showCancelButton: true,
        confirmButtonText: "提交更新",
        cancelButtonText: "继续登入",
        closeOnClickModal: false,
        closeOnPressEscape: false,

        type: "warning",
        showClose: false,
        center: true,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.instance = instance;
            this.done = done;
            this.$refs.changePwd.submit();
          } else {
            this.CreatePageOffice();
            this.$store.dispatch("getRoutes").then((res) => {
              let path = res[0].children[0].path;
              localStorage.setItem("menuId", res[0].children[0].menuId);
              this.$router.push(path);
            });
            done();
          }
        },
      }).then((action) => {});
    },
    resetForm() {
      this.$refs.mlLogin.resetForm();
      this.oldPassword = "";
      this.newPassword = "";
      this.token = "";
      this.$refs.changePwd.resetForm();
    },
    e_changeCheck(e) {
      localStorage.setItem("autoChangeTheme", e);
      this.$store.commit("set_autoChangeTheme", e);
    },
    /*
     *@author: 焦政
     *@date: 2022-03-15 16:06:24
     *@description:输入速度
     */
    e_changeCount() {
      if (this.speed <= 0) {
        this.speed = 2;
      }
      clearInterval(this.autoChange);

      this.e_autoChangeTheme();
    },
    /*
     *@author: 焦政
     *@date: 2022-03-15 16:01:28
     *@description:自动切换
     */
    e_autoChangeTheme() {
      var that = this;
      this.autoChange = setInterval(() => {
        let themeIndex = this.themeIndex;
        themeIndex += 1;

        if (themeIndex >= this.$store.state.system.themeList.length) {
          themeIndex = 0;
        }
        this.loginThemeUrl = this.$store.state.system.themeList[themeIndex];
        localStorage.setItem("loginThemeIndex", themeIndex);
      }, that.speed * 1000);
    },
    /*
     *@author: 焦政
     *@date: 2022-03-15 15:59:54a
     *@description:选择主题
     */
    e_selTheme(url, i) {
      let autoChangeTheme = this.$store.state.boshland.autoChangeTheme;
      autoChangeTheme = "false" === "true";
      console.log("autoChangeTheme", autoChangeTheme);
      if (!autoChangeTheme) {
        this.loginThemeUrl = url;
        localStorage.setItem("loginThemeIndex", i);
        this.$store.commit("set_loginThemeIndex", i);
      }
    },
    /*
     *@author: 焦政
     *@date: 2022-02-14 13:07:25
     *@description:切換語言環境
     */
    e_selLang(e) {
      this.$store.commit("set_lang", e);
    },
    // getCode() {
    // 	getCodeImg().then(res => {
    // 		this.codeUrl = "data:image/gif;base64," + res.img;
    // 		this.loginForm.uuid = res.uuid;
    // 	});
    // },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    e_sliderSuccess() {
      this.status = true;
    },
    /**
     * @author Coder
     * @date 2023/3/10
     * @des 登录
     */
    handleLogin(loginForm) {
      this.$store
        .dispatch("Login", loginForm)
        .then((response) => {
          if (
            this.$store.state.system.systemInfo.extData.openUpdatePwd &&
            response.pwdExpire
          ) {
            this.$notify({
              title: "警告",
              message: response.pwdExpire,
              type: "warning",
            });
            this.token = response.token;
            this.open();
            return;
          }

          // this.$router
          //   .push({
          //     path: this.redirect || "/",
          //   })
          //   .catch(() => {});
          this.CreatePageOffice();
          this.$store.dispatch("getRoutes").then((res) => {
            let path = res[0].children[0].path;
            localStorage.setItem("menuId", res[0].children[0].menuId);
            this.$router.push(path);
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getinfos() {
      getInfo().then((res) => {
        console.log("登录校验", res);
        if (res.user.dept.deptType === "0") {
          this.$router.push({ path: "/registrationManagement" });
        } else {
          this.$router.push({ path: "/index" });
        }
      });
    },
    //下载打印模板
    downloadHelpManual() {
      this.dialogShow = true;
    },
    cancel() {
      this.dialogShow = false;
    },
  },
  destroyed() {
    clearInterval(this.autoChange);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content_area {
  width: 60rem;
  min-height: 35rem;
  background: rgba(255, 255, 255, 0.95);
  z-index: 1;
  border-top-right-radius: 7rem;
  border-bottom-left-radius: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0 0 15px #f3f9ff;

  .ca_title {
    font-size: 2rem;
  }

  .ca_bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .cab_logo {
      width: 26rem;
      height: 20rem;
      animation-name: container;
      /*动画的名称*/
      transform-origin: center bottom;
      /*设置动画旋转元素的基点为：居中靠下*/
    }
  }
}

@keyframes container {
  0%,
  100%,
  20%,
  50%,
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0, 0, 0);
    /*设置只在Z轴上移动*/
  }

  40%,
  43% {
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.login-logo {
  width: 100%;
  height: 100%;
  position: absolute;
}

.loginformarea {
  width: 30rem;
  height: 100%;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  .el-input__prefix {
    margin-top: 5px;
  }
}

.formbox {
  width: 30rem;
  //min-height: 33rem;
  border-radius: 4px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;
  position: relative;
  justify-content: space-between;
}

.fbLogo {
  width: 1.2rem;
  height: 3.2rem;
}

.loginlogo {
  /*width: 55%;*/
  width: 50.2%;
  height: 10%;
  display: block;
  margin: 0 auto 23px;
  /*margin-bottom: 23px;*/
}

.logintitle {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

.logoImg {
  display: block;
  margin: 0 auto;
}

.login-form {
  flex: 1;

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }

  .el-input {
    height: 36px;
  }

  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before {
    display: none;
  }
}

.formbox-title {
  display: block;
  margin-bottom: 2rem;
  font-weight: 400;
}

.t-input {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .t-i-icon {
    width: 80px;
    height: 50px;
    border-top-left-radius: 4px !important;
    border-bottom-left-radius: 4px !important;
    background-color: #85c5ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &.activeTicon {
      background-color: #1890ff;

      img {
        background-color: #1890ff;
      }
    }

    img {
      width: 24px;
      height: 26px;
    }
  }
}

.el-input--medium .el-input__inner {
  height: 35px;
  line-height: 36px;
}

.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  // top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  // max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}

.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}

.changelangarea {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.changezhuti {
  position: absolute;
  z-index: 2;
  right: 20px;
  bottom: 20px;

  .cz_img {
    width: 5.5rem;
    height: 1.8rem;
    cursor: pointer;
  }
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.zhutiarea {
  width: 100%;
}

.za-top {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.zat-clickLabel {
  font-size: 0.8rem;
  margin-right: 10px;
}

.za-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;

  .zab-img {
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;

    &.activeTheme {
      border: 1px solid #3628c2ff;
    }
  }
}

.login-code-img {
  height: 38px;
}
</style>

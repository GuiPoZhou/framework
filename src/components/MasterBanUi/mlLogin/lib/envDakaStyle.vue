<template>
  <div>
    <div class="ep_content">
      <img class="ca_logo" :src="config.extData.logo"/>
    </div>
    <div class="support_area">
      <img class="cab_logo" :src="config.extData.projectLogo"/>
      <div class="login_area">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item label="账号登录" prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号">
              <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码登录" prop="password">
            <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码"  @keyup.enter.native="handleLogin">
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button class="btn_area" :loading="loading" size="medium" type="primary"
                       style="width: 373px; height: 46px;margin-top:1rem" @click.native.prevent="handleLogin">
              <span v-if="!loading">登录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-image class="bottomLogo" :src="config.extData.bottomProjectLogo">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div class="envKevin_area">

    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance,ref} from "vue";
const vm = getCurrentInstance()['proxy']
const props = defineProps(['config'])
const emit = defineEmits(['login'])
const  { config } = props
let loginForm = reactive({})
let loginRules = reactive({})
let loading = ref(false)
const handleLogin = () => {
  vm.$refs.loginFormRef.validate((valid) => {
    if (valid) {
      emit('login', loginForm)
    }
  })
}
</script>

<style lang="scss" scoped>
.ep_content {
  width: 15rem;
  height: 15rem;
  position:  relative;
  overflow: hidden;
  left: 3rem;
  top: -2rem;
}
.ca_logo  {
  width: 15rem;
  height: 15rem;
}
.envKevin_area {
  width: 40rem;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  opacity: .4;
  z-index: 1;
  display: flex;
  box-shadow: 0 0 15px #F3F9FF;
  position: absolute;
  right: 0;
  top: 0;

}
.support_area {
  width: 40rem;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  .cab_logo {
    z-index: 10;
    position: absolute;
    top: -8rem;
    left: 5rem;
  }
  .login_area {
    z-index: 10;
    width: 36rem;
    position: absolute;
    top: 35%;
    left: 2rem;
    .btn_area {
      position: relative;
      left: 20%;
    }
  }
  .bottomLogo {
    position: absolute;
    bottom: 5rem;
    z-index: 10;
    left: 5rem;
  }

}
</style>

<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password         @input="updatePasswordStrength"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" show-password/>
    </el-form-item>
    <div v-if="user.newPassword || user.confirmPassword">
      <el-progress :percentage="passwordStrength.percentage" :status="passwordStrength.status" />
      <div>{{ passwordStrength.label }}</div>
    </div>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  
  </el-form>
</template>

<script>
  import {updateUserPwd} from "@/api/system/user";
  function createPasswordRegex() {
  // 特殊字符集可以根据实际需求调整
  const specialChars = "!@#$%^&*";
  // 构建正则字符串，确保包含至少一位小写字母、大写字母、数字和特殊字符
  return new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${specialChars}])[a-zA-Z\\d${specialChars}]{8,}$`
  );
}
const passwordRegex = createPasswordRegex();

  export default {
    data() {
      const equalToPassword = (rule, value, callback) => {
        if (this.user.newPassword !== value) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      };
      const checkNewPassword = (rule, value, callback) => {
        if (passwordRegex.test(value)) {
          callback();
        } else {
          callback(new Error("密码必须包含8位以上的大小写字母、数字和特殊字符(! @ # $ % ^ & *)"));
        }
      };
      return {
        user: {
          oldPassword: undefined,
          newPassword: undefined,
          confirmPassword: undefined
        },
        passwordStrength: {
        percentage: 0,
        label: "",
        status: "exception",
      },
        // 表单校验
        rules: {
          oldPassword: [
            {required: true, message: "旧密码不能为空", trigger: "blur"}
          ],
          newPassword: [
            {required: true, message: "新密码不能为空", trigger: "blur"},
            {required: true, validator: checkNewPassword, trigger: "blur"}
          ],
          confirmPassword: [
            {required: true, message: "确认密码不能为空", trigger: "blur"},
            {required: true, validator: equalToPassword, trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
              this.$modal.msgSuccess("修改成功");
            });
          }
        });
      },
      close() {
        this.$tab.closePage();
      },
      updatePasswordStrength() {
      const value = this.user.newPassword;
      let strength = 0;
      
      if (value.length >= 8) strength += 1;
      if (/[a-z]/.test(value)) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/\d/.test(value)) strength += 1;
      if (/[!@#$%^&*]/.test(value)) strength += 1;

      let percentage = (strength / 5) * 100;
      let label = "";
      let status = "exception";

      if (percentage <= 20) {
        label = "弱";
        status = "exception";
      } else if (percentage <= 60) {
        label = "中";
        status = "warning";
      } else {
        label = "强";
        status = "success";
      }

      this.passwordStrength.label = `密码强度：${label}`;
      this.passwordStrength.percentage = percentage;
      this.passwordStrength.status = status;
    }
    }
  };
</script>

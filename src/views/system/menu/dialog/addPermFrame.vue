<template>
  <BoDialog
    dia-log-title="手动新增权限"
    :dia-log-show="showlog"
    dia-log-width="50%"
    @close="e_close"
  >
    <template slot="bologbody">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="权限名称"
              prop="menuName"
              :rules="[
                {
                  required: true,
                  message: '请输入权限名称',
                  trigger: ' blur',
                },
              ]"
            >
              <el-input v-model="form.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="权限标识"
              prop="perms"
              :rules="[
                {
                  required: true,
                  message: '请输入权限标识',
                  trigger: ' blur',
                },
              ]"
            >
              <el-input v-model="form.perms"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template slot="bologfooter">
      <el-button type="primary" size="small" @click="e_confirm" :disabled="submiLoading"
        >确定</el-button
      >
      <el-button size="small" @click="e_close">取消</el-button>
    </template>
  </BoDialog>
</template>
<script>
export default {
  data() {
    return {
      showlog: false,
      submiLoading: false,
      menuInfo: {},
      form: {
        menuName: "",
        menuType: "F",
        perms: "",
      },
    };
  },
  methods: {
    e_confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = {
            ...this.form,
            isCache: "0",
            isFrame: "1",
            menuType: "F",
            orderNum: 0,
            parentId: this.menuInfo.menuId,
            status: "0",
            visible: "0",
          };
          this.submiLoading = true;
          setTimeout(() => {
            this.submiLoading = false;
          }, 2500);
          let addRes = await this.$net("system/menu", "post", params);
          this.submiLoading = false;
          if (addRes.code == 200) {
            this.$message.success("添加成功");
            this.$emit("reload");
          }
        }
      });
    },
    e_close() {
      this.$emit("close");
    },
    async init(menuInfo) {
      this.showlog = true;
      this.menuInfo = menuInfo;
    },
  },
};
</script>

<template>
  <div>
    <BoContainer
      :total="total"
      @changePage="e_changePage"
      :pageSizes="[50, 100, 150, 200]"
    >
      <template slot="boMain">
        <BoMain>
          <template slot="bosearch">
            <el-form ref="queryParams" :model="queryParams" label-width="120px">
              <el-row>
                <!-- <el-col :span="6">
                                    <el-form-item label="业务类型名称" prop="businessTypeName">
                                        <el-input v-model="queryParams.businessTypeName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="业务类型编码" prop="businessTypeCode">
                                        <el-input v-model="queryParams.businessTypeCode"></el-input>
                                    </el-form-item>
                                </el-col> -->
                <!-- <el-col :span="6">
                                    <el-form-item label="数据主表" prop="tableName">
                                        <el-input v-model="queryParams.tableName"></el-input>
                                    </el-form-item>
                                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="应用名称" prop="name">
                    <el-select v-model="queryParams.name">
                      <el-option
                        label="基础模块(foundation)"
                        value="foundation"
                      ></el-option>
                      <el-option
                        label="通用模块(generic)"
                        value="generic"
                      ></el-option>
                      <el-option
                        label="项目独立模块(project)"
                        value="project"
                      ></el-option>
                      <el-option
                        label="基座模块(framework)"
                        value="framework"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="queryParams.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="唯一键" prop="id">
                    <el-input v-model="queryParams.id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="低码类型" prop="remark">
                    <el-select v-model="queryParams.remark">
                      <el-option
                        label="低码表单"
                        value="lowcode_form"
                      ></el-option>
                      <el-option
                        label="低码插件"
                        value="lowcode_project"
                      ></el-option>
                      <el-option
                        label="低码脚本"
                        value="lowcode_script"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      size="mini"
                      @click="getList"
                      >查询</el-button
                    >
                    <el-button icon="el-icon-refresh" size="mini" @click="reset"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- <el-button type="primary" size="mini" @click="e_addForm"
              >新增</el-button
            >
            <el-button
              v-if="canUseLocalServer"
              type="warning"
              size="mini"
              @click="e_localPull"
              >远程拉取</el-button
            >
            <el-button
              v-if="canUseLocalServer"
              size="mini"
              @click="e_showWeekPush"
              >周推送记录</el-button
            > -->
          </template>
          <template slot="tableArea">
            <el-table
              highlight-current-row
              :data="tableData"
              style="width: 100%"
              :height="mainTableHeight + 35"
              border
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="id" label="唯一键" align="center">
                <template slot-scope="scope">
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_form'"
                    type="primary"
                    effect="dark"
                    style="cursor: pointer"
                    class="copybox"
                    :data-clipboard-text="scope.row.id"
                    @click="e_copy"
                    >{{ scope.row.id }}</el-tag
                  >
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_project'"
                    type="success"
                    effect="dark"
                    style="cursor: pointer"
                    class="copybox"
                    :data-clipboard-text="scope.row.id"
                    @click="e_copy"
                    >{{ scope.row.id }}</el-tag
                  >
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_script'"
                    type="warning"
                    effect="dark"
                    style="cursor: pointer"
                    class="copybox"
                    :data-clipboard-text="scope.row.id"
                    @click="e_copy"
                    >{{ scope.row.id }}</el-tag
                  >
                  <!-- <el-link
                    :type="
                      scope.row.remark == 'lowcode_form' ? 'warning' : 'danger'
                    "
                    :underline="false"
                    class="copybox"
                    :data-clipboard-text="scope.row.id"
                    @click="e_copy"
                    >{{ scope.row.id }}</el-link
                  > -->
                </template>
              </el-table-column>
              <!-- <el-table-column prop="businessTypeName" label="业务类型" align="center">
                            </el-table-column>
                            <el-table-column prop="businessTypeCode" label="业务编码" align="center">
                            </el-table-column> -->
              <!-- <el-table-column prop="tableName" label="数据主表" align="center">
                            </el-table-column> -->
              <el-table-column prop="title" label="标题" align="center">
              </el-table-column>
              <el-table-column prop="name" label="应用名称" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.name == 'foundation'"
                    >基础模块(foundation)</span
                  >
                  <span v-if="scope.row.name == 'generic'"
                    >通用模块(generic)</span
                  >
                  <span v-if="scope.row.name == 'project'"
                    >项目独立模块(project)</span
                  >
                  <span v-if="scope.row.name == 'framework'"
                    >基座模块(framework)</span
                  >
                  <span v-if="scope.row.name == '复制内容'">复制内容</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="低码类型" align="center">
                <template slot-scope="scope">
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_form'"
                    type="primary"
                    effect="dark"
                    >低码表单</el-tag
                  >
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_project'"
                    type="success"
                    effect="dark"
                    >低码插件</el-tag
                  >
                  <el-tag
                    v-if="scope.row.remark == 'lowcode_script'"
                    type="warning"
                    effect="dark"
                    :data-clipboard-text="scope.row.id"
                    >低码脚本</el-tag
                  >
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="e_edit(scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    v-if="canDelete"
                    type="text"
                    @click="e_delete(scope)"
                    >删除</el-button
                  >
                  <el-button
                    style="color: #ffba00"
                    v-if="scope.row.remark == 'lowcode_form'"
                    type="text"
                    @click="e_desginForm(scope.row)"
                    >设计表单</el-button
                  >
                  <el-button
                    style="color: #ff4949"
                    v-if="scope.row.remark == 'lowcode_project'"
                    type="text"
                    @click="e_editProjectOnly(scope.row)"
                    >设计插件</el-button
                  >
                  <el-button
                    style="color: #ff4949"
                    v-if="scope.row.remark == 'lowcode_script'"
                    type="text"
                    @click="e_editLowCodeScript(scope.row)"
                    >设计脚本</el-button
                  >
                  <el-button
                    v-if="scope.row.remark == 'lowcode_form'"
                    type="text"
                    @click="e_copyForm(scope.row)"
                    >复制表单</el-button
                  >
                  <el-button
                    v-if="scope.row.remark == 'lowcode_project'"
                    type="text"
                    @click="e_copyForm(scope.row)"
                    >复制插件</el-button
                  >

                  <el-button
                    v-if="canUseLocalServer"
                    type="text"
                    @click="e_saveLocal(scope.row)"
                    >推送远程</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </BoMain>
      </template>
    </BoContainer>
    <addForm
      ref="addForm"
      v-if="showaddForm"
      @close="showaddForm = false"
      @reload="getList"
    />
    <KevinDesgin
      ref="KevinDesgin"
      v-if="showKevinDesgin"
      @close="showKevinDesgin = false"
      :widgetId="widgetId"
    />
    <projectOnly
      ref="projectOnly"
      v-if="showprojectOnly"
      @close="showprojectOnly = false"
    />
    <lowcodeScript
      ref="lowcodeScript"
      v-if="showlowcodeScript"
      @close="showlowcodeScript = false"
    />
    <KevinDrawer />
    <localSave
      :localSaveHost="localSaveHost"
      ref="localSave"
      v-if="showlocalSave"
      @close="showlocalSave = false"
      @localLogin="e_localLogin"
      @saveSuccess="e_saveLocalSuccess"
    />
    <localSaveLogin
      :localSaveHost="localSaveHost"
      ref="localSaveLogin"
      v-if="showlocalSaveLogin"
      @close="showlocalSaveLogin = false"
      @localLoginSuccess="e_localLoginSuccess"
    />
    <localPull
      :localSaveHost="localSaveHost"
      ref="localPull"
      v-if="showlocalPull"
      @close="showlocalPull = false"
      @pullSuccess="e_pullSuccess"
    />
    <weekPush
      :localSaveHost="localSaveHost"
      ref="weekPush"
      v-if="showweekPush"
      @close="showweekPush = false"
    />
  </div>
</template>
<script>
import KevinDesgin from "@/components/KevinUi/KevinForm/KevinDesign/index";
import BoContainerMixin from "../../../mixins/boContainer";
import addForm from "./dialog/addForm.vue";
import Clipboard from "clipboard";
import projectOnly from "./components/projectOnly.vue";
import KevinDrawer from "@/components/KevinUi/KevinDrawer";
import localSave from "./dialog/localSave.vue";
import localSaveLogin from "./dialog/localSaveLogin.vue";
import axios from "axios";
import localPull from "./dialog/localPull.vue";
import weekPush from "./dialog/weekPush.vue";
import lowcodeScript from "./components/lowcodeScript.vue";
export default {
  mixins: [BoContainerMixin],
  data() {
    return {
      showweekPush: false,
      showlocalSaveLogin: false,
      showlocalSave: false,
      showlocalPull: false,
      tableData: [],

      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 50,
      },
      showaddForm: false,
      canDelete: false,
      widgetId: "",
      showKevinDesgin: false,
      showlowcodeScript: false,
      showprojectOnly: false,
      localSaveHost: "",
      currentLocalSaveInfo: {},
      canUseLocalServer: false,
      unsavedChanges: true,
    };
  },
  components: {
    weekPush,
    addForm,
    KevinDesgin,
    projectOnly,
    lowcodeScript,
    KevinDrawer,
    localSave,
    localSaveLogin,
    localPull,
  },
  mounted() {
    window.addEventListener("beforeunload", this.confirmExit);
  },
  created() {
    window.addEventListener("beforeunload", this.confirmExit);
    this.canDelete = process.env.NODE_ENV != "production";
    this.getList();
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.confirmExit);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.remark == "lowcode_form") {
        return "";
      } else if (row.remark == "lowcode_project") {
        return "success-row";
      } else if (row.remark == "lowcode_script") {
        return "warning-row";
      }
      return "";
    },
    e_showWeekPush() {
      this.showweekPush = true;
      this.$nextTick(() => {
        this.$refs.weekPush.init();
      });
    },
    confirmExit(event) {
      if (this.unsavedChanges) {
        event.returnValue = "您有未保存的更改，确定要离开吗？";
      }
    },
    e_pullSuccess() {
      this.showlocalPull = false;
      this.$message.success("同步完成");
      this.getList();
    },
    e_localPull() {
      this.$confirm(
        "随意拉取其他项目的低码表单，有可能会导致当前项目中唯一键相同的表单被覆盖，是否继续？"
      ).then(() => {
        this.showlocalPull = true;
        this.$nextTick(() => {
          this.$refs.localPull.init();
        });
      });
    },

    e_saveLocalSuccess() {
      this.showlocalSave = false;
    },
    e_localLogin() {
      this.showlocalSave = false;
      this.showlocalSaveLogin = true;
      this.$nextTick(() => {
        this.$refs.localSaveLogin.init();
      });
    },
    e_localLoginSuccess() {
      this.showlocalSaveLogin = false;
      this.showlocalSave = true;
      this.$nextTick(() => {
        this.$refs.localSave.init(this.currentLocalSaveInfo);
      });
    },
    e_saveLocal(row) {
      this.currentLocalSaveInfo = row;
      if (sessionStorage.getItem("localAccountToken")) {
        this.showlocalSave = true;
        this.$nextTick(() => {
          this.$refs.localSave.init(row);
        });
      } else {
        this.showlocalSaveLogin = true;
        this.$nextTick(() => {
          this.$refs.localSaveLogin.init();
        });
      }
    },
    async e_copyForm(row) {
      let resultStr = await this.e_getFormJson(row.id);
      this.$prompt("请输入新表单的唯一键值", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "text",
      }).then(({ value }) => {
        // 成功之后的回调
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value)) {
          let params = {
            ...row,
          };
          params.id = value;
          params.name = "复制内容";
          params.title = "复制内容";
          params.config = JSON.parse(resultStr);
          this.$net(
            "/formLayout/v2/saveOrUpdateFormLayoutConfig",
            "post",
            params
          ).then(async (re) => {
            if (re.code == 200) {
              this.$message.success("复制成功，新表单已生成");
              // this.copySaveForm(value, resultStr)
              this.getList();
            } else {
              this.$message.error(re.msg);
            }
          });
        } else {
          this.$message.error("键名不符合 JavaScript 标识符规范");
        }
      });
    },
    async e_getFormJson(id) {
      let response = await this.$net(
        "/formLayout/v2/getFormLayoutConfig",
        "get",
        { id: id }
      );
      return response.data.configStr;
    },
    copySaveForm(id, resultStr) {
      let params = {
        id: id,
        config: JSON.parse(resultStr),
      };
      this.$net(
        "/formLayout/v2/saveOrUpdateFormLayoutConfig",
        "post",
        params
      ).then((re) => {
        if (re.code == 200) {
          this.$message.success("保存成功");
          this.$emit("close");
        } else {
          this.$message.error(re.msg);
        }
      });
    },
    e_editLowCodeScript(row) {
      this.showlowcodeScript = true;
      this.$nextTick(() => {
        this.$refs.lowcodeScript.init(row.id);
      });
    },
    e_editProjectOnly(row) {
      this.showprojectOnly = true;
      this.$nextTick(() => {
        this.$refs.projectOnly.init(row.id);
      });
    },
    e_copy() {
      var that = this;
      var clipboard = new Clipboard(".copybox");
      clipboard.on("success", () => {
        that.$message.success("表单key复制成功");
        clipboard.destroy();
      });
    },
    e_desginForm(row) {
      this.widgetId = row.id;
      this.showKevinDesgin = true;
      this.$nextTick(() => {
        this.$refs.KevinDesgin.init();
      });
    },
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 50,
      };
      this.getList();
    },
    e_edit(row) {
      this.showaddForm = true;
      this.$nextTick(() => {
        this.$refs.addForm.editInit(row);
      });
    },
    e_delete(scope) {
      this.$confirm("确定删除该表单吗?").then((re) => {
        this.$net("/formLayout/v2/removeFormLayoutConfig", "get", {
          id: scope.row.id,
        }).then((re) => {
          if (re.code == 200) {
            this.$message.success("删除成功");
            this.getList();
          }
        });
      });
    },
    e_changePage(pageInfo) {
      console.log("pageInfo", pageInfo);
      this.queryParams.pageNum = pageInfo.page;
      this.queryParams.pageSize = pageInfo.limit;
      this.getList();
    },
    getList() {
      this.$net(
        "/formLayout/v2/getFormLayoutList",
        "post",
        this.queryParams
      ).then((re) => {
        this.tableData = re.data.list;
        this.total = re.data.total;
      });
    },
    e_addForm() {
      this.showaddForm = true;
      this.$nextTick(() => {
        this.$refs.addForm.init();
      });
    },
  },
};
</script>
<style scoped>
/deep/.el-table .warning-row {
  background: oldlace;
}

/deep/.el-table .success-row {
  background: #f0f9eb;
}
/deep/.el-table .primary-row {
  background: #64b1f85c;
}
</style>
<template>
  <div>
    <BoDialog
      ref="BoDialog"
      :diaLogShow="showdiaLogShow"
      @close="e_close"
      diaLogTitle="低码维护"
      width="40%"
    >
      <template slot="bologbody">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="唯一键"
                prop="id"
                :rules="[
                  { required: true, message: '请输入唯一键', trigger: 'blur' },
                  { validator: validateKeyName, trigger: 'blur' },
                ]"
              >
                <el-input
                  :disabled="showType == 'edit'"
                  v-model="ruleForm.id"
                  @input="e_inputsubBusinessCode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="应用所属"
                prop="name"
                :rules="[
                  {
                    required: true,
                    message: '请选择项目名称',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select v-model="ruleForm.name">
                  <el-option
                    label="基础模块（Foundation）"
                    value="foundation"
                  ></el-option>
                  <el-option
                    label="通用模块（Generic）"
                    value="generic"
                  ></el-option>
                  <el-option
                    label="项目独立模块（Project）"
                    value="project"
                  ></el-option>
                  <el-option
                    label="基座模块（Framework）"
                    value="framework"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item
                label="标题"
                prop="title"
                :rules="[
                  { required: true, message: '请输入标题', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model="ruleForm.title"
                  placeholder="标题应当提现出模块所属关系（建议：foundation-委托协议-委托编制弹框）"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="低码类型"
                prop="remark"
                :rules="[
                  {
                    required: true,
                    message: '请选择低码类型',
                    trigger: 'chagne',
                  },
                ]"
              >
                <el-select
                  v-model="ruleForm.remark"
                  :disabled="showType == 'edit'"
                >
                  <el-option label="低码表单" value="lowcode_form"></el-option>
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
            <!-- <el-col :span="24">
                            <el-form-item label="业务类型" prop="businessTypeName">
                                <el-input v-model="ruleForm.businessTypeName" readonly @focus="e_selBusinessType">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="数据主表" prop="tableName">
                                <el-input v-model="ruleForm.tableName" readonly @focus="e_selTableName">
                                </el-input>
                            </el-form-item>
                        </el-col> -->
          </el-row>
        </el-form>
      </template>
      <template slot="bologfooter">
        <el-button type="primary" size="small" @click="e_save">保存</el-button>
        <el-button size="small" @click="e_close">关闭</el-button>
      </template>
    </BoDialog>
    <businessType
      ref="businessType"
      v-if="showbusinessType"
      @close="showbusinessType = false"
      @confirm="e_confirmBusinessType"
    />
    <tableName
      ref="tableName"
      v-if="showtableName"
      @close="showtableName = false"
      @confirm="e_confirmTableName"
    />
  </div>
</template>
<script>
import businessType from "../components/businessType.vue";
import tableName from "../components/tableName.vue";
const nameChange = (rule, value, callback) => {
  console.log("aaa", value);
  if (!value) {
    return callback(new Error("请填写名字"));
  } else {
    return callback();
  }
};
export default {
  components: {
    businessType,
    tableName,
  },
  data() {
    return {
      nameChange: nameChange,
      editType: "add",
      showtableName: false,
      showbusinessType: false,
      showdiaLogShow: false,
      ruleForm: {
        businessTypeName: undefined,
        businessTypeCode: undefined,
        tableName: undefined,
        id: undefined,
        title: undefined,
        namePre: "",
        name: undefined,
        remark: "lowcode_form",
        config: {
          KevinJson: {
            KevinWidget: {
              title: "表单设计",
              formlabelPosition: "top",
              fullScreen: true,
              autoEvents: {},
              manuallyEvents: {},
              diaLogFooterButton: [],
              children: [],
            },
            KevinLogWidgets: [],
          },
        },
        extData: {},
      },
      LowCodeFormConfig: {
        KevinJson: {
          KevinWidget: {
            title: "表单设计",
            fullScreen: true,
            formlabelPosition: "right",
            autoEvents: {},
            manuallyEvents: {},
            diaLogFooterButton: [],
            children: [],
          },
          KevinLogWidgets: [],
        },
      },
      ProjectOnlyConfig: {
        mainHomeButtons: [],
        mainTableButtons: [],
        mainTableSlotRender: [],
        mainDialogBottomButtons: [],
        businessCode: {},
      },
      LowCodeScript: {
        autoEvents: [],
        manuallyEvents: [],
      },
      showType: "add",
    };
  },
  watch: {
    "ruleForm.remark"(val) {
      if (val == "lowcode_form") {
        this.ruleForm.config = this.LowCodeFormConfig;
      } else if (val == "lowcode_project") {
        this.ruleForm.config = this.ProjectOnlyConfig;
      } else if (val == "lowcode_script") {
        this.ruleForm.config = this.LowCodeScript;
      }
      console.log("this.ruleForm.config", this.ruleForm.config);
    },
  },
  methods: {
    // validatePass() {
    //     return nameChange
    // },
    e_inputsubBusinessCode(e) {
      this.ruleForm.subBusinessCode = e;
    },
    e_confirmTableName(params) {
      this.showtableName = false;
      this.ruleForm.tableName = params.id;
    },
    e_selTableName() {
      this.showtableName = true;
      this.$nextTick(() => {
        this.$refs.tableName.init();
      });
    },
    e_confirmBusinessType(params) {
      console.log("params", params);
      this.showbusinessType = false;
      this.ruleForm.businessTypeCode = params.businessTypeCode;
      this.ruleForm.businessTypeName = params.businessTypeName;
    },
    e_selBusinessType() {
      this.showbusinessType = true;
      this.$nextTick(() => {
        this.$refs.businessType.init();
      });
    },
    e_close() {
      this.$emit("close");
    },
    validateKeyName(rule, value, callback) {
      if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value)) {
        callback();
      } else {
        callback(new Error("键名不符合 JavaScript 标识符规范"));
      }
    },
    e_save() {
      this.$refs.ruleForm.validate((v) => {
        if (v) {
          let config = this.ruleForm.config;
          let formLayoutConfigStr = JSON.stringify(config);
          let resultStr = formLayoutConfigStr
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          this.ruleForm.config = JSON.parse(resultStr);
          if (this.editType == "add") {
            this.$net(
              "/formLayout/v2/saveOrUpdateFormLayoutConfig",
              "post",
              this.ruleForm
            ).then((re) => {
              if (re.code == 200) {
                this.$message.success("保存成功");
                this.$emit("reload");
                this.e_close();
              } else {
                this.$message.error(re.msg);
              }
            });
          } else {
            this.$net(
              "/formLayout/v2/saveOrUpdateFormLayoutConfig",
              "post",
              this.ruleForm
            ).then((re) => {
              if (re.code == 200) {
                this.$message.success("保存成功");
                this.$emit("reload");
                this.e_close();
              } else {
                this.$message.error(re.msg);
              }
            });
          }
        }
      });
    },
    init() {
      this.showdiaLogShow = true;
      this.$refs.BoDialog.isFullScreen = false;
    },
    editInit(row) {
      this.editType = "edit";
      this.$refs.BoDialog.isFullScreen = false;
      this.showType = "edit";
      this.showdiaLogShow = true;
      this.$net("/formLayout/v2/getFormLayoutConfig", "get", {
        id: row.id,
      }).then((re) => {
        this.ruleForm = {
          id: re.data.id,
          title: re.data.title,
          businessTypeCode: re.data.businessTypeCode,
          businessTypeName: re.data.businessTypeName,
          tableName: re.data.tableName,
          subBusinessCode: re.data.subBusinessCode,
          name: re.data.name,
          remark: re.data.remark,
          extData: re.data.extData || {},
        };
        if (re.data.remark == "lowcode_form") {
          this.ruleForm.config = re.data.config;
        } else if (re.data.remark == "lowcode_project") {
          this.ProjectOnlyConfig = re.data.config;
        } else if (re.data.remark == "lowcode_script") {
          this.LowCodeScript = re.data.config;
        }
      });
    },
  },
};
</script>

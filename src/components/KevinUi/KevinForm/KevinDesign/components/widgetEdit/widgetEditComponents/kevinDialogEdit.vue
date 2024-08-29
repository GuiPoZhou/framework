<template>
  <widgetEditContainer>
    <el-form
      slot="wecLeft"
      :model="editParams"
      ref="editParams"
      label-width="130px"
      label-position="top"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="弹框标题"
            prop="title"
            :rules="[
              { required: true, message: '请输入按钮标题', trigger: 'blur' },
            ]"
          >
            <el-input v-model="editParams.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="弹框尺寸（小型弹框适用 内容较少情景）"
            prop="dialogType"
          >
            <el-select v-model="editParams.dialogType">
              <el-option label="大型弹框" value="max"></el-option>
              <el-option label="小型弹框" value="mini"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="绑定表单key"
            prop="quoteId"
            :rules="[
              {
                required: true,
                message: '请选择要绑定的低码表单',
                trigger: 'change',
              },
            ]"
          >
            <el-input v-model="editParams.quoteId" readonly>
              <el-button slot="append" @click="e_selLowCode"> 选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">弹框回调事件维护</el-divider>
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.7rem"
            @click="e_addCallBack"
            >添加事件</el-button
          >
        </el-col>
        <el-col :span="24">
          <el-table :data="editParams.callback" style="width: 100%" border>
            <el-table-column prop="label" label="事件名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.label"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="事件备注" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="events" label="事件脚本" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="e_editCallBackEvents(scope)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="title" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="e_deleteCallBack(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <KevinEditors
      slot="wecRight"
      ref="KevinEditors"
      @input="handleEditorInput"
    />
  </widgetEditContainer>
</template>

<script>
import KevinEditors from "../../../../../../KevinEditor/index";
import widgetEditContainer from "../components/widgetEditContainer.vue";

export default {
  components: {
    KevinEditors,
    widgetEditContainer,
  },
  data() {
    return {
      editParams: {
        callback: [],
      },
      editType: "",
      editIndex: -1,
    };
  },
  methods: {
    confirmLowCode(params) {
      this.$set(this.editParams, "quoteId", params.id);
      this.$set(this.editParams, "quoteTitle", params.title);
    },
    e_selLowCode() {
      this.$emit("selLowCode");
    },
    e_deleteCallBack(index) {
      this.$confirm("确定删除该回调事件吗?").then(() => {
        this.editParams.callback.splice(index, 1);
      });
    },
    handleEditorInput(code) {
      if (this.editType == "callbackEvents") {
        this.editParams.callback[this.editIndex].events = this.formatCode(code);
      }
    },
    e_editCallBackEvents(scope) {
      this.editIndex = scope.$index;
      this.editType = "callbackEvents";
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.events || "console.log('弹框回调事件')",
      });
    },
    e_addCallBack() {
      this.$prompt("请输入回调事件key", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "test",
      }).then(({ value }) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(value)) {
          let labelList = this.editParams.callback.map((item) => {
            return item.label;
          });
          if (labelList.indexOf(value) == -1) {
            let params = {
              label: value,
              remark: "",
              events: "",
            };
            this.editParams.callback.push(params);
            this.$forceUpdate();
          } else {
            this.$message.error("请勿重复命名");
          }
        } else {
          this.$message.error("输入内容必须符合javascript对象key的命名规范");
        }
      });
    },
    setPerm(perm) {
      this.$set(this.editParams, "perm", perm);
    },
    e_editPerm() {
      this.$emit("selPerm");
    },
    formatCode(code) {
      // 去除开头和结尾的空白字符
      code = code.trim();

      // 在大括号前后添加空格
      // code = code.replace(/\s*{\s*/g, ' { ').replace(/\s*}\s*/g, ' } ');

      // 在逗号前后添加空格
      // code = code.replace(/,(\S)/g, ', $1');

      // 返回格式化后的代码
      return code;
    },
    e_editButtonEvents() {
      this.$refs.KevinEditors.changeEditor({ value: this.editParams.events });
    },
    e_save() {
      this.$refs.editParams.validate((v) => {
        if (v) {
          this.$emit("save", this.editParams);
        }
      });
    },
    e_close() {
      this.$emit("close");
    },
    init(widgetInfo) {
      this.editParams = widgetInfo;
      if (!this.editParams.isHide) {
        this.editParams.isHide = false;
      }
      if (!this.editParams.dialogType) {
        this.editParams.dialogType = "max";
      }
    },
  },
};
</script>

<style></style>
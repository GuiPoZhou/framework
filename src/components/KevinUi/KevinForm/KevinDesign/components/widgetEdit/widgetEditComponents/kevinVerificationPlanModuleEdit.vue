<template>
  <widgetEditContainer>
    <el-form
      slot="wecLeft"
      :model="editParams"
      ref="editParams"
      label-position="top"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-col :span="24">
        <el-form-item label="模板按钮显示控制" prop="events.moduleHidenCode">
          <el-input v-model="editParams.events.moduleHidenCode" readonly>
            <el-button slot="append" size="small" @click="e_editmoduleHidenCode"
              >编辑</el-button
            >
          </el-input>
        </el-form-item>
      </el-col>
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
        events: {},
      },
      editType: "",
    };
  },
  methods: {
    setPerm(perm) {
      this.$set(this.editParams, "perm", perm);
    },
    e_editPerm() {
      this.$emit("selPerm");
    },
    handleEditorInput(code) {
      if (this.editType == "moduleHidenCode") {
        this.editParams.events.moduleHidenCode = this.formatCode(code);
      } else if (this.editType == "hideCode") {
        this.$set(this.editParams, "hideCode", this.formatCode(code));
      } else {
        this.editParams.disabledCode = this.formatCode(code);
      }
    },
    formatCode(code) {
      // 去除开头和结尾的空白字符
      code = code.trim();

      // 在大括号前后添加空格
      code = code.replace(/\s*{\s*/g, " { ").replace(/\s*}\s*/g, " } ");

      // 在逗号前后添加空格
      // code = code.replace(/,(\S)/g, ', $1');

      // 返回格式化后的代码
      return code;
    },
    e_editHideCode() {
      this.editType = "hideCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.hideCode || "return false",
      });
    },
    e_editmoduleHidenCode() {
      this.editType = "moduleHidenCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events.moduleHidenCode || "return false",
      });
    },
    e_editButtonEvents() {
      this.editType = "clickEvents";
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
      if (!this.editParams.events) {
        this.editParams.events = {};
      }
    },
  },
};
</script>

<style></style>
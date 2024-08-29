<template>
  <widgetEditContainer>
    <el-form
      slot="wecLeft"
      :model="editParams"
      ref="editParams"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-col :span="24">
        <el-form-item
          label="组件标题"
          prop="title"
          :rules="[
            { required: true, message: '请输入组件标题', trigger: 'blur' },
          ]"
        >
          <el-input v-model="editParams.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="组件高度"
          prop="height"
          :rules="[
            { required: true, message: '请输入组件高度', trigger: 'blur' },
          ]"
        >
          <el-input-number
            v-model="editParams.height"
            min="300"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="是否默认禁用" prop="disabled">
          <el-select v-model="editParams.disabled">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="是否默认隐藏" prop="isHide">
          <el-radio-group v-model="editParams.isHide">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
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
      editParams: {},
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
      if (this.editType == "clickEvents") {
        this.editParams.events = this.formatCode(code);
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
    e_editDisabledCode() {
      this.editType = "disabledCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.disabledCode || "return false",
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
      if (!this.editParams.isHide) {
        this.editParams.isHide = false;
      }
    },
  },
};
</script>

<style></style>
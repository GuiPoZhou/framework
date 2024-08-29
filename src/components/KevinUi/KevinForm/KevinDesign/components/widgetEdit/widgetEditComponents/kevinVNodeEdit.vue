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
          label="节点标题"
          prop="title"
          :rules="[
            { required: true, message: '请输入节点标题', trigger: 'blur' },
          ]"
        >
          <el-input v-model="editParams.title"></el-input>
        </el-form-item>
      </el-col>
       <el-col :span="24">
          <el-form-item label="占据的列数" prop="colSpan">
            <el-input-number
              v-model="editParams.colSpan"
              :min="4"
              :max="24"
            ></el-input-number>
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
      <!-- <el-col :span="24">
        <el-form-item label="禁用脚本" prop="disabledCode">
          <el-input v-model="editParams.disabledCode" readonly>
            <el-button slot="append" size="small" @click="e_editDisabledCode"
              >编辑</el-button
            >
          </el-input>
        </el-form-item>
      </el-col> -->
      <el-col :span="24">
        <el-form-item
          label="节点DOM脚本"
          prop="nodeRender"
          :rules="[
            { required: true, message: '请编辑节点DOM脚本', trigger: 'change' },
          ]"
        >
          <el-input v-model="editParams.nodeRender" readonly>
            <el-button slot="append" size="small" @click="e_editNodeRender"
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
      if (this.editType == "nodeRender") {
        this.editParams.nodeRender = this.formatCode(code);
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
    e_editDisabledCode() {
      this.editType = "disabledCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.disabledCode || "return false",
      });
    },
    e_editNodeRender() {
      this.editType = "nodeRender";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.editParams.nodeRender || 'return createElement("div", "虚拟节点 div")',
      });
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
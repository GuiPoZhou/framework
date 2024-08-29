<template>
  <widgetEditContainer>
    <el-form
      slot="wecLeft"
      :model="editParams"
      label-position="top"
      ref="editParams"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-divider content-position="left">基础属性</el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="组件类型" prop="renderType">
            <el-select v-model="editParams.renderType">
              <el-option label="TimePicker" value="picker"></el-option>
              <el-option label="TimeSelect" value="select"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="时间选择框标题"
            prop="title"
            :rules="[
              { required: true, message: '请输入日期框标题', trigger: 'blur' },
            ]"
          >
            <el-input v-model="editParams.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="占据的列数" prop="colSpan">
            <el-input-number
              v-model="editParams.colSpan"
              :min="4"
              :max="24"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否默认隐藏" prop="isHide">
            <el-select v-model="editParams.isHide">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="尺寸" prop="size">
            <el-select v-model="editParams.size">
              <el-option label="默认" value="-"></el-option>
              <el-option label="中等" value="medium"></el-option>
              <el-option label="小型" value="small"></el-option>
              <el-option label="超小型" value="mini"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="绑定值(vModel)"
            prop="vModel"
            :rules="[
              { required: true, message: '请输入绑定值', trigger: 'blur' },
            ]"
          >
            <el-input v-model="editParams.vModel">
              <el-button slot="append" @click="e_selDbTable">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="绑定值类型(vModelType)" prop="vModelType">
            <el-select v-model="editParams.vModelType">
              <el-option label="固定参数" value="fixed"></el-option>
              <el-option label="扩展参数" value="ext"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主表名称" prop="tableName">
            <el-input v-model="editParams.tableName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对齐方式" prop="align">
            <el-select v-model="editParams.align">
              <el-option label="居左" value="left"></el-option>
              <el-option label="居中" value="center"></el-option>
              <el-option label="居右" value="right"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可清空" prop="clearable">
            <el-select v-model="editParams.clearable">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否必填" prop="rules.isValidate">
            <el-select v-model="editParams.rules.isValidate">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editParams.rules.isValidate">
          <el-form-item label="表单验证触发方式" prop="rules.validateType">
            <el-select v-model="editParams.rules.validateType">
              <el-option label="Blur" value="blur"></el-option>
              <el-option label="Change" value="change"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editParams.rules.isValidate">
          <el-form-item
            label="表单验证提示语"
            prop="rules.validateTitle"
            :rules="[
              {
                required: true,
                message: '请输入表单验证提示语',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="editParams.rules.validateTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否默认禁用" prop="disabled">
            <el-select v-model="editParams.disabled">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否默认只读" prop="readonly">
            <el-select v-model="editParams.readonly">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!editParams.isRange">
          <el-form-item label="占位文本(placeholder 非范围)" prop="placeholder">
            <el-input v-model="editParams.placeholder"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider
        v-if="editParams.renderType == 'picker'"
        content-position="left"
        >TimePicker扩展属性</el-divider
      >
      <el-row v-if="editParams.renderType == 'picker'">
        <el-col :span="12">
          <el-form-item label="绑定值格式" prop="valueFormat">
            <el-select v-model="editParams.valueFormat">
              <el-option label="HH:mm:ss" value="HH:mm:ss"></el-option>
              <el-option label="HH:mm" value="HH:mm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="开启范围选择" prop="isRange">
            <el-select v-model="editParams.isRange" @change="e_changeIsRange">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editParams.isRange">
          <el-form-item label="分隔符" prop="valueFormat">
            <el-input v-model="editParams.rangeSeparator" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开启箭头辅助" prop="arrowControl">
            <el-select v-model="editParams.arrowControl">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="editParams.isRange">
          <el-form-item
            label="占位文本(范围 startPlaceholder)"
            prop="startPlaceholder"
          >
            <el-input v-model="editParams.startPlaceholder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="editParams.isRange">
          <el-form-item
            label="占位文本(范围 endPlaceholder)"
            prop="endPlaceholder"
          >
            <el-input v-model="editParams.endPlaceholder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!editParams.isRange">
          <el-form-item
            label="单选可选区域"
            prop="pickerOptions.selectableRange"
          >
            <el-time-picker
              is-range
              clearable
              v-model="editParams.pickerOptions.selectableRange"
              range-separator="至"
              value-format="HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider
        v-if="editParams.renderType == 'select'"
        content-position="left"
        >TimeSelect扩展属性</el-divider
      >
      <el-row v-if="editParams.renderType == 'select'">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="pickerOptions.start">
            <el-time-picker
              clearable
              v-model="editParams.pickerOptions.start"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="pickerOptions.end">
            <el-time-picker
              clearable
              v-model="editParams.pickerOptions.end"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="间隔时间" prop="pickerOptions.step">
            <el-input-number
              v-model="editParams.pickerOptions.step"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小时间" prop="pickerOptions.minTime">
            <el-time-picker
              clearable
              v-model="editParams.pickerOptions.minTime"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大时间" prop="pickerOptions.maxTime">
            <el-time-picker
              clearable
              v-model="editParams.pickerOptions.maxTime"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">事件</el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="禁用脚本" prop="events.disabledCode">
            <el-input v-model="editParams.events.disabledCode" readonly>
              <el-button slot="append" size="small" @click="e_editDisabledCode"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Change事件" prop="events.change">
            <el-input v-model="editParams.events.change" readonly>
              <el-button slot="append" @click="e_editChange">编辑</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Blur事件" prop="events.blur">
            <el-input v-model="editParams.events.blur" readonly>
              <el-button slot="append" @click="e_editBlur">编辑</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Focus事件" prop="events.focus">
            <el-input v-model="editParams.events.focus" readonly>
              <el-button slot="append" @click="e_editFocus">编辑</el-button>
            </el-input>
          </el-form-item>
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
import widgetEditContainer from "../components/widgetEditContainer.vue";
import KevinEditors from "../../../../../../KevinEditor/index";
export default {
  components: {
    widgetEditContainer,
    KevinEditors,
  },
  data() {
    return {
      showdefaultTime: false,
      editParams: {
        rules: {
          isValidate: false,
        },
        events: {},
        pickerOptions: {},
      },
      editType: "",
      defaultTime: "",
    };
  },

  methods: {
    e_changeIsRange() {
      if (this.editParams.isRange) {
        this.editParams.pickerOptions.selectableRange = "-";
      }
    },
    setDbTable(params) {
      this.editParams.vModel = params.keyName;
      this.editParams.vModelType = params.type;
      this.editParams.tableName = params.tableName;
    },
    e_selDbTable() {
      this.$emit("selDBTable");
    },
    e_selectType() {
      if (
        this.editParams.type == "datetimerange" ||
        this.editParams.type == "daterange" ||
        this.editParams.type == "monthrange"
      ) {
        this.showdefaultTime = true;
        this.editParams.defaultTime = this.defaultTime;
      } else {
        this.showdefaultTime = false;
        this.editParams.defaultTime =
          "(function statusForEdit() { return '-'; })();";
      }
    },
    e_editdefaultTime() {
      this.editType = "defaultTime";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.editParams.defaultTime ||
          "(function defaultTime() { var date = new Date(); var hour = date.getHours(); var minute = date.getMinutes(); var second = date.getSeconds(); let time = []; time.push('00:00:00'); time.push('23:59:59'); return time; })(); ",
      });
    },
    e_editpickerOptions() {
      this.editType = "pickerOptions";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.pickerOptions,
      });
    },
    e_editDisabledCode() {
      this.editType = "disabledCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events.disabledCode || "return false",
      });
    },
    e_editFocus() {
      this.editType = "focus";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events.focus,
      });
    },
    e_editBlur() {
      this.editType = "blur";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events.blur,
      });
    },
    e_editChange() {
      this.editType = "change";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events.change,
      });
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
    handleEditorInput(code) {
      if (this.editType == "change") {
        this.$set(this.editParams.events, "change", this.formatCode(code));
      } else if (this.editType == "focus") {
        this.$set(this.editParams.events, "focus", this.formatCode(code));
      } else if (this.editType == "blur") {
        this.$set(this.editParams.events, "blur", this.formatCode(code));
      } else if (this.editType == "defaultTime") {
        this.$set(this.editParams, "defaultTime", this.formatCode(code));
        this.defaultTime = this.formatCode(code);
      } else if (this.editType == "pickerOptions") {
        this.$set(this.editParams, "pickerOptions", this.formatCode(code));
      } else if (this.editType == "disabledCode") {
        this.$set(
          this.editParams.events,
          "disabledCode",
          this.formatCode(code)
        );
      }
    },
    e_save() {
      this.$refs.editParams.validate((v) => {
        if (v) {
          if (
            this.editParams.pickerOptions.selectableRange &&
            this.editParams.pickerOptions.selectableRange != "-"
          ) {
            this.editParams.pickerOptions.selectableRange =
              this.editParams.pickerOptions.selectableRange.join("-");
          }
          if (this.editParams.pickerOptions.step) {
            this.editParams.pickerOptions.step = `00:${this.editParams.pickerOptions.step}`;
          }
          this.$emit("save", this.editParams);
        }
      });
    },
    init(widgetInfo) {
      this.editParams = widgetInfo;
      if (!this.editParams.isHide) {
        this.editParams.isHide = false;
      }
      if (this.editParams.pickerOptions.selectableRange) {
        this.editParams.pickerOptions.selectableRange =
          this.editParams.pickerOptions.selectableRange.split("-");
      }
      if (this.editParams.pickerOptions.step) {
        this.editParams.pickerOptions.step =
          this.editParams.pickerOptions.step.split(":")[1];
      }
    },
  },
};
</script>


<style scoped lang="scss"></style>
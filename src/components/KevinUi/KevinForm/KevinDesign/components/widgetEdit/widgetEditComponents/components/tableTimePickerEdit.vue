<template>
  <KevinLog
    ref="KevinLog"
    :dia-log-show="showLog"
    diaLogWidth="60%"
    dia-log-title="表格行内时间框组件编辑"
    @close="e_close"
  >
    <template slot="bologbody">
      <div class="b_b_container">
        <div class="b_b_c_left">
          <el-form
            slot="wecLeft"
            :model="slotParams"
            label-position="top"
            ref="slotParams"
            label-width="130px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="组件类型" prop="renderType">
                  <el-select v-model="slotParams.renderType">
                    <el-option label="TimePicker" value="picker"></el-option>
                    <el-option label="TimeSelect" value="select"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="尺寸" prop="size">
                  <el-select v-model="slotParams.size">
                    <el-option label="默认" value="-"></el-option>
                    <el-option label="中等" value="medium"></el-option>
                    <el-option label="小型" value="small"></el-option>
                    <el-option label="超小型" value="mini"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="对齐方式" prop="align">
                  <el-select v-model="slotParams.align">
                    <el-option label="居左" value="left"></el-option>
                    <el-option label="居中" value="center"></el-option>
                    <el-option label="居右" value="right"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可清空" prop="clearable">
                  <el-select v-model="slotParams.clearable">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider
              v-if="slotParams.renderType == 'picker'"
              content-position="left"
              >TimePicker扩展属性</el-divider
            >
            <el-row v-if="slotParams.renderType == 'picker'">
              <el-col :span="12">
                <el-form-item label="绑定值格式" prop="valueFormat">
                  <el-select v-model="slotParams.valueFormat">
                    <el-option label="HH:mm:ss" value="HH:mm:ss"></el-option>
                    <el-option label="HH:mm" value="HH:mm"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开启范围选择" prop="isRange">
                  <el-select
                    v-model="slotParams.isRange"
                    @change="e_changeIsRange"
                  >
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="slotParams.isRange">
                <el-form-item label="分隔符" prop="valueFormat">
                  <el-input
                    v-model="slotParams.rangeSeparator"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开启箭头辅助" prop="arrowControl">
                  <el-select v-model="slotParams.arrowControl">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="slotParams.isRange">
                <el-form-item
                  label="占位文本(范围 startPlaceholder)"
                  prop="startPlaceholder"
                >
                  <el-input v-model="slotParams.startPlaceholder"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="slotParams.isRange">
                <el-form-item
                  label="占位文本(范围 endPlaceholder)"
                  prop="endPlaceholder"
                >
                  <el-input v-model="slotParams.endPlaceholder"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="!slotParams.isRange">
                <el-form-item
                  label="单选可选区域"
                  prop="pickerOptions.selectableRange"
                >
                  <el-time-picker
                    is-range
                    clearable
                    v-model="slotParams.pickerOptions.selectableRange"
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
              v-if="slotParams.renderType == 'select'"
              content-position="left"
              >TimeSelect扩展属性</el-divider
            >
            <el-row v-if="slotParams.renderType == 'select'">
              <el-col :span="12">
                <el-form-item label="开始时间" prop="pickerOptions.start">
                  <el-time-picker
                    clearable
                    v-model="slotParams.pickerOptions.start"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间" prop="pickerOptions.end">
                  <el-time-picker
                    clearable
                    v-model="slotParams.pickerOptions.end"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="间隔时间" prop="pickerOptions.step">
                  <el-input-number
                    v-model="slotParams.pickerOptions.step"
                    :min="1"
                    label="描述文字"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小时间" prop="pickerOptions.minTime">
                  <el-time-picker
                    clearable
                    v-model="slotParams.pickerOptions.minTime"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大时间" prop="pickerOptions.maxTime">
                  <el-time-picker
                    clearable
                    v-model="slotParams.pickerOptions.maxTime"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">事件</el-divider>
            <el-row>
              <el-col :span="12">
                <el-form-item label="状态脚本事件" prop="events.disabledCode">
                  <el-input v-model="slotParams.events.disabledCode" readonly>
                    <el-button slot="append" @click="e_editdisabledCode"
                      >编辑</el-button
                    >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Change事件" prop="events.change">
                  <el-input v-model="slotParams.events.change" readonly>
                    <el-button slot="append" @click="e_editChange"
                      >编辑</el-button
                    >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Blur事件" prop="events.blur">
                  <el-input v-model="slotParams.events.blur" readonly>
                    <el-button slot="append" @click="e_editBlur"
                      >编辑</el-button
                    >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Focus事件" prop="events.focus">
                  <el-input v-model="slotParams.events.focus" readonly>
                    <el-button slot="append" @click="e_editFocus"
                      >编辑</el-button
                    >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="b_b_c_right">
          <KevinEditors ref="KevinEditors" @input="handleEditorInput" />
        </div>
      </div>
    </template>
    <template slot="bologfooter">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="e_close">取消</el-button>
    </template>
  </KevinLog>
</template>

<script>
import KevinLog from "../../../../../../KevinLog/index.vue";
import KevinEditors from "../../../../../../../KevinEditor/index.vue";
export default {
  components: {
    KevinLog,
    KevinEditors,
  },
  data() {
    return {
      showLog: false,
      slotParams: {
        renderType:'picker',
        events: {},
        pickerOptions: {},
      },
      editType: {},
      defaultTime: "",
    };
  },
  methods: {
    e_changeIsRange() {
      if (this.slotParams.isRange) {
        this.slotParams.pickerOptions.selectableRange = "-";
      }
    },
    e_editpickerOptions() {
      this.editType = "pickerOptions";
      this.$refs.KevinEditors.changeEditor({
        value: this.slotParams.pickerOptions || "",
      });
    },
    e_editdisabledCode() {
      this.editType = "editDisabledCode";
      this.$refs.KevinEditors.changeEditor({
        value: this.slotParams.events.disabledCode || "return false",
      });
    },
    e_selectType() {
      if (
        this.slotParams.type == "datetimerange" ||
        this.slotParams.type == "daterange" ||
        this.slotParams.type == "monthrange"
      ) {
        this.showdefaultTime = true;
        this.slotParams.defaultTime = this.defaultTime;
      } else {
        this.showdefaultTime = false;
        this.slotParams.defaultTime =
          "(function statusForEdit() { return '-'; })();";
      }
    },
    e_editdefaultTime() {
      this.editType = "defaultTime";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.slotParams.defaultTime ||
          "(function defaultTime() { var date = new Date(); var hour = date.getHours(); var minute = date.getMinutes(); var second = date.getSeconds(); let time = []; time.push('00:00:00'); time.push('23:59:59'); return time; })(); ",
      });
    },
    e_editFocus() {
      this.editType = "focus";
      this.$refs.KevinEditors.changeEditor({
        value: this.slotParams.events.focus || 'console.log("获取焦点")',
      });
    },
    e_editBlur() {
      this.editType = "blur";
      this.$refs.KevinEditors.changeEditor({
        value: this.slotParams.events.blur || 'console.log("失去焦点")',
      });
    },
    e_editChange() {
      this.editType = "change";
      this.$refs.KevinEditors.changeEditor({
        value: this.slotParams.events.change || 'console.log("选择时间")',
      });
    },
    formatCode(code) {
      // 去除开头和结尾的空白字符
      code = code.trim();

      // 在大括号前后添加空格
      //   code = code.replace(/\s*{\s*/g, " { ").replace(/\s*}\s*/g, " } ");

      // 在逗号前后添加空格
      // code = code.replace(/,(\S)/g, ', $1');

      // 返回格式化后的代码
      return code;
    },
    handleEditorInput(code) {
      if (this.editType == "change") {
        this.$set(this.slotParams.events, "change", this.formatCode(code));
      } else if (this.editType == "blur") {
        this.$set(this.slotParams.events, "blur", this.formatCode(code));
      } else if (this.editType == "focus") {
        this.$set(this.slotParams.events, "focus", this.formatCode(code));
      } else if (this.editType == "defaultTime") {
        this.$set(this.slotParams, "defaultTime", this.formatCode(code));
        this.defaultTime = this.formatCode(code);
      } else if (this.editType == "pickerOptions") {
        this.$set(this.slotParams, "pickerOptions", this.formatCode(code));
      } else if (this.editType == "editDisabledCode") {
        this.$set(
          this.slotParams.events,
          "disabledCode",
          this.formatCode(code)
        );
      }
    },
    e_close() {
      this.$emit("close");
    },
    init(slotParams) {
      this.slotParams = JSON.parse(JSON.stringify(slotParams));
      if (!this.slotParams.pickerOptions) {
        this.slotParams.pickerOptions = {};
      }
      if (!this.slotParams.events) {
        this.slotParams.events = {};
      }
      if (this.slotParams.pickerOptions.selectableRange) {
        this.slotParams.pickerOptions.selectableRange =
          this.slotParams.pickerOptions.selectableRange.split("-");
      }
      if (this.slotParams.pickerOptions.step) {
        this.slotParams.pickerOptions.step =
          this.slotParams.pickerOptions.step.split(":")[1];
      }
      this.showLog = true;
      this.$refs.KevinLog.isFullScreen = true;
    },
    save() {
      if (
        this.slotParams.pickerOptions.selectableRange &&
        this.slotParams.pickerOptions.selectableRange != "-"
      ) {
        this.slotParams.pickerOptions.selectableRange =
          this.slotParams.pickerOptions.selectableRange.join("-");
      }
      if (this.slotParams.pickerOptions.step) {
        this.slotParams.pickerOptions.step = `00:${this.slotParams.pickerOptions.step}`;
      }
      this.$emit("save", this.slotParams);
    },
  },
};
</script>

<style scoped lang="scss">
.b_b_container {
  width: 100%;
  display: flex;
  flex-direction: row;

  .b_b_c_left {
    width: 50%;
  }

  .b_b_c_right {
    flex: 1;
    margin-left: 0.7rem;
  }
}
</style>
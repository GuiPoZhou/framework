<template>
  <widgetEditContainer>
    <el-form
      slot="wecLeft"
      :model="editParams"
      ref="editParams"
      label-width="130px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-divider>输入框基本属性</el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="输入框标题"
            prop="title"
            :rules="[
              { required: true, message: '请输入输入框标题', trigger: 'blur' },
            ]"
          >
            <el-input v-model="editParams.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入框类型" prop="type">
            <el-select v-model="editParams.type">
              <el-option label="普通" value="text"></el-option>
              <el-option label="文本域" value="textarea"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="占据的列数" prop="colSpan">
            <el-input-number
              v-model="editParams.colSpan"
              :min="4"
              :max="24"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最大输入长度" prop="maxlength">
            <el-input-number
              v-model="editParams.maxlength"
              :min="1"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="尺寸" prop="size">
            <el-select v-model="editParams.size">
              <el-option label="默认" value="-"></el-option>
              <el-option label="中等" value="medium"></el-option>
              <el-option label="小型" value="small"></el-option>
              <el-option label="超小型" value="mini"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否自动获取焦点" prop="autofocus">
            <el-select v-model="editParams.autofocus">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.type == 'textarea'">
          <el-form-item label="输入框行数" prop="rows">
            <el-input-number
              v-model="editParams.rows"
              :min="2"
            ></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="8" v-if="editParams.type == 'textarea'">
          <el-form-item label="自适应高度" prop="autosize">
            <el-select v-model="editParams.autosize">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="主表名称" prop="tableName">
            <el-input v-model="editParams.tableName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="绑定值类型(vModelType)" prop="vModelType">
            <el-select v-model="editParams.vModelType">
              <el-option label="固定参数" value="fixed"></el-option>
              <el-option label="扩展参数" value="ext"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="占位文本(placeholder)" prop="placeholder">
            <el-input v-model="editParams.placeholder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否默认隐藏" prop="isHide">
            <el-select v-model="editParams.isHide">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否可清空" prop="clearable">
            <el-select v-model="editParams.clearable">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否默认禁用" prop="disabled">
            <el-select v-model="editParams.disabled">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否默认只读" prop="readonly">
            <el-select v-model="editParams.readonly">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否开启校验" prop="rules.isValidate">
            <el-select v-model="editParams.rules.isValidate">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.rules.isValidate">
          <el-form-item label="是否自定义校验" prop="rules.auto">
            <el-select v-model="editParams.rules.auto">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.rules.isValidate">
          <el-form-item label="表单验证触发方式" prop="rules.validateType">
            <el-select v-model="editParams.rules.validateType">
              <el-option label="Blur" value="blur"></el-option>
              <el-option label="Change" value="change"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.rules.isValidate && !editParams.rules.auto"
        >
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
        <el-col
          :span="8"
          v-if="editParams.rules.isValidate && editParams.rules.auto"
        >
          <el-form-item
            label="表单自定义校验脚本"
            prop="rules.autoEvents"
            :rules="[
              {
                required: true,
                message: '请输入表单自定义校验脚本',
                trigger: 'change',
              },
            ]"
          >
            <el-input v-model="editParams.rules.autoEvents" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editRulesAutoEvents"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>输入框扩展属性</el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否使用插槽" prop="slot.isSlot">
            <el-select v-model="editParams.slot.isSlot">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.slot.isSlot">
          <el-form-item label="插槽位置" prop="slot.slotPosition">
            <el-select v-model="editParams.slot.slotPosition">
              <el-option label="前置" value="prepend"></el-option>
              <el-option label="后置" value="append"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.slot.isSlot">
          <el-form-item
            label="插槽类型"
            prop="slot.slotType"
            :rules="[
              { required: true, message: '请选择插槽类型', trigger: 'change' },
            ]"
          >
            <el-select
              v-model="editParams.slot.slotType"
              @change="e_selInutSlot"
            >
              <el-option label="button" value="button"></el-option>
              <el-option label="icon" value="icon"></el-option>
              <el-option label="文字" value="text"></el-option>
              <el-option label="下拉框" value="select"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.slot.isSlot && editParams.slot.slotType == 'button'"
        >
          <el-form-item
            label="插槽按钮IconName"
            prop="slot.slotButtonIcon"
            :rules="[
              { required: true, message: '请选择按钮Icon', trigger: 'change' },
            ]"
          >
            <el-input v-model="editParams.slot.slotButtonIcon"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.slot.isSlot && editParams.slot.slotType == 'icon'"
        >
          <el-form-item
            label="插槽IconName"
            prop="slot.slotIconName"
            :rules="[
              { required: true, message: '请选择Icon', trigger: 'change' },
            ]"
          >
            <el-input v-model="editParams.slot.slotIconName"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.slot.isSlot && editParams.slot.slotType == 'text'"
        >
          <el-form-item
            label="插槽文字内容"
            prop="slot.slotSpanContent"
            :rules="[
              {
                required: true,
                message: '请输入插槽文字内容',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="editParams.slot.slotSpanContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.slot.isSlot && editParams.slot.slotType == 'button'"
        >
          <el-form-item
            label="插槽按钮事件"
            prop="slot.events.slotButtonEvents"
            :rules="[
              {
                required: true,
                message: '请编辑插槽按钮事件',
                trigger: 'change',
              },
            ]"
          >
            <el-input
              v-model="editParams.slot.events.slotButtonEvents"
              readonly
            >
              <el-button
                slot="append"
                size="small"
                @click="e_editSlotButtonEvents"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="editParams.slot.isSlot && editParams.slot.slotType == 'button'"
        >
          <el-form-item
            label="插槽按钮回调事件"
            prop="slot.events.callBackEvents"
          >
            <el-input v-model="editParams.slot.events.callBackEvents" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editSlotButtonCallBackEvents"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider v-if="editParams.slot.slotType == 'select'"
        >插槽下拉框配置</el-divider
      >
      <el-row v-if="editParams.slot.slotType == 'select'">
        <el-col :span="8">
          <el-form-item
            label="下拉框绑定值"
            prop="slot.vModel"
            :rules="[
              {
                required: true,
                message: '请输入下拉框绑定值',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="editParams.slot.vModel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="下拉框绑定值类型(vModelType)"
            prop="slot.vModelType"
            :rules="[
              {
                required: true,
                message: '请输入下拉框绑定值类型',
                trigger: 'change',
              },
            ]"
          >
            <el-select v-model="editParams.slot.vModelType">
              <el-option label="固定参数" value="fixed"></el-option>
              <el-option label="扩展参数" value="ext"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button
            type="primary"
            size="mini"
            @click="e_addSlotSelectData"
            style="margin-bottom: 0.7rem"
            >新增数据源</el-button
          >
          <el-table
            :data="editParams.slot.options.list"
            style="width: 100%"
            border
          >
            <el-table-column prop="label" label="标题(label)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.label"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="值(value)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="e_deleteSlotSelectData(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-divider v-if="editParams.slot.slotType == 'select'"
        >插槽下拉框事件配置</el-divider
      >
      <el-row>
        <el-col :span="12">
          <el-form-item label="Change" prop="slot.events.change">
            <el-input v-model="editParams.slot.events.change" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editSlotSelectChangeEvents('change')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>输入框事件</el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="隐藏脚本" prop="hideCode">
            <el-input v-model="editParams.hideCode" readonly>
              <el-button slot="append" size="small" @click="e_editHideCode()"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="禁用脚本" prop="events.disabledCode">
            <el-input v-model="editParams.events.disabledCode" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('disabledCode')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Blur" prop="events.blur">
            <el-input v-model="editParams.events.blur" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('blur')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Focus" prop="events.focus">
            <el-input v-model="editParams.events.focus" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('focus')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Change" prop="events.change">
            <el-input v-model="editParams.events.change" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('change')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editParams.clearable">
          <el-form-item label="Clear" prop="events.clear">
            <el-input v-model="editParams.events.clear" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('clear')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Input" prop="events.input">
            <el-input v-model="editParams.events.input" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('input')"
                >编辑</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="回车" prop="events.enter">
            <el-input v-model="editParams.events.enter" readonly>
              <el-button
                slot="append"
                size="small"
                @click="e_editInputEvents('enter')"
                >编辑</el-button
              >
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
        rules: {
          isValidate: false,
        },
        slot: {
          isSlot: false,
          slotPosition: "append",
          options: {
            list: [],
          },
          events:{}
        },
        events: {},
      },
      editType: "",
    };
  },
  methods: {
    setDbTable(params) {
      this.editParams.vModel = params.keyName;
      this.editParams.vModelType = params.type;
      this.editParams.tableName = params.tableName;
    },
    e_selDbTable() {
      this.$emit("selDBTable");
    },
    e_editSlotSelectChangeEvents() {
      this.editType = "slotSelectChangeEvents";
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.slot.events.change || 'console.log("")',
      });
    },
    e_editRulesAutoEvents() {
      this.editType = "rulesAutoEvnets";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.editParams.rules.autoEvents ||
          "//必须要判定每一种情况并且返回一个callback方法 console.log('ctx', ctx); console.log('_this', _this); console.log('widgetInfo', widgetInfo); console.log('rule', rule); console.log('callback', callback); return callback();",
      });
    },
    e_deleteSlotSelectData(index) {
      this.$confirm("确定删除选择的数据?").then(() => {
        this.editParams.slot.options.list.splice(index, 1);
      });
    },
    e_addSlotSelectData() {
      let params = {
        label: "选项",
        value: "选项",
      };
      this.editParams.slot.options.list.push(params);
    },
    e_selInutSlot() {
      if (this.editParams.slot.slotType == "select") {
        this.editParams.slot = {
          isSlot: true,
          slotType: "select",
          vModel: "slotvModel",
          vModelType: "ext",
          events:{},
          options: {
            list: [],
          },
        };
      } else if (this.editParams.slot.slotType == "button") {
        this.editParams.slot = {
          isSlot: true,
          slotType: "button",
          events: {},
        };
      }
      this.editParams = { ...this.editParams };
    },
    handleEditorInput(code) {
      if (this.editType == "slotButton") {
        this.editParams.slot.events.slotButtonEvents = this.formatCode(code);
      } else if (this.editType == "slotButtonCallBack") {
        this.editParams.slot.events.callBackEvents = this.formatCode(code);
      } else if (this.editType == "rulesAutoEvnets") {
        this.$set(this.editParams.rules, "autoEvents", this.formatCode(code));
      } else if (this.editType == "slotSelectChangeEvents") {
        this.$set(this.editParams.slot.events, "change", this.formatCode(code));
      } else if (this.editType == "hideCode") {
        this.$set(this.editParams, "hideCode", this.formatCode(code));
      } else {
        this.editParams.events[this.editType] = this.formatCode(code);
      }
      this.editParams = { ...this.editParams };
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
    e_editInputEvents(type) {
      this.editType = type;
      this.$refs.KevinEditors.changeEditor({
        value: this.editParams.events[type] || 'console.log("事件")',
      });
    },
    e_editSlotButtonCallBackEvents() {
      this.editType = "slotButtonCallBack";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.editParams.slot.events.callBackEvents ||
          'console.log("插槽按钮回调事件")',
      });
    },
    e_editSlotButtonEvents() {
      this.editType = "slotButton";
      this.$refs.KevinEditors.changeEditor({
        value:
          this.editParams.slot.events.slotButtonEvents ||
          'console.log("插槽按钮事件")',
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
      if (!this.editParams.slot.events) {
        this.editParams.slot.events = {};
      }
    },
  },
};
</script>

<style></style>
<template>
  <widgetEditContainer>
    <el-form slot="wecLeft" :model="editParams" label-position="top" ref="editParams" label-width="130px"
      class="demo-ruleForm">
      <el-col :span="12">
        <el-form-item label="日期框标题" prop="title" :rules="[{ required: true, message: '请输入日期框标题', trigger: 'blur' }]">
          <el-input v-model="editParams.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="占据的列数" prop="colSpan">
          <el-input-number v-model="editParams.colSpan" :min="4" :max="24"></el-input-number>
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
        <el-form-item label="绑定值(vModel)" prop="vModel" :rules="[{ required: true, message: '请输入绑定值', trigger: 'blur' }]">
          <el-input v-model="editParams.vModel"></el-input>
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
        <el-form-item label="占位文本(placeholder)" prop="placeholder">
          <el-input v-model="editParams.placeholder"></el-input>
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
        <el-form-item label="表单验证提示语" prop="rules.validateTitle"
          :rules="[{ required: true, message: '请输入表单验证提示语', trigger: 'blur' }]">
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
      <el-col :span="12">
        <el-form-item label="显示类型" prop="type">
          <el-select v-model="editParams.type" @change="e_selectType">
            <el-option label="date" value="date"></el-option>
            <el-option label="year" value="year"></el-option>
            <el-option label="month" value="month"></el-option>
            <el-option label="dates" value="dates"></el-option>
            <el-option label="months" value="months"></el-option>
            <el-option label="years" value="years"></el-option>
            <el-option label="week" value="week"></el-option>
            <el-option label="datetime" value="datetime"></el-option>
            <el-option label="datetimerange" value="datetimerange"></el-option>
            <el-option label="daterange" value="daterange"></el-option>
            <el-option label="monthrange" value="monthrange"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="显示日期格式" prop="format">
          <el-select v-model="editParams.format">
            <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
            <el-option label="yyyy-MM-dd HH:mm" value="yyyy-MM-dd HH:mm"></el-option>
            <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
            <el-option label="yyyy" value="yyyy"></el-option>
            <el-option label="yyyy 第 WW 周" value="yyyy 第 WW 周"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="绑定值格式" prop="valueFormat">
          <el-select v-model="editParams.valueFormat">
            <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
            <el-option label="yyyy-MM-dd HH:mm" value="yyyy-MM-dd HH:mm"></el-option>
            <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
            <el-option label="yyyy" value="yyyy"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12"
        v-if="editParams.type == 'datetimerange' || editParams.type == 'daterange' || editParams.type == 'monthrange'">
        <el-form-item label="选中日期后的默认具体时刻" prop="defaultTime">
          <el-input v-model="editParams.defaultTime" readonly>
            <el-button slot="append" @click="e_editdefaultTime">编辑</el-button>
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
        <el-form-item label="PickerOptionsCode" prop="pickerOptions">
          <el-input v-model="editParams.pickerOptions" readonly>
            <el-button slot="append" @click="e_editpickerOptions">编辑</el-button>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <KevinEditors slot="wecRight" ref="KevinEditors" @input="handleEditorInput" />
  </widgetEditContainer>
</template>
<script>
import widgetEditContainer from '../components/widgetEditContainer.vue'
import KevinEditors from '../../../../../../KevinEditor/index'
export default {
  components: {
    widgetEditContainer,
    KevinEditors
  },
  data() {
    return {
      showdefaultTime: false,
      editParams: {
        rules: {
          isValidate: false
        },
        events: {}
      },
      editType: "",
      defaultTime: '',
    }
  },

  methods: {
    e_selectType() {
      if (this.editParams.type == 'datetimerange' || this.editParams.type == 'daterange' || this.editParams.type == 'monthrange') {
        this.showdefaultTime = true
        this.editParams.defaultTime = this.defaultTime
      } else {
        this.showdefaultTime = false
        this.editParams.defaultTime = "(function statusForEdit() { return '-'; })();"
      }
    },
    e_editdefaultTime() {
      this.editType = 'defaultTime'
      this.$refs.KevinEditors.changeEditor({ value: this.editParams.defaultTime || "(function defaultTime() { var date = new Date(); var hour = date.getHours(); var minute = date.getMinutes(); var second = date.getSeconds(); let time = []; time.push('00:00:00'); time.push('23:59:59'); return time; })(); " });

    },
    e_editpickerOptions() {
      this.editType = 'pickerOptions'
      this.$refs.KevinEditors.changeEditor({ value: this.editParams.pickerOptions });
    },
    e_editChange() {
      this.editType = 'change'
      this.$refs.KevinEditors.changeEditor({ value: this.editParams.events.change });
    },
    formatCode(code) {
      // 去除开头和结尾的空白字符
      code = code.trim();

      // 在大括号前后添加空格
      code = code.replace(/\s*{\s*/g, ' { ').replace(/\s*}\s*/g, ' } ');

      // 在逗号前后添加空格
      // code = code.replace(/,(\S)/g, ', $1');

      // 返回格式化后的代码
      return code;
    },
    handleEditorInput(code) {
      if (this.editType == 'change') {
        this.$set(this.editParams.events, 'change', this.formatCode(code))
      } else if (this.editType == 'defaultTime') {
        this.$set(this.editParams, 'defaultTime', this.formatCode(code))
        this.defaultTime = this.formatCode(code)
      } else if (this.editType == 'pickerOptions') {
        this.$set(this.editParams, 'pickerOptions', this.formatCode(code))
      }
    },
    e_save() {
      this.$refs.editParams.validate(v => {
        if (v) {
          this.$emit('save', this.editParams)
        }
      })
    },
    init(widgetInfo) {
      this.editParams = widgetInfo
      if (!this.editParams.isHide) {
        this.editParams.isHide = false
      }
    }
  }
}
</script>


<style scoped lang="scss"></style>
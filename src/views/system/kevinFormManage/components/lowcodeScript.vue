<template>
  <div>
    <KevinDrawer :show="showDrawer" size="100%" :title="title">
      <template slot="topbuttons">
        <el-button type="primary" size="small" @click="e_save">保存</el-button>
        <el-button size="small" @click="close">关闭</el-button>
      </template>
      <widgetEditContainer leftWidth="50%">
        <template slot="wecLeft">
          <el-divider content-position="left">独立执行脚本</el-divider>
          <el-button
            size="mini"
            type="primary"
            style="margin-bottom: 0.4rem"
            @click="e_addAutoEvents"
            >新增独立执行脚本</el-button
          >
          <el-table :data="lowCodeInfo.autoEvents" style="width: 100%" border>
            <el-table-column prop="code" label="唯一标识"> </el-table-column>
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.title"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.remark"
                  type="textarea"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="编辑" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  style="margin-right: 0.4rem"
                  :type="
                    scope.$index == editIndex && editType == 'autoEvents'
                      ? 'warning'
                      : 'primary'
                  "
                  @click="e_editAutoEvents(scope)"
                  >编辑脚本</el-link
                >
                <el-link
                  type="danger"
                  :underline="false"
                  @click="e_delete('autoEvents', scope.$index)"
                  >移除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">回调型脚本</el-divider>
          <el-button
            size="mini"
            type="primary"
            style="margin-bottom: 0.4rem"
            @click="e_addmanuallyEvents"
            >新增回调型脚本</el-button
          >
          <el-table
            :data="lowCodeInfo.manuallyEvents"
            style="width: 100%"
            border
          >
            <el-table-column prop="code" label="唯一标识"> </el-table-column>
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.title"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-model="scope.row.remark"
                  type="textarea"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="编辑" align="center">
              <template slot-scope="scope">
               <el-link
                  :underline="false"
                  style="margin-right: 0.4rem"
                  :type="
                    scope.$index == editIndex && editType == 'manuallyEvents'
                      ? 'warning'
                      : 'primary'
                  "
                  @click="e_editManuallyEvents(scope)"
                  >编辑脚本</el-link
                >
                <el-link
                  type="danger"
                  :underline="false"
                  @click="e_delete('manuallyEvents', scope.$index)"
                  >移除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <KevinEditors
          slot="wecRight"
          ref="KevinEditors"
          @input="handleEditorInput"
        />
      </widgetEditContainer>
    </KevinDrawer>
  </div>
</template>
<script>
import KevinEditors from "@/components/KevinEditor/index";
import KevinDrawer from "@/components/KevinUi/KevinDrawer/kevindrawer";
import widgetEditContainer from "@/components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/widgetEditContainer.vue";

export default {
  components: {
    KevinEditors,
    KevinDrawer,
    widgetEditContainer,
  },
  data() {
    return {
      title: "",
      showDrawer: false,
      lowCodeId: "",
      lowCodeInfo: {
        autoEvents: [],
        manuallyEvents: [],
      },
      editType: "",
      editIndex: "",
    };
  },
  methods: {
    e_delete(type, index) {
      this.$confirm("确定要移除该脚本").then(() => {
        this.lowCodeInfo[type].splice(index, 1);
      });
    },
    e_editManuallyEvents(scope) {
      this.editType = "manuallyEvents";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.events || "console.log('上下文',ctx)",
      });
    },
    e_editAutoEvents(scope) {
      this.editType = "autoEvents";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.events || "console.log('上下文',ctx)",
      });
    },
    e_addmanuallyEvents() {
      this.$prompt("请输入脚本唯一code", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "test",
      }).then(({ value }) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(value)) {
          let labelList = this.lowCodeInfo.manuallyEvents.map((item) => {
            return item.code;
          });
          if (labelList.indexOf(value) == -1) {
            this.lowCodeInfo.manuallyEvents.push({
              code: value,
              remark: "",
              title: "",
              events: "console.log('上下文',ctx)",
            });
            this.$forceUpdate();
          } else {
            this.$message.error("请勿重复命名");
          }
        } else {
          this.$message.error("输入内容必须符合javascript对象key的命名规范");
        }
      });
    },
    e_addAutoEvents() {
      this.$prompt("请输入脚本唯一code", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "test",
      }).then(({ value }) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(value)) {
          let labelList = this.lowCodeInfo.autoEvents.map((item) => {
            return item.code;
          });
          if (labelList.indexOf(value) == -1) {
            this.lowCodeInfo.autoEvents.push({
              code: value,
              remark: "",
              title: "",
              events: "console.log('上下文',ctx)",
            });
            this.$forceUpdate();
          } else {
            this.$message.error("请勿重复命名");
          }
        } else {
          this.$message.error("输入内容必须符合javascript对象key的命名规范");
        }
      });
    },
    handleEditorInput(code) {
      if (this.editType == "autoEvents") {
        this.lowCodeInfo.autoEvents[this.editIndex].events =
          this.formatCode(code);
      } else if (this.editType == "manuallyEvents") {
        this.lowCodeInfo.manuallyEvents[this.editIndex].events =
          this.formatCode(code);
      }
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
    e_save() {
      this.$confirm("确定完成操作，保存内容？").then(() => {
        let config = this.lowCodeInfo;
        let formLayoutConfigStr = JSON.stringify(config);
        let resultStr = formLayoutConfigStr
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        let params = {
          id: this.lowCodeId,
          config: JSON.parse(resultStr),
        };
        this.$net(
          "/formLayout//v2/updateFormLayoutConfig",
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
      });
    },
    init(lowCodeId) {
      this.lowCodeId = lowCodeId;
      this.showDrawer = true;
      this.e_getWidgetInfo();
    },
    e_getWidgetInfo() {
      this.$net("/formLayout/v2/getFormLayoutConfig", "get", {
        id: this.lowCodeId,
      }).then((re) => {
        this.title = re.data.title;
        let formDataStr = re.data.configStr;
        let resultDataStr = formDataStr
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        let info = JSON.parse(resultDataStr);
        this.lowCodeInfo = info;
        if (!this.lowCodeInfo.autoEvents) {
          this.lowCodeInfo.autoEvents = [];
        }
        if (!this.lowCodeInfo.manuallyEvents) {
          this.lowCodeInfo.manuallyEvents = [];
        }
      });
    },
    close() {
      this.$confirm("关闭操作将不会保存你当前的变更，确定关闭？").then(() => {
        this.$emit("close");
      });
    },
  },
};
</script>

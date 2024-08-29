<template>
  <div>
    <bo-dialog
      :diaLogShow="showlog"
      :diaLogTitle="title"
      :fullScreen="fullScreen"
      diaLogWidth="60%"
      @close="e_close"
    >
      <template slot="bologbody">
        <el-table :data="tableData" border>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="模块名称" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.name == 'foundation'">基础模块</span>
              <span v-if="scope.row.name == 'generic'">通用模块</span>
              <span v-if="scope.row.name == 'project'">项目独立模块</span>
              <span v-if="scope.row.name == '复制表单'">复制表单</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="低码类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.remark == 'lowcode_form'">低码表单</span>
              <span v-if="scope.row.remark == 'lowcode_project'">低码插件</span>
              <span v-if="scope.row.remark == 'lowcode_script'">低码脚本</span>
            </template>
          </el-table-column>
          <el-table-column prop="codeKey" label="唯一键" align="center" />
          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="userName" label="最后上传人" align="center" />
          <el-table-column
            prop="updateTime"
            label="最后上传时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ addHoursAndFormatDate(scope.row.updateTime, 21) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="推送备注"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column label="操作" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.remark == 'lowcode_form'"
                size="small"
                @click="e_bidui(scope.row)"
                >比对</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="bologfooter">
        <el-button size="small" @click="e_close">关闭</el-button>
      </template>
    </bo-dialog>
    <codeBD
      :localSaveHost="localSaveHost"
      ref="codeBD"
      v-if="showcodeBD"
      @close="showcodeBD = false"
    />
  </div>
</template>

<script>
import codeBD from "./codeBD.vue";

import axios from "axios";
export default {
  components: {
    codeBD,
  },
  props: {
    projectModuleId: Number,
    localSaveHost: String,
  },
  data() {
    return {
      showcodeBD: false,
      showlog: false,
      title: "",
      fullScreen: true,
      mainTableData: {},
      tableData: [],
    };
  },
  methods: {
    e_bidui(row) {
      console.log("row", row);
      this.showcodeBD = true;
      this.$nextTick(() => {
        this.$refs.codeBD.init(this.mainTableData, row);
      });
    },
    init(data) {
      this.mainTableData = JSON.parse(JSON.stringify(data));
      console.log("data", data);
      this.showlog = true;
      this.fullScreen = false;
      this.title = `${data.title} 历史版本`;
      this.getFormVersion();
    },
    getFormVersion() {
      let params = {
        projectModuleId: this.projectModuleId,
        codeKey: this.mainTableData.codeKey,
      };
      axios
        .get(
          this.localSaveHost +
            "/open/boshland/getKevinList/getProjectFormVersion?projectModuleId=" +
            params.projectModuleId +
            "&codeKey=" +
            params.codeKey
        )
        .then((re) => {
          this.tableData = re.data.data;
        });
    },
    addHoursAndFormatDate(inputDateStr, hoursToAdd) {
      // 将输入日期字符串解析为 Date 对象
      const inputDate = new Date(inputDateStr);

      // 添加指定小时数
      inputDate.setHours(inputDate.getHours() + hoursToAdd);

      // 创建格式化日期字符串
      const formattedDate = inputDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      return formattedDate;
    },
    e_close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
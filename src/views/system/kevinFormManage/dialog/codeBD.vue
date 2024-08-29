<template>
  <bo-dialog
    :diaLogShow="showlog"
    diaLogTitle="低码表单在线比对"
    :fullScreen="true"
    diaLogWidth="60%"
    @close="e_close"
  >
    <template slot="bologbody">
      <div>
        <code-diff
          v-if="canshow"
          :old-string="old"
          :filename="oldFileName"
          :newFilename="newFileName"
          :new-string="newValue"
          language="javascript"
          output-format="side-by-side"
          :trim="true"
          theme="light"
          diffStyle="word"
        />
      </div>
    </template>
  </bo-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    localSaveHost: String,
  },
  data() {
    return {
      canshow: false,
      showlog: false,
      old: null,
      newValue: null,
      oldFileName: "",
      newFileName: "",
    };
  },
  methods: {
    init(row, oldRow) {
      this.oldFileName = `历史版本  ${oldRow.userName}:【${oldRow.reason}】`;

      let formDataStr = JSON.stringify(oldRow.config);
      let resultDataStr = formDataStr
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\\t/g, "")
        .replace(/\\r/g, "")
        .replace(/\\n/g, "");
      let info = JSON.parse(resultDataStr);
      let KevinJson = info.KevinJson;
      this.old = JSON.stringify(JSON.parse(JSON.stringify(KevinJson)), null, 2);
      this.showlog = true;
      this.fullScreen = true;
      this.e_getWidgetInfo(row);
    },
    async e_getWidgetInfo(row) {
      axios
        .get(
          `${this.localSaveHost}/open/boshland/getKevinList/getProjectFormInfo?codeKey=${row.codeKey}&projectId=${row.projectId}&projectModuleId=${row.projectModuleId}`
        )
        .then((re) => {
          console.log("re", re);
           this.newFileName = `最新提交版本  ${row.userName}:【${row.reason}】`;
          let result = re.data.data[0].config;
          let formDataStr = JSON.stringify(result);
          let resultDataStr = formDataStr
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/\\t/g, "")
            .replace(/\\r/g, "")
            .replace(/\\n/g, "");
          let info = JSON.parse(resultDataStr);
          let KevinJson = info.KevinJson;
          this.newValue = JSON.stringify(
            JSON.parse(JSON.stringify(KevinJson)),
            null,
            2
          );
          this.canshow = true;
        });
    },
    e_close() {
      this.$emit("close");
    },
  },
};
</script>

<style>

</style>
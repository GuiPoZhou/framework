<template>
  <KevinDrawer :show="showDrawer" title="表单组件树" size="30%" direction="ltr">
    <el-button
      slot="topbuttons"
      size="small"
      @click="close"
      style="margin-left: 3rem"
      >关闭</el-button
    >
    <div class="widgettreearea">
      <el-input placeholder="通过WIDGETID过滤" v-model="filterText" clearable>
      </el-input>
      <el-tree
        ref="widgetTreeRef"
        :data="widget"
        :props="treeProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
      >
        <template v-slot="{ data }">
          <span style="font-size: 1rem; color: #000; font-weight: 500">
            <span>{{ data.title }}</span>
            <el-link
              :underline="false"
              type="warning"
              style="margin-left: 2rem"
              @click="e_copyNodeWidgetId(data)"
              >{{ formatUUIDWithStars(data.WIDGETID) }}</el-link
            >
            <el-tag
              size="mini"
              v-if="data.vModelType && data.vModel"
              style="margin-left: 2rem"
              :type="data.vModelType == 'fixed' ? 'primary' : 'warning'"
              @click="e_copyVModel(data)"
              >{{
                data.vModelType == "fixed"
                  ? "固定字段" + "【" + data.vModel + "】"
                  : "扩展字段" + "【" + data.vModel + "】"
              }}</el-tag
            >
          </span>
        </template>
      </el-tree>
    </div>
  </KevinDrawer>
</template>

<script>
import KevinDrawer from "../../../../../KevinDrawer/kevindrawer.vue";
export default {
  components: {
    KevinDrawer,
  },
  data() {
    return {
      widget: [],
      showDrawer: false,
      treeProps: {
        label: "title", // 将 label 属性映射到 title
      },
      filterText: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.widgetTreeRef.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.WIDGETID.indexOf(value) !== -1;
    },
    e_copyVModel(data) {
      const textArea = document.createElement("textarea");
      textArea.value = data.vModel;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        const success = document.execCommand("copy");
        if (success) {
          this.$message.success("字段 key复制成功");
        } else {
          console.error("复制失败");
        }
      } catch (err) {
        console.error("复制失败", err);
      }

      document.body.removeChild(textArea);
    },
    e_copyNodeWidgetId(data) {
      const textArea = document.createElement("textarea");
      textArea.value = data.WIDGETID;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        const success = document.execCommand("copy");
        if (success) {
          this.$message.success("节点ID复制成功");
        } else {
          console.error("复制失败");
        }
      } catch (err) {
        console.error("复制失败", err);
      }

      document.body.removeChild(textArea);
    },
    close() {
      this.$emit("close");
    },
    init(widget) {
      this.showDrawer = true;
      this.widget = widget;
    },
    formatUUIDWithStars(inputString, maxLength = 14) {
      if (typeof inputString !== "string") {
        return inputString;
      }

      if (inputString.length <= maxLength) {
        return inputString;
      }

      const prefixLength = Math.ceil((maxLength - 4) / 2);
      const suffixLength = Math.floor((maxLength - 4) / 2);

      const prefix = inputString.substring(0, prefixLength);
      const suffix = inputString.substring(inputString.length - suffixLength);

      return prefix + "****" + suffix;
    },
  },
};
</script>

<style scoped lang="scss">
.widgettreearea {
  max-height: calc(100% - 2.2rem); /* 调整为适当的最大高度 */
  padding: 0.7rem;
  overflow-y: auto; /* 只在内容溢出时显示滚动条 */
  background-color: #fff;
  border-radius: 10px;
}
</style>
<template>
  <div>
    <el-card class="box-card statics">
      <!-- <div slot="header" class="clearfix">
      <span>满意度调查</span>
      <el-button
        @click="checkAll"
        style="float: right; color: #1e1e1e"
        size="mini"
        type="text"
        class="timeText"
      >
        <span class="isMore">历史记录</span>
      </el-button>
    </div> -->
      <div class="searchCenter bg-color">
        <div class="searchContent">
          <div class="checkReportStyle">
            <p>{{ templateName }}</p>
          </div>
          <div class="centerBtn">
            <el-button
              type="primary"
              class="btnStyle"
              size="small"
              @click="e_doquestionnaire"
              >参 与</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
    <questionnaire
      ref="questionnaire"
      v-if="showquestionnaire"
      @close="showquestionnaire = false"
    />
  </div>
</template>

<script>
import questionnaire from "./questionnaire/index.vue";
export default {
  components: {
    questionnaire,
  },
  data() {
    return {
      templateName: "满意度调查问卷",
      dateRange: "",
      showquestionnaire: false,
    };
  },
  props: {
    questionnaireInfo: {
      typeof: Object,
      default: () => {},
    },
  },
  methods: {
    e_doquestionnaire() {
      this.showquestionnaire = true;
      this.$nextTick(() => {
        this.$refs.questionnaire.init(this.questionnaireInfo);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btnStyle {
  width: 100px;
}

.rightStyle {
  width: 372px;

  .box-card:first-child {
    height: 260px;
  }

  .centerInput {
    margin-top: 10%;
  }
}

.text,
.clearfix {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.timeText {
  line-height: 12px;
  margin-left: auto;

  img {
    width: 12px;
    height: 12px;
  }
}

.centerBtn {
  margin-top: 15px;
  display: flex;
  justify-content: left;
  margin-left: 5%;
}

.checkReportStyle {
  margin-top: 5%;
  margin-left: 5%;
  padding-top: 5%;
  p {
    text-align: left;
    margin: 0 auto;
  }

  p:first-child {
    font-size: 16px;
    font-weight: bolder;
  }

  p:last-child {
    font-size: 12px;
    color: #909399;
  }
}

.box-card + .box-card {
  margin-top: 15px;
}
.imgPosition {
  position: relative;
  left: 40%;
}
</style>
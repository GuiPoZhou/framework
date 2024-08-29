<template>
  <div class="sys_flot_tools" @mouseenter="animateIn" @mouseleave="animateOut">
    <!-- 满意度调查 -->
    <div class="s_f_t_list">
      <el-popover placement="right-start" trigger="click" width="190">
        <myddc :questionnaireInfo="questionnaireInfo"/>
        <img
          slot="reference"
          class="sftl_icon"
          src="@/assets/images/manyidu.png"
          @click="e_showMYDPover"
          alt="满意度调查"
        />
      </el-popover>
    </div>
  </div>
</template>
  
  <script>
import myddc from "./components/myddc.vue";
export default {
  components: {
    myddc,
  },
  data() {
    return {
      shwoMYDPover: false,
      questionnaireInfo: {},
    };
  },
  mounted() {
    if(this.$store.state.system.systemInfo.extData.openDCWJ){
      this.e_getWJList();
    }
    
  },
  methods: {
    e_getWJList() {
      this.$net("/v1/entrustRemoteAgreement/list", "get", { sort: 1 }).then(
        (res) => {
          this.questionnaireInfo = res.data.list[0];
        }
      );
    },
    e_showMYDPover() {
      this.shwoMYDPover = true;
    },
    animateIn() {
      try {
        const element = this.$el.querySelector(".sys_flot_tools");
        element.style.right = "20px";
      } catch {}
    },
    animateOut() {
      // this.shwoMYDPover = false;
      // try {
      //   const element = this.$el.querySelector(".sys_flot_tools");
      //   element.style.right = "-50px";
      // } catch {}
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.sys_flot_tools {
  width: 56px;
  border-radius: 5px;
  padding: 5px 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08),
    0px 0px 0px 1px rgba(0, 0, 0, 0.04);
  background: #c6edff;
  background: -moz-linear-gradient(to left, #c6edff 0%, #a3c6ff 100%);
  background: -webkit-linear-gradient(to left, #c6edff 0%, #a3c6ff 100%);
  background: linear-gradient(to left, #c6edff 0%, #a3c6ff 100%);
  position: fixed;
  right: -50px;
  bottom: 80px;
  z-index: 100;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    right: 10px;
  }
  .s_f_t_list {
    width: 49px;
    height: 49px;
    border-radius: 5px;
    cursor: pointer;
    .sftl_icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
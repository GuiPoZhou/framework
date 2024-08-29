<template>
  <div>
    <KevinDrawer :show="showDrawer" size="100%" :title="title">
      <template slot="topbuttons">
        <el-button type="primary" size="small" @click="e_save">保存</el-button>
        <el-button size="small" @click="close">关闭</el-button>
      </template>
      <widgetEditContainer leftWidth="60%">
        <template slot="wecLeft">
          <el-divider content-position="left">主页面列表顶部按钮</el-divider>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.3rem"
            @click="e_addMainHomeButton"
            >新增按钮</el-button
          >
          <el-table
            :data="lowCodeInfo.mainHomeButtons"
            class="mainHomeButtons"
            ref="mainHomeButtons"
            style="width: 100%"
            border
            row-key="id"
          >
            <el-table-column label="效果展示" align="center">
              <template slot-scope="scope">
                <el-button
                  :type="scope.row.type"
                  :size="scope.row.size"
                  @click="$message.success('事件效果请移步功能页面')"
                  >{{ scope.row.label }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="label" label="按钮名称">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  size="mini"
                  v-model="scope.row.label"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="按钮类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" size="mini">
                  <el-option label="默认按钮" value="-"></el-option>
                  <el-option label="主要按钮" value="primary"></el-option>
                  <el-option label="成功按钮" value="success"></el-option>
                  <el-option label="信息按钮" value="info"></el-option>
                  <el-option label="警告按钮" value="warning"></el-option>
                  <el-option label="危险按钮" value="danger"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="按钮尺寸">
              <template slot-scope="scope">
                <el-select v-model="scope.row.size" size="mini">
                  <el-option label="中等按钮" value="medium"></el-option>
                  <el-option label="小型按钮" value="small"></el-option>
                  <el-option label="超小按钮" value="mini"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注说明" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="perm" label="权限标识">
              <template slot-scope="scope">
                <div class="perm_area">
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="click"
                    :content="scope.row.perm"
                  >
                    <el-input
                      size="mini"
                      slot="reference"
                      type="text"
                      v-model="scope.row.perm"
                    ></el-input>
                  </el-popover>
                  <el-button
                    size="mini"
                    class="p_a_button"
                    type="text"
                    @click="e_editMainButtonPerm(scope)"
                    >选择</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态脚本" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainHomeButtonStatusEvents' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editMainHomeButtonStatusEvents(scope)"
                  >编辑事件</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="编辑" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainHomeButtonEvents' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editMainHomeButtonEvents(scope)"
                  >编辑事件</el-link
                >
                <el-link
                  :underline="false"
                  type="primary"
                  @click="e_deleteMainHomeButton(scope.$index)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">主页面列表操作按钮</el-divider>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.3rem"
            @click="e_addMainTableButton"
            >新增按钮</el-button
          >
          <el-table
            :data="lowCodeInfo.mainTableButtons"
            style="width: 100%"
            border
            row-key="id"
            class="mainTableButtons"
            ref="mainTableButtons"
          >
            <el-table-column prop="label" label="按钮名称">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  type="text"
                  v-model="scope.row.label"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="perm" label="权限标识">
              <template slot-scope="scope">
                <div class="perm_area">
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="click"
                    :content="scope.row.perm"
                  >
                    <el-input
                      size="mini"
                      slot="reference"
                      type="text"
                      v-model="scope.row.perm"
                    ></el-input>
                  </el-popover>
                  <el-button
                    size="mini"
                    class="p_a_button"
                    type="text"
                    @click="e_editMainTablePerm(scope)"
                    >选择</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注说明" align="center">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="禁用脚本" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainTableStatusCode' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editMainTableStatusCode(scope)"
                  >编辑脚本</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="条件显示脚本" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainTableDisableCode' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editMainTableDisableCode(scope)"
                  >编辑脚本</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="点击事件" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainTableButtonEvents' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editMainTableButtonEvents(scope)"
                  >编辑事件</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  type="primary"
                  @click="e_deleteMainTableButton(scope.$index)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">动态列表行内插槽</el-divider>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.3rem"
            @click="e_addMainTableSlotRender"
            >新增</el-button
          >
          <el-table
            :data="lowCodeInfo.mainTableSlotRender"
            style="width: 100%"
            border
          >
            <el-table-column
              prop="slotName"
              label="插槽名称(即动态列表的返回的key)"
              align="center"
            >
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.slotName"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注说明" align="center">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="renderType" label="渲染类型" align="center">
              <template slot-scope="scope">
                <el-select
                  size="mini"
                  v-model="scope.row.renderType"
                  placeholder="请选择"
                >
                  <el-option label="文本" value="span"> </el-option>
                  <el-option label="按钮" value="elLink"> </el-option>
                </el-select>
                <el-button
                  v-if="scope.row.renderType"
                  type="text"
                  style="margin-left: 0.7rem"
                  @click="e_configTableSlotRender(scope)"
                  >配置项</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="e_deleteMainTableSlortRender(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">Kevin渲染引擎</el-divider>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.3rem"
            @click="e_addEngine"
            >新增表单</el-button
          >
          <template>
            <el-table :data="lowCodeInfo.engineList" style="width: 100%" border>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div style="padding: 0.5rem">
                    <el-button
                      style="margin-bottom: 0.5rem"
                      size="mini"
                      type="warning"
                      @click="e_addEngineCallback(scope.$index)"
                      >新增回调事件</el-button
                    >
                    <el-table
                      :data="scope.row.callback"
                      style="width: 100%"
                      border
                    >
                      <el-table-column
                        prop="label"
                        label="回调事件名称"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        prop="remark"
                        label="备注"
                        align="center"
                      >
                        <template slot-scope="childScope">
                          <el-input
                            v-model="childScope.row.remark"
                            size="mini"
                            placeholder="准确的备注便于查找"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="回调事件" align="center">
                        <template slot-scope="childScope">
                          <el-link
                            :underline="false"
                            type="primary"
                            @click="
                              e_editEngineCallback(scope.$index, childScope)
                            "
                            >编辑</el-link
                          >
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="childScope">
                          <el-button
                            type="text"
                            @click="
                              e_deleteEngineCallback(scope, childScope.$index)
                            "
                            >删除</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="表单名称"> </el-table-column>
              <el-table-column prop="codeKey" label="表单唯一键">
              </el-table-column>
              <el-table-column prop="dialogSize" label="弹框尺寸">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.dialogSize"
                    placeholder="请选择"
                  >
                    <el-option label="大型弹框" value="max"> </el-option>
                    <el-option label="小型弹框" value="mini"> </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.remark"> </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="e_deleteEngine(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-divider content-position="left">独立的代码片段</el-divider>
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 0.3rem"
            @click="e_addBusinessCode"
            >新增片段</el-button
          >
          <el-table
            :data="businessCodeList"
            style="width: 100%"
            border
            row-key="id"
            class="mainDialogBottomButtons"
            ref="mainDialogBottomButtons"
          >
            <el-table-column prop="key" label="片段key" align="center">
            </el-table-column>
            <el-table-column prop="label" label="片段说明">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  type="text"
                  v-model="scope.row.info.remark"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="片段脚本" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  :type="
                    editType == 'MainDialogBottomButtonEvents' &&
                    editIndex == scope.$index
                      ? 'danger'
                      : 'primary'
                  "
                  @click="e_editBusinessCode(scope)"
                  >编辑脚本</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  type="primary"
                  @click="e_deleteBusinessCode(scope.$index)"
                  >删除</el-link
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
    <menuPerm
      ref="menuPerm"
      v-if="showmenuPerm"
      @close="showmenuPerm = false"
      @confirm="e_confirmPerm"
    />
    <tableSlotEdit
      ref="tableSlotEdit"
      v-if="showtableSlotEdit"
      @close="showtableSlotEdit = false"
      @save="e_saveTableSlotOptions"
    />
    <lowcodeList
      ref="lowcodeList"
      v-if="showlowcodeList"
      @close="showlowcodeList = false"
      @confirm="e_confirmLowCode"
    />
  </div>
</template>

<script>
import Sortable from "sortablejs";
import KevinEditors from "@/components/KevinEditor/index";
import KevinDrawer from "@/components/KevinUi/KevinDrawer/kevindrawer";
import widgetEditContainer from "@/components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/widgetEditContainer.vue";
import menuPerm from "./menuPerm.vue";
import tableSlotEdit from "./components/tableSlotEdit.vue";
import lowcodeList from "../../../../components/KevinUi/KevinForm/KevinDesign/components/widgetEdit/components/lowcodeList.vue";
export default {
  components: {
    Sortable,
    KevinEditors,
    KevinDrawer,
    widgetEditContainer,
    menuPerm,
    tableSlotEdit,
    lowcodeList,
  },
  data() {
    return {
      showlowcodeList: false,
      showtableSlotEdit: false,
      showmenuPerm: false,
      title: "",
      showDrawer: false,
      lowCodeId: "",
      lowCodeInfo: {
        mainHomeButtons: [],
        mainTableButtons: [],
        mainDialogBottomButtons: [],
        mainTableSlotRender: [],
        engineList: [],
        businessCode: {},
      },
      businessCodeList: [],
      editType: "",
      editIndex: -1,
      childEditIndex: -1,
    };
  },
  mounted() {},
  methods: {
    e_deleteEngineCallback(scope, index) {
      this.$confirm("确定删除该表单下的回调事件监听？").then(() => {
        scope.row.callback.splice(index, 1);
      });
    },
    e_deleteEngine(index) {
      this.$confirm("确定删除该表单，删除后将无法被调用？").then(() => {
        this.lowCodeInfo.engineList.splice(index, 1);
      });
    },
    e_editEngineCallback(parentIndex, childScope) {
      this.editIndex = parentIndex;
      this.editType = "editEngineCallback";
      this.childEditIndex = childScope.$index;
      this.$refs.KevinEditors.changeEditor({
        value: childScope.row.events || 'console.log("回调事件",ctx,data)',
      });
    },
    e_addEngineCallback(parentIndex) {
      this.$prompt("请输入回调事件Key名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "test",
      }).then(({ value }) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(value)) {
          let labelList = this.lowCodeInfo.engineList[parentIndex].callback.map(
            (item) => {
              return item.label;
            }
          );
          if (labelList.indexOf(value) == -1) {
            let pushParams = {
              label: value,
              remark: "",
              events: 'console.log("回调事件",ctx,data)',
            };
            this.lowCodeInfo.engineList[parentIndex].callback.push(pushParams);
            this.$forceUpdate();
          } else {
            this.$message.error(`${value}回调事件已存在`);
          }
        } else {
          this.$message.error("输入内容必须符合javascript对象key的命名规范");
        }
      });
    },
    e_confirmLowCode(info) {
      let hanveList = this.lowCodeInfo.engineList.filter((item) => {
        return item.codeKey == info.id;
      });
      if (hanveList.length > 0) {
        this.$message.error("该表单已被添加");
        return;
      }
      let params = {
        title: info.title,
        codeKey: info.id,
        canShow: false,
        remark: "",
        callback: [
          {
            label: "close",
            events:
              "console.log('回调事件', ctx, data);kevinEngine.canShow = false;",
            remark: "关闭回调事件",
          },
        ],
      };
      this.lowCodeInfo.engineList.push(params);
      this.showlowcodeList = false;
    },
    e_addEngine() {
      this.showlowcodeList = true;
      this.$nextTick(() => {
        this.$refs.lowcodeList.init();
      });
    },
    e_saveTableSlotOptions(params) {
      this.showtableSlotEdit = false;
      // this.lowCodeInfo.mainTableSlotRender[this.editIndex] =JSON.parse(JSON.stringify(params))
      let info = this.lowCodeInfo.mainTableSlotRender[this.editIndex];
      info.renderOptions = params.renderOptions;
      this.$set(this.lowCodeInfo.mainTableSlotRender, this.editIndex, info);
    },
    e_configTableSlotRender(scope) {
      console.log("scope", scope);
      this.editIndex = scope.$index;
      this.showtableSlotEdit = true;
      this.$nextTick(() => {
        this.$refs.tableSlotEdit.init(JSON.parse(JSON.stringify(scope.row)));
      });
    },
    e_deleteMainTableSlortRender(index) {
      this.$confirm("确定删除该条动态列表插槽配置").then(() => {
        this.lowCodeInfo.mainTableSlotRender.splice(index, 1);
      });
    },
    e_addMainTableSlotRender() {
      let params = {
        slotName: "动态列表列的key",
        remark: "",
        renderType: "",
        renderOptions: {
          events: {},
        },
      };
      this.lowCodeInfo.mainTableSlotRender.push(params);
    },
    e_confirmPerm(perm) {
      console.log("perm", perm);
      this.showmenuPerm = false;
      if (this.editType == "editMainButtonPerm") {
        let obj = this.lowCodeInfo.mainHomeButtons[this.editIndex];
        obj.perm = perm;
        this.$set(this.lowCodeInfo.mainHomeButtons, this.editIndex, obj);
      } else if (this.editType == "editMainTablePerm") {
        let obj = this.lowCodeInfo.mainTableButtons[this.editIndex];
        obj.perm = perm;
        this.$set(this.lowCodeInfo.mainTableButtons, this.editIndex, obj);
      }
    },
    e_editMainTablePerm(scope) {
      this.editIndex = scope.$index;
      this.editType = "editMainTablePerm";
      this.showmenuPerm = true;
      this.$nextTick(() => {
        this.$refs.menuPerm.init();
      });
    },
    e_editMainButtonPerm(scope) {
      this.editIndex = scope.$index;
      this.editType = "editMainButtonPerm";
      this.showmenuPerm = true;
      this.$nextTick(() => {
        this.$refs.menuPerm.init();
      });
    },
    rowDropmainHomeButtons() {
      const that = this;
      const tbody = document.querySelector(
        ".mainHomeButtons .el-table__body-wrapper tbody"
      );

      new Sortable(tbody, {
        animation: 150, //定义排序动画的时间  单位是ms
        ghostClass: "blue-background-class", //drop placeholder的css类名  可以不设置
        //开始拖拽
        onStart: function (e) {
          e.oldIndex; // 父元素索引
        },
        //结束拖拽
        onEnd: function (obj) {
          const list = JSON.parse(
            JSON.stringify(that.lowCodeInfo.mainHomeButtons)
          );
          that.$set(that.lowCodeInfo, "mainHomeButtons", []);
          const temp = list.splice(obj.oldIndex, 1)[0];
          list.splice(obj.newIndex, 0, temp);
          that.$nextTick(() => {
            that.$set(that.lowCodeInfo, "mainHomeButtons", list);
            that.$refs.mainHomeButtons.doLayout();
          });
          that.editType = "";
          that.editIndex = -1;
          that.$refs.KevinEditors.changeEditor({ value: "" });
        },
      });
    },
    rowDropmainTableButtons() {
      const that = this;
      const tbody = document.querySelector(
        ".mainTableButtons .el-table__body-wrapper tbody"
      );

      new Sortable(tbody, {
        animation: 150, //定义排序动画的时间  单位是ms
        ghostClass: "blue-background-class", //drop placeholder的css类名  可以不设置
        //开始拖拽
        onStart: function (e) {
          e.oldIndex; // 父元素索引
        },
        //结束拖拽
        onEnd: function (obj) {
          const list = JSON.parse(
            JSON.stringify(that.lowCodeInfo.mainTableButtons)
          );
          that.$set(that.lowCodeInfo, "mainTableButtons", []);
          const temp = list.splice(obj.oldIndex, 1)[0];
          list.splice(obj.newIndex, 0, temp);
          that.$nextTick(() => {
            that.$set(that.lowCodeInfo, "mainTableButtons", list);
            that.$refs.mainTableButtons.doLayout();
          });
          that.editType = "";
          that.editIndex = -1;
          that.$refs.KevinEditors.changeEditor({ value: "" });
        },
      });
    },
    rowDropmainDialogBottomButtons() {
      const that = this;
      const tbody = document.querySelector(
        ".mainDialogBottomButtons .el-table__body-wrapper tbody"
      );

      new Sortable(tbody, {
        animation: 150, //定义排序动画的时间  单位是ms
        ghostClass: "blue-background-class", //drop placeholder的css类名  可以不设置
        //开始拖拽
        onStart: function (e) {
          e.oldIndex; // 父元素索引
        },
        //结束拖拽
        onEnd: function (obj) {
          const list = JSON.parse(
            JSON.stringify(that.lowCodeInfo.mainDialogBottomButtons)
          );
          that.$set(that.lowCodeInfo, "mainDialogBottomButtons", []);
          const temp = list.splice(obj.oldIndex, 1)[0];
          list.splice(obj.newIndex, 0, temp);
          that.$nextTick(() => {
            that.$set(that.lowCodeInfo, "mainDialogBottomButtons", list);
            that.$refs.mainDialogBottomButtons.doLayout();
          });
          that.editType = "";
          that.editIndex = -1;
          that.$refs.KevinEditors.changeEditor({ value: "" });
        },
      });
    },
    e_save() {
      this.$confirm("确定完成操作，保存内容？").then(() => {
        if (this.businessCodeList.length != 0) {
          let businessCode = {};
          this.businessCodeList.forEach((item) => {
            businessCode[item.key] = {};
            for (let i in item.info) {
              businessCode[item.key][i] = item.info[i];
            }
          });
          this.lowCodeInfo.businessCode = businessCode;
        } else {
          this.lowCodeInfo.businessCode = {};
        }
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
    e_addBusinessCode() {
      this.$prompt("请输入片段Key名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "test",
      }).then(({ value }) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(value)) {
          let labelList = this.businessCodeList.map((item) => {
            return item.key;
          });
          if (labelList.indexOf(value) == -1) {
            this.businessCodeList.push({
              key: value,
              info: { remark: "", events: "console.log('上下文',ctx)" },
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
    e_deleteBusinessCode(index) {
      this.$confirm("确定该片段?").then(() => {
        this.businessCodeList.splice(index, 1);
      });
    },
    e_deleteMainDialogButton(index) {
      this.$confirm("确定删除该按钮?").then(() => {
        this.lowCodeInfo.mainDialogBottomButtons.splice(index, 1);
      });
    },
    e_deleteMainTableButton(index) {
      this.$confirm("确定删除该按钮?").then(() => {
        this.lowCodeInfo.mainTableButtons.splice(index, 1);
      });
    },

    e_editBusinessCode(scope) {
      this.editIndex = scope.$index;
      this.editType = "businessCode";
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.info.events || "console.log('上下文',ctx)",
      });
    },
    e_editMainDialogButtonEvents(scope) {
      this.editIndex = scope.$index;
      this.editType = "MainDialogBottomButtonEvents";
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.events || "console.log('上下文',that)",
      });
    },
    e_editMainDialogBottomButtonStatusCode(scope) {
      this.editIndex = scope.$index;
      this.editType = "MainDialogBottomButtonStatus";
      this.$refs.KevinEditors.changeEditor({
        value:
          scope.row.status ||
          "var that = this; (function bottomButtonStatus() { return true; })(); ",
      });
    },
    e_deleteMainHomeButton(index) {
      this.$confirm("确定删除该按钮?").then(() => {
        this.lowCodeInfo.mainHomeButtons.splice(index, 1);
      });
    },
    e_editMainHomeButtonStatusEvents(scope) {
      this.editType = "MainHomeButtonStatusEvents";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.statusEvents || "return true",
      });
    },
    e_editMainHomeButtonEvents(scope) {
      this.editType = "MainHomeButtonEvents";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({
        value: scope.row.events || "console.log('project按钮')",
      });
    },
    e_editMainTableStatusCode(scope) {
      this.editType = "MainTableStatusCode";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({ value: scope.row.statusCode });
    },
    e_editMainTableDisableCode(scope) {
      this.editType = "MainTableDisableCode";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({ value: scope.row.disabled });
    },

    e_editMainTableButtonEvents(scope) {
      this.editType = "MainTableButtonEvents";
      this.editIndex = scope.$index;
      this.$refs.KevinEditors.changeEditor({ value: scope.row.clickEvents });
    },

    handleEditorInput(code) {
      if (this.editType == "MainHomeButtonEvents") {
        this.lowCodeInfo.mainHomeButtons[this.editIndex].events =
          this.formatCode(code);
      } else if (this.editType == "MainHomeButtonStatusEvents") {
        this.lowCodeInfo.mainHomeButtons[this.editIndex].statusEvents =
          this.formatCode(code);
      } else if (this.editType == "MainTableStatusCode") {
        this.lowCodeInfo.mainTableButtons[this.editIndex].statusCode =
          this.formatCode(code);
      } else if (this.editType == "MainTableDisableCode") {
        this.lowCodeInfo.mainTableButtons[this.editIndex].disabled =
          this.formatCode(code);
      } else if (this.editType == "MainTableButtonEvents") {
        this.lowCodeInfo.mainTableButtons[this.editIndex].clickEvents =
          this.formatCode(code);
      } else if (this.editType == "MainDialogBottomButtonStatus") {
        this.lowCodeInfo.mainDialogBottomButtons[this.editIndex].status =
          this.formatCode(code);
      } else if (this.editType == "MainDialogBottomButtonEvents") {
        this.lowCodeInfo.mainDialogBottomButtons[this.editIndex].events =
          this.formatCode(code);
      } else if (this.editType == "businessCode") {
        this.businessCodeList[this.editIndex].info.events =
          this.formatCode(code);
      } else if (this.editType == "editEngineCallback") {
        this.lowCodeInfo.engineList[this.editIndex].callback[
          this.childEditIndex
        ].events = this.formatCode(code);
      }
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
    e_addmainDialogBottomButtons() {
      let params = {
        label: "底部按钮",
        type: "primary",
        size: "small",
        status:
          "var that = this; (function bottomButtonStatus() { return true; })(); ",
        events: "console.log('上下文',that)",
      };
      this.lowCodeInfo.mainDialogBottomButtons.push(params);
      this.editType = "";
      this.editIndex = -1;
      this.$refs.KevinEditors.changeEditor({ value: "" });
    },
    e_addMainTableButton() {
      let params = {
        label: "行内按钮",
        perm: "",
        disabled: "return true;",
        clickEvents: "console.log('table行内按钮')",
      };
      this.lowCodeInfo.mainTableButtons.push(params);
      this.editType = "";
      this.editIndex = -1;
      this.$refs.KevinEditors.changeEditor({ value: "" });
    },
    e_addMainHomeButton() {
      let params = {
        label: "新增按钮",
        perm: "",
        type: "primary",
        size: "mini",
        statusEvents: "return true",
        events: "console.log('project按钮')",
      };
      this.lowCodeInfo.mainHomeButtons.push(params);
      (this.editType = ""), (this.editIndex = -1);
      this.$refs.KevinEditors.changeEditor({ value: "" });
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
        if (!this.lowCodeInfo.mainDialogBottomButtons) {
          this.lowCodeInfo.mainDialogBottomButtons = [];
        }
        if (!this.lowCodeInfo.mainTableSlotRender) {
          this.lowCodeInfo.mainTableSlotRender = [];
        }
        if (!this.lowCodeInfo.engineList) {
          this.lowCodeInfo.engineList = [];
        }
        if (!this.lowCodeInfo.businessCode) {
          this.businessCodeList = [];
        } else {
          let list = [];
          for (let key in this.lowCodeInfo.businessCode) {
            let obj = {
              key: key,
              info: this.lowCodeInfo.businessCode[key],
            };
            list.push(obj);
          }
          this.businessCodeList = list;
        }
        let _this = this;
        _this.$nextTick(() => {
          _this.rowDropmainHomeButtons();
          _this.rowDropmainTableButtons();
          _this.rowDropmainDialogBottomButtons();
        });
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

<style lang="scss" scoped>
/deep/.el-link {
  margin-right: 0.7rem;
}

/deep/.blue-background-class {
  background: #c6edff;
  background: -moz-linear-gradient(to right, #6d79ff 0%, #0e1438 100%);
  background: -webkit-linear-gradient(to right, #6d79ff 0%, #0e1438 100%);
  background: linear-gradient(to right, #6d79ff 0%, #0e1438 100%);
  background-size: 200% 100%;
  /* 更宽的背景尺寸，用于实现颜色移动效果 */
  animation: waveAnimation 5s linear infinite;
}

@keyframes waveAnimation {
  0% {
    background-position: 0 50%;
    /* 初始位置 */
  }

  50% {
    background-position: 100% 50%;
    /* 中间位置 */
  }

  100% {
    background-position: 0 50%;
    /* 返回初始位置 */
  }
}

.perm_area {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .p_a_button {
    margin-left: 0.7rem;
  }
}
</style>
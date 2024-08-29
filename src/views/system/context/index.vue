<template>
  <div class="app-container">
    <div class="a-c-bottom">
      <el-form :model="sysContext" :rules="rules" ref="sysContextForm" label-width="140px">
        <el-form-item label="启用样品领用" prop="sysContext">
          <el-radio-group
              v-model="sysContext.enableSampleCollect"
              @change="sampleCollectChange"
          >
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="启用ELN" prop="sysContext">
          <el-radio-group v-model="sysContext.enableEln" @change="elnChange">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="ELN数据同步" prop="sysContext">
          <el-button
              type="primary"
              size="mini"
              @click="e_doSync('/standard/v1/itemMethods/syncItemMethod')"
          >项目方法
          </el-button
          >
          <el-button
              type="primary"
              size="mini"
              @click="e_doSync('/resources/equipmentInstrument/syncEquipment')"
          >仪器信息
          </el-button
          >
        </el-form-item>
        <el-form-item label="ELN版本受控" prop="elnVersionControl">
          <el-radio-group v-model="sysContext.elnVersionControl" @change="elnChangeControlled">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="样品时效预警" prop="sysContext">
          <el-input v-model="sysContext.sampleAgingWarning" style="width:100px" size="mini"
                    @blur="e_changeSampleTime"></el-input>
          <span>小时</span>
        </el-form-item>
        <el-form-item label="送样样品规则" prop="sendSampleType">
          <el-radio-group v-model="sendSampleType" @change="e_changeSendSampleType">
            <el-radio :label="0">按样品</el-radio>
            <el-radio :label="1">按组瓶</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报告分配" prop="sysContext">
          <el-radio-group v-model="sysContext.enableReportAssignment" @change="e_changeenableReportAssignment">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
          <el-radio-group style="margin-left: 15px;" v-model="sysContext.reportCompileDetpAuthType"
                          @change="e_changeReport">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">按受理部门筛选</el-radio>
            <el-radio :label="2">按检测部门筛选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入库记录生成规则" prop="sampleStorageRecordRules">
          <el-radio-group v-model="sysContext.sampleStorageRecordRules" @change="e_changeenableWarehousingRecords">
            <el-radio :label="0">按委托</el-radio>
            <el-radio :label="1">按委托+类别</el-radio>
            <el-radio :label="2">按接样</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出库记录生成规则" prop="sampleOutRecordRules">
          <el-radio-group v-model="sysContext.sampleOutRecordRules" @change="e_changeenableOutRecordRules">
            <el-radio :label="0">按委托</el-radio>
            <el-radio :label="1">按委托+类别</el-radio>
            <el-radio :label="2">按领样</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="样品留样领用记录生成规则" prop="keepSampleReceiveRules" label-width="200px !important">
          <el-radio-group v-model="sysContext.keepSampleReceiveRules" @change="e_changekeepSampleReceiveRules">
            <el-radio :label="0">按委托</el-radio>
            <el-radio :label="1">按委托+类别</el-radio>
            <el-radio :label="2">按领样</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务分配配置" prop="taskAssignmentRules">
          <el-radio-group v-model="sysContext.taskAssignmentRules" @change="e_changetaskAssignmentRules">
            <el-radio :label="0">委托分配</el-radio>
            <el-radio :label="1">接样分配</el-radio>
            <el-radio :label="2">领用分配</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动分配" prop="autoAssignment">
          <el-radio-group v-model="sysContext.autoAssignment" @change="e_changeautoAssignment">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动保存客商" prop="autoSaveCustomer">
          <el-radio-group v-model="sysContext.autoSaveCustomer" @change="e_changeautoSaveCustomer">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否加密报告PDF" prop="encryptPdf">
          <el-radio-group v-model="sysContext.encryptPdf" @change="e_screetPdf">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="加密报告PDF密码" v-if="sysContext.encryptPdf === 1" prop="encryptPdfPassword">
          <el-input :minlength="10" show-password v-model="sysContext.encryptPdfPassword" @blur="e_screetPdfPwd">
          </el-input>
        </el-form-item>
        <el-form-item label="编辑报告" prop="enableEditReport">
          <el-radio-group v-model="sysContext.enableEditReport" @change="e_changeenableEditReport">
            <el-radio :label="0">全部完成</el-radio>
            <el-radio :label="1">有完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用方法确认/验证配置" prop="enableMethodConfirm" label-width="200px !important">
          <el-radio-group v-model="sysContext.enableMethodConfirm" @change="e_changeenableMethodConfirm">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动接样" prop="autoSampleHandover">
          <el-radio-group v-model="sysContext.autoSampleHandover" @change="e_changeAutoSampleHandover">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动领样" prop="autoSampleReceive">
          <el-radio-group v-model="sysContext.autoSampleReceive" @change="e_changeAutoSampleReceive">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="样品处理减库存" prop="sampleProcessingDeductsInventory">
          <el-radio-group v-model="sysContext.sampleProcessingDeductsInventory" @change="e_changeDeductsInventory">
            <el-radio :label="0">审核完成</el-radio>
            <el-radio :label="1">处理确认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检测项目定价方式" prop="itemPriceMethod">
          <el-radio-group v-model="sysContext.itemPriceMethod" @change="e_changeItemPriceMethod">
            <el-radio :label="0">按项目方法定价</el-radio>
            <el-radio :label="1">按项目名称定价</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员能力验证" prop="personnelCapabilityVerify">
          <el-radio-group v-model="sysContext.personnelCapabilityVerify" @change="e_changePersonnelCapabilityVerify">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="远程报检是否启用报价" prop="remoteEntrustEnabledQuotation">
          <el-radio-group v-model="sysContext.remoteEntrustEnabledQuotation" @change="e_changeRemoteEntrustEnabledQuotation">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="远程报检是否启用检测方案" prop="remoteEntrustEnabledDetectionScheme">
          <el-radio-group v-model="sysContext.remoteEntrustEnabledDetectionScheme" @change="e_changeRemoteEntrustEnabledDetectionScheme">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检测报告名称配置" prop="reportInsertName">
          <el-select v-model="sysContext.reportInsertName" style="width: 400px" multiple filterable allow-create>
            <el-option v-for="item in reportOption"
                       :label="item.label"
                       :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="small" @click="e_changeReportInsertName">更新报告名称</el-button>
        </el-form-item>
        <el-divider content-position="left">物料管理</el-divider>
        <el-form-item label="采购预算最大值" prop="sysContext">
          <el-input v-model="sysContext.materialBuyBudget" style="width:100px" size="mini"
                    @blur="e_changeMaterialBuyBudget"></el-input>
          <span>元</span>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getContext,
  setEnableSampleCollect,
  setEnableEln,
  setElnVersionControlled
} from '@/api/system/context'

export default {
  name: 'context',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入加密密码'));
      } else if (value.length < 10) {
        callback(new Error('长度不得小于10位'))
      } else {
        callback();
      }
    };
    var validateReportName = (rule,value,callback) => {
      let params = '已选配置：' + value.join('+')
      if (value.length === 0) {
        params = '已选配置：时间戳 + 报告编号'
      }
      callback(new Error(params))
    }
    return {
      sysContext: {
        // 是否启用样品领用
        enableSampleCollect: '0',
        // 是否启用ELN
        enableEln: '0',
        // 是否启用ELN版本受控
        elnVersionControl: 0,
        sampleAgingWarning: 0,
        enableReportAssignment: 0,
        reportCompileDetpAuthType: null,
        sampleStorageRecordRules: 0,
        sampleOutRecordRules: 0,
        keepSampleReceiveRulesc: 0,
        taskAssignmentRules: 0,
        autoAssignment: 0,
        autoSaveCustomer: 0,
        enableEditReport: 0,
        materialBuyBudget: 0,
        enableMethodConfirm: 0,
        autoSampleHandover: 0,
        autoSampleReceive: 0,
        sampleProcessingDeductsInventory: 0,
        itemPriceMethod: 0,
        encryptPdf: 0,
        encryptPdfPassword: '',
        personnelCapabilityVerify:0,
        remoteEntrustEnabledQuotation:0,
        remoteEntrustEnabledDetectionScheme:0,
      },
      reportOption: [
        {label: '报告编号',value: '报告编号'},
        {label: '样品名称', value: '样品名称'},
        {label: '样品编号', value: '样品编号'},
        {label: '产品类型', value: '产品类型'},
        {label: '项目名称', value: '项目名称'},
        {label: '时间戳', value: '时间戳'}
      ],
      sendSampleType: 0,
      rules: {
        encryptPdfPassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        reportInsertName: [
          {validator: validateReportName,trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.e_getZP()
    this.getList()
  },
  methods: {
    getList() {
      getContext().then((response) => {
        if (!response.data.reportInsertName) {
          response.data.reportInsertName = '报告编号,时间戳'
        }
        this.sysContext = {
          enableSampleCollect: response.data.enableSampleCollect,
          enableEln: response.data.enableEln,
          elnVersionControl: response.data.elnVersionControl || 0,
          sampleAgingWarning: response.data.sampleAgingWarning,
          materialBuyBudget: response.data.materialBuyBudget,
          enableReportAssignment: response.data.enableReportAssignment,
          reportCompileDetpAuthType: response.data.reportCompileDetpAuthType,
          sampleStorageRecordRules: response.data.sampleStorageRecordRules,
          sampleOutRecordRules: response.data.sampleOutRecordRules,
          keepSampleReceiveRules: response.data.keepSampleReceiveRules,
          taskAssignmentRules: response.data.taskAssignmentRules,
          autoAssignment: response.data.autoAssignment,
          autoSaveCustomer: response.data.autoSaveCustomer,
          enableEditReport: response.data.enableEditReport,
          enableMethodConfirm: response.data.enableMethodConfirm,
          autoSampleHandover: response.data.autoSampleHandover,
          autoSampleReceive: response.data.autoSampleReceive,
          sampleProcessingDeductsInventory: response.data.sampleProcessingDeductsInventory,
          itemPriceMethod: response.data.itemPriceMethod,
          remoteEntrustEnabledDetectionScheme: response.data.remoteEntrustEnabledDetectionScheme,
          remoteEntrustEnabledQuotation: response.data.remoteEntrustEnabledQuotation,
          personnelCapabilityVerify: response.data.personnelCapabilityVerify,
          encryptPdf: response.data.encryptPdf,
          encryptPdfPassword: response.data.encryptPdfPassword,
          reportInsertName: response.data.reportInsertName.split(',')
        }
        this.$store.commit("globalConfiguration/setGlobal", response.data);
      }).catch((err) => {
        this.sysContext = {
          enableSampleCollect: '0',
          enableEln: '0',
          sampleAgingWarning: "0",
          materialBuyBudget: "0",
          elnVersionControl: 0
        }
      })
    },
    e_changeautoSaveCustomer() {
      this.$net(`/system/context/autoSaveCustomer/${this.sysContext.autoSaveCustomer}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeenableEditReport() {
      this.$net(`/system/context/enableEditReport/${this.sysContext.enableEditReport}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeenableMethodConfirm() {
      this.$net(`/system/context/enableMethodConfirm/${this.sysContext.enableMethodConfirm}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeAutoSampleHandover () {
      this.$net(`/system/context/autoSampleHandover/${this.sysContext.autoSampleHandover}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeAutoSampleReceive () {
      this.$net(`/system/context/autoSampleReceive/${this.sysContext.autoSampleReceive}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeDeductsInventory () {
      this.$net(`/system/context/sampleProcessingDeductsInventory/${this.sysContext.sampleProcessingDeductsInventory}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeItemPriceMethod () {
      this.$confirm('切换定价方式将删除已维护的检测项目定价，确认切换定价方式吗？', '切换定价方式', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$net(`/system/context/itemPriceMethod/${this.sysContext.itemPriceMethod}`, 'put').then(re => {
          if (re.code == 200) {
            this.$message.success('修改成功')
            this.getList()
          } else {
            this.$message.error(re.msg)
          }
        })
      }).catch(() => {
        if (this.sysContext.itemPriceMethod == 0) {
          this.sysContext.itemPriceMethod = 1
        } else {
          this.sysContext.itemPriceMethod = 0
        }
        console.log(this.sysContext.itemPriceMethod)
        // this.sysContext.itemPriceMethod = this.sysContext.itemPriceMethod
      });
    },
    e_changePersonnelCapabilityVerify () {
      this.$net(`/system/context/setGlobalValue/personnelCapabilityVerify/${this.sysContext.personnelCapabilityVerify}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeRemoteEntrustEnabledDetectionScheme () {
      this.$net(`/system/context/setGlobalValue/remoteEntrustEnabledDetectionScheme/${this.sysContext.remoteEntrustEnabledDetectionScheme}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeRemoteEntrustEnabledQuotation () {
      this.$net(`/system/context/setGlobalValue/remoteEntrustEnabledQuotation/${this.sysContext.remoteEntrustEnabledQuotation}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    e_changeReportInsertName(){
      let params = this.sysContext.reportInsertName.join(',')
      if(!params) {
        params = '报告编号,时间戳'
      }
      this.$net(`/system/context/reportInsertName/${params}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
          this.getList()
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    /**
     * @author Coder
     * @date 2022/10/27
     * @des 开启关闭报告分配开关
     */
    e_changeenableReportAssignment() {
      this.$net(`/system/context/enableReportAssignment/${this.sysContext.enableReportAssignment}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    // 筛选任务分配
    e_changeReport() {
      this.$net(`/system/context/reportCompileDetpAuthType/${this.sysContext.reportCompileDetpAuthType}`, 'put').then(re => {
        if (re.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    // 样品时效预警
    e_changeSampleTime(e) {
      this.$net(`/system/context/sampleAgingWarning/${this.sysContext.sampleAgingWarning}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },

    // 采购预算（元）最大值
    e_changeMaterialBuyBudget(e) {
      this.$net(`/system/context/setGlobalValue/materialBuyBudget/${this.sysContext.materialBuyBudget}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    //修改送样样品规则
    e_changeSendSampleType() {
      this.$net(`/system/context/giveCode/${this.sendSampleType}`, 'put').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(re.msg)
        }
      })
    },
    //  获取是否显示样品规则
    e_getZP() {
      this.$net('/system/context/showGroupBottle', 'get').then(re => {
        this.sendSampleType = re.data
      })
    },
    /*
     *@author: 焦政
     *@date: 2021-10-18 14:11:45
     *@description:ELN数据同步
     */
    e_doSync(url) {
      this.$net(url, 'get').then((re) => {
        this.$message.success('数据已同步')
      })
    },
    // 是否启用样品领用操作
    sampleCollectChange() {
      setEnableSampleCollect(this.sysContext.enableSampleCollect).then(
          (response) => {
            if (response.code == 200) {
              this.msgSuccess(response.msg)
            }
          }
      )
    },
    // 是否启用ELN
    elnChange() {
      setEnableEln(this.sysContext.enableEln).then((response) => {
        if (response.code == 200) {
          this.msgSuccess(response.msg)
        }
      })
    },
    // 是否启用ELN版本受控
    elnChangeControlled() {
      setElnVersionControlled(this.sysContext.elnVersionControl).then((response) => {
        if (response.code == 200) {
          this.$message.success('修改成功')
        }
      })
    },
    // 入库记录生成规则
    e_changeenableWarehousingRecords() {
      this.$net(`/system/context/sampleStorageRecordRules/${this.sysContext.sampleStorageRecordRules}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    // 出库记录生成规则
    e_changeenableOutRecordRules() {
      this.$net(`/system/context/sampleOutRecordRules/${this.sysContext.sampleOutRecordRules}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    // 样品留样领用记录生成规则
    e_changekeepSampleReceiveRules() {
      this.$net(`/system/context/keepSampleReceiveRules/${this.sysContext.keepSampleReceiveRules}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    // 任务分配配置规则
    e_changetaskAssignmentRules() {
      this.$net(`/system/context/taskAssignmentRules/${this.sysContext.taskAssignmentRules}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    // 是否启用自动分配
    e_changeautoAssignment() {
      this.$net(`/system/context/autoAssignment/${this.sysContext.autoAssignment}`, 'put').then(res => {
        this.$message.success('修改成功')
      })
    },
    e_screetPdf() {
      if (this.sysContext.encryptPdf === 0) this.sysContext.encryptPdfPassword = ''
      this.$net('/system/context/encryptReportPdf/' + this.sysContext.encryptPdf, 'put',).then(res => {
        this.$message.success('修改成功')
      })
    },
    e_screetPdfPwd() {
      this.$refs.sysContextForm.validateField('encryptPdfPassword', val => {
        console.log(typeof val);
        console.log(val.length);
        if (val.length === 0) {
          this.$net('/system/context/encryptReportPdfPassword/' + this.sysContext.encryptPdfPassword, 'put').then(res => {
            this.$message.success('修改成功')
          })
        }
      })
    }
  }
}
</script>

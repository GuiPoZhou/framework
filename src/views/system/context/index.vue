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
                 <el-form-item label="样品时效预警" prop="sysContext">
                     <el-input v-model="sysContext.sampleAgingWarning" style="width:100px" size="mini" @blur="e_changeSampleTime"></el-input><span>小时</span>
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
            </el-form>
        </div>
    </div>
</template>

<script>
import {
    getContext,
    setEnableSampleCollect,
    setEnableEln
} from '@/api/system/context'

export default {
    name: 'context',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入加密密码'));
        }else if(value.length < 10) {
          callback(new Error('长度不得小于10位'))
        }
        else {
          callback();
        }
      };
        return {
            sysContext: {
                // 是否启用样品领用
                enableSampleCollect: '0',
                // 是否启用ELN
                enableEln: '0',
                sampleAgingWarning:0,
				enableReportAssignment:0,
                sampleStorageRecordRules: 0,
                sampleOutRecordRules: 0,
                keepSampleReceiveRulesc: 0,
                taskAssignmentRules: 0,
                autoAssignment: 0,
                autoSaveCustomer:0,
              encryptPdf:0,
              encryptPdfPassword: '',
            },
            sendSampleType: 0,
          rules: {
            encryptPdfPassword: [
              { validator: validatePass, trigger: 'blur' }
            ],
          }
        }
    },
    created() {
        this.e_getZP()
        getContext().then((response) => {
                this.sysContext = {
                    enableSampleCollect: response.data.enableSampleCollect,
                    enableEln: response.data.enableEln,
                    sampleAgingWarning:response.data.sampleAgingWarning,
					enableReportAssignment:response.data.enableReportAssignment,
                    sampleStorageRecordRules:response.data.sampleStorageRecordRules,
                    sampleOutRecordRules:response.data.sampleOutRecordRules,
                    keepSampleReceiveRules:response.data.keepSampleReceiveRules,
                    taskAssignmentRules:response.data.taskAssignmentRules,
                    autoAssignment:response.data.autoAssignment,
                    autoSaveCustomer:response.data.autoSaveCustomer,
                  encryptPdf:response.data.encryptPdf,
                  encryptPdfPassword: response.data.encryptPdfPassword,
                }
            }).catch((err) => {
                this.sysContext = {
                    enableSampleCollect: '0',
                    enableEln: '0',
                    sampleAgingWarning:"0"
                }
            })
    },
    methods: {
        e_changeautoSaveCustomer(){
            this.$net(`/system/context/autoSaveCustomer/${this.sysContext.autoSaveCustomer}`, 'put').then(re => {
				if (re.code == 200) {
					this.$message.success('修改成功')
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
		e_changeenableReportAssignment(){
			this.$net(`/system/context/enableReportAssignment/${this.sysContext.enableReportAssignment}`, 'put').then(re => {
				if (re.code == 200) {
					this.$message.success('修改成功')
				} else {
					this.$message.error(re.msg)
				}
			})
		},
        // 样品时效预警
        e_changeSampleTime(e){
            this.$net(`/system/context/sampleAgingWarning/${this.sysContext.sampleAgingWarning}`,'put').then( res =>{
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
        // 入库记录生成规则
        e_changeenableWarehousingRecords () {
            this.$net(`/system/context/sampleStorageRecordRules/${this.sysContext.sampleStorageRecordRules}`,'put').then( res =>{
                this.$message.success('修改成功')
            })
        },
        // 出库记录生成规则
        e_changeenableOutRecordRules () {
            this.$net(`/system/context/sampleOutRecordRules/${this.sysContext.sampleOutRecordRules}`,'put').then( res =>{
                this.$message.success('修改成功')
            })
        },
        // 样品留样领用记录生成规则
        e_changekeepSampleReceiveRules () {
            this.$net(`/system/context/keepSampleReceiveRules/${this.sysContext.keepSampleReceiveRules}`,'put').then( res =>{
                this.$message.success('修改成功')
            })
        },
        // 任务分配配置规则
        e_changetaskAssignmentRules () {
            this.$net(`/system/context/taskAssignmentRules/${this.sysContext.taskAssignmentRules}`,'put').then( res =>{
                this.$message.success('修改成功')
            })
        },
        // 是否启用自动分配
        e_changeautoAssignment () {
            this.$net(`/system/context/autoAssignment/${this.sysContext.autoAssignment}`,'put').then( res =>{
                this.$message.success('修改成功')
            })
        },
      e_screetPdf() {
          if (this.sysContext.encryptPdf === 0) this.sysContext.encryptPdfPassword = ''
          this.$net('/system/context/encryptReportPdf/' + this.sysContext.encryptPdf,'put',).then(res=> {
            this.$message.success('修改成功')
          })
      },
      e_screetPdfPwd() {
          this.$refs.sysContextForm.validateField('encryptPdfPassword',val => {
            console.log(typeof val);
            console.log(val.length);
            if (val.length === 0) {
              this.$net('/system/context/encryptReportPdfPassword/' + this.sysContext.encryptPdfPassword,'put').then(res => {
                this.$message.success('修改成功')
              })
            }
          })
      }
    }
}
</script>

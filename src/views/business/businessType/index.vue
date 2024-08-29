<template>
  <div>
    <bo-container :total="total" @changePage="changePage" :pageSizes="[10, 50, 100, 150, 200]">
      <template slot="boMain">
        <bo-main>
          <template slot="bosearch">
            <el-form ref="form" :model="form" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="业务类型编码">
                    <el-input v-model="form.businessTypeCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="业务类型名称">
                    <el-input v-model="form.businessTypeName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button size="small" type="primary" @click="getList">查询</el-button>
                    <el-button size="small" @click="e_reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
          <template slot="tableArea">
            <el-button style="margin-bottom: 10px;" size="small" type="primary" @click="e_add">新增</el-button>
            <el-table :data="tableData" style="width: 100%" border :height="innerHeight">
              <el-table-column prop="belongToBranch" label="所属分支" align="center">
              </el-table-column>
              <el-table-column prop="businessTypeCode" label="业务类型编码" align="center">
              </el-table-column>
              <el-table-column prop="businessTypeName" label="业务类型名称" align="center">
              </el-table-column>
              <el-table-column prop="orderNum" label="显示顺序" align="center">
              </el-table-column>
              <el-table-column prop="readonly" label="是否只读" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.readonly == 1">是</span>
                  <span v-if="scope.row.readonly == 0">否</span>
                </template>
              </el-table-column>
              <el-table-column prop="used" label="使用状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.used == 1">已使用</span>
                  <span v-if="scope.row.used == 0">未使用</span>
                </template>
              </el-table-column>
              <el-table-column prop="visible" label="是否可见" align="center">
                <template slot-scope="scope">
                  <el-switch :disabled="!scope.row.id" v-model="scope.row.visible" :active-value="1" :inactive-value="0"
                    active-color="#13ce66" inactive-color="#ff4949" @change="e_changeVisible(scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.id" @click="e_edit(scope)">修改</el-button>
                  <el-button type="text" v-if="scope.row.id" @click="e_delete(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </bo-main>
      </template>
    </bo-container>
    <!-- 维护业务类型 -->
    <manageType ref="manageType" v-if="showmanageType" @close="showmanageType = false" @saveReload="e_saveReload" />
  </div>
</template>

<script>
import boContainer from '../../../components/Boshland/BoContainer/boContainer.vue'
import BoMain from '../../../components/Boshland/BoContainer/boMain.vue'
import manageType from './dialog/manageType.vue'
export default {
  components: { boContainer, BoMain, manageType },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      innerHeight: 0,
      total: 0,
      showmanageType: false
    }
  },
  created() {
    this.innerHeight = window.innerHeight - 240
    this.getList()
  },
  methods: {
    e_edit(scope) {
      this.showmanageType = true
      this.$nextTick(() => {
        this.$refs.manageType.editInit(JSON.parse(JSON.stringify(scope.row)))
      })
    },
    e_delete(scope) {
      this.$confirm('确定删除该业务类型?').then(() => {
        this.$net('/businessType/del', 'deleteData', [scope.row.id]).then(re => {
          if (re.code == 200) {
            this.$message.success('删除成功')
            this.tableData.splice(scope.$index, 1)
          } else {
            this.$message.error(re.msg)
          }
        })
      })
    },
    e_saveReload() {
      this.showmanageType = false
      this.getList()
    },
    e_add() {
      this.showmanageType = true
      this.$nextTick(() => {
        this.$refs.manageType.init()
      })
    },
    e_changeVisible(row) {
      this.$net(`/businessType/visible/${row.id}/${row.visible}`, 'get').then(re => {
        if (re.code == 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改异常')
          row.visible = Number(!Boolean(row.visible))
        }
      })
    },
    e_reset() {
      this.form = {
        pageNum: 1,
        pageSize: 50
      }
      this.getList()
    },
    getList() {
      this.$net('/businessType/list', 'get', this.form).then(re => {
        this.tableData = re.data.list
        this.total = re.data.total
      })
    },
    changePage(info) {
      console.log('info', info)
      this.form.pageNum = info.page
      this.form.pageSize = info.limit
      this.getList()
    }
  }
}
</script>

<style></style>
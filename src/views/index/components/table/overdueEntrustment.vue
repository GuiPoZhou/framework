<template>
  <div>
    <el-table
        v-loading="loading"
        :data="dataoverList"
        row-key="id"
        ref="selectTable"
        border
				stripe
    >
      <el-table-column
          label="序号"
          align="center"
          type="index"
          width="50"
      />
      <el-table-column
          label="委托单号"
          align="center"
          prop="entrustCode"
          show-overflow-tooltip
      />
      <el-table-column
          label="委托单位"
          align="center"
          prop="entrustCompany"
          show-overflow-tooltip
      />
      <el-table-column
          label="样品编号"
          align="center"
          prop="sampleCode"
          show-overflow-tooltip
      />
      <el-table-column
          label="样品名称"
          align="center"
          prop="sampleName"
          show-overflow-tooltip
      />
      <el-table-column
          label="委托日期"
          align="center"
          prop="entrustDate"
          show-overflow-tooltip
      />
      <el-table-column
          label="受理日期"
          align="center"
          prop="acceptanceDate"
          show-overflow-tooltip
      />
      <el-table-column
          label="报告交付日期"
          align="center"
          prop="reportDeliveryDate"
          show-overflow-tooltip
      />
      <el-table-column
          label="委托状态"
          align="center"
          prop="STATUS"
          show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.STATUS === 0">暂存</span>
          <span v-if="scope.row.STATUS === 1">待受理</span>
          <span v-if="scope.row.STATUS === 2">已受理</span>
          <span v-if="scope.row.STATUS === 3">被退回</span>
          <span v-if="scope.row.STATUS === 40">检测中</span>
          <span v-if="scope.row.STATUS === 50">报告编审中</span>
          <span v-if="scope.row.STATUS === 60">报告待发放</span>
          <span v-if="scope.row.STATUS === 70">报告待归档</span>
          <span v-if="scope.row.STATUS === 80">已归档</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "overdueEntrustment",
    props: {
      dataoverList: Array
    },
    data () {
      return {
        loading: false,
        listData: []
      }
    }
  }
</script>

<style scoped>

</style>

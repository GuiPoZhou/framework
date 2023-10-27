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
          label="试验参数"
          align="center"
          prop="testParameter"
          show-overflow-tooltip
      />
      <el-table-column
          label="试验检测依据"
          align="center"
          prop="testBasisCode"
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
          label="超期天数"
          align="center"
          prop="invalidDay"
          show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span style="color: #ff4949">{{Math.abs(scope.row.invalidDay)}}天</span>
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

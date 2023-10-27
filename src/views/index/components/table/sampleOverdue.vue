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
          label="存放位置"
          align="center"
          prop="storePlace"
          show-overflow-tooltip
      />
      <el-table-column
          label="保存期限"
          align="center"
          prop="storeLife"
          show-overflow-tooltip
      />
      <el-table-column
          label="留样日期"
          align="center"
          prop="backTime"
          show-overflow-tooltip
      />
      <el-table-column
          label="到期日期"
          align="center"
          prop="invalidTime"
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
        listData: [],
        total: 0
      }
    }
  }
</script>

<style scoped>

</style>

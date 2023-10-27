<template>
	<div>
		<el-table v-loading="loading" :data="dataoverList" ref="selectTable" border stripe>
			<el-table-column label="序号" align="center" type="index" width="50"/>
			<el-table-column label="样品编号" align="center" prop="sampleCode" show-overflow-tooltip/>
			<el-table-column label="样品名称" align="center" prop="sampleName" show-overflow-tooltip/>
			<el-table-column label="成型时间" align="center" prop="formationDate" show-overflow-tooltip/>
			<el-table-column label="龄期" align="center" prop="formationDay" show-overflow-tooltip/>
			<el-table-column label="计划出库日期" align="center" prop="planDate" show-overflow-tooltip/>
			<el-table-column label="库存数量" align="center" prop="stockAmount" show-overflow-tooltip/>
			<el-table-column label="存放位置" align="center" prop="location" show-overflow-tooltip/>
			<el-table-column label="超期天数" align="center" prop="overdueDays" show-overflow-tooltip/>
<!--				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">{{ scope.row.overdueDays }}</span>
					<span v-if="scope.row.status == 2" style="color: #E6A23C">{{ scope.row.overdueDays }}</span>
					<span v-if="scope.row.status == 3" style="color: #F56C6C">{{ scope.row.overdueDays }}</span>
				</template>
			</el-table-column>-->
		</el-table>
	</div>
</template>

<script>
export default {
	name: "curingRoom",
	props: {
		dataoverList: Array
	},
	data() {
		return {
			loading: false,
			listData: []
		}
	}
}
</script>

<style scoped>

</style>

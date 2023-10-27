<template>
	<div>
		<el-table v-loading="loading" :data="dataoverList" ref="selectTable" border stripe>
			<el-table-column label="序号" align="center" type="index" width="50"/>
			<el-table-column label="耗材名称" align="center" prop="materialName" show-overflow-tooltip/>
			<el-table-column label="规格型号" align="center" prop="materialModel" show-overflow-tooltip/>
			<el-table-column label="计量单位" align="center" prop="unit" show-overflow-tooltip/>
			<el-table-column label="品牌" align="center" prop="brand" show-overflow-tooltip/>
			<el-table-column label="试剂级别" align="center" prop="grade" show-overflow-tooltip/>
			<el-table-column label="批号" align="center" prop="batchNumber" show-overflow-tooltip/>
<!--			<el-table-column label="内部编号" align="center" prop="internalNumber" show-overflow-tooltip/>-->
			<el-table-column label="有效到期日" align="center" prop="invalidDate" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">{{ scope.row.invalidDate }}</span>
					<span v-if="scope.row.status == 2" style="color: #E6A23C">{{ scope.row.invalidDate }}</span>
					<span v-if="scope.row.status == 3" style="color: #F56C6C">{{ scope.row.invalidDate }}</span>
				</template>
			</el-table-column>
			<el-table-column label="库存位置" align="center" prop="storeSiteName" show-overflow-tooltip/>
			<el-table-column label="库存数量" align="center" prop="materialCount" show-overflow-tooltip/>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "overdue",
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

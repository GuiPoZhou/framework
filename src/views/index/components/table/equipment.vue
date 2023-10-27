<template>
	<div>
		<el-table v-loading="loading" :data="dataoverList" ref="selectTable" border stripe>
			<el-table-column label="序号" align="center" type="index" width="50"/>
			<el-table-column label="预警类型" align="center" prop="type" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">{{ scope.row.type }}</span>
					<span v-if="scope.row.status == 2" style="color: #E6A23C">{{ scope.row.type }}</span>
					<span v-if="scope.row.status == 3" style="color: #F56C6C">{{ scope.row.type }}</span>
				</template>
			</el-table-column>
			<el-table-column label="设备编号" align="center" prop="equipmentNumber" show-overflow-tooltip/>
			<el-table-column label="设备名称" align="center" prop="equipmentName" show-overflow-tooltip/>
			<el-table-column label="规格型号" align="center" prop="equipmentModel" show-overflow-tooltip/>
			<el-table-column label="使用部门" align="center" prop="deptName" show-overflow-tooltip/>
			<el-table-column label="存放地点" align="center" prop="position" show-overflow-tooltip/>
			<el-table-column label="计划日期" align="center" prop="planDate" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">{{ scope.row.planDate }}</span>
					<span v-if="scope.row.status == 2" style="color: #E6A23C">{{ scope.row.planDate }}</span>
					<span v-if="scope.row.status == 3" style="color: #F56C6C">{{ scope.row.planDate }}</span>
				</template>
			</el-table-column>
			<el-table-column label="上次检定校准日期" align="center" prop="lastCalibrationDate" show-overflow-tooltip/>
			<el-table-column label="检定校准失效日期" align="center" prop="loseCalibrationDate" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="scope.row.loseCalibrationDateType" style="color: #F56C6C">{{ scope.row.loseCalibrationDate }}</span>
					<span v-else>{{ scope.row.loseCalibrationDate }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "equipment",
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

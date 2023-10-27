<template>
	<div>
		<el-table v-loading="loading" :data="dataoverList" ref="selectTable" border stripe>
			<el-table-column label="序号" align="center" type="index" width="50"/>
			<el-table-column label="耗材名称" align="center" prop="materialName" show-overflow-tooltip/>
			<el-table-column label="规格型号" align="center" prop="materialModel" show-overflow-tooltip/>
			<el-table-column label="计量单位" align="center" prop="unit" show-overflow-tooltip/>
			<el-table-column label="品牌" align="center" prop="brand" show-overflow-tooltip/>
			<el-table-column label="生产厂商" align="center" prop="manufacturer" show-overflow-tooltip/>
			<el-table-column label="试剂级别" align="center" prop="grade" show-overflow-tooltip/>
			<el-table-column label="安全库存数量" align="center" prop="safeStore" show-overflow-tooltip/>
			<el-table-column label="当前库存数量" align="center" prop="materialCount" show-overflow-tooltip/>
			<el-table-column label="短缺数量" align="center" prop="shortageQuantity" show-overflow-tooltip/>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "consumables",
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

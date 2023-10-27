<template>
	<div>
		<el-table v-loading="loading" :data="dataoverList" ref="selectTable" border stripe>
			<el-table-column label="序号" align="center" type="index" width="50"/>
			<el-table-column label="预警类型" align="center" prop="title" show-overflow-tooltip/>
<!--				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">{{ scope.row.title }}</span>
					<span v-if="scope.row.status == 2" style="color: #E6A23C">{{ scope.row.title }}</span>
					<span v-if="scope.row.status == 3" style="color: #F56C6C">{{ scope.row.title }}</span>
				</template>
			</el-table-column>-->
			<el-table-column label="环境区域" align="center" prop="areaName" show-overflow-tooltip/>
			<el-table-column label="管控范围" align="center" prop="" show-overflow-tooltip>
				<template slot-scope="scope">
					{{scope.row.min}} ~ {{scope.row.max}}
				</template>
			</el-table-column>
			<el-table-column label="实际记录" align="center" prop="actual" show-overflow-tooltip/>
			<el-table-column label="记录时间" align="center" prop="createTime" show-overflow-tooltip/>
			<el-table-column label="点检人" align="center" prop="createBy" show-overflow-tooltip/>
			<el-table-column label="备注" align="center" prop="remark" show-overflow-tooltip/>
			<el-table-column label="操作" align="center" prop="location" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-button type="text" @click="noWarn(scope.row.id)">不再提醒</el-button>
				</template>
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
import {noMoreReminders} from "@/api/index"
export default {
	name: "testSetting",
	props: {
		dataoverList: Array
	},
	data() {
		return {
			loading: false,
			listData: []
		}
	},
	methods: {
		noWarn(id) {
			noMoreReminders(id).then(res => {
				this.$message.success('操作成功')
				this.$emit('reload')
			})
		}
	}
}
</script>

<style scoped>

</style>

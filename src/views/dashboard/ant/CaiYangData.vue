<template>
	<div id="caiyangdata">
		<dv-scroll-board :config="config" style="height:290px"/>
	</div>
</template>
<script>
import {getSampleInfo} from "@/api/dashboard/htmoStatistics"
export default {
	data() {
		return {
			config: {

				header: ['采样小组', '已分配任务数量', '已完成任务数量','未完成任务数量'],
				data: [
				],
				headerBGC:'#fff',
				align:['center','center','center','center'],
				oddRowBGC:'',
				evenRowBGC:'#000',
			}
		}
	},
	mounted() {
		this.e_render()
	},
	methods: {
		e_render() {
			getSampleInfo().then((res) => {
				let temp = [];
				if(res.data){
					res.data.forEach(item => {
						temp.push([
							item.samplers,
							item.allocation,
							item.complete,
							item.incomplete
						])
					});
					let config = {
						header: ['采样小组', '已分配任务数量', '已完成任务数量','未完成任务数量'],
						data: temp,
						headerBGC:'#fff',
						align:['center','center','center','center'],
						oddRowBGC:'#fff',
						index: true,
						evenRowBGC:'#f0f2f5',
					};
					this.config = config;
				}
			}, (err) => {
			})
		}
	}
}
</script>
<style>
.header-item {
	color: #000;
	font-weight: 800;
	font-size: 16px;
}
.ceil{
	color: #000;
	font-size: 15px;
}
.dv-scroll-board .rows .index{
	background: none;
}
</style>
<style lang="scss" scoped>
#caiyangdata{
	padding-bottom: 10px;
}

</style>

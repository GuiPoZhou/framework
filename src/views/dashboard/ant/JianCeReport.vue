<template>
	<div id="jiancereport">

	</div>
</template>
<script>
	import {List} from "./weitorder";
	import {getDetectReport} from "@/api/dashboard/htmoStatistics"

	export default {
		watch: {
			currentTabId(newName, oldName) {
				this.e_render();
			}
		},
		props: {
			currentTabId:{
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				showData: [],
				stackedColumnPlot: null,
			}
		},
		mounted() {
			this.e_render()
		},
		methods: {
			e_render() {
				let data = [
					{
						name: '采样',
						date: '3月1日',
						value: 18.9,
					},
					{
						name: '采样',
						date: '3月2日',
						value: 28.8,
					},
					{
						name: '采样',
						date: '3月3日',
						value: 39.3,
					},
					{
						name: '采样',
						date: '3月4日',
						value: 81.4,
					},
					{
						name: '采样',
						date: '3月5日',
						value: 47,
					},
					{
						name: '采样',
						date: '3月6日',
						value: 20.3,
					},
					{
						name: '采样',
						date: '3月7日',
						value: 24,
					},
					{
						name: '采样',
						date: '3月8日',
						value: 35.6,
					},
					{
						name: '送样',
						date: '3月1日',
						value: 12.4,
					},
					{
						name: '送样',
						date: '3月2日',
						value: 23.2,
					},
					{
						name: '送样',
						date: '3月3日',
						value: 34.5,
					},
					{
						name: '送样',
						date: '3月4日',
						value: 99.7,
					},
					{
						name: '送样',
						date: '3月5日',
						value: 52.6,
					},
					{
						name: '送样',
						date: '3月6日',
						value: 35.5,
					},
					{
						name: '送样',
						date: '3月7日',
						value: 37.4,
					},
					{
						name: '送样',
						date: '3月8日',
						value: 42.4,
					},
				];


				getDetectReport(this.currentTabId).then((res) => {
					this.showData = [];
					if(res.data){
						res.data.forEach(item => {
							item.infoList.forEach(subItem => {
								subItem['name'] = item.name;
								this.showData.push(subItem);
							})
						})
					}
					this.showData.sort((a, b) => a.date.localeCompare(b.date));

					// console.info("===============", this.showData);
					// data = this.showData;
					if(this.stackedColumnPlot){
						this.stackedColumnPlot.destroy();
					}
					this.stackedColumnPlot = new G2Plot.Column('jiancereport', {
						data: this.showData,
						height: 290,
						isGroup: true,
						xField: 'date',
						yField: 'value',
						seriesField: 'name',
						/** 设置颜色 */
						//color: ['#1ca9e6', '#f88c24'],
						/** 设置间距 */
						// marginRatio: 0.1,
						label: {
							// 可手动配置 label 数据标签位置
							position: 'middle', // 'top', 'middle', 'bottom'
							// 可配置附加的布局方法
							layout: [
								// 柱形图数据标签位置自动调整
								{type: 'interval-adjust-position'},
								// 数据标签防遮挡
								{type: 'interval-hide-overlap'},
								// 数据标签文颜色自动调整
								{type: 'adjust-color'},
							],
						},
					});

					this.stackedColumnPlot.render();

				}, (err) => {
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	#jiancereport {
		padding-bottom: 10px;
	}
</style>

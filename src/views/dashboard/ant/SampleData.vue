<template>
	<div id="sampledata">

	</div>
</template>
<script>
	import {list} from './jiaojie'
	import {getDetectSample} from "@/api/dashboard/htmoStatistics"
	import {List} from "./weitorder";

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
				list,
				showData: [],
				linePlot: null,
			}
		},
		mounted() {
			this.e_render()
		},
		methods: {
			e_render() {
				getDetectSample(this.currentTabId).then((res) => {
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


					if(this.linePlot){
						this.linePlot.destroy();
					}
					this.linePlot = new G2Plot.Line('sampledata', {
						data: this.showData,
						height: 290,
						xField: 'date',
						yField: 'value',
						seriesField: 'name',
						yAxis: {
							label: {
								formatter: (v) => `${(v / 10e8).toFixed(1)}`,
							},
						},
						legend: {
							position: 'top',
						},
						smooth: true,
						// @TODO 后续会换一种动画方式
						animation: {
							appear: {
								animation: 'path-in',
								duration: 5000,
							},
						},
					});

					this.linePlot.render();
				}, (err) => {
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	#sampledata {
		padding-bottom: 10px;
	}
</style>

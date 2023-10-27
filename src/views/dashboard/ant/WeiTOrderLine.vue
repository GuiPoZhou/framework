<template>
	<div id="weitorderline">

	</div>
</template>
<script>
	import {list} from './weitorder'
	import {getEntrustAgreement} from "@/api/dashboard/htmoStatistics"

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
				area: null,
			}
		},
		mounted() {
			this.e_render()
		},
		methods: {
			e_render() {
				getEntrustAgreement(this.currentTabId).then((res) => {
					this.showData = [];
					if(res.data){
						res.data.forEach(item => {
							item.infoList.forEach(subItem => {
								subItem['type'] = item.type;
								this.showData.push(subItem);
							})
						})
					}
					this.showData.sort((a, b) => a.date.localeCompare(b.date));
					console.log(JSON.stringify(this.showData));
					//前端补日期 逻辑废弃
					// let days = this.getDays(this.currentTabId);
					// console.log(days);
					// let temp = this.groupBy(this.showData, function(a){return a.type});
					// for(let items in temp){
					//
					// }
					// console.log(temp);
					// console.info("===============", this.showData);
					if(this.area){
						this.area.destroy();
					}
					this.area = new G2Plot.Area('weitorderline', {
						data: this.showData,
						height: 290,
						xField: 'date',
						yField: 'value',
						seriesField: 'type',
					});
					this.area.render();


				}, (err) => {
				})
			},
			groupBy( array , f ) {
				let groups = {};
				array.forEach( function( o ) {
					let group = JSON.stringify( f(o) );
					groups[group] = groups[group] || [];
					groups[group].push( o );
				});
				return Object.keys(groups).map( function( group ) {
					return groups[group];
				});
			},
			getDays(type) {
				let num = 7;
				if(type === 2){
					num = 30;
				}else if(type === 3){
					return this.getMonths();
				}
				let date1 = new Date();
				let result = [];
				for(let i=num; i>=1; i--){
					let date2 = new Date(date1);
					date2.setDate(date1.getDate() - i + 1);
					let time2 =  ((date2.getMonth() + 1) < 10 ? '0'+ (date2.getMonth() + 1) : (date2.getMonth() + 1)) + "-" + (date2.getDate() > 10 ? date2.getDate() : '0' + date2.getDate());
					result.push(time2);
				}

				return result;
			},
			getMonths(){
				let date1 = new Date();
				let result = [];
				for(let i=12; i>=1; i--){
					let date2 = new Date(date1);
					date2.setMonth(date1.getMonth() - i + 1);
					let time2 = date2.getFullYear() + "-" + ((date2.getMonth() + 1) < 10 ? '0'+ (date2.getMonth() + 1) : (date2.getMonth() + 1));
					result.push(time2);
				}
				return result;
			}
		}
	}
</script>
<style lang="scss" scoped>
	#weitorderline {
		padding-bottom: 10px;
	}
</style>

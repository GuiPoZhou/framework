<template>
	<el-row :gutter="40" class="panel-group">
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('newVisitis')">
				<div class="card-panel-icon-wrapper icon-people">
					<img class="cardicon" :src="caiyang" alt="">
				</div>
				<div class="card-panel-des">
					<div class="cpd-left">
						<span class="cpdl-title">本月未完成采样</span>
						<!--						<span class="cpdl-value">12234</span>-->
						<count-to :start-val="0" :end-val="this.undoneTakeSampleData.count" :duration="2000" class="card-panel-num"/>
					</div>
					<div class="cpd-right">
						<img class="cpdr-crove" :src="downCrove" alt="">
						<div class="cpdr-value">
							<span class="cpdrv-val">20.49%</span>
							<img class="cpdrv-icon" :src="upIcon" alt="">
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('messages')">
				<div class="card-panel-icon-wrapper icon-message">
					<img class="cardicon" :src="yangpinicon" alt="">
				</div>
				<div class="card-panel-des">
					<div class="cpd-left">
						<span class="cpdl-title">本月待接样品数量</span>
						<count-to :start-val="0" :end-val="this.waitingReceiveSampleData.count" :duration="2000" class="card-panel-num"/>
					</div>
					<div class="cpd-right">
						<img class="cpdr-crove" :src="upCrove" alt="">
						<div class="cpdr-value">
							<span class="cpdrv-val">20.49%</span>
							<img class="cpdrv-icon" :src="upIcon" alt="">
						</div>
					</div>
				</div>
				<!--				<div class="card-panel-description">-->
				<!--					<div class="card-panel-text">-->
				<!--						消息-->
				<!--					</div>-->
				<!--					<count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>-->
				<!--				</div>-->
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('purchases')">
				<div class="card-panel-icon-wrapper icon-money">
					<img class="cardicon" :src="daijianicon" alt="">
				</div>
				<div class="card-panel-des">
					<div class="cpd-left">
						<span class="cpdl-title">本月待检样品数量</span>
						<count-to :start-val="0" :end-val="this.waitingTestSampleData.count" :duration="2000" class="card-panel-num"/>
					</div>
					<div class="cpd-right">
						<img class="cpdr-crove" :src="upCrove" alt="">
						<div class="cpdr-value">
							<span class="cpdrv-val">20.49%</span>
							<img class="cpdrv-icon" :src="upIcon" alt="">
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('shoppings')">
				<div class="card-panel-icon-wrapper icon-shopping">
					<img class="cardicon" :src="xiangmuicon" alt="">
				</div>
				<div class="card-panel-des">
					<div class="cpd-left">
						<span class="cpdl-title">本月待检项目数量</span>
						<count-to :start-val="0" :end-val="this.waitingTestProjectData.count" :duration="2000" class="card-panel-num"/>
					</div>
					<div class="cpd-right">
						<img class="cpdr-crove" :src="upCrove" alt="">
						<div class="cpdr-value">
							<span class="cpdrv-val">20.49%</span>
							<img class="cpdrv-icon" :src="upIcon" alt="">
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import CountTo from 'vue-count-to'
	import caiyang from './img/caiyangicon.png'
	import yangpinicon from './img/yangpinicon.png'
	import daijianicon from './img/daijianicon.png'
	import xiangmuicon from './img/xiangmuicon.png'
	import downCrove from './img/downCrove.png'
	import upCrove from './img/upCrove.png'
	import upIcon from './img/up.png'

	import {getStatisticsTop} from "@/api/dashboard/htmoStatistics"

	export default {
		data() {
			return {
				caiyang,
				downCrove,
				upIcon,
				upCrove,
				yangpinicon,
				xiangmuicon,
				daijianicon,
				undoneTakeSampleData: {},
				waitingReceiveSampleData: {},
				waitingTestSampleData: {},
				waitingTestProjectData: {},

				// params: {
				// 	//本月未完成采样数据
				// 	undoneTakeSampleData: {
				// 		count: 81212,//未完成总数,
				// 		countPercent: 0.29,//百分比
				// 		status: 0,//相较于上个月上升还是下降  0 下降  1上升
				// 	},
				// 	//本月待接样品数量
				// 	waitingReceiveSampleData: {
				// 		count: 81212,//待接样品总数,
				// 		countPercent: 0.29,//百分比
				// 		status: 0,//相较于上个月上升还是下降  0 下降  1上升
				// 	},
				// 	//本月待检样品数量
				// 	waitingTestSampleData:{
				// 		count: 81212,//待检样品总数,
				// 		countPercent: 0.29,//百分比
				// 		status: 0,//相较于上个月上升还是下降  0 下降  1上升
				// 	},
				// 	//本月待检项目数量
				// 	waitingTestProjectData:{
				// 		count: 81212,//待检项目总数,
				// 		countPercent: 0.29,//百分比
				// 		status: 0,//相较于上个月上升还是下降  0 下降  1上升
				// 	}
				// }
			}
		},
		components: {
			CountTo
		},
		created() {

		},
		mounted() {
			getStatisticsTop().then((res) => {
				this.undoneTakeSampleData = res.data.undoneTakeSampleData;
				this.waitingReceiveSampleData = res.data.waitingReceiveSampleData;
				this.waitingTestSampleData = res.data.waitingTestSampleData;
				this.waitingTestProjectData = res.data.waitingTestProjectData;
			});
		},
		methods: {
			handleSetLineChartData(type) {
				this.$emit('handleSetLineChartData', type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel-group {
		margin-top: 0.5rem;

		.card-panel-col {
			margin-bottom: 1rem;
		}

		.card-panel {
			height: 108px;
			cursor: pointer;
			font-size: 12px;
			position: relative;
			overflow: hidden;
			color: #000;
			//background: url("./img/topbgi.png") no-repeat center;
			background-size: 100% 100%;
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;


			//&:hover {
			//	.card-panel-icon-wrapper {
			//		color: #fff;
			//	}
			//
			//	.icon-people {
			//		background: #40c9c6;
			//	}
			//
			//	.icon-message {
			//		background: #36a3f7;
			//	}
			//
			//	.icon-money {
			//		background: #f4516c;
			//	}
			//
			//	.icon-shopping {
			//		background: #34bfa3
			//	}
			//}

			.icon-people {
				color: #40c9c6;
			}

			.icon-message {
				color: #36a3f7;
			}

			.icon-money {
				color: #f4516c;
			}

			.icon-shopping {
				color: #34bfa3
			}

			.card-panel-icon-wrapper {
				float: left;
				margin: 14px 0 0 0px;
				padding: 10px;
				transition: all 0.38s ease-out;
				border-radius: 6px;
			}

			.card-panel-icon {
				float: left;
				font-size: 48px;
			}

			.cardicon {
				width: 52px;
				height: 52px;
			}

			.card-panel-des {
				flex: 1;
				margin-left: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.cpd-left {
					display: flex;
					flex-direction: column;

					.cpdl-title {
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #000;
					}

					.cpdl-value {
						font-size: 32px;
						font-family: Arial;
						font-weight: bold;
						color: #000;
					}

					.card-panel-num {
						font-size: 32px;
						font-family: Arial;
						font-weight: 600;
						color: #000;
					}
				}

				.cpd-right {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					margin-right: 20px;

					.cpdr-crove {
						width: 95px;
						height: 35px;

					}

					.cpdr-value {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-top: 15px;

						.cpdrv-val {
							font-size: 16px;
							font-family: Arial;
							font-weight: 400;
							color: #FFFFFF;
							margin-right: 10px;
						}

						.cpdrv-icon {
							width: 10px;
							height: 13px;
							margin-top: -4px;
						}
					}
				}
			}

			.card-panel-description {
				float: right;
				font-weight: bold;
				margin: 26px;
				margin-left: 0px;

				.card-panel-text {
					line-height: 18px;
					color: rgba(0, 0, 0, 0.45);
					font-size: 16px;
					margin-bottom: 12px;
				}


			}
		}
	}

	@media (max-width: 550px) {
		.card-panel-description {
			display: none;
		}

		.card-panel-icon-wrapper {
			float: none !important;
			width: 100%;
			height: 100%;
			margin: 0 !important;

			.svg-icon {
				display: block;
				margin: 14px auto !important;
				float: none !important;
			}
		}
	}
</style>

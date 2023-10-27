<template>
	<div class="blockTitle">
		<span class="bt-label">{{ title }}</span>
		<div class="bt-right" v-show="showTab">
			<div class="btr-list" :class="currentTabId == v.id?'activeBtr':''" v-for="(v,i) in tab" :key="i"
				 @click="e_selTab(v)">{{ v.label }}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tab: [
					{
						id: 1,
						label: '最近7天'
					}, {
						id: 2,
						label: '最近30天'
					}, {
						id: 3,
						label: '最近12月'
					},
				],
				currentTabId: 1,
			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			showTab: {
				type: Boolean,
				default: true
			},
			statIndex:{
				type: Number,
				default: 1,
			}
		},
		methods: {
			/**
			 * @author 焦政
			 * @Description: 选择tab
			 * @date 2021/3/23
			 */
			e_selTab(v) {
				this.currentTabId = v.id
				this.$emit("updateCurrentTabId", this.statIndex, v.id);
				// this.$set(this, "currentTabId", v.id);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.blockTitle {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.bt-label {
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #000;
		}

		.bt-right {
			display: flex;
			flex-direction: row;
			align-items: center;

			.btr-list {
				padding: 4px 5px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #C0D7FF;
				cursor: pointer;
				border-top: 1px solid #C0D7FF;
				border-bottom: 1px solid #C0D7FF;

				&:first-child {
					border-left: 1px solid #C0D7FF;
					border-top-left-radius: 5px;
					border-bottom-left-radius: 5px;
				}

				&:last-child {
					border-right: 1px solid #C0D7FF;
					border-top-right-radius: 5px;
					border-bottom-right-radius: 5px;
				}

				&.activeBtr {
					background-color: #1677FF;
					color: #FFFFFF;
					border: 1px solid #1677FF;
				}
			}
		}
	}
</style>

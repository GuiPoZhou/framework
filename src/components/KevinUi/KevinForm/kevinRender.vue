<script>
import { getToken } from '@/utils/auth'
import KevinTable from './components/kevinTable.vue'
import kevinTreeTable from './components/kevinTreeTable.vue'
import kevinActivity from './components/kevinActivity.vue'
import kevinUploadDevice from './components/kevinUploadDevice.vue'
import kevinDeviceAcceptance from './components/kevinDeviceAcceptance'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import kevinBatch from './components/kevinBatch.vue'
import kevinPagination from './components/kevinPagination.vue'
import draggable from 'vuedraggable'
import Clipboard from 'clipboard'
import { v4 as uuidv4 } from 'uuid';
import mixinELInput from "./mixins/mixinELInput";
import mixinElRadio from './mixins/mixinElRadio'
import mixinRenderMain from "./mixins/mixinRenderMain";
import mixinKevinServerGet from './mixins/mixinKevinServerGet'
import mixinElSelect from './mixins/mixinElSelect'
import mixinELCascader from './mixins/mixinELCascader'
import mixinElDatePicker from './mixins/mixinElDatePicker';
import mixinElUpload from './mixins/mixinElUpload';
import mixinElInputNumber from './mixins/mixinElInputNumber'
import mixinElTable from './mixins/mixinElTable'
import mixinELTableTree from './mixins/mixinELTableTree'
import mixinKevinActivity from './mixins/mixinKevinActivity'
import mixinKevinUtils from './mixins/utils/mixinKevinUtils'
import mixinKevinUploadDevice from './mixins/mixinKevinUploadDevice'
import mixinKevinDeviceAcceptance from './mixins/mixinKevinDeviceAcceptance'
import mixinKevinTreeSelect from './mixins/mixinKevinTreeSelect'
import mixinELButton from './mixins/mixinELButton'
import mixinELTabs from './mixins/mixinELTabs'
import mixinKevinBatch from './mixins/mixinKevinBatch'
import mixinKevinSearch from './mixins/mixinKevinSearch'
import mixinELAutoComplete from './mixins/mixinELAutoComplete'
import mixinElColorPicker from './mixins/mixinElColorPicker'
import mixinELCheckBox from './mixins/mixinELCheckBox'
import mixinKevinGrid from './mixins/mixinKevinGrid'
import mixinELTree from './mixins/mixinELTree'
export default {
	mixins: [
		mixinRenderMain,
		mixinKevinServerGet,
		mixinELTabs,
		mixinELInput,
		mixinELAutoComplete,
		mixinElRadio,
		mixinElSelect,
		mixinELCascader,
		mixinElDatePicker,
		mixinElUpload,
		mixinElInputNumber,
		mixinElTable,
		mixinELTableTree,
		mixinKevinActivity,
		mixinKevinUtils,
		mixinKevinUploadDevice,
		mixinKevinDeviceAcceptance,
		mixinKevinTreeSelect,
		mixinELButton,
		mixinKevinBatch,
		mixinKevinSearch,
		mixinElColorPicker,
		mixinELCheckBox,
		mixinKevinGrid,
		mixinELTree
	],
	components: {
		draggable,
		KevinTable,
		kevinTreeTable,
		kevinActivity,
		kevinUploadDevice,
		kevinDeviceAcceptance,
		Treeselect,
		kevinBatch,
		kevinPagination,
	},
	props: {
		editEnv: {
			typeof: String,
			default: 'add'
		},
		businessEnv: {
			typeof: String,
			default: 'add'
		},
		context: {
			typeof: Object,
			default: () => {
			}
		},
		Widget: {
			typeof: Array,
			default: () => {

			}
		},
		form: {
			typeof: Object,
			default: () => {
			}
		},
		group: {
			typeof: Object,
			default: () => {
			}
		},
		ghostClass: {
			typeof: String,
			default: 'ghost'
		},
		draggableOpen: {
			typeof: Boolean,
			default: false
		}
	},
	data() {
		return {
			touchStartThreshold: 50,
			fallbackTolerance: 50,
		}
	},

	methods: {



		renderElDivider(widgetInfo, widgetIndex) {
			return (
				<el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
					{
						this.showDividerEditNode(widgetIndex, widgetInfo)
					}
					<el-divider content-position={widgetInfo.contentPosition}>{widgetInfo.title}</el-divider>
				</el-col>
			)
		},
		showDividerEditNode(index, params) {
			// 动态添加的dom 在jsx中应当使用箭头函数执行具体的执行方法 防止添加完dom后 方法自动执行
			if (this.draggableOpen) {
				return (
					<div class="eidt_area">
						<el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
							onClick={() => {
								this.copyWidgetId()
							}}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
						<el-button style="color:red" type='text' onClick={() => {
							this.removeTabsWidget(params)
						}}>删除组件
						</el-button>
						<el-button type='text' onClick={() => {
							this.editWidget(params)
						}}>编辑组件
						</el-button>

					</div>
				)
			}
		},
		editWidget(widgetInfo) {
			this.$emit('editWidget', widgetInfo)
		},

		showButtonEditArea(item) {
			if (this.draggableOpen) {
				return (
					<div class="buttoneditarea">
						<div class="be-fun-icon" onClick={() => this.editWidget(item)}>
							<i class="el-icon-edit"></i>
						</div>
						<div class="be-fun-icon" onClick={() => this.removeWidget(item)}>
							<i class="el-icon-delete"></i>
						</div>
					</div>
				)
			}
		},
		removeWidget(params) {
			this.$confirm('确定删除当前点击的组件？').then(() => {
				this.deleteNodeByWidgetId(this.Widget, params.WIDGETID)
			})
		},
		e_deleteButtonNode(item) {
			console.log(item.WIDGETID)
			this.$confirm('确定删除该按钮?').then(() => {
				this.deleteNodeByWidgetId(this.Widget, item.WIDGETID)
			})
		},
		addButton(params) {
			this.$prompt('请输入新加按钮的名称', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType: 'text',
			}).then(({ value }) => {
				let child = {
					title: value,
					components: "el-button",
					type: 'primary',
					size: "small",
					WIDGETID: uuidv4(),
					events: "console.log('我是新增按钮')",

				}
				console.log('新增按钮', child)
				params.children.push(child)
			})

		},
		showELButtonEditArea(index, params) {
			if (this.draggableOpen) {
				return (
					<div class="eidt_area">
						<el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
							onClick={() => {
								this.copyWidgetId()
							}}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
						<el-button type='text' onClick={() => {
							this.addButton(params)
						}}>新增按钮
						</el-button>
						<el-button style="color:red" type='text' onClick={() => {
							this.removeTabsWidget(params)
						}}>删除组件
						</el-button>

					</div>
				)
			}
		},

		copyWidget(params) {
			console.log('params', params)
		},
		// 输入性质表单的可视化编辑
		showEditEnterNode(index, params) {
			// 动态添加的dom 在jsx中应当使用箭头函数执行具体的执行方法 防止添加完dom后 方法自动执行
			if (this.draggableOpen) {
				return (
					<div class="eidt_area">
						<el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
							onClick={() => {
								this.copyWidgetId()
							}}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
						<el-button style="color:red" type='text' onClick={() => {
							this.removeTabsWidget(params)
						}}>删除组件
						</el-button>
						<el-button type='text' onClick={() => {
							this.editWidget(params)
						}}>编辑组件
						</el-button>
					</div>
				)
			}
		},

		//        为form-item 定义校验规则
		configFormItemRules(widgetInfo) {
			if (!widgetInfo.rules.isValidate) {
				return []
			}
			let validateParams = {
				required: true,
				message: widgetInfo.rules.validateTitle,
				trigger: widgetInfo.rules.validateType
			}
			return [validateParams]
		},
		formatUUIDWithStars(inputString, maxLength = 14) {
			if (typeof inputString !== 'string') {
				return inputString;
			}

			if (inputString.length <= maxLength) {
				return inputString;
			}

			const prefixLength = Math.ceil((maxLength - 4) / 2);
			const suffixLength = Math.floor((maxLength - 4) / 2);

			const prefix = inputString.substring(0, prefixLength);
			const suffix = inputString.substring(inputString.length - suffixLength);

			return prefix + '****' + suffix;
		},

		//编辑tab
		editTabs(params) {
			this.$emit('editTabs', params)
		},
		// 删除tab
		removeTabsWidget(params) {
			this.$confirm('确定删除当前点击的组件？').then(() => {
				this.deleteNodeByWidgetId(this.Widget, params.WIDGETID)
			})

		},
		copyWidgetId() {
			var that = this
			var clipboard = new Clipboard('.copybox')
			clipboard.on('success', () => {
				that.$message.success('WidgetId复制成功')
				clipboard.destroy()
			})
		},
		// 新增tab
		addNewTab(params) {
			this.$prompt('请输入新加Tab的名称', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType: 'text',
			}).then(({ value }) => {
				let child = {
					title: value,
					isHide: false,
					WIDGETID: uuidv4(),
					children: [{
						components: "el-row",
						title: "Layout布局",
						WIDGETID: uuidv4(),
						colSpan: 24,
						children: []
					},]
				}
				params.children.push(child)
			})

		},
		//编辑tab
		handleTabsEdit(targetName, action, widgetInfo) {
			if (action === 'remove') {
				this.$confirm('确定删除该tab?').then(() => {
					widgetInfo.children.splice(Number(targetName), 1)
				})
			}
		},
		renderKevinContainer(widgetInfo, widgetIndex) {
			if (widgetInfo.isHide && !this.draggableOpen) {
				return ''
			}
			return (
				<el-col class={this.draggableOpen ? 'RenderCol RenderRow' : ''} key={widgetIndex}
					span={widgetInfo.colSpan}>
					{
						this.showKevinContainerEditNode(widgetIndex, widgetInfo)
					}
					<el-divider content-position={widgetInfo.contentPosition}>{widgetInfo.title}</el-divider>
					<el-row>
						<draggable style="width:100%" list={widgetInfo.children} fallbackTolerance={this.fallbackTolerance}
							group={{
								name: `Block${new Date().getTime()}`,
								animation: 180,
								pull: true,
								put: true
							}} ghostClass={this.ghostClass}
							disabled={!this.draggableOpen}
							className="drag-wrapper"
						>
							{
								this.renderImport(widgetInfo.children)
							}
						</draggable>

					</el-row>

				</el-col>
			)
		},
		editKevinContainer(params) {
			this.$prompt('修改区域标题', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType: 'text',
				inputValidator: (value) => {
					// 点击按钮时，对文本框里面的值进行验证
					if (!value) {
						return '标题不能为空';
					}
				}
			}).then(({ value }) => {
				params.title = value
				this.$emit('saveWidgetNodeEdit', params)
			})
		},
		showKevinContainerEditNode(index, params) {
			if (this.draggableOpen) {
				return (
					<div class="eidt_area">
						<el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
							onClick={() => {
								this.copyWidgetId()
							}}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
						<el-button style="color:red" type='text' onClick={() => {
							this.removeTabsWidget(params)
						}}>删除区域
						</el-button>
						<el-button style="color:#13ce66" type='text' onClick={() => {
							this.$message.warning('功能开发中.....')
						}}>快速添加
						</el-button>
						<el-button type='text' onClick={() => {
							this.editWidget(params)
						}}>编辑组件
						</el-button>
					</div>
				)
			}
		},
		renderELRow(widgetInfo, widgetIndex) {
			return (
				<el-col class={this.draggableOpen ? 'RenderCol emptyTop RenderRow' : ''} key={widgetIndex}
					span={widgetInfo.colSpan}>
					{
						this.showRowEditNode(widgetIndex, widgetInfo)
					}
					<el-row>
						<div style="width:100%">
							<draggable list={widgetInfo.children} forceFallback={true}
								group={{
									name: `Block${new Date().getTime()}`,
									animation: 180,
									pull: true,
									put: true
								}}
								ghostClass={this.ghostClass}
								disabled={!this.draggableOpen}
								className="drag-wrapper"
							>
								{
									this.renderImport(widgetInfo.children)
								}
							</draggable>
						</div>

					</el-row>

				</el-col>

			)
		},
		showRowEditNode(index, params) {
			// 动态添加的dom 在jsx中应当使用箭头函数执行具体的执行方法 防止添加完dom后 方法自动执行
			if (this.draggableOpen) {
				return (
					<div class="eidt_area">
						<el-tag type="danger" size="mini" class="widgetid copybox" data-clipboard-text={params.WIDGETID}
							onClick={() => {
								this.copyWidgetId()
							}}>WIDGETID:{this.formatUUIDWithStars(params.WIDGETID)}</el-tag>
						<el-button type='text' onClick={() => {
							this.removeTabsWidget(params)
						}}>删除行
						</el-button>

					</div>
				)
			}
		},

	},
	render(createElement, context) {
		return (
			<div class="widget_container">
				<draggable list={this.Widget} touchStartThreshold={this.touchStartThreshold} forceFallback={true}
					fallbackTolerance={this.fallbackTolerance} animation={740} group={{
						name: `Block${new Date().getTime()}`,
						animation: 180,
						pull: true,
						put: true
					}} ghostClass={this.ghostClass}
					disabled={!this.draggableOpen}
					className="drag-wrapper"
				>
					{
						this.renderImport(this.Widget)
					}

				</draggable>
			</div>
		)
	}
}
</script>
<style scoped lang="scss">
.widget_container {
	width: 100%;
	background-color: #fff;


}

.widgetid {
	cursor: pointer;
}

.RenderCol {
	position: relative;
	min-height: 4rem;
	margin-bottom: 1rem;
	border-radius: 6px;
	border: 1px dashed #1890ff;
	// padding-top: 0.2rem;

	.eidt_area {
		width: fit-content;
		padding: 0.1rem 0.3rem;
		background-color: #f3f9ff;
		border-left: 1px dashed #1890ff;
		border-bottom: 1px dashed #1890ff;
		position: absolute;
		top: 0;
		z-index: 22;
		right: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
}


.emptyTop {
	padding-top: 3.5rem;
}

.KevinGridEdit {
	padding-top: 3.5rem;
}

.RenderColTable {
	padding-top: 3rem;
}

.RenderCol:hover {
	background: #f3f9ff;
}

.TabsEditArea {
	min-height: 8rem;
	// padding-bottom: 80px;
}

.KevinSearchRender {
	padding-top: 3.5rem;
}

.RenderRow {
	min-height: 8rem;
}

.renderButtonArea {
	display: inline-block;
	position: relative;
	margin-right: 11px;

	.buttoneditarea {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 22;
		border-radius: 6px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 1px dashed #1890ff;
		cursor: pointer;

		.be-fun-icon {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			border: 1px solid #364BC6;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			margin-right: 0.4rem;
			font-size: 0.6rem;

			&:hover {
				background-color: #364BC6;
				color: #fff;
			}
		}
	}
}

/deep/.el-form-item--medium .el-form-item__content {
	line-height: 34px;
}

/deep/.el-form-item__content {
	line-height: 38px;
}

/deep/.vue-treeselect__menu-container {
	z-index: 9991 !important;
}

/deep/.el-form-item.foldLabel .el-form-item__label {
	white-space: pre-line;
	/*换行显示*/
	height: 36px;
	/*设置lable高度，与input高度一样*/
	line-height: 18px !important;
	/*设置行高为label高度的一半（有n行就是label高度的1/n）*/
}

.el-table_slot_upload {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}


.kevin_grid {
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.3rem;

	.kevin-row-left {
		height: 100%;
		background-color: #fff;
		overflow: auto;
		padding: 0.7rem;
		padding-bottom: 3rem;
		border-radius: 10px;
		scrollbar-width: none;
		/* 隐藏标准滚动条（适用于Firefox） */
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			width: 0;
			/* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
		}
	}

	.kevin-row-flex {
		flex: 1;
		height: 100%;
		padding: 0.7rem;
		border-radius: 10px;
		overflow: auto;
		background-color: #fff;
		margin-left: 0.2rem;
	}
}

.kevin_el_checkbox_utils {
	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>
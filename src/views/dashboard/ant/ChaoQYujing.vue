<template>
	<div id="chaoqiyujing">

	</div>
</template>
<script>
import {List} from './weitorder'

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
			List,
			piePlot: null,
		}
	},
	mounted() {
		this.e_render()
	},
	methods: {
		e_render() {
			const list = [
				{ type: '采样超期', value: 27 },
				{ type: '报告超期', value: 25 },
				{ type: '检测超期', value: 18 }
			];
			this.piePlot = new G2Plot.Pie('chaoqiyujing', {
				appendPadding: 10,
				data:list,
				height:290,
				angleField: 'value',
				colorField: 'type',
				radius: 0.45,
				label: {
					type: 'spider',
					labelHeight: 28,
					content: '{name}\n{percentage}',
				},
				interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			});
			this.piePlot.update();
		}
	}
}
</script>
<style lang="scss" scoped>
#chaoqiyujing {
	padding-bottom: 8px;
}
</style>

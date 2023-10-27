export default {
    methods: {
        renderELTree(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide == true && !this.draggableOpen) {
                return ('')
            }
            let KevinELTreeOptions = {
                props: {
                    ...widgetInfo.props
                },
                showCheckbox: widgetInfo.showCheckbox,
                defaultExpandAll: widgetInfo.defaultExpandAll,
                defaultExpandedKeys: widgetInfo.defaultExpandedKeys,
                defaultCheckedKeys: widgetInfo.defaultCheckedKeys,
                expandOnClickNode: widgetInfo.expandOnClickNode,
                highlightCurrent: widgetInfo.highlightCurrent,
                accordion: widgetInfo.accordion,
                iconClass: widgetInfo.iconClass,
                indent: widgetInfo.indent,
                checkStrictly: widgetInfo.checkStrictly,
                autoExpandParent: widgetInfo.autoExpandParent,
                checkOnClickNode: widgetInfo.checkOnClickNode,

                lazy: widgetInfo.lazy,
            }
            // 懒加载
            if (widgetInfo.lazy) {
                KevinELTreeOptions.load = this.kevin_el_tree_load(widgetInfo)
            }
            // 插槽 普通
            if (widgetInfo.slotInfo.openSlot && widgetInfo.slotInfo.slotType == 'common') {
                KevinELTreeOptions.renderContent = this.getELTreeScopedSlots(widgetInfo)
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol RenderColTable' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <el-tree
                        ref={widgetInfo.WIDGETID}
                        {...{ props: KevinELTreeOptions }}
                        data={widgetInfo.treeData}
                       v-on:node-click={(data, node, item) => {
                            this.kevin_el_tree_nodeClick(data, node, item, widgetInfo)
                        }}
                       v-on:check-change={(data, isCheck, isChildCheck) => {
                            this.kevin_el_tree_checkChange(data, isCheck, isChildCheck, widgetInfo)
                        }}
                        v-on:check={(data, checkInfo) => {
                            this.kevin_el_tree_check(data, checkInfo, widgetInfo)
                        }}
                        v-on:current-change={(node, item) => {
                            this.kevin_el_tree_currentChange(node, item, widgetInfo)
                        }}
                        v-on:node-expand={(data, node, item) => {
                            this.kevin_el_tree_nodeExpand(data, node, item, widgetInfo)
                        }}
                        v-on:node-collapse={(data, node, item) => {
                            this.kevin_el_tree_nodeCollapse(data, node, item, widgetInfo)
                        }}
                    >

                    </el-tree>
                </el-col>
            )
        },
        kevin_el_tree_load(widgetInfo) {
            return (node, resolve) => {
                new Function('ctx', '_this', 'node', 'resolve', 'widgetInfo', widgetInfo.load)(this.context, this, node, resolve, widgetInfo)
            }
        },
        getELTreeScopedSlots(widgetInfo) {
            return (h, { node, data, store }) => {
                console.log('node', node)
                return (
                    <span>
                        <span>
                            <span style="font-size：0.7rem;color:red">{node.label}</span>
                        </span>
                    </span>);
            }
        },
        kevin_el_tree_nodeClick(data, node, item, widgetInfo) {
            new Function('ctx', '_this', 'data', 'node', 'item', 'widgetInfo', widgetInfo.events.nodeClick)(this.context, this, data, node, item, widgetInfo)
        },
        kevin_el_tree_checkChange(data, isCheck, isChildCheck, widgetInfo) {
            new Function('ctx', '_this', 'data', 'isCheck', 'isChildCheck', 'widgetInfo', widgetInfo.events.checkChange)(this.context, this, data, isCheck, isChildCheck, widgetInfo)
        },
        kevin_el_tree_check(data, checkInfo, widgetInfo) {
            new Function('ctx', '_this', 'data', 'checkInfo', 'widgetInfo', widgetInfo.events.check)(this.context, this, data, checkInfo, widgetInfo)
        },
        kevin_el_tree_currentChange(node, item, widgetInfo) {
            new Function('ctx', '_this', 'node', 'item', 'widgetInfo', widgetInfo.events.currentChange)(this.context, this, node, item, widgetInfo)
        },
        kevin_el_tree_nodeExpand(data, node, item, widgetInfo) {
            new Function('ctx', '_this', 'data', 'node', 'item', 'widgetInfo', widgetInfo.events.nodeExpand)(this.context, this, data, node, item, widgetInfo)
        },
        kevin_el_tree_nodeCollapse(data, node, item, widgetInfo) {
            new Function('ctx', '_this', 'data', 'node', 'item', 'widgetInfo', widgetInfo.events.nodeCollapse)(this.context, this, data, node, item, widgetInfo)

        }
    }
}
# 树形组件
## 方法
- 快捷 根据WIDGETID 设定tree的数据
```
/**
    参数说明：
        treeDataList Array 要赋值的树形组件数据
        WIDGETID String  组件id
 */
_this.kevin_el_tree_setTreeData(treeDataList, WIDGETID)
```
- 快捷 根据WIDGETID(即eltree组件的ref) 获取选中的节点node
```
/**
    参数说明：
        WIDGETID String 组件id
        返回值 Array
 */
let list = _this.kevin_el_tree_getCheckedNodes(WIDGETID)
```
- 快捷 根据WIDGETID(即eltree组件的ref) 通过node设置选中节点
```
/**
    参数说明：
        nodeList Array 要设置的节点数据
        WIDGETID String 组件id
 */
_this.kevin_el_tree_setCheckedNodes(nodeList, WIDGETID)
```
- 快捷 根据WIDGETID(即eltree组件的ref) 获取选中节点的keys
```
/**
    参数说明：
        WIDGETID String 组件id
        返回值 Array
 */
let list = _this.kevin_el_tree_getCheckedKeys(WIDGETID)
```
- 快捷 根据WIDGETID(即eltree组件的ref) 通过keys设置选中的节点
```
/**
    参数说明：
        keyList Array 要设置的节点数据
        WIDGETID String 组件id
 */
_this.kevin_el_tree_setCheckedKeys(keyList, WIDGETID)
```
- 快捷 根据WIDGETID(即eltree组件的ref) 快速清空选中的节点
```
/**
    参数说明：
        WIDGETID String 组件id
 */
_this.kevin_el_tree_clearChecked(WIDGETID)
```
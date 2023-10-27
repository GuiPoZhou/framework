# ELTabs组件使用说明
## 方法
- 根据 WIDGETID  快速操作eltabs 某几个节点隐藏或者显示
```
/**
    参数说明：
        WIDGETID：表单Tabs组件id
        tabsNodeList:要操作的tab页签名称集合
        tabsNodeList=[{title:'页签名称',value:'hide'/'show'}]
 */
_this.kevin_tabs_node_status(WIDGETID, tabsNodeList = [])
```
```
//举例
_this.kevin_tabs_node_status('55aefb23-2ef2-4b18-8c58-d1db50249d0c', [{title:'标签2',value:'hide'}]) //表单在渲染时 标签2则默认隐藏

```
- 根据 WIDGETID 快捷获取eltabs当前的索引值
```
/**
    参数说明：
        WIDGETID：表单Tabs组件id
        返回值：tabs的当前下标值
 */
_this.kevin_tabs_active(WIDGETID)
```
```
//举例
let currentTabsAcitveIndex = _this.kevin_tabs_active('55aefb23-2ef2-4b18-8c58-d1db50249d0c')
```
- 快捷 根据WIDGETID 快速设置eltabs的开启页签
```
/**
    参数说明：
    activeIndex Number 设定的下标值
    WIDGETID：表单Tabs组件id
 */
_this.kevin_tabs_set_active(activeIndex,WIDGETID)
```
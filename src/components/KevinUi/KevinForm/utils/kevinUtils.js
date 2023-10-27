const findNodeById = (tree, targetId) => {
    for (const node of tree) {
        if (node.WIDGETID === targetId) {
            return node;
        }
        if (node.children && node.children.length > 0) {
            const result = findNodeById(node.children, targetId);
            if (result) {
                return result;
            }
        }
    }
    return null; // 如果未找到匹配的节点，返回null
}

const KevinUtil = {
    kevin_ShowWidget: function (Widget, WIDGETID) {
        let editWidgetInfo = findNodeById(Widget, WIDGETID)
        editWidgetInfo.isHide = false
        console.log('改变后', editWidgetInfo)
    }
}
export default KevinUtil
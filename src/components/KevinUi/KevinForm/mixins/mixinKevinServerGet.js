export default {
    data() {
        return {
            servetGetTagList: ['el-select', 'el-radio', 'el-checkbox', 'el-cascader', 'kevin-tree-select']
        }
    },
    methods: {
        // 执行获取需要远程数据的方法  el-select  el-radio  el-switch 
        getWidgetServerData(Widget) {
            Widget.forEach(widgetInfo => {
                if (this.servetGetTagList.indexOf(widgetInfo.components) != -1) {
                    if (widgetInfo.options.executionMethod == 'auto' && widgetInfo.options.optionsGetEvents) {
                        new Function('ctx', '_this', 'widgetInfo', widgetInfo.options.optionsGetEvents)(this.context, this, widgetInfo)
                    }
                }
                if (widgetInfo.components == 'el-table') {
                    widgetInfo.tableColumns.forEach(columnsInfo => {
                        if (columnsInfo.vModelActionType == 'select' || columnsInfo.vModelActionType == 'radio') {
                            if (columnsInfo.vModelActionOptions.dataSource.executionMethod == 'auto' && columnsInfo.vModelActionOptions.dataSource.optionsGetEvents) {
                                new Function('ctx', '_this', 'widgetInfo', 'columnsInfo', columnsInfo.vModelActionOptions.dataSource.optionsGetEvents)(this.context, this, widgetInfo, columnsInfo)
                            }
                        }
                    })
                }
                if (widgetInfo.children && widgetInfo.children.length != 0) {
                    this.getWidgetServerData(widgetInfo.children)
                }
            });
        },
        // 手动赋值操作 （例如：①一个下拉选择框选择完之后，触发另一个选择框的业务、 ②回显数据时的业务）
        passiveGetWidgetServerData(widgetInfo) {

        }
    }
}
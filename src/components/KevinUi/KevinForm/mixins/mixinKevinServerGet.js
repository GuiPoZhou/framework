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
                if (widgetInfo.components == 'el-table' || widgetInfo.components == 'el-table-tree') {
                    widgetInfo.tableColumns.forEach(columnsInfo => {
                        if (columnsInfo.vModelActionType == 'select' || columnsInfo.vModelActionType == 'radio') {
                            if (columnsInfo.vModelActionOptions.dataSource.executionMethod == 'auto' && columnsInfo.vModelActionOptions.dataSource.optionsGetEvents) {
                                try{
                                    new Function('ctx', '_this', 'widgetInfo', 'columnsInfo', columnsInfo.vModelActionOptions.dataSource.optionsGetEvents)(this.context, this, widgetInfo, columnsInfo)

                                }catch{
                                    console.log('table 行内远程数据源异常',widgetInfo.WIDGETID,columnsInfo)
                                }
                            }
                        }
                    })
                }
                if (widgetInfo.components == 'kevin-upload-device') {
                    if (widgetInfo.typeDataSource) {
                        new Function('ctx', '_this', 'widgetInfo', widgetInfo.typeDataSource)(this.context, this, widgetInfo)
                    }
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
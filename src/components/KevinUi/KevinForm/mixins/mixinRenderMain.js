export default {
    data() {
        return {
            innerHeight: 0,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getInnerHeight()
        })

    },
    methods: {
        getStringWidth(str) {
            let width = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charAt(i);
                if (char.charCodeAt(0) < 128) {
                    // ASCII字符，宽度为1
                    width += 1;
                } else {
                    // 非ASCII字符，宽度为2
                    width += 2;
                }
            }
            return width;
        },
        getInnerHeight() {
            this.innerHeight = window.innerHeight;
        },
        deleteNodeByWidgetId(data, targetWidgetId) {
            for (let i = 0; i < data.length; i++) {
                const node = data[i];
                if (node.WIDGETID === targetWidgetId) {
                    // 找到匹配的节点，删除它及其父节点中包含的该节点
                    data.splice(i, 1);
                    return;
                } else if (node.children) {
                    // 递归查找子节点
                    this.deleteNodeByWidgetId(node.children, targetWidgetId);
                }
            }
        },
        renderImport(widgetList) {
            const renderedWidgets = widgetList.map((widgetInfo, widgetIndex) => {
                switch (widgetInfo.components) {
                    case 'el-input':
                        return this.renderELInput(widgetInfo, widgetIndex);
                    case 'el-autocomplete':
                        return this.renderELAutoComplete(widgetInfo, widgetIndex)
                    case 'el-input-number':
                        return this.renderElInputNumber(widgetInfo, widgetIndex)
                    case 'el-select':
                        return this.renderElSelect(widgetInfo, widgetIndex);
                    case 'el-cascader':
                        return this.renderElCascader(widgetInfo, widgetIndex)
                    case 'kevin-tree-select':
                        return this.renderKevinTreeSelect(widgetInfo, widgetIndex)
                    case 'el-tabs':
                        return this.renderELTabs(widgetInfo, widgetIndex);
                    case 'kevin-container':
                        return this.renderKevinContainer(widgetInfo, widgetIndex)
                    case 'kevin-activity':
                        return this.renderKevinActivity(widgetInfo, widgetIndex)
                    case 'el-row':
                        return this.renderELRow(widgetInfo, widgetIndex);
                    case 'el-button':
                        return this.renderElButton(widgetInfo, widgetIndex)
                    case 'el-divider':
                        return this.renderElDivider(widgetInfo, widgetIndex)
                    case 'el-date-picker':
                        return this.renderElDatePicker(widgetInfo, widgetIndex)
                    case 'el-radio':
                        return this.renderElRadio(widgetInfo, widgetIndex)
                    case 'el-checkbox':
                        return this.renderElCheckBox(widgetInfo, widgetIndex)
                    case 'el-upload':
                        return this.renderElUpload(widgetInfo, widgetIndex)
                    case 'el-table':
                        return this.renderElTable(widgetInfo, widgetIndex)
                    case 'el-table-tree':
                        return this.renderElTableTree(widgetInfo, widgetIndex)
                    case 'kevin-upload-device':
                        return this.renderKevinUploadDevice(widgetInfo, widgetIndex)
                    case 'kevin-device-acceptance':
                        return this.renderKevinDeviceAcceptance(widgetInfo, widgetIndex)
                    case 'kevin-batch':
                        return this.renderKevinBatch(widgetInfo, widgetIndex)
                    case 'kevin-search':
                        return this.renderKevinSearch(widgetInfo, widgetIndex)
                    case 'el-color-picker':
                        return this.renderElColorPicker(widgetInfo, widgetIndex)
                    case 'kevin-grid':
                        return this.renderKevinGrid(widgetInfo, widgetIndex)
                    case 'el-tree':
                        return this.renderELTree(widgetInfo, widgetIndex)
                    default:
                        return null; // You can handle other cases or return some default value if needed.
                }
            });
            return renderedWidgets;
        },
    }
}
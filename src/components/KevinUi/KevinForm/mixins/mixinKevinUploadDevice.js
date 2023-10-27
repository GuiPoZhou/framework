export default {
    methods: {
        renderKevinUploadDevice(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide == true) {
                return ('')
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <kevinUploadDevice
                        context={this.context}
                        widgetInfo={widgetInfo}
                        onSuccess={(uploadInfo) => {
                            this.kevinUploadDeviceSuccess(uploadInfo, widgetInfo)
                        }}
                        onActionClick={({ actionButtonInfo, scope }) => {
                            this.kevinUploadDeviceTableActionClick(actionButtonInfo, scope, widgetInfo)
                        }}
                    />
                </el-col>
            )
        },
        kevinUploadDeviceSuccess(uploadInfo, widgetInfo) {
            widgetInfo.fileList.push(uploadInfo)
        },
        kevinUploadDeviceTableActionClick(actionButtonInfo, scope, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'widgetInfo', actionButtonInfo.clickEvents)(this.context, this, scope, widgetInfo)
        },

    }
}
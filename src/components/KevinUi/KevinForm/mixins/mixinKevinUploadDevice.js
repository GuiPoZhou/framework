// import { getToken } from '@/utils/auth'
const getToken = ()=>{
    return localStorage.getItem('Admin-Token')
}
export default {
    methods: {
        renderKevinUploadDevice(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide == true) {
                return ('')
            }
            if (!widgetInfo.typeProp) {
                widgetInfo.typeProp = 'fileType'
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <kevinUploadDevice
                        key={widgetInfo.WIDGETID}
                        disabled={widgetInfo.disabled}
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
            console.log('uploadInfo', uploadInfo)
            widgetInfo.fileList.push(uploadInfo)
        },
        kevinUploadDeviceTableActionClick(actionButtonInfo, scope, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'widgetInfo', 'getToken', actionButtonInfo.clickEvents)(this.context, this, scope, widgetInfo, getToken)
        },

    }
}
import { getToken } from '@/utils/auth'
export default {
	methods: {
		renderElUpload(widgetInfo, widgetIndex) {
			var scopedSlots = {
				file: (prop) => {
					return (
						<div>
							<span style="padding-right: 20px">{prop.file.name}</span>
							<el-button type="text" size="small" onClick={() => {
								this.elUploadDownload(prop, widgetInfo)
							}}>下载
							</el-button>
							{
								!widgetInfo.hideDelte ?
									<el-button v-show={this.context.businessEnv != 'detail'} style="color:red" type="text" size="small"
										onClick={() => {
											this.elUploadDelete(prop, widgetInfo)
										}}>删除
									</el-button> : ''
							}
						</div>
					)
				}
			}
			return (
				<el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
					{
						this.showEditEnterNode(widgetIndex, widgetInfo)
					}
					<el-form-item label={widgetInfo.title}>
						<el-upload action={this.$BASE_API + widgetInfo.action + '?Authorization=' + getToken() + '&MenuId=' + localStorage.getItem('menuId')}
							disabled={widgetInfo.disabled}
							accept={widgetInfo.accept ? widgetInfo.accept : '-'}
							headers={widgetInfo.headers}
							drag={widgetInfo.drag}
							limit={widgetInfo.limit ? widgetInfo.limit : '-'}
							scopedSlots={scopedSlots}
							before-upload={(file) => {
								eval(widgetInfo.events.beforeUpload)
							}}
							// 这块需要尤其注意  在upload中 on-事件 是以属性来定义的
							{...{
								props: {
									"on-success": (res, file) => {
										res.filePath = res.url
										eval(widgetInfo.events.onSuccess)
									},
									"on-exceed": (files, fileList) => {
										this.kevin_el_upload_exceed(files, fileList, widgetInfo)
									}
								}
							}}
							multiple={false}
							showFileList={true}
							file-list={widgetInfo.fileList}
						>
							{
								widgetInfo.drag ?
									<div className="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> : ''
							}
							{
								!widgetInfo.disabled ? <el-button type="primary" size="small">上传</el-button> : ''
							}

						</el-upload>
					</el-form-item>
				</el-col>
			)
		},
		kevin_el_upload_exceed(files, fileList, widgetInfo) {
			new Function('ctx', '_this', 'files', 'fileList', 'widgetInfo', widgetInfo.events.onExceed)(this.context, this, files, fileList, widgetInfo)
		},
		elUploadDownload(prop, widgetInfo) {
			new Function('ctx', '_this', 'prop', 'widgetInfo', 'getToken', widgetInfo.events.downloadFile)(this.context, this, prop, widgetInfo, getToken)
		},
		elUploadDelete(prop, widgetInfo) {
			new Function('ctx', '_this', 'prop', 'widgetInfo', widgetInfo.events.removeUploadFile)(this.context, this, prop, widgetInfo)
		}
	}
}
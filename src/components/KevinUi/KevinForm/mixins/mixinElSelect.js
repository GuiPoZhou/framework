export default {
    methods: {
            //LowCodeDiy Render ElSelect
        renderElSelect(widgetInfo, widgetIndex) {
        if (widgetInfo.isHide) {
          return ''
        }
        let ElSelectAttr = {
          placeholder: widgetInfo.placeholder,
          clearable: widgetInfo.clearable,
          multiple: widgetInfo.multiple,
          disabled: widgetInfo.disabled,
          multipleLimit: widgetInfo.multipleLimit,
          size:widgetInfo.size,
          allowCreate:widgetInfo.allowCreate,
          filterable:widgetInfo.filterable
        }
        let isLangLabel = false
        if (widgetInfo.title, this.getStringWidth(widgetInfo.title) > 12) {
            isLangLabel = true
        }
        if(!widgetInfo.options.list){
          widgetInfo.options.list =[]
        }
        if( widgetInfo.vModelType == 'fixed'){

            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                  {
                    this.showEditEnterNode(widgetIndex, widgetInfo)
                  }
                   <el-form-item
                    class={this.context.KevinJson.KevinWidget.formlabelPosition != 'top' && isLangLabel ? "foldLabel" : ''}
                        label={widgetInfo.title} prop={widgetInfo.vModel}
                        rules={this.configFormItemRules(widgetInfo)}
                   >
                          <el-select v-model={this.form[widgetInfo.vModel]} {...{props: ElSelectAttr}}
                                     onChange={(value) => {
                                       this.elSelectChange(value,widgetInfo)
                                     }}
                                     v-on:visible-change={() => {
                                       this.elSelectVisibleChange(widgetInfo)
                                     }}
                                     v-on:remove-tag={() => {
                                       this.elSelectRemoveTag(widgetInfo)
                                     }}
                          >
                            {
                              widgetInfo.options.list.map(optionsInfo => {
                                return (
                                    <el-option label={optionsInfo.label}
                                               value={optionsInfo.value}
                                    ></el-option>
                                )
                              })
                            }
                          </el-select>
                        </el-form-item>
                </el-col>
            )
        }else{
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                  {
                    this.showEditEnterNode(widgetIndex, widgetInfo)
                  }
                  <el-form-item  class={this.context.KevinJson.KevinWidget.formlabelPosition != 'top' && isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                                        rules={this.configFormItemRules(widgetInfo)}
                        >
                          <el-select
                            v-model={this.form.extData[widgetInfo.vModel]}
                            {...{props: ElSelectAttr}}
                            onChange={(value) => {
                              this.elSelectChange(value,widgetInfo)
                            }}
                            v-on:visible-change={() => {
                              this.elSelectVisibleChange(widgetInfo)
                            }}
                            v-on:remove-tag={() => {
                              this.elSelectRemoveTag(widgetInfo)
                            }}
                          >
                            {
                              widgetInfo.options.list.map(optionsInfo => {
                                return (
                                    <el-option label={optionsInfo.label}
                                               value={optionsInfo.value}
                                    ></el-option>
                                )
                              })
                            }
                          </el-select>
                        </el-form-item>

                </el-col>
            )
        }

      },

        elSelectChange(value,widgetInfo) {
          this.context.form ={...this.context.form}
            new Function('ctx', '_this','value','widgetInfo', widgetInfo.events.change)(this.context, this,value,widgetInfo)
        },
        elSelectVisibleChange(widgetInfo){
            new Function('ctx', '_this','widgetInfo', widgetInfo.events.visibleChange)(this.context, this,widgetInfo)
        },
        elSelectRemoveTag(widgetInfo){
            new Function('ctx', '_this','widgetInfo', widgetInfo.events.removeTag)(this.context, this,widgetInfo)

        }
    }
}

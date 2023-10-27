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
          multipleLimit: widgetInfo.multipleLimit
        }
        let isLangLabel = false
        if (widgetInfo.title, this.getStringWidth(widgetInfo.title) > 12) {
            isLangLabel = true
        }
        if( widgetInfo.vModelType == 'fixed'){
            return (
                <el-col class={this.draggableOpen ? 'RenderCol' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                  {
                    this.showEditEnterNode(widgetIndex, widgetInfo)
                  }
                   <el-form-item
                    class={isLangLabel ? "foldLabel" : ''}
                        label={widgetInfo.title} prop={widgetInfo.vModel}
                        rules={this.configFormItemRules(widgetInfo)}
                   >
                          <el-select v-model={this.form[widgetInfo.vModel]} {...{props: ElSelectAttr}}
                                     onChange={() => {
                                       this.elSelectChange(widgetInfo)
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
                  <el-form-item  class={isLangLabel ? "foldLabel" : ''} label={widgetInfo.title} prop={`extData.${widgetInfo.vModel}`}
                                                        rules={this.configFormItemRules(widgetInfo)}
                        >
                          <el-select v-model={this.form.extData[widgetInfo.vModel]}  {...{props: ElSelectAttr}}>
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
    
        elSelectChange(widgetInfo) {
            new Function('ctx', '_this','widgetInfo', widgetInfo.events.change)(this.context, this,widgetInfo)
        },
        elSelectVisibleChange(widgetInfo){
            new Function('ctx', '_this','widgetInfo', widgetInfo.events.visibleChange)(this.context, this,widgetInfo)
        },
        elSelectRemoveTag(widgetInfo){
            new Function('ctx', '_this','widgetInfo', widgetInfo.events.removeTag)(this.context, this,widgetInfo)

        }
    }
}
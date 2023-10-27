# 全局参数说明

## 低码表单运行时结构
- 在使用低码表单时，需创建一个vue文件，作为表单的运行时容器
- 容器中负责将表单json渲染为dom视图的组件 作为渲染引擎
- 如果在容器中引用其他的子组件（子容器）与vue正常开发无异

## 低码表单运行时实例参数介绍
- ctx：ctx代表运行时容器的上下文 即 当前vue文件中的this
```
//举例1:操作vue文件中的form 给form中的某个参数赋值
ctx.form.data1 = 'data1'
//举例2:通过低码脚本调起容器中子容器（子组件弹框等）
ctx.showChild = true
ctx.$nextTick(()=>{
    ctx.$refs.child.init()
})
//举例3：在低码脚本中发起网络请求
ctx.$net('/api','get').then(response=>{
    console.log('请求响应',response)
})
```
- _this：_this代表运行时容器中渲染引擎组件的上下文  即 渲染引擎vue组件的this
```
//举例：快捷调用低码内置api函数  kevin_table_get_tableData即为低码表单渲染引起内置的方法，获取el-table的值
_this.kevin_table_get_tableData(WIDGETID, COPY = true)
```
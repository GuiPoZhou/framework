# 基础表格ELTable组件使用说明
## 方法
- 根据 WIDGETID  快速操作el-table 追加数据
```
/**
    参数说明：
        data  Object 要追加的数据对象
        WIDGETID String 表单el-table组件的id
        COPY Boolean  追加的数据是否进行深拷贝 默认true
 */
_this.kevin_table_push_tableData(data, WIDGETID, COPY = true)
```
```
//举例
_this.kevin_table_push_tableData({data1:'data1',data2:'data2'}, '55aefb23-2ef2-4b18-8c58-d1db50249d0c')
```
- 根据 WIDGETID 快速操作el-table 设置全部数据
```
/**
    参数说明：
        dataList Array 要设置的数据列表
        WIDGETID String 表单el-table组件的id
        COPY Boolean  追加的数据是否进行深拷贝 默认true
 */
_this.kevin_table_set_tableData(dataList, WIDGETID, COPY = true)
```
```
//举例
_this.kevin_table_set_tableData([{data1:'data1',data2:'data2'},{data1:'data11',data2:'data22'}],'55aefb23-2ef2-4b18-8c58-d1db50249d0c')
```
- 根据 WIDGETID 快速操作el-table 获取全部数据
```
/**
    参数说明：
        WIDGETID String 表单el-table组件的id
        COPY Boolean  追加的数据是否进行深拷贝 默认true
        返回值 dataList
 */
_this.kevin_table_get_tableData(WIDGETID, COPY = true)
```
```
// 举例
let dataList = _this.kevin_table_get_tableData('55aefb23-2ef2-4b18-8c58-d1db50249d0c')
```
- 根据 WIDGETID 快速操作el-table 获取表格勾选的数据
```
/**
    参数说明：
        WIDGETID String 表单el-table组件的id
        返回值 selectDataList
 */
_this.kevin_table_get_selectData(WIDGETID)
```
```
// 举例
let selectDataList = _this.kevin_table_get_selectData('55aefb23-2ef2-4b18-8c58-d1db50249d0c')
```
- 根据 WIDGETID、ROWINDEX 快速操作el-table 某一行的值
```
/**
    参数说明：
        dataInfo Object 需要赋值的某一行数据对象
        index number 需要赋值的某一行的下标值
        WIDGETID String 表单el-table组件的id
 */
_this.kevin_table_set_row(dataInfo, index, WIDGETID) 
```
```
// 举例 此时index的值可以是保存在浏览器的缓存中的值  也可以是匹配table行内数据的下标值
_this.kevin_table_set_row({data1:'data1',data2:'data2'}, 0, '55aefb23-2ef2-4b18-8c58-d1db50249d0c') 
```
- 根据 WIDGETID el-table开启分页功能时，设置分页组件的total
```javascript
/**
    参数说明：
        total number 数据总数
        WIDGETID String 表单el-table组件的id
 */
_this.kevin_table_page_set_total(total, WIDGETID) 
```
```
//举例
_this.kevin_table_page_set_total(100, '55aefb23-2ef2-4b18-8c58-d1db50249d0c') 

```
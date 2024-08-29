export default {
    methods: {
        findWidgetNode(tree, targetId) {
            for (const node of tree) {
                if (node.WIDGETID === targetId) {
                    return node;
                }
                if (node.children && node.children.length > 0) {
                    const result = this.findWidgetNode(node.children, targetId);
                    if (result) {
                        return result;
                    }
                }
            }
            return null; // 如果未找到匹配的节点，返回null
        },
        // ==============================公共🔽===============================//
        // 快速修改 组件的标题
        kevin_widget_change_title(WIDGETID, title) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.title = title
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 批量 form  组件 禁止编辑 ⭐️⭐️⭐️⭐️⭐️
        kevin_all_disabled(tree = this.Widget) {
            for (const node of tree) {
                node.disabled = true
                if (node.children && node.children.length > 0) {
                    this.kevin_all_disabled(node.children);
                }
            }
        },
        // 批量 form  组件 禁止编辑
        kevin_widget_all_disabled(tree) {
            for (const node of tree) {
                node.disabled = true
                if (node.children && node.children.length > 0) {
                    this.kevin_widget_all_disabled(node.children);
                }
            }
        },
        // 批量 form 单个组件 禁止或者可用编辑
        kevin_widget_form_disabled(WIDGETID, boolean) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.disabled = boolean
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID 显示某个节点
        kevin_widget_show(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.isHide = false
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }

        },
        // 快捷 根据 WIDGETID 隐藏某个节点
        kevin_widget_hidden(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.isHide = true
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID 让表单组件是否禁止编辑 工具1 按区域来
        kevin_widget_busarea_form_disabled(WIDGETID, disabled) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            widgetInfo.children.forEach(item => {
                item.disabled = disabled
            })
        },
        //快捷 根据 WIDGETID 让表单组件是否禁止编辑 工具1 按区域来 支持传入过个子组件的WIDGETID
        kevin_widget_busarea_signle_disabled(WIDGETID, disabled, childWidgetId = []) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            // 没有传入子项则 全部执行
            if (childWidgetId.length == 0) {
                widgetInfo.children.forEach(item => {
                    item.disabled = disabled
                })
            } else {
                if (Object.prototype.toString.call(childWidgetId) == '[object Array]') {
                    widgetInfo.children.forEach(item => {
                        if (childWidgetId.indexOf(item.WIDGETID) != -1) {
                            item.disabled = disabled
                        }

                    })
                } else {
                    throw new Error(`方法${kevin_widget_busarea_form_disabled} childWidgetId需要数组数据例如：[1,2,3]`)
                }
            }

        },
        // 获取当前时间 并支持格式化
        kevin_getTime(format) {
            const now = new Date();
            if (format === 'hour-minute') {
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            } else if (format === 'full-date-time') {
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            } else {
                // 默认格式
                return now.toString();
            }
        },
        // 获取 组件（'el-select', 'el-radio', 'el-checkbox', 'el-cascader', 'kevin-tree-select'） 内的options list
        kevin_get_dataComponent_options(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (widgetInfo.options && widgetInfo.options.list) {
                    return widgetInfo.options.list
                } else {
                    console.error('该组件未配置数据源')
                }

            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 设置 组件（'el-select', 'el-radio', 'el-checkbox', 'el-cascader', 'kevin-tree-select'） 内的options list
        kevin_set_dataComponent_options(list, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (widgetInfo.options && widgetInfo.options.list) {
                    widgetInfo.options.list = JSON.parse(JSON.stringify(list))
                } else {
                    console.error('该组件未配置数据源')
                }
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 获取容器内的手动执行脚本名称
        kevin_context_manuallyEvents(eventsName) {
            let eventsCode = this.context.KevinJson.KevinWidget.manuallyEvents[eventsName]
            if (eventsCode) {
                return eventsCode
            } else {
                throw new Error(`未查询到表单绑定的手动执行脚本 名称【${eventsName}】`)
            }
        },
        // 开启或者关闭表单项内容关闭或者开启必填  ruleInfo={status:true,type:'blur',remark:'提示内容'}
        kevin_form_item_validate(ruleInfo, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (ruleInfo) {
                    if (!widgetInfo.rules) {
                        widgetInfo.rules = {
                            isValidate: false,
                            validateTitle: '',
                            validateType: 'blur'
                        }
                    }
                    try {
                        widgetInfo.rules.isValidate = ruleInfo.status
                        widgetInfo.rules.validateTitle = ruleInfo.remark
                        widgetInfo.rules.validateType = ruleInfo.type
                    } catch {
                        console.log('参数异常')
                    }

                } else {
                    throw new Error("请传入ruleInfo参数，格式参考：ruleInfo={status:true,type:'blur',remark:'提示内容'}")
                }
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================公共🔼===============================//


        // ==============================操作elbutton区域🔽============================//
        kevin_button_area_node_status(WIDGETID, buttonNodeList = []) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (buttonNodeList.length != 0) {
                    buttonNodeList.forEach(item => {
                        widgetInfo.children.forEach(buttonChildInfo => {
                            if (buttonChildInfo.title == item.title) {
                                buttonChildInfo.isHide = item.value == 'hide' ? true : false
                            }
                        })

                    })
                    let hideFalseList = widgetInfo.children.filter(item => {
                        return !item.isHide
                    })
                    if (hideFalseList.length == 0) {
                        widgetInfo.isHide = true
                    }
                } else {
                    console.log('传入正常的按钮对象数据[{title:"按钮名",value:"hide"/"show"}]')
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        kevin_button_area_node_disabled(WIDGETID, buttonNodeList = []) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (buttonNodeList.length != 0) {
                    buttonNodeList.forEach(item => {
                        widgetInfo.children.forEach(buttonChildInfo => {
                            if (buttonChildInfo.title == item.title) {
                                buttonChildInfo.disabled = item.value == 'hide' ? true : false
                            }
                        })

                    })
                } else {
                    console.log('传入正常的按钮对象数据[{title:"按钮名",value:"hide"/"show"}]')
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================操作elbutton区域🔼============================//


        // ==============================操作elTabs🔽==================================//
        // 快捷 根据 WIDGETID  快速操作eltabs 某几个节点隐藏或者显示
        kevin_tabs_node_status(WIDGETID, tabsNodeList = []) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (tabsNodeList.length != 0) {
                    tabsNodeList.forEach(item => {
                        widgetInfo.children.forEach(tabChildInfo => {
                            if (tabChildInfo.title == item.title) {
                                tabChildInfo.isHide = item.value == 'hide' ? true : false
                            }
                        })
                    })
                } else {
                    console.log('传入正常的标签对象数据[{title:"标签名",value:"hide"/"show"}]')
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }

        },
        // 快捷 根据 WIDGETID 快捷获取eltabs当前的索引值
        kevin_tabs_active(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                return widgetInfo.active
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID 快速设置eltabs的开启页签
        kevin_tabs_set_active(acitveIndex, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.active = Number(acitveIndex)
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },

        // ==============================操作elTabs🔼==================================//

        // ==============================操作eltable🔽===============================//
        // el-table 行内 select radio 数据源赋值
        kevin_table_slot_dataSource(columnsInfo, list) {
            columnsInfo.vModelActionOptions.dataSource.list = list
        },
        // 快捷 根据 WIDGETID 复制 el-table push
        kevin_table_push_tableData(data, WIDGETID, COPY = true) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                if (COPY) {
                    let info = JSON.parse(JSON.stringify(data))
                    widgetTableInfo.tableData.push(info)
                } else {
                    widgetTableInfo.tableData.push(data)
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID 赋值 el-table tableData
        kevin_table_set_tableData(dataList, WIDGETID, COPY = true) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                if (COPY) {
                    widgetTableInfo.tableData = JSON.parse(JSON.stringify(dataList))
                } else {
                    widgetTableInfo.tableData = dataList
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID 获取 el-table tableData
        kevin_table_get_tableData(WIDGETID, COPY = true) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                if (COPY) {
                    return JSON.parse(JSON.stringify(widgetTableInfo.tableData))
                } else {
                    return widgetTableInfo.tableData
                }
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        //快捷  根据 WIDGETID 获取el-table tableSelectData
        kevin_table_get_selectData(WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                return JSON.parse(JSON.stringify(widgetTableInfo.tableSelectData))
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID 获取 el-table 勾选的数据 table tableSelectData
        kevin_table_get_tableSelectData(WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                return widgetTableInfo.tableSelectData
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID 下标值 快速更新el-table中的某一行的值
        kevin_table_set_row(dataInfo, index, WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                this.$set(widgetTableInfo.tableData, index, JSON.parse(JSON.stringify(dataInfo)))
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据 WIDGETID  赋值分页total
        kevin_table_page_set_total(total, WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                this.$set(widgetTableInfo.paginationOptions, 'total', total)
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷  根据WIDGETID  快速重置分页组件页码
        kevin_table_page_set_page(WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                this.$set(widgetTableInfo.paginationOptions, 'total', 0)
                this.$set(widgetTableInfo.paginationOptions, 'page', 1)
                // this.$refs[`${WIDGETID}Page`].repeat()
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 获取 el-table ref
        kevin_table_get_ref(WIDGETID) {
            return this.$refs[WIDGETID].$refs.elTable
        },
        // 快捷  根据WIDGETID 快速设置table的表头
        kevin_table_set_heards(list, WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                widgetTableInfo.tableColumns = list
            } else {
                console.log(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID 快速获取table的表头
        kevin_table_get_heards(WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                return widgetTableInfo.tableColumns
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID 禁用单元格内的表单组件
        kevin_table_slot_disabled(WIDGETID, disabled = true) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                widgetTableInfo.tableColumns.forEach(item => {
                    if (item.vModelActionOptions) {
                        item.vModelActionOptions.disabled = disabled
                    }
                })
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷  根据WIDGETID 获取基础表格分页的默认起始分页数量 
        kevin_table_getPageSize(WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                let pageSize = eval(widgetTableInfo.paginationOptions.pageSizes)
                return pageSize[0]
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID 快速操作table某些列显示或者隐藏
        kevin_table_check_tableColumn(WIDGETID, columnProps, check = true) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                let tableColumns = JSON.parse(JSON.stringify(widgetTableInfo.tableColumns))
                tableColumns.forEach(item => {
                    if (columnProps.indexOf(item.prop) != -1) {
                        item.checked = check
                    }
                })
                widgetTableInfo.tableColumns = tableColumns
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        //排序
        resultData(tableData, merge) {
            return tableData.sort(this.sortByArr(merge, true))
        },
        // 数组根据数组对象中的某个属性值进行排序的方法
        // 使用例子：newArray.sort(sortByArr(['number'],false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
        // @param attr 排序的属性 ['name','sex'...],根据一个字段或者多个字段排序
        // @param rev true表示升序排列，false降序排序
        sortByArr(arr, rev) {
            if (rev === undefined) {
                rev = 1;
            } else {
                rev = (rev) ? 1 : -1;
            }
            return function (a, b) {
                for (let i = 0; i < arr.length; i++) {
                    let attr = arr[i]
                    if (a[attr] !== b[attr]) {
                        if (a[attr] > b[attr]) {
                            return rev * 1;
                        } else {
                            return rev * -1;
                        }
                    }
                }
            }
        },
        // 快捷 根据WIDGETID 快捷执行eltable 合并行方法
        kevin_table_merge_row(dataLists, WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                const dataList = this.resultData(dataLists, widgetTableInfo.mergeArr)
                widgetTableInfo.mergeArr.forEach((key, index1) => {
                    let count = 0; // 用来记录需要合并行的起始位置
                    widgetTableInfo.mergeObj[key] = []; // 记录每一列的合并信息
                    dataList.forEach((item, index) => {
                        // index == 0表示数据为第一行，直接 push 一个 1
                        if (index === 0) {
                            widgetTableInfo.mergeObj[key].push(1);
                        } else {
                            // 判断当前行是否与上一行其值相等 如果相等 在 count 记录的位置其值 +1 表示当前行需要合并 并push 一个 0 作为占位
                            if (item[key] === dataList[index - 1][key]) {
                                widgetTableInfo.mergeObj[key][count] += 1;
                                widgetTableInfo.mergeObj[key].push(0);
                            } else {
                                // 如果当前行和上一行其值不相等
                                count = index; // 记录当前位置
                                widgetTableInfo.mergeObj[key].push(1); // 重新push 一个 1
                            }
                        }
                    })
                })
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================操作eltable🔼===============================//

        // ==============================操作树形table🔽===============================//
        // 将数组数据 转换为 树形数据
        kevin_ui_common_array_toTree(dataList, childArrayKey, ponitId, parentId) {
            const roots = [];
            const map = {};
            // 将数组元素以id为键值建立映射
            dataList.forEach((item) => {
                map[item[ponitId]] = { ...item, [childArrayKey]: [] };
            });
            // 遍历数组，将元素插入到其父节点的childArrayKey数组中
            dataList.forEach((item) => {
                if (item[parentId] !== null) {
                    if (map[item[parentId]]) {
                        map[item[parentId]][childArrayKey].push(map[item[ponitId]]);
                    } else {
                        // 如果父元素不存在，可以选择将其作为根节点
                        roots.push(map[item[ponitId]]);
                    }
                } else {
                    roots.push(map[item[ponitId]]);
                }
            });

            return roots;
        },
        // 将树形数据 转为数组数据
        kevin_ui_treeList_toArray(treeList, childArrayKey) {
            let data = JSON.parse(JSON.stringify(treeList))
            let newData = []
            const callback = (item) => {
                (item[childArrayKey] || (item[childArrayKey] = [])).map(v => {
                    callback(v)
                })
                delete item[childArrayKey]
                newData.push(item)
            }
            data.map(v => callback(v))
            return newData
        },
        // ==============================操作树形table🔼===============================//

        // ==============================操作文件上传组件-普通🔽===============================//
        // 快捷 根据 WIDGETID 获取 el-upload fileList
        el_upload_get_data(WIDGETID) {
            let widgetUploadInfo = this.findWidgetNode(this.Widget, WIDGETID)
            return widgetUploadInfo.fileList;
        },
        // 快捷 根据 WIDGETID 赋值 el-upload fileList needHandle 是否需要处理 （主要针对后端fileList 是固定字段时，这个时候需要处理为组件需要的数据结构）
        el_upload_set_data(dataList, WIDGETID, needHandle = false) {
            let widgetUploadInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (!needHandle) {
                widgetUploadInfo.fileList = dataList
            } else {
                let arr = []
                dataList.forEach(dataInfo => {
                    let obj = {
                        name: dataInfo.fileName,
                        url: dataInfo.filePath,
                        uid: dataInfo.id
                    }
                    arr.push(obj)
                });
                widgetUploadInfo.fileList = arr
            }
        },
        // ==============================操作文件上传组件-普通🔼===============================//


        // ==============================操作树形组件🔽===============================//
        // 快捷 根据WIDGETID 设定tree的数据 treeData
        kevin_el_tree_setTreeData(treeDataList, WIDGETID) {
            let widgetTreeInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTreeInfo) {
                this.$set(widgetTreeInfo, 'treeData', treeDataList)
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 获取选中的节点node  开启多选框才有效
        kevin_el_tree_getCheckedNodes(WIDGETID) {
            return this.$refs[WIDGETID].getCheckedNodes()
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 通过node设置选中节点 开启多选框才有效
        kevin_el_tree_setCheckedNodes(nodeList, WIDGETID) {
            this.$refs[WIDGETID].setCheckedNodes(nodeList)
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 获取选中节点的keys 开启多选框才有效
        kevin_el_tree_getCheckedKeys(WIDGETID) {
            return this.$refs[WIDGETID].getCheckedKeys()
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 通过keys设置选中的节点 开启多选框才有效
        kevin_el_tree_setCheckedKeys(keyList, WIDGETID) {
            this.$refs[WIDGETID].setCheckedKeys(keyList)
        },
        //快捷 根据WIDGETID(即eltree组件的ref) 快速清空选中的节点 开启多选框才有效
        kevin_el_tree_clearChecked(WIDGETID) {
            this.$refs[WIDGETID].setCheckedKeys([])
        },
        //快捷 根据WIDGETID(即eltree组件的ref) 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        kevin_el_tree_getCurrentKey(WIDGETID) {
            try {
                return this.$refs[WIDGETID].getCurrentKey()
            } catch {
                console.log('组件是否设置了node-key')
            }

        },
        //快捷 根据WIDGETID(即eltree组件的ref) 获取当前被选中节点的 data，若没有节点被选中则返回 null
        kevin_el_tree_getCurrentNode(WIDGETID) {
            return this.$refs[WIDGETID].getCurrentNode()
        },
        //快捷 根据WIDGETID(即eltree组件的ref)根据 data 或者 key 拿到 Tree 组件中的 node
        kevin_el_tree_getNode(data, WIDGETID) {
            return this.$refs[WIDGETID].getNode(data)
        },
        // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        kevin_el_tree_setCurrentKey(key, WIDGETID) {
            this.$refs[WIDGETID].setCurrentKey(key)
        },
        // 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        kevin_el_tree_setCurrentNode(node, WIDGETID) {
            this.$refs[WIDGETID].setCurrentNode(node)
        },
        //快捷 根据WIDGETID(即eltree组件的ref)删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性  (data) 要删除的节点的 data 或者 node
        kevin_el_tree_remove(data, WIDGETID) {
            this.$refs[WIDGETID].remove(data)
        },
        // 为 Tree 中的一个节点追加一个子节点 (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node
        kevin_el_tree_append(data, parentNode, WIDGETID) {
            this.$refs[WIDGETID].append(data, parentNode)
        },
        // 为 Tree 的一个节点的前面增加一个节点 (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node
        kevin_el_tree_insertBefore(data, refNode, WIDGETID) {
            this.$refs[WIDGETID].insertBefore(data, refNode)
        },
        //为 Tree 的一个节点的后面增加一个节点 (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node
        kevin_el_tree_insertAfter(data, refNode, WIDGETID) {
            this.$refs[WIDGETID].insertAfter(data, refNode)

        },
        // ==============================操作树形组件🔼===============================//

        // ==============================审批流程组件🔽===============================//
        kevin_activity_set_data(dataList, WIDGETID) {
            let widgetTreeInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTreeInfo) {
                this.$set(widgetTreeInfo, 'businessData', dataList)
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================审批流程组件🔼===============================//

        // ==============================分类上传组件🔽===============================//
        kevin_type_upload_getData(WIDGETID, COPY = true) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (COPY) {
                    return JSON.parse(JSON.stringify(widgetInfo.fileList))
                } else {
                    return widgetInfo.fileList
                }

            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        kevin_type_upload_setData(dataList, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.fileList = JSON.parse(JSON.stringify(dataList))
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================分类上传组件🔼===============================//

        // ==============================设备状态图表组件🔽===============================//
        kevin_equipment_chart_setData(dataList, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.data = JSON.parse(JSON.stringify(dataList))
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        kevin_equipment_chart_clearData(WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                widgetInfo.data = []
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        kevin_equipment_chat_changeStatus(index, status, WIDGETID) {
            let widgetInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetInfo) {
                if (widgetInfo.data.length != 0) {
                    let params = widgetInfo.data[index]
                    params.status = status
                    this.$set(widgetInfo.data, index, params)
                }
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // ==============================设备状态图表组件🔼===============================//

    }
}

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
        // 批量 form  组件 禁止编辑
        kevin_widget_all_disabled(tree) {
            for (const node of tree) {
                node.disabled = true
                if (node.children && node.children.length > 0) {
                    this.kevin_widget_all_disabled(node.children);
                }
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
                    widgetTableInfo.tableData = data
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
        // 快捷 根据 WIDGETID 下标值 赋值分页total
        kevin_table_page_set_total(total, WIDGETID) {
            let widgetTableInfo = this.findWidgetNode(this.Widget, WIDGETID)
            if (widgetTableInfo) {
                this.$set(widgetTableInfo.paginationOptions, 'total', total)
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
                let tableColumns =JSON.parse(JSON.stringify(widgetTableInfo.tableColumns)) 
                tableColumns.forEach(item => {
                    if (columnProps.indexOf(item.prop) != -1) {
                        item.checked = check
                    }
                })
                widgetTableInfo.tableColumns =tableColumns
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
            console.log('dataList', dataList)
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
                this.$set(widgetTreeInfo,'treeData', treeDataList)
            } else {
                console.error(`组件节点${WIDGETID}查询异常`)
            }
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 获取选中的节点node
        kevin_el_tree_getCheckedNodes(WIDGETID) {
            return this.$refs[WIDGETID].getCheckedNodes()
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 通过node设置选中节点
        kevin_el_tree_setCheckedNodes(nodeList, WIDGETID) {
            this.$refs[WIDGETID].setCheckedNodes(nodeList)
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 获取选中节点的keys
        kevin_el_tree_getCheckedKeys(WIDGETID) {
            return this.$refs[WIDGETID].getCheckedKeys()
        },
        // 快捷 根据WIDGETID(即eltree组件的ref) 通过keys设置选中的节点
        kevin_el_tree_setCheckedKeys(keyList, WIDGETID) {
            this.$refs[WIDGETID].setCheckedKeys(keyList)
        },
        //快捷 根据WIDGETID(即eltree组件的ref) 快速清空选中的节点
        kevin_el_tree_clearChecked(WIDGETID) {
            this.$refs[WIDGETID].setCheckedKeys([])
        }
        // ==============================操作树形组件🔼===============================//

    }
}
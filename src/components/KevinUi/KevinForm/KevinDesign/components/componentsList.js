const componentsList = [
    {
        title: '布局组件',
        list: [
            {
                components: "el-row",
                describe: "EL-Row",
                title: "Layout布局",
                colSpan: 24,
                children: []
            },
            {
                components: "kevin-grid",
                describe: "双区域版",
                title: "栅格布局",
                isHide: false,
                height: 30,
                backgroundColor: '#EBEEF5',
                colSpan: 24,
                children: [
                    {
                        components: "kevin-row-left",
                        title: "栅格左侧",
                        isHide: false,
                        colSpan: '18',
                        children: [
                            {
                                components: "el-row",
                                describe: "EL-Row",
                                title: "Layout布局",
                                colSpan: 24,
                                children: []
                            },
                        ]
                    }, {
                        components: "kevin-row-flex",
                        title: "栅格右侧",
                        isHide: false,
                        colSpan: 'flex',
                        children: [
                            {
                                components: "el-row",
                                describe: "EL-Row",
                                title: "Layout布局",
                                colSpan: 24,
                                children: []
                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        title: '基础组件',
        list: [
            {
                components: "el-button",
                title: 'Button按钮',
                isHide: false,
                colSpan: 24,
                children: [
                    {
                        title: '按钮',
                        type: 'primary',
                        components: "el-button",
                        isHide: false,
                        size: "small",
                        events: 'console.log("我是按钮")'
                    }
                ]
            }, {
                components: 'el-divider',
                isHide: false,
                title: '分割线',
                colSpan: 24,
                contentPosition: 'left'
            }, {
                components: 'el-color-picker',
                title: '颜色选择器',
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                disabled: false,
                size: 'small',
                showAlpha: false,
                colorFormat: 'hex',
                events: {
                    change: ''
                }
            }
        ]
    },
    {
        title: '表单组件',
        list: [
            {
                components: "el-input",
                title: "Input 输入框",
                colSpan: 12,
                vModel: "vModel",
                isHide: false,
                vModelType: 'fixed',
                placeholder: "请填入内容",
                clearable: false,
                disabled: false,
                readonly: false,
                type: "text",
                rows: 2,
                autosize:false,
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                slot: {
                    isSlot: false,
                    slotType: 'button',
                    slotButtonIcon: '',
                    slotIconName: '',
                    slotSpanContent: '',
                    events: {
                        slotButtonEvents: '',
                        callBackEvents: '',
                    }
                },
                events: {
                    blur: '',
                    focus: '',
                    change: '',
                    clear: '',
                    input: '',
                    enter: '',
                }
            },
            {
                components: "el-autocomplete",
                title: "远程搜索输入框",
                colSpan: 12,
                vModel: "vModel",
                isHide: false,
                vModelType: 'fixed',
                placeholder: "请填入内容",
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                events: {
                    fetchSuggestions: "",
                    select: "",
                }
            },
            {
                components: "el-input-number",
                title: "InputNumber 计数器",
                colSpan: 12,
                vModel: "vModel",
                isHide: false,
                vModelType: 'fixed',
                placeholder: "请填入内容",
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                min: 0,
                max: 100,
                step: 1,
                stepStrictly: false,
                precision: 0,
                disabled: false,
                events: {
                    change: '',
                    blur: '',
                    focus: ''
                }
            },
            {
                components: "el-select",
                title: "Select 选择器",
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                placeholder: "请选择内容",
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                clearable: false,
                multiple: false,
                disabled: false,
                multipleLimit: 0,
                filterable: false,
                "allow-create": false,
                "filter-method": '',
                remote: '',
                "remote-method": "",
                options: {
                    list: [],
                    executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                    optionsGetEvents: '',
                },
                events: {
                    change: '',
                    visibleChange: '',
                    removeTag: '',
                    clear: '',
                    blur: '',
                    focus: ''
                }
            },
            {
                components: "el-cascader",
                title: "级联选择器",
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                placeholder: "请选择内容",
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                disabled: false,
                clearable: false,
                showAllLevels: false,
                props: {
                    multiple: false,
                    value: 'id',
                    children: 'childList',
                    label: 'nodeName',
                    checkStrictly: true
                },
                options: {
                    list: [],
                    executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                    optionsGetEvents: '',
                },
                events: {
                    change: '',
                    blur: '',
                    focus: '',
                }
            },
            {
                components: "kevin-tree-select",
                title: '树形选择器',
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                placeholder: "请选择内容",
                disabled: false,
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'blur'
                },
                clearable: false,
                options: {
                    list: [],
                    executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                    optionsGetEvents: "ctx.$net('/system/dept/treeselect', 'get').then((response) => { widgetInfo.options.list = response.data; });",
                },
                showCount: true,
                events: {
                    select: '',
                }
            },
            {
                components: 'el-date-picker',
                title: '日期时间选择器',
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'change'
                },
                vModelType: 'fixed',
                placeholder: "请选择日期时间",
                disabled: false,
                clearable: false,
                readonly: false,
                valueFormat: 'yyyy-MM-dd',
                format: 'yyyy-MM-dd',
                type: "date",
                pickerOptions: "",
                events: {
                    change: '',
                }
            },
            {
                components: "el-radio",
                title: "Radio单选框",
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'change'
                },
                border: false,
                disabled: false,
                options: {
                    list: [
                        {
                            label: '测试1',
                            value: 0
                        },
                        {
                            label: '测试2',
                            value: 1
                        },
                    ],
                    executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                    optionsGetEvents: '',
                },
                events: {
                    input: '',
                }
            },
            {
                components: "el-checkbox",
                title: "CheckBox多选",
                isHide: false,
                colSpan: 12,
                vModel: "vModel",
                vModelType: 'fixed',
                rules: {
                    isValidate: false,
                    validateTitle: '',
                    validateType: 'change'
                },
                disabled: false,
                options: {
                    list: [
                        {
                            label: '测试1',
                            value: 0
                        },
                        {
                            label: '测试2',
                            value: 1
                        },
                    ],
                    executionMethod: 'auto',//auto 自动执行获取远程数据  manually 被动执行获取远程数据
                    optionsGetEvents: '',
                },
                events: {
                    change: '',
                }
            },
            {
                components: "el-upload",
                title: "文件上传",
                isHide: false,
                disabled: false,
                colSpan: 12,
                action: "/common/upload",
                headers: {},
                multiple: false,
                drag: false,
                fileList: [],
                accept: "-",
                limit: 1,
                events: {
                    onExceed: "",
                    "onSuccess": "res.name=res.fileName;widgetInfo.fileList.push(res);",
                    "downloadFile": "let fileInfo = prop.file; window.location.href = window.globalEnv.VUE_APP_BASE_API + '/common/uploadFileDownload?fileName=' + fileInfo.fileName + '&filePath=' + fileInfo.url + '&Authorization=' + getToken() + '&MenuId=' + localStorage.getItem('menuId');",
                    "removeUploadFile": "ctx.$confirm('确定删除该文件吗？').then(_=>{let list=JSON.parse(JSON.stringify(widgetInfo.fileList));const arr=list.filter(fileInfo=>{return fileInfo.uid!==prop.file.uid});widgetInfo.fileList=arr})"
                }
            },
            {
                components: 'kevin-batch',
                title: '频次组件',
                isHide: false,
                disabled: false,
                colSpan: 12,
                editButtonTile: '设置频次',
                actionLabel: '核查',
                vModelType: 'fixed',
                unitList: [
                    {
                        label: '秒',
                        value: 'SECOND'
                    }, {
                        label: '分钟',
                        value: 'MINUTE'
                    }, {
                        label: '小时',
                        value: 'HOUR'
                    }, {
                        label: '天',
                        value: 'DAY'
                    }, {
                        label: '周',
                        value: 'WEEK'
                    }, {
                        label: '月',
                        value: 'MONTH'
                    }, {
                        label: '季度',
                        value: 'QUARTER'
                    }, {
                        label: '年',
                        value: 'YEAR'
                    },
                ],
                options: {
                    intervalKey: 'checkInterval',
                    unitKey: 'checkIntervalUnit',
                    intervalCountKey: 'checkIntervalCount',
                },
                events: {
                    select: "ctx.form.checkInterval = value.interval; ctx.form.checkIntervalUnit = value.unit; ctx.form.checkIntervalCount = value.count; ",
                }
            }, {
                components: 'kevin-search',
                title: '搜索套件',
                isHide: false,
                colSpan: 24,
                searchAreaCol: 8,
                children: [
                    {
                        components: "el-row",
                        isHide: false,
                        title: "Layout布局",
                        colSpan: 24,
                        children: []
                    },
                ],
                events: {
                    search: '',
                    repeat: ''
                }
            }
        ]
    },
    {
        title: '数据组件',
        list: [
            {
                components: 'el-table',
                describe: "基础表格，支持普通表格、嵌套、合并",
                title: "基础表格",
                height: 30,
                isExpand: false,
                colSpan: 24,
                tableData: [],
                tableColumns: [
                    {
                        label: "列1",
                        prop: "v1",
                        slotName: "v1",
                        vModelType: 'fixed',
                        vModelActionType: "-",//单元格内容的操作类型  - 普通  input / input-number /select /radio/date-picker/link
                        vModelActionOptions: {}
                    }
                ],
                tableSelectData: [],
                tableActions: [
                    {
                        title: '编辑',
                        isHide: false,
                        events: "console.log('行内编辑')"
                    }
                ],
                childTableColums: [

                ],

                "childTableData": [],
                childTableSlotButtons: [],
                "events": {
                    "selectionChange": "widgetInfo.tableSelectData = selectList"
                },
                openPagination: false,
                paginationOptions: {
                    page: 1,
                    total: 0,
                    pageSizes: '[10, 20, 30, 40, 50]'
                },
                paginationEvents: ''

            },
            {
                components: 'el-table-tree',
                title: "树形表格",
                height: 30,
                colSpan: 24,
                rowKey: 'id',
                treeProps: '{"children":"children"}',
                tableData: [],
                tableColumns: [
                    {
                        label: "列1",
                        prop: "v1",
                        slotName: "v1",
                        vModelType: 'fixed',
                        vModelActionType: "-",//单元格内容的操作类型  - 普通  input / input-number /select /radio/date-picker/link
                        vModelActionOptions: {}
                    }
                ],
                tableActions: [
                    {
                        title: '编辑',
                        isHide: false,
                        events: "console.log('行内编辑')"
                    }
                ],
                events: {
                    checkSelectable: "",//勾选校验事件
                },
                openPagination: false,
                paginationOptions: {
                    page: 1,
                    total: 0,
                    pageSizes: '[10, 20, 30, 40, 50]'
                },
                paginationEvents: ''
            },
            {
                components: 'el-tree',
                isHide: false,
                colSpan: 24,
                title: "树形组件",
                treeData: [],//树形数据
                treeSelectData: [],//勾选的树形数据
                showCheckbox: false,//是否可以勾选
                defaultExpandAll: false,//是否默认展开所有
                defaultExpandedKeys: [],//默认展开节点数据 [1,3,4,5]
                defaultCheckedKeys: [],//默认选中节点[4,5]
                expandOnClickNode: true,//是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
                checkOnClickNode: false,//是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
                autoExpandParent: true,//展开子节点的时候是否自动展开父节点
                checkStrictly: false,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                filterNodeMethod: '',//对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
                indent: 16,//相邻级节点间的水平缩进，单位为像素
                iconClass: '',//自定义树节点的图标
                accordion: false,//是否每次只打开一个同级树节点展开
                highlightCurrent: false,//是否高亮当前选中节点
                lazy: false,//是否懒加载子节点 配合lazy
                load: "",//加载 配合load

                props: {
                    label: "label",
                    children: "children",
                },
                slotInfo: {
                    openSlot: false,
                    slotType: 'common',//common 固定的格式  code 编码脚本html自定义形式
                },
                events: {
                    nodeClick: "",//节点被点击时的回调
                    checkChange: "",//节点选中状态发生变化时的回调
                    check: "",//当复选框被点击的时候触发
                    currentChange: "",//当前选中节点变化时触发的事件
                    nodeExpand: "",//节点被展开时触发的事件
                    nodeCollapse: "",//节点被关闭时触发的事件
                }


            }
        ]

    },
    {
        title: '导航组件',

        list: [
            {
                components: 'el-tabs',
                describe: "标签组件",
                title: "Tabs",
                active: 0,
                isHide: false,
                colSpan: 24,
                attributes: {
                    type: 'card',
                    tabPosition: 'top',
                    events: {
                        tabClick: '',
                        beforeLeaveEvents: ''
                    }
                },
                children: [
                    {
                        title: "标签1",
                        isHide: false,
                        children: [
                            {
                                components: "el-row",
                                isHide: false,
                                title: "Layout布局",
                                colSpan: 24,
                                children: []
                            },
                        ]
                    }, {
                        title: "标签2",
                        isHide: false,
                        children: [
                            {
                                components: "el-row",
                                isHide: false,
                                title: "Layout布局",
                                colSpan: 24,
                                children: []
                            },
                        ]
                    },
                ]
            }
        ]
    }, {
        title: '业务组件',
        list: [
            {
                components: 'kevin-container',
                describe: "由分割线作为标题快速划定业务区域",
                title: "业务区域",
                contentPosition: 'left',
                colSpan: 24,
                isHide: false,
                children: []

            }, {
                components: 'kevin-activity',
                describe: "审批流程查看组件",
                title: "审批流程",
                colSpan: 24,
                isHide: false,
                businessData: {
                    FlowElement: [
                        {
                            activity: 30,
                            is: 'Start',
                            name: '发起审批',
                            user: '系统管理员'
                        }, {
                            activity: 30,
                            id: 'audit',
                            name: 'audit',
                            user: ['系统管理员']
                        }, {
                            activity: 10,
                            id: 'End',
                            name: '结束'
                        }
                    ],
                    hisTaskList: [
                        {
                            activityName: "提交流程",
                            assigneeName: "系统管理员",
                            comment: null,
                            durationInMillis: 0,
                            endTime: "2023-07-24 17:08:34",
                            flowName: "已提交",
                            startTime: "2023-07-24 17:08:34",
                            taskKey: "Start"
                        }, {
                            activityName: "提交流程",
                            assigneeName: "系统管理员",
                            comment: null,
                            durationInMillis: 0,
                            endTime: "2023-07-24 17:08:34",
                            flowName: "已提交",
                            startTime: "2023-07-24 17:08:34",
                            taskKey: "Start"
                        }
                    ],
                },
            }, {
                components: 'kevin-upload-device',
                describe: "新版设备附件上传组件",
                title: "分类上传组件",
                isHide: false,
                colSpan: 24,
                typeList: [
                    {
                        label: '普通附件',
                        value: '普通附件'
                    },
                ],
                selectType: '普通附件',
                fileList: [],
                actionList: [
                    {
                        label: '查看',
                        statusEvents: '',
                        clickEvents: ''
                    }
                ],
                options: {
                    action: "/common/upload",
                },
            }, {
                components: "kevin-device-acceptance",
                describe: "新版设备验收组件，支持通过验收类型来替换验收模板、支持在使用过程中替换验收情况的",
                title: "设备验收组件",
                isHide: false,
                colSpan: 24,
                options: {
                    canEditAccept: true,//是否处于验收意外的地方
                    disabled: true,//采购时整体不让编辑
                    dataSource: {
                        executionMethod: 'auto',
                        list: [],//此处需要注意 需增加 每一个单元 是否允许编辑的标记
                        allAcceptResult: [
                            {
                                label: '通过',
                                value: '1'
                            }, {
                                label: '不通过',
                                value: '0'
                            }
                        ],

                    },
                    uploadOptions: {
                        action: "/common/upload",
                        list: []
                    },
                    autoEvents: [
                        {
                            title: '确定当前显示哪个验收类型',
                            events: "_this.tableColumns = _this.widgetOptions.dataSource.list[0].content.tableColumns; _this.tableData = _this.widgetOptions.dataSource.list[0].content.tableData; _this.tableActions = _this.widgetOptions.dataSource.list[0].content.tableActions; "
                        }
                    ]
                },

            }
        ]
    }, {
        title: '图表组件（ECharts版）规划中。。。。。',
        list: []
    }, {
        title: '图表组件（Ant版）规划中。。。。。',
        list: []
    },
]
export default componentsList
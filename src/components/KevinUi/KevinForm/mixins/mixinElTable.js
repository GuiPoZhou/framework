// import { getToken } from '@/utils/auth'
const getToken = ()=>{
    return localStorage.getItem('Admin-Token')
}
export default {
    methods: {
        renderElTable(widgetInfo, widgetIndex) {
            if (widgetInfo.isHide == true && !this.draggableOpen) {
                return ('')
            }
            return (
                <el-col class={this.draggableOpen ? 'RenderCol RenderColTable' : ''} key={widgetIndex} span={widgetInfo.colSpan}>
                    {
                        this.showEditEnterNode(widgetIndex, widgetInfo)
                    }
                    <kevinTable tree-props={widgetInfo.treeProps} ref={widgetInfo.WIDGETID} key={widgetInfo.WIDGETID}
                        span-method={this.objectSpanMethod(widgetInfo)}
                        height={widgetInfo.height ? (this.innerHeight * (widgetInfo.height / 100)) : '600'} default-expand-all
                        columns={widgetInfo.tableColumns}
                        row-key={widgetInfo.rowKey}
                        showHeader={widgetInfo.showHeader == undefined ? true : widgetInfo.showHeader}
                        data={widgetInfo.tableData}
                        widgetInfo={widgetInfo}
                        hiddenSelection={widgetInfo.hiddenSelection}
                        context={this.context}
                        style="width:100%;" border
                        scopedSlots={this.getTableScopedSlots(widgetInfo)}
                        onSelectionChange={(e) => {
                            this.kevin_base_table_selectionChange(e, widgetInfo)
                        }} />
                    {
                        widgetInfo.openPagination ?
                            <kevinPagination
                                key={widgetIndex}
                                ref={widgetInfo.WIDGETID + 'Page'}
                                hidden={widgetInfo.paginationOptions.total == 0}
                                total={widgetInfo.paginationOptions.total}
                                page$sync={widgetInfo.paginationOptions.page}
                                limit={eval(widgetInfo.paginationOptions.pageSizes)[0]}
                                pageSizes={eval(widgetInfo.paginationOptions.pageSizes)}
                                onPagination={(pageInfo) => {
                                    this.kevin_paggination_change(pageInfo, widgetInfo)
                                }}
                            /> : ''

                    }
                </el-col>

            )
        },
        kevin_base_table_selectionChange(selectList, widgetInfo) {
            if (widgetInfo.events.selectionChange) {
                widgetInfo.tableSelectData = selectList
                new Function('ctx', '_this', 'selectList', 'widgetInfo', widgetInfo.events.selectionChange)(this.context, this, selectList, widgetInfo)
            } else {
                widgetInfo.tableSelectData = selectList
            }

        },
        kevin_paggination_change(pageInfo, widgetInfo) {
            new Function('ctx', '_this', 'pageInfo', 'widgetInfo', widgetInfo.paginationEvents)(this.context, this, pageInfo, widgetInfo)
        },
        // 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 }
        objectSpanMethod(widgetInfo) {
            if (widgetInfo.openMerge) {
                if (typeof widgetInfo.mergeArr == 'string') {
                    widgetInfo.mergeArr = widgetInfo.mergeArr.split(',')
                }

                if (!widgetInfo.mergeObj) {
                    widgetInfo.mergeObj = {}
                    widgetInfo.mergeArr.forEach(item => {
                        widgetInfo.mergeObj[item] = []
                    })
                }
                return (({ row, column, rowIndex, columnIndex }) => {
                    // 判断列的属性
                    if (widgetInfo.mergeArr.indexOf(column.property) !== -1) {

                        // 判断其值是不是为0
                        if (widgetInfo.mergeObj[column.property][rowIndex]) {
                            return [widgetInfo.mergeObj[column.property][rowIndex], 1]
                        } else {
                            // 如果为0则为需要合并的行
                            return [0, 0];
                        }
                    }
                })
            }
        },
        getTableScopedSlots(widgetInfo) {
            const scopedSlots = {}
            widgetInfo.tableColumns.forEach((columnInfo, columnIndex) => {
                // 展开行
                if (columnInfo.type == 'expand') {

                } else {
                    // 操作列
                    if (columnInfo.slotName == 'action') {
                        // 操作列
                        this.appendCommonTableActionColumn(scopedSlots, columnInfo, columnIndex, widgetInfo)
                    } else if (columnInfo.slotName == 'index') {
                        scopedSlots['index'] = (scope) => {
                            return (
                                <div>
                                    {++scope.$index}
                                </div>
                            )
                        }
                    } else {
                        if (columnInfo.vModelActionType == '-') {
                            this.appendCommonTableColumns(scopedSlots, columnInfo, columnIndex, widgetInfo)
                        } else {
                            this.appendFormComponentsTableColumns(scopedSlots, columnInfo, columnIndex, widgetInfo)
                        }
                    }

                }
            })
            return scopedSlots
        },
        appendCommonTableActionColumn(scopedSlots, columnInfo, columnIndex, widgetInfo) {
            scopedSlots['action'] = (scope) => {
                return (
                    <div>
                        {
                            widgetInfo.tableActions.map(slotButtonInfo => {
                                if (!slotButtonInfo.isHide) {
                                    if (this.checkMainTableActionButtonStatusEvents(slotButtonInfo, scope, columnInfo, widgetInfo)) {
                                        return (
                                            <el-button type="text"
                                                onClick={() => {
                                                    this.mainTableActionButtonEvents(slotButtonInfo, scope, columnInfo, widgetInfo)
                                                }}
                                            >{slotButtonInfo.title}</el-button>
                                        )
                                    }

                                }

                            })
                        }
                    </div>
                )
            }

        },
        mainTableActionButtonEvents(slotButtonInfo, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'slotButtonInfo', 'scope', 'columnInfo', 'widgetInfo', slotButtonInfo.events)(this.context, this, slotButtonInfo, scope, columnInfo, widgetInfo)
        },
        checkMainTableActionButtonStatusEvents(slotButtonInfo, scope, columnInfo, widgetInfo) {
            if (!slotButtonInfo.perm) {
                if (!slotButtonInfo.actionStatusEvents) {
                    return true
                } else {
                    return new Function('ctx', '_this', 'slotButtonInfo', 'scope', 'columnInfo', 'widgetInfo', slotButtonInfo.actionStatusEvents)(this.context, this, slotButtonInfo, scope, columnInfo, widgetInfo)
                }
            } else {
                if (!slotButtonInfo.actionStatusEvents && this.$checkPermi([slotButtonInfo.perm])) {
                    return true
                } else {
                    return this.$checkPermi([slotButtonInfo.perm]) && new Function('ctx', '_this', 'slotButtonInfo', 'scope', 'columnInfo', 'widgetInfo', slotButtonInfo.actionStatusEvents)(this.context, this, slotButtonInfo, scope, columnInfo, widgetInfo)
                }
            }

        },
        appendCommonTableColumns(scopedSlots, columnInfo, columnIndex, widgetInfo) {
            scopedSlots[columnInfo['slotName']] = (scope) => {
                if (!scope.row.extData) {
                    scope.row.extData = {}
                }
                return (
                    columnInfo.vModelType == 'fixed' ?
                        <span>{scope.row[columnInfo.prop]}</span> :
                        <span>{scope.row.extData[columnInfo.prop]}</span>
                )
            }
        },
        appendFormComponentsTableColumns(scopedSlots, columnInfo, columnIndex, widgetInfo) {
            scopedSlots[columnInfo['slotName']] = (scope) => {
                switch (columnInfo.vModelActionType) {
                    case 'input':
                        return this.commonTableSlotInputRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'select':
                        return this.coomonTableSlotSelectRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'inputNumber':
                        return this.commonTableSlotInputNumberRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'radio':
                        return this.commonTableSlotRadioRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'datePicker':
                        return this.commonTableSlotDatePickerRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'upload':
                        return this.commonTableSlotUploadRender(scope, columnInfo, columnIndex, widgetInfo)
                    case 'switch':
                        return this.commonTableSlotSwitch(scope, columnInfo, columnIndex, widgetInfo)
                    case 'elLink':
                        return this.commonTableSlotElLink(scope, columnInfo, columnIndex, widgetInfo)
                    case 'codeHandle':
                        return this.commonTableSlotCodeHandle(scope, columnInfo, columnIndex, widgetInfo)
                    case 'customize':
                        return this.commonTableSlotCustomize(scope, columnInfo, columnIndex, widgetInfo)
                }
            }
        },
        commonTableSlotCustomize(scope, columnInfo, columnIndex, widgetInfo) {
            return (
                <el-button type="text">选择组件</el-button>
            )
        },
        commonTableSlotCodeHandle(scope, columnInfo, columnIndex, widgetInfo) {
            switch (columnInfo.vModelActionOptions.showComponent) {
                case 'Span':
                    return this.commonTableSlotCodeHandle_span(scope, columnInfo, columnIndex, widgetInfo)
            }
        },
        commonTableSlotCodeHandle_span(scope, columnInfo, columnIndex, widgetInfo) {
            if (columnInfo.vModelActionOptions.valueType == 'string') {
                return (
                    <span>{
                        this.commonTableSlotCodeHandle_code(scope, columnInfo, widgetInfo)
                    }</span>
                )
            }
        },
        commonTableSlotCodeHandle_code(scope, columnInfo, widgetInfo) {
            return new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.handle)(this.context, this, scope, columnInfo, widgetInfo)
        },
        commonTableSlotElLink(scope, columnInfo, columnIndex, widgetInfo) {
            if (!columnInfo.vModelActionOptions.valueType || columnInfo.vModelActionOptions.valueType == 'string') {
                return (
                    <el-link
                        type={columnInfo.vModelActionOptions.type}
                        underline={columnInfo.vModelActionOptions.underline}
                        disabled={columnInfo.vModelActionOptions.disabled}
                        icon={columnInfo.vModelActionOptions.icon}
                        onClick={() => {
                            this.common_table_slot_elLink_click(scope, columnInfo, widgetInfo)
                        }}
                    >{this.commonTableSlotElLinkPropCode(scope, columnInfo, widgetInfo)}</el-link>
                )
            } else if (columnInfo.vModelActionOptions.valueType == 'array') {

                let dataList = this.commonTableSlotElLinkPropCode(scope, columnInfo, widgetInfo)
                if (Object.prototype.toString.call(dataList) === '[object Array]') {
                    if (dataList.length != 0) {
                        return (
                            dataList.map((slotLinkInfo, slotLinkIndex) => {
                                return (
                                    <el-link
                                        style="margin-right:10px"
                                        type={columnInfo.vModelActionOptions.type}
                                        underline={columnInfo.vModelActionOptions.underline}
                                        disabled={columnInfo.vModelActionOptions.disabled}
                                        icon={columnInfo.vModelActionOptions.icon}
                                        onClick={() => {
                                            this.common_table_slot_elLink_array_click(slotLinkInfo, scope, columnInfo, widgetInfo)
                                        }}
                                    >{this.commonTableSlotElLinkArrayPropCode(slotLinkInfo, scope, columnInfo, widgetInfo)}</el-link>
                                )
                            })
                        )

                    } else {
                        throw new Error('返回值为空数组')
                    }
                } else {
                    throw new Error('已开启返回值为数组')
                }
            }

        },
        commonTableSlotElLinkArrayPropCode(slotLinkInfo, scope, columnInfo, widgetInfo) {
            return new Function('ctx', '_this', 'slotLinkInfo', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.arrayPropCode)(this.context, this, slotLinkInfo, scope, columnInfo, widgetInfo)

        },
        commonTableSlotElLinkPropCode(scope, columnInfo, widgetInfo) {
            if (!columnInfo.vModelActionOptions.events || !columnInfo.vModelActionOptions.events.propCode) {
                if (columnInfo.vModelType == 'fixed') {
                    return scope.row[columnInfo['prop']];
                } else {
                    return scope.row.extData[columnInfo['prop']];
                }
            } else {
                return new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.propCode)(this.context, this, scope, columnInfo, widgetInfo)
            }
        },
        common_table_slot_elLink_array_click(slotLinkInfo, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'slotLinkInfo', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.click)(this.context, this, slotLinkInfo, scope, columnInfo, widgetInfo)

        },
        common_table_slot_elLink_click(scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.click)(this.context, this, scope, columnInfo, widgetInfo)
        },
        commonTableSlotSwitch(scope, columnInfo, columnIndex, widgetInfo) {

            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-switch
                        v-model={scope.row[columnInfo['prop']]}
                        active-color="#13ce66"
                        disabled={this.common_table_slot_switch_status(scope, columnInfo, widgetInfo)}
                        inactive-color="#ff4949"
                        active-value={columnInfo.vModelActionOptions.activeValue}
                        inactive-value={columnInfo.vModelActionOptions.inactiveValue}
                        onChange={(value) => {
                            this.common_table_slot_switch_change(value, scope, columnInfo, widgetInfo)
                        }}
                    >
                    </el-switch>
                )
            } else {
                return (
                    <el-switch
                        v-model={scope.row.extData[columnInfo['prop']]}
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        disabled={this.common_table_slot_switch_status(scope, columnInfo, widgetInfo)}
                        active-value={columnInfo.vModelActionOptions.activeValue}
                        inactive-value={columnInfo.vModelActionOptions.inactiveValue}
                        onChange={(value) => {
                            this.common_table_slot_switch_change(value, scope, columnInfo, widgetInfo)
                        }}
                    >
                    </el-switch>
                )
            }

        },
        common_table_slot_switch_status(scope, columnInfo, widgetInfo) {
            if (!columnInfo.vModelActionOptions.events.statusCode) {
                return false
            }
            return new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.statusCode)(this.context, this, scope, columnInfo, widgetInfo)
        },
        common_table_slot_switch_change(value, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'value', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.change)(this.context, this, value, scope, columnInfo, widgetInfo)
        },
        commonTableSlotUploadRender(scope, columnInfo, columnIndex, widgetInfo) {
            return (
                <div class="el-table_slot_upload">
                    <el-upload action={this.$BASE_API + columnInfo.vModelActionOptions.action + '?Authorization=' + getToken() + '&MenuId=' + localStorage.getItem('menuId')}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        accept={columnInfo.vModelActionOptions.accept ? columnInfo.vModelActionOptions.accept : '-'}
                        headers={columnInfo.vModelActionOptions.headers}
                        drag={columnInfo.vModelActionOptions.drag}
                        before-upload={(file) => {
                            eval(columnInfo.vModelActionOptions.events.beforeUpload)
                        }}
                        // 这块需要尤其注意  在upload中 on-事件 是以属性来定义的
                        {...{
                            props: {
                                "on-success": (res, file) => {
                                    res.filePath = res.url
                                    this.common_table_slot_upload_success(res, scope, columnInfo, widgetInfo)
                                }
                            }
                        }}
                        multiple={false}
                        showFileList={false}
                        file-list={columnInfo.vModelActionOptions.fileList}
                    >
                        {
                            !columnInfo.vModelActionOptions.disabled ? <el-button type="primary" size="mini">上传</el-button> : ''
                        }

                    </el-upload>
                    <el-button style="margin:0 0.7rem" type="text" onClick={() => {
                        this.commonTableSlotUploadShow(scope, columnInfo, widgetInfo)
                    }}>查看</el-button>
                </div>

            )
        },
        commonTableSlotUploadShow(scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.showCode)(this.context, this, scope, columnInfo, widgetInfo)
        },
        common_table_slot_upload_success(res, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'res', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.onSuccess)(this.context, this, res, scope, columnInfo, widgetInfo)
        },
        commonTableSlotDatePickerRender(scope, columnInfo, columnIndex, widgetInfo) {
            let SlotDatePickerOptions = {
                ...columnInfo.vModelActionOptions
            }
            SlotDatePickerOptions.disabled = columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)
            if (columnInfo.vModelActionOptions.type == 'datetimerange' || columnInfo.vModelActionOptions.type == 'daterange' || columnInfo.vModelActionOptions.type == 'monthrange') {
                SlotDatePickerOptions.defaultTime = eval(columnInfo.vModelActionOptions.defaultTime)
            } else {
                delete SlotDatePickerOptions.defaultTime
            }
            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-date-picker
                        v-model={scope.row[columnInfo['prop']]}
                        {...{ props: SlotDatePickerOptions }}
                        onChange={(value) => {
                            this.common_table_slot_date_picker_change(value, scope, columnInfo, widgetInfo)
                        }}
                    >
                    </el-date-picker>
                )
            } else {
                return (
                    <el-date-picker
                        v-model={scope.row.extData[columnInfo['prop']]}
                        {...{ props: SlotDatePickerOptions }}
                        onChange={(value) => {
                            this.common_table_slot_date_picker_change(value, scope, columnInfo, widgetInfo)
                        }}
                    >
                    </el-date-picker>
                )
            }
        },
        common_table_slot_date_picker_change(value, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'value', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.change)(this.context, this, value, scope, columnInfo, widgetInfo)
        },
        commonTableSlotRadioRender(scope, columnInfo, columnIndex, widgetInfo) {
            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-radio-group
                        v-model={scope.row[columnInfo['prop']]}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        onInput={(newValue) => {
                            this.tableSlotRadioInput(newValue, scope, columnInfo, widgetInfo)
                        }}
                    >
                        {
                            columnInfo.vModelActionOptions.dataSource.list.map((radioOptions, radioIndex) => {
                                return (
                                    <el-radio label={radioOptions.value}>{radioOptions.label}</el-radio>
                                )
                            })
                        }
                    </el-radio-group>
                )
            } else {
                return (
                    <el-radio-group
                        v-model={scope.row.extData[columnInfo['prop']]}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        onInput={(newValue) => {
                            this.tableSlotRadioInput(newValue, scope, columnInfo, widgetInfo)
                        }}
                    >
                        {
                            columnInfo.vModelActionOptions.dataSource.list.map((radioOptions, radioIndex) => {
                                return (
                                    <el-radio label={radioOptions.value}>{radioOptions.label}</el-radio>
                                )
                            })
                        }
                    </el-radio-group>
                )
            }
        },
        tableSlotRadioInput(newValue, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'newValue', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.input)(this.context, this, newValue, scope, columnInfo, widgetInfo)
        },
        commonTableSlotInputNumberRender(scope, columnInfo, columnIndex, widgetInfo) {
            let inputNumberOptions = {
                label: columnInfo.vModelActionOptions.label,
                disabled: columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo),
                readonly: columnInfo.vModelActionOptions.readonly,
                min: columnInfo.vModelActionOptions.min,
                max: columnInfo.vModelActionOptions.max,
                step: columnInfo.vModelActionOptions.step,
                precision: columnInfo.vModelActionOptions.precision,
                stepStrictly: columnInfo.vModelActionOptions.stepStrictly,
                placeholder: columnInfo.vModelActionOptions.placeholder,
            }
            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-input-number
                        v-model={scope.row[columnInfo['prop']]}
                        {...{ props: inputNumberOptions }}
                        onChange={(currentValue, oldValue) => {
                            this.tableSlotInputNumberChange(currentValue, oldValue, scope, columnInfo, widgetInfo)
                        }}
                        onBlur={() => {
                            this.tableSlotInpuNumberBlur(scope, columnInfo, widgetInfo)
                        }}
                        onFocus={() => {
                            this.tableSlotInputNumberFocus(scope, columnInfo, widgetInfo)
                        }}
                    ></el-input-number>
                )
            } else {
                return (
                    <el-input-number
                        v-model={scope.row.extData[columnInfo['prop']]}
                        {...{ props: inputNumberOptions }}
                        onChange={(currentValue, oldValue) => {
                            this.tableSlotInputNumberChange(currentValue, oldValue, scope, columnInfo, widgetInfo)
                        }}
                        onBlur={() => {
                            this.tableSlotInpuNumberBlur(scope, columnInfo, widgetInfo)
                        }}
                        onFocus={() => {
                            this.tableSlotInputNumberFocus(scope, columnInfo, widgetInfo)
                        }}
                    ></el-input-number>
                )

            }
        },
        tableSlotInputNumberFocus(scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.focus)(this.context, this, scope, columnInfo, widgetInfo)

        },
        tableSlotInpuNumberBlur(scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.blur)(this.context, this, scope, columnInfo, widgetInfo)
        },
        tableSlotInputNumberChange(currentValue, oldValue, scope, columnInfo, widgetInfo) {
            new Function('ctx', '_this', 'currentValue', 'oldValue', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.change)(this.context, this, currentValue, oldValue, scope, columnInfo, widgetInfo)
        },
        commonTableSlotInputRender(scope, columnInfo, columnIndex, widgetInfo) {
            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-input className="tableSlotInput"
                        onBlur={() => {
                            this.tableSlotInputBlur(scope, columnInfo, widgetInfo)
                        }}
                        onFocus={() => {
                            this.tableSlotInputFocus(scope, columnInfo, widgetInfo)
                        }}
                        onInput={(value) => {
                            this.tableSlotInputInput(value, scope, columnInfo, widgetInfo)
                        }}
                        onClear={() => {
                            this.tableSlotInputClear(scope, columnInfo, widgetInfo)
                        }}
                        nativeOnKeyup={(keyInfo) => {
                            this.tableSlotInputEnter(keyInfo, scope, columnInfo, widgetInfo)
                        }}
                        key={columnIndex}
                        readonly={columnInfo.vModelActionOptions.readonly}
                        showPassword={columnInfo.vModelActionOptions.showPassword}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        v-model={scope.row[columnInfo['prop']]}></el-input>
                )
            } else {
                return (
                    <el-input className="tableSlotInput"
                        onBlur={() => {
                            this.tableSlotInputBlur(scope, columnInfo, widgetInfo)
                        }}
                        onFocus={() => {
                            this.tableSlotInputFocus(scope, columnInfo, widgetInfo)
                        }}
                        onInput={(value) => {
                            this.tableSlotInputInput(value, scope, columnInfo, widgetInfo)
                        }}
                        onClear={() => {
                            this.tableSlotInputClear(scope, columnInfo, widgetInfo)
                        }}
                        nativeOnKeyup={(keyInfo) => {
                            this.tableSlotInputEnter(keyInfo, scope, columnInfo, widgetInfo)
                        }}
                        key={columnIndex}
                        readonly={columnInfo.vModelActionOptions.readonly}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        showPassword={columnInfo.vModelActionOptions.showPassword}
                        v-model={scope.row.extData[columnInfo['prop']]}></el-input>
                )
            }
        },
        commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo) {
            if (!columnInfo.vModelActionOptions.events || !columnInfo.vModelActionOptions.events.disabledCode) {
                return false
            }
            return new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.disabledCode)(this.context, this, scope, columnInfo, widgetInfo)
        },
        tableSlotInputClear(scope, columnInfo, widgetInfo) {
            if (columnInfo.vModelActionOptions.events && columnInfo.vModelActionOptions.events.clear) {
                new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.clear)(this.context, this, scope, columnInfo, widgetInfo)

            }
        },
        tableSlotInputFocus(scope, columnInfo, widgetInfo) {
            if (columnInfo.vModelActionOptions.events && columnInfo.vModelActionOptions.events.focus) {
                new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.focus)(this.context, this, scope, columnInfo, widgetInfo)

            }
        },
        tableSlotInputBlur(scope, columnInfo, widgetInfo) {
            if (columnInfo.vModelActionOptions.events && columnInfo.vModelActionOptions.events.blur) {
                new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.blur)(this.context, this, scope, columnInfo, widgetInfo)

            }
        },
        tableSlotInputInput(value, scope, columnInfo, widgetInfo) {
            if (columnInfo.vModelActionOptions.events && columnInfo.vModelActionOptions.events.input) {
                new Function('ctx', '_this', 'value', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.input)(this.context, this, value, scope, columnInfo, widgetInfo)

            }
        },
        tableSlotInputEnter(keyInfo, scope, columnInfo, widgetInfo) {
            if (keyInfo.keyCode == 13) {
                if (columnInfo.vModelActionOptions.events && columnInfo.vModelActionOptions.events.enter) {
                    new Function('ctx', '_this', 'scope', 'columnInfo', 'widgetInfo', columnInfo.vModelActionOptions.events.enter)(this.context, this, scope, columnInfo, widgetInfo)

                }
            }
        },
        coomonTableSlotSelectRender(scope, columnInfo, columnIndex, widgetInfo) {
            if (columnInfo.vModelType == 'fixed') {
                return (
                    <el-select v-model={scope.row[columnInfo['prop']]}
                        filterable={columnInfo.vModelActionOptions.filterable}
                        multiple={columnInfo.vModelActionOptions.multiple}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        multiple-limit={columnInfo.vModelActionOptions.multipleLimit}>
                        {
                            columnInfo.vModelActionOptions.dataSource.list.map((selectOptions, selectOptionIndex) => {
                                return (
                                    <el-option label={selectOptions.label} value={selectOptions.value}></el-option>
                                )
                            })
                        }
                    </el-select>
                )
            } else {
                return (
                    <el-select v-model={scope.row.extData[columnInfo['prop']]}
                        filterable={columnInfo.vModelActionOptions.filterable}
                        multiple={columnInfo.vModelActionOptions.multiple}
                        disabled={columnInfo.vModelActionOptions.disabled || this.commonTableSlotDisabledStatus(scope, columnInfo, widgetInfo)}
                        multiple-limit={columnInfo.vModelActionOptions.multipleLimit}>
                        {
                            columnInfo.vModelActionOptions.dataSource.list.map((selectOptions, selectOptionIndex) => {
                                return (
                                    <el-option label={selectOptions.label} value={selectOptions.value}></el-option>
                                )
                            })
                        }
                    </el-select>
                )
            }
        }
    }
}
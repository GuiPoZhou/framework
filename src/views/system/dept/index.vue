<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="部门名称" prop="deptName">
                <el-input
                    v-model="queryParams.deptName"
                    placeholder="请输入部门名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="部门状态" clearable>
                    <el-option
                        v-for="dict in dict.type.sys_normal_disable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                    v-hasPermi="['system:dept:add']"
                >新增
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="info"
                    plain
                    icon="el-icon-sort"
                    size="mini"
                    @click="toggleExpandAll"
                >展开/折叠
                </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table
            v-if="refreshTable"
            v-loading="loading"
            :data="deptList"
            row-key="deptId"
            :default-expand-all="isExpandAll"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="deptName" label="部门名称" width="260" ></el-table-column>
            <el-table-column prop="orderNum" label="排序" width="200" align="center"></el-table-column>
            <el-table-column prop="extDeptCode" label="外部ID" width="200" align="center"></el-table-column>
            <el-table-column prop="deptType" label="类型" width="200" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.deptType == 1 || !scope.row.deptType">机构</span>
                    <span v-if="scope.row.deptType == 2">部门</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="200">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['system:dept:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-plus"
                        @click="handleAdd(scope.row)"
                        v-hasPermi="['system:dept:add']"
                    >新增
                    </el-button>
                    <el-button
                        v-if="scope.row.parentId != 0"
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['system:dept:remove']"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加或修改部门对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="24" v-if="form.parentId !== 0">
                        <el-form-item label="上级部门" prop="parentId">
                            <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer"
                                        placeholder="选择上级部门"/>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="部门名称" prop="deptName">
                            <el-input v-model="form.deptName" placeholder="请输入部门名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="显示排序" prop="orderNum">
                            <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
                        </el-form-item>
                    </el-col>

<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="负责人" prop="leader">-->
<!--                            <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20"/>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="12">
                        <el-form-item label="负责人" prop="leaderIdList">
                            <el-select v-model="form.leaderIdList" filterable multiple placeholder="请选择">
                                <el-option
                                        v-for="item in userList"
                                        :key="item.userId"
                                        :label="item.nickName"
                                        :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11"/>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外部ID" prop="extDeptCode">
                            <el-input v-model="form.extDeptCode" placeholder="请输入外部ID" maxlength="50"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门类型" prop="deptType">
                            <el-select v-model="form.deptType">
                                <el-option v-for="(v,i) in deptTypeList" :key="v.value" :label="v.label" :value="v.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门状态">
                            <el-radio-group v-model="form.status">
                                <el-radio
                                    v-for="dict in dict.type.sys_normal_disable"
                                    :key="dict.value"
                                    :label="dict.value"
                                >{{ dict.label }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild} from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "Dept",
    dicts: ['sys_normal_disable'],
    components: {Treeselect},
    data() {
        return {
            // 遮罩层
            loading: true,
            // 显示搜索条件
            showSearch: true,
            // 表格树数据
            deptList: [],
            // 部门树选项
            deptOptions: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 是否展开，默认全部展开
            isExpandAll: true,
            // 重新渲染表格状态
            refreshTable: true,
            // 查询参数
            queryParams: {
                deptName: undefined,
                status: undefined
            },
            deptTypeList:[
                {
                    label:'机构',
                    value:1
                },{
                    label:'部门',
                    value:2
                },
            ],
            // 表单参数
            form: {
                deptType:1
            },
            // 表单校验
            rules: {
                parentId: [
                    {required: true, message: "上级部门不能为空", trigger: "blur"}
                ],
                deptName: [
                    {required: true, message: "部门名称不能为空", trigger: "blur"}
                ],
                orderNum: [
                    {required: true, message: "显示排序不能为空", trigger: "blur"}
                ],
                email: [
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                phone: [
                    {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ]
            },
            userList:[],//人员列表
        };
    },
    created() {
        this.getList();
        this.e_getUserList()
    },
    methods: {
        /**
        * @author Coder
        * @date 2023/5/6
        * @des 查询人员列表
        */
        e_getUserList(){
            this.$net('system/user/list?pageNum=1&pageSize=10000','get').then(re=>{
                this.userList = re.rows
            })
        },
        /** 查询部门列表 */
        getList() {
            this.loading = true;
            listDept(this.queryParams).then(response => {
                this.deptList = this.handleTree(response.data, "deptId");
                this.loading = false;
            });
        },
        /** 转换部门数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.deptId,
                label: node.deptName,
                children: node.children
            };
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                deptId: undefined,
                parentId: undefined,
                deptName: undefined,
                orderNum: undefined,
                leader: undefined,
                phone: undefined,
                email: undefined,
                status: "0",
                deptType:1
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /** 新增按钮操作 */
        handleAdd(row) {
            this.reset();
            if (row != undefined) {
                this.form.parentId = row.deptId;
            }
            this.open = true;
            this.title = "添加部门";
            listDept().then(response => {
                this.deptOptions = this.handleTree(response.data, "deptId");
            });
        },
        /** 展开/折叠操作 */
        toggleExpandAll() {
            this.refreshTable = false;
            this.isExpandAll = !this.isExpandAll;
            this.$nextTick(() => {
                this.refreshTable = true;
            });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            getDept(row.deptId).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改部门";
            });
            listDeptExcludeChild(row.deptId).then(response => {
                this.deptOptions = this.handleTree(response.data, "deptId");
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.deptId != undefined) {
                        updateDept(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addDept(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            this.$modal.confirm('是否确认删除名称为"' + row.deptName + '"的数据项？').then(function () {
                return delDept(row.deptId);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        }
    }
};
</script>

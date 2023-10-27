<template>
    <div class="app-container" style="background-color: #fff;margin: 10px;">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="菜单名称" prop="menuName">
                <el-input
                    v-model="queryParams.menuName"
                    placeholder="请输入菜单名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="菜单状态" clearable>
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
                    v-hasPermi="['system:menu:add']"
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
            :data="menuList"
            row-key="menuId"
            :default-expand-all="isExpandAll"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="menuName" label="菜单名称"
                             ></el-table-column>
            <el-table-column prop="icon" label="图标" align="center" >
                <template slot-scope="scope">
                    <svg-icon :icon-class="scope.row.icon"/>
                </template>
            </el-table-column>
            <el-table-column prop="menuType" label="类型" align="center">
                <template slot-scope="scope">
                    <el-tag effect="dark" v-if="scope.row.menuType == 'M'">目录</el-tag>
                    <el-tag effect="dark" type="success" v-if="scope.row.menuType == 'C'">菜单</el-tag>
                    <el-tag effect="dark" type="warning" v-if="scope.row.menuType == 'F'">权限</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="排序" align="center"></el-table-column>
            <el-table-column prop="perms" label="权限标识" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.perms" type="warning" effect="dark" size="small">{{ scope.row.perms }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="230">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-show="scope.row.menuType != 'F'"
                        v-hasPermi="['system:menu:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-plus"
                        @click="handleAdd(scope.row)"
                        v-show="scope.row.menuType != 'F' && scope.row.menuType != 'C' "
                        v-hasPermi="['system:menu:add']"
                    >新增
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-plus"
                        @click="e_addPerm(scope.row)"
                        v-show="scope.row.menuType == 'C'"
                        v-hasPermi="['system:menu:add']"
                    >新增权限
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['system:menu:remove']"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加或修改菜单对话框 -->
        <div v-if="showMenuLog">
            <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="上级菜单">
                                <treeselect
                                    v-model="form.parentId"
                                    :options="menuOptions"
                                    :normalizer="normalizer"
                                    :show-count="true"
                                    placeholder="选择上级菜单"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单类型" prop="menuType">
                                <el-radio-group v-model="form.menuType">
                                    <el-radio label="M">目录</el-radio>
                                    <el-radio label="C">菜单</el-radio>
                                    <!--                                <el-radio label="F">权限</el-radio>-->
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.menuType != 'F'">
                            <el-form-item label="菜单图标" prop="icon">
                                <el-popover
                                    placement="bottom-start"
                                    width="460"
                                    trigger="click"
                                    @show="$refs['iconSelect'].reset()"
                                >
                                    <IconSelect ref="iconSelect" @selected="selected"/>
                                    <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                                        <svg-icon
                                            v-if="form.icon"
                                            slot="prefix"
                                            :icon-class="form.icon"
                                            class="el-input__icon"
                                            style="height: 32px;width: 16px;"
                                        />
                                        <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
                                    </el-input>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.menuType == 'C'">
                            <el-form-item label="选择路由表">
                                <el-button type="primary" size="small" @click="e_selMicroRouter">选择</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单名称" prop="menuName">
                                <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="显示排序" prop="orderNum">
                                <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12" v-if="form.menuType != 'F'">
                            <el-form-item>
                              <span slot="label">
                                <el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                                <i class="el-icon-question"></i>
                                </el-tooltip>
                                是否外链
                              </span>
                                <el-radio-group v-model="form.isFrame">
                                    <el-radio label="0">是</el-radio>
                                    <el-radio label="1">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <!--            微前端开始  目录不在参与路由的定义-->
                        <el-col :span="12" v-if="form.menuType == 'C'">
                            <el-form-item prop="path">
              <span slot="label">
                <el-tooltip
                    content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头,微前端不要修改填充的路径，以防无法正确访问"
                    placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由地址
              </span>
                                <el-input v-model="form.path" placeholder="请输入路由地址"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径(微前端子应用无视该输入框)" />
            </el-form-item>
          </el-col>

                        <el-col :span="12" v-if="form.menuType != 'M'">
                            <el-form-item>
                                <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100"/>
                                <span slot="label">
                <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                            placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                权限字符
              </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.menuType == 'C'">
                            <el-form-item>
                                <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255"/>
                                <span slot="label">
                <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由参数
              </span>
                            </el-form-item>
                        </el-col>
                        <!--                    <el-col :span="12" v-if="form.menuType == 'C'">-->
                        <!--                        <el-form-item>-->
                        <!--              <span slot="label">-->
                        <!--                <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">-->
                        <!--                <i class="el-icon-question"></i>-->
                        <!--                </el-tooltip>-->
                        <!--                是否缓存-->
                        <!--              </span>-->
                        <!--                            <el-radio-group v-model="form.isCache">-->
                        <!--                                <el-radio label="0">缓存</el-radio>-->
                        <!--                                <el-radio label="1">不缓存</el-radio>-->
                        <!--                            </el-radio-group>-->
                        <!--                        </el-form-item>-->
                        <!--                    </el-col>-->
                        <el-col :span="12" v-if="form.menuType != 'F'">
                            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                显示状态
              </span>
                                <el-radio-group v-model="form.visible">
                                    <el-radio
                                        v-for="dict in dict.type.sys_show_hide"
                                        :key="dict.value"
                                        :label="dict.value"
                                    >{{ dict.label }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.menuType != 'F'">
                            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                菜单状态
              </span>
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
                <el-divider v-if="form.menuType =='C'" content-position="left">权限列表</el-divider>
                <el-table
                    v-if="form.menuType =='C'"
                    :data="form.children"
                    style="width: 100%">
                    <el-table-column
                        prop="menuName"
                        align="center"
                        label="权限名称">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.menuName" style="width: 200px;text-align: center"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="perms"
                        align="center"
                        label="权限标识">
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>
        </div>

        <!--        选择路由表-->
        <MicroAppRouter ref="MicroAppRouter" v-if="showMicroAppRouter" @close="e_closeMicroAppRouter"
                        @confirm="e_confirmSel"/>
        <!--        新增权限-->
        <AddPerm ref="AddPerm" v-if="showAddPerm" @close="e_closeReload"/>
    </div>
</template>

<script>
import {listMenu, getMenu, delMenu, addMenu, updateMenu} from "@/api/system/menu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import MicroAppRouter from "./dialog/microAppRouter";
import AddPerm from "./dialog/addPerm.vue";

export default {
    name: "MenuManage",
    dicts: ['sys_show_hide', 'sys_normal_disable'],
    components: {Treeselect, IconSelect, MicroAppRouter, AddPerm},
    data() {
        return {
            showMenuLog: true,
            showAddPerm: false,
            showMicroAppRouter: false,
            // 遮罩层
            loading: true,
            // 显示搜索条件
            showSearch: true,
            // 菜单表格树数据
            menuList: [],
            // 菜单树选项
            menuOptions: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 是否展开，默认全部折叠
            isExpandAll: false,
            // 重新渲染表格状态
            refreshTable: true,
            // 查询参数
            queryParams: {
                menuName: undefined,
                visible: undefined
            },
            sysType: '',//平台类型
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                menuName: [
                    {required: true, message: "菜单名称不能为空", trigger: "blur"}
                ],
                orderNum: [
                    {required: true, message: "菜单顺序不能为空", trigger: "blur"}
                ],

                // path: [
                //   { required: true, message: "路由地址不能为空", trigger: "blur" }
                // ]
            }
        };
    },
    created() {
        this.sysType = this.$route.query.platFormType
        this.getList();
    },
    watch: {
        $route() {
            if (this.$route.query.platFormType) {
                this.sysType = this.$route.query.platFormType
                this.getList();
            }
        }
    },
    methods: {
        /**
         * @author Coder
         * @date 2022/12/16
         * @des 关闭权限添加按钮刷新
         */
        e_closeReload() {
            this.showAddPerm = false
            this.getList();
        },
        /**
         * @author Coder
         * @date 2022/12/16
         * @des 菜单单独增加权限
         */
        e_addPerm(row) {
            this.showAddPerm = true
            this.$nextTick(() => {
                this.$refs.AddPerm.init(JSON.parse(JSON.stringify(row)))
            })
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 确定选择的路由
         */
        e_confirmSel(row) {
            this.showMicroAppRouter = false
            this.form.path = row.path
            this.form.menuName = row.meta
            this.form.children = row.children
            this.form.children.map(item=>{
                item.sysType = this.sysType
            })
            this.form = {...this.form}
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 选择路由表
         */
        e_selMicroRouter() {
            this.showMicroAppRouter = true
            this.$nextTick(() => {
                this.$refs.MicroAppRouter.init()
            })
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 关闭
         */
        e_closeMicroAppRouter() {
            this.showMicroAppRouter = false
        },
        // 选择图标
        selected(name) {
            this.form.icon = name;
        },
        /** 查询菜单列表 */
        getList() {
            this.loading = true;
            this.queryParams.sysType = this.sysType
            listMenu(this.queryParams).then(response => {
                this.menuList = this.handleTree(response.data, "menuId");
                this.loading = false;
            });
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.menuId,
                label: node.menuName,
                children: node.children
            };
        },
        /** 查询菜单下拉树结构 */
        getTreeselect() {
            listMenu({sysType:this.sysType}).then(response => {
                this.menuOptions = [];
                const menu = {menuId: 0, menuName: '主类目', children: []};
                menu.children = this.handleTree(response.data, "menuId");
                this.menuOptions.push(menu);
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
            this.getList()
        },
        // 表单重置
        reset() {
            this.form = {
                menuId: undefined,
                parentId: 0,
                menuName: undefined,
                icon: undefined,
                menuType: "M",
                orderNum: undefined,
                isFrame: "1",
                isCache: "0",
                visible: "0",
                status: "0",
            };
            // this.resetForm("form");
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
            this.getTreeselect();
            if (row != null && row.menuId) {
                this.form.parentId = row.menuId;
            } else {
                this.form.parentId = 0;
            }
            this.open = true;
            this.title = "添加菜单";
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
            this.getTreeselect();
            getMenu(row.menuId).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改菜单";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.menuId != undefined) {
                        updateMenu(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.form.sysType = this.sysType
                        addMenu(this.form).then(response => {
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
            this.$modal.confirm('是否确认删除名称为"' + row.menuName + '"的数据项？').then(function () {
                return delMenu(row.menuId);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        }
    }
};
</script>

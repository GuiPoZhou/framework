<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--类型数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--属性数据-->
      <el-col :span="20" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="属性名" prop="attrName">
              <el-input
                v-model="queryParams.attrName"
                placeholder="请输入属性名"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="中文名" prop="attrNameZh">
              <el-input
                v-model="queryParams.attrNameZh"
                placeholder="请输入属性中文名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        </el-row>
        <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['biz:attrs:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['biz:attrs:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['biz:attrs:remove']"
          >删除</el-button>
        </el-col>
        </el-row>
      
    <el-table v-loading="loading" :data="attrsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      
      <el-table-column label="属性名称" align="center" prop="attrName" />
      <el-table-column label="属性中文名" align="center" prop="attrNameZh" />
      <!-- <el-table-column label="属性简称" align="center" prop="simpleName" /> -->
      <el-table-column label="是否扩展属性" align="center" prop="extend">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.extend"/>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center" prop="display">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.display"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['biz:attrs:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['biz:attrs:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    </el-col>
   </el-row>
    <!-- 添加或修改类型属性对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型ID" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入类型ID" disabled/>
        </el-form-item>
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="form.typeName" placeholder="类型名称" disabled/>
        </el-form-item>
        <el-form-item label="属性名称" prop="attrName">
          <el-input v-model="form.attrName" placeholder="请输入属性名称" />
        </el-form-item>
        <el-form-item label="属性中文名" prop="attrNameZh">
          <el-input v-model="form.attrNameZh" placeholder="请输入属性中文名" />
        </el-form-item>
        <el-form-item label="属性简称" prop="simpleName">
          <el-input v-model="form.simpleName" placeholder="请输入属性简称" />
        </el-form-item>
        <el-form-item label="是否扩展属性" prop="extend">
          <el-select v-model="form.extend" placeholder="是否扩展属性">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" prop="display">
          <el-select v-model="form.display" placeholder="请选择是否显示">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import { listAttrs, getAttrs, delAttrs, addAttrs, updateAttrs,typeTreeSelect } from "@/api/biz/attrs";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { MessageBox } from 'element-ui';

export default {
  name: "User",
  dicts: ['sys_yes_no'],
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 类型属性表格数据
      attrsList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer "  },
        
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeId: null,
        typeName: null,
        typeNameZh: null,
        attrName: null,
        attrNameZh: null,
        simpleName: null,
      },
      
      // 表单校验
      rules: {
        typeId: [
          { required: true, message: "类型ID不能为空", trigger: "change" }
        ],
        attrName: [
          { required: true, message: "属性名称不能为空", trigger: "blur" }
        ],
        attrNameZh: [
          { required: true, message: "属性中文名不能为空", trigger: "blur" }
        ],
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getList();
    this.getTypeTree();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listAttrs(this.queryParams).then(response => {
        this.attrsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getTypeTree() {
      typeTreeSelect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.typeId = data.id;
      this.queryParams.typeName = data.label;
      this.handleQuery();
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        typeId: null,
        typeName: null,
        attrName: null,
        attrNameZh: null,
        simpleName: null,
        display: "Y",
        extend: "N"
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      let tname = this.queryParams.typeId;
      if(tname){
        this.reset();
        this.open = true;
        this.title = "添加类型属性";
        this.form.typeId=this.queryParams.typeId;
        this.form.typeName=this.queryParams.typeName;
      }else{
        
        this.$message({
          type: 'warning',
          message: '请先选择类型'
        });  
      }
      
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAttrs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改类型属性";
      });
    },
    
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAttrs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAttrs(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除类型属性编号为"' + ids + '"的数据项？').then(function() {
        return delAttrs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('biz/attrs/export', {
        ...this.queryParams
      }, `attrs_${new Date().getTime()}.xlsx`)
    },
  }
};
</script>
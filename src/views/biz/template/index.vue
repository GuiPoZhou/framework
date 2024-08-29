<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="编码" prop="templateCode">
        <el-input
          v-model="queryParams.templateCode"
          placeholder="请输入编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模版名称" prop="templateName">
        <el-input
          v-model="queryParams.templateName"
          placeholder="请输入模版名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="templateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="编码" align="center" prop="templateCode" />
      <el-table-column label="模版名称" align="center" prop="templateName" />
      <el-table-column label="模板类型" align="center" prop="templateType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.biz_template_type" :value="scope.row.templateType"/>
        </template>
      </el-table-column>
      <el-table-column label="单样品" align="center" prop="singleSample" v-if="false">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.singleSample"/>
        </template>
      </el-table-column>
      <el-table-column label="单项目" align="center" prop="singleItem" v-if="false">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.singleItem"/>
        </template>
      </el-table-column>
      <el-table-column label="业务标识" align="center" prop="bizObjKey" />
      <el-table-column label="启用状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="模版文件" align="center" prop="templatePath" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

    <!-- 添加或修改模版对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="templateCode">
          <el-input v-model="form.templateCode" placeholder="请输入编码"  disabled/>
        </el-form-item>
        <el-form-item label="模版名称" prop="templateName">
          <el-input v-model="form.templateName" placeholder="请输入模版名称" />
        </el-form-item>
        <el-form-item label="名称后缀" v-if="this.form.id == null">
          <el-input v-model="form.suffix" placeholder="请输入模版名称"/>
        </el-form-item>
        <el-form-item label="模板类型" prop="templateType">
          <el-select v-model="form.templateType" placeholder="请选择模版类型">
            <el-option
            v-for="dict in dict.type.biz_template_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模版文件" prop="templatePath">
          <file-uploadTp  :fileType="['docx']" :limit=1 v-model="form.templatePath"/>
        </el-form-item>
        <el-form-item label="单样品" prop="singleSample" v-if="false">
          <el-select v-model="form.singleSample" placeholder="是否单样品">
            <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单项目" prop="singleItem" v-if="false">
          <el-select v-model="form.singleItem" placeholder="是否单项目">
            <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务标识" prop="bizObjKey">
          <el-input v-model="form.bizObjKey" placeholder="请输入业务标识" />
        </el-form-item>
        <el-form-item label="启用状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="comments">
          <el-input type="textarea" v-model="form.comments" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleRowAdd"
        >新增表格合并规则</el-button>
      </el-col>
    </el-row>
     <el-table tooltip-effect="light" :data="form.ruleList" >
				<el-table-column label="变量名" prop="typeName" min-width="150">
          <template slot-scope="scope">
						<el-select
              v-model="scope.row.typeName"
              filterable
              allow-create
              placeholder="请选择或输入">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
					</template>
				</el-table-column>
        <el-table-column label="合并规则" prop="mergeRule" min-width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.mergeRule" placeholder="如0-0,1-3多规则逗号分隔" />
					</template>
				</el-table-column>
        <el-table-column label="列合并" prop="colMerge" min-width="50">
          <template slot-scope="scope">
            <el-select v-model="scope.row.colMerge" placeholder="列合并">
            <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            />
          </el-select>
          </template>
				</el-table-column>
        <el-table-column label="行合并" prop="rowMerge" min-width="50">
          <template slot-scope="scope">
            <el-select v-model="scope.row.rowMerge" placeholder="行合并">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
              />
            </el-select>
          </template>
				</el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right"
					width="150">
					<template slot-scope="scope">
						<el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdateYes(scope.row)"
							v-hasPermi="['system:order:edit']">增加</el-button>
						<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDeleteProduct(scope.row)"
							v-hasPermi="['system:order:remove']">删除</el-button>
					</template>
				</el-table-column>
		</el-table>
  <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleLinkAdd"
        >新增子模版</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="tplinkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主模板编码" align="center" prop="mainCode" />
      <el-table-column label="子模版编码" align="center" prop="childCode" />
      <el-table-column label="集合变量" align="center" prop="mainKey" />
      <el-table-column label="集合类型" align="center" prop="childKey" />
      <el-table-column label="备注" align="center" prop="comments" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleLinkUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleLinkDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="linkTotal"
      :page.sync="queryLinkParams.pageNum"
      :limit.sync="queryLinkParams.pageSize"
      @pagination="getLinkList"
    />

    <!-- 添加或修改模版关系对话框 -->
    <el-dialog :title="title" :visible.sync="linkOpen" width="500px" append-to-body>
      <el-form ref="linkForm" :model="linkForm" :rules="linkRules" label-width="80px">
        <el-form-item label="主模板编码" prop="mainCode">
          <el-input v-model="linkForm.mainCode" placeholder="请输入主模板编码" disabled/>
        </el-form-item>
        <el-form-item label="子模版编码" prop="childCode">
          <el-input v-model="linkForm.childCode" placeholder="请输入子模版编码" />
        </el-form-item>
        <el-form-item label="集合变量" prop="mainKey">
          <el-input v-model="linkForm.mainKey" placeholder="请输入集合变量" />
        </el-form-item>
        <el-form-item label="集合类型" prop="childKey">
          <el-input v-model="linkForm.childKey" placeholder="请输入集合类型" />
        </el-form-item>
        <el-form-item label="备注" prop="comments">
          <el-input v-model="linkForm.comments" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitLinkForm">确 定</el-button>
        <el-button @click="linkCancel">取 消</el-button>
      </div>
    </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTemplate, getTemplate, delTemplate, addTemplate, updateTemplate ,getTemplateCode} from "@/api/biz/template";
import { listTplink, getTplink, delTplink, addTplink, updateTplink } from "@/api/biz/tplink";
import { getToken } from "@/utils/auth";
export default {
  name: "Template",
  dicts: ['biz_template_type', 'biz_template_biztype', 'biz_template_objs', 'sys_normal_disable', 'sys_yes_no'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 选中数组
      linkIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 总条数
      linkTotal: 0,
      // 模版表格数据
      templateList: [],
      typeList: [
          { value: 'samples', label: '样品列表' },
          { value: 'items', label: '检测项目列表' },
        ],
      // 模版关系表格数据
      tplinkList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      linkOpen: false,
      // 查询模板参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        templateCode: null,
        templateName: null,
        templatePath: null,
      },
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      // 查询Link参数
      queryLinkParams: {
        pageNum: 1,
        pageSize: 10,
        mainCode: null,
        childCode: null,
      },
      // 表单参数
      form: {
        ruleList:[]
      },
      // 表单参数
      linkForm: {},
      // 表单校验
      rules: {
        templateCode: [
          { required: true, message: "编码不能为空", trigger: "blur" }
        ],
        templateName: [
          { required: true, message: "模版名称不能为空", trigger: "blur" }
        ],
      },
      // 表单校验
      linkRules: {
        mainCode: [
          { required: true, message: "主模板编码不能为空", trigger: "blur" }
        ],
        childCode: [
          { required: true, message: "子模版编码不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询模版列表 */
    getList() {
      this.loading = true;
      listTemplate(this.queryParams).then(response => {
        this.templateList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getLinkList() {
      this.loading = true;
      listTplink(this.queryLinkParams).then(response => {
        this.tplinkList = response.rows;
        this.linkTotal = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
     // 取消按钮
    linkCancel() {
      this.linkOpen = false;
      this.linkReset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        templateCode: null,
        templateName: null,
        suffix:"送样",
        templateType: 'main',
        singleSample: 'Y',
        singleItem: 'N',
        bizObjKey: null,
        status: '0',
        templatePath: null,
        comments: null,
        ruleList:[],
      };
      this.resetForm("form");
    },
    // 表单重置
    linkReset() {
      this.linkForm = {
        id: null,
        mainCode: null,
        childCode: null,
        mainKey: "samples",
        childKey: "sample",
        comments: null
      };
      this.resetForm("linkForm");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.linkReset();
      this.reset();
      getTemplateCode().then(response => {
        console.log('response ',response)
        let val = response.msg;
        if(val){
           this.form.templateCode = val;
        }
        this.open = true;
        this.title = "添加模版";
        this.tplinkList = [];
      });
    },
    /** 新增按钮操作 */
    handleLinkAdd() {
      this.linkReset();
      this.linkOpen = true;
      this.title = "添加模版";
      this.linkForm.mainCode = this.form.templateCode;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {     
      this.reset();
      const id = row.id || this.ids
      getTemplate(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改模版";
        if(response.data.id){
            this.queryLinkParams.mainCode = response.data.templateCode;
            this.tplinkList = this.getLinkList();
        }
      });
    },
    /** 修改按钮操作 */
    handleLinkUpdate(row) {
      this.linkReset();
      const id = row.id || this.ids
      getTplink(id).then(response => {
        this.linkForm = response.data;
        this.linkOpen = true;
        this.title = "修改模版关系";
      });
    },
    /** 新增按钮操作 */
    handleRowAdd() {
        //拿到上一行数据再往数组中push（）新的数据
        if(!this.form.ruleList){
          this.form.ruleList = [];
        }
			  this.form.ruleList.push({
          typeName: "samples",
          mergeRule: "",
          colMerge: "Y", 
          rowMerge: 'N', 
			})
		},
    handleUpdateYes(row) {
       if(!this.form.ruleList){
          this.form.ruleList = [];
        }
        //拿到上一行数据再往数组中push（）新的数据
			  this.form.ruleList.push({
				typeName: row.typeName,//变量名
				mergeRule: row.mergeRule,//合并规则
				colMerge: row.colMerge, //列合并
				rowMerge: row.rowMerge, //行合并
			})
		},
		handleDeleteProduct(row) {
			this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
				this.form.ruleList.splice(row.index, 1)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        console.log(this.form.ruleList);
        if (valid) {
          
          if (this.form.id != null) {
            updateTemplate(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            if(this.form.suffix != null){
              this.form.templateName = this.form.templateName + "-" + this.form.suffix;
            }
            addTemplate(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
          
        }
      });
    },
    /** 提交按钮 */
    submitLinkForm() {
      this.$refs["linkForm"].validate(valid => {
        if (valid) {
          if (this.linkForm.id != null) {
            updateTplink(this.linkForm).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.linkOpen = false;
              this.getLinkList();
            });
          } else {
            addTplink(this.linkForm).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.linkOpen = false;
              this.getLinkList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除模版编号为"' + ids + '"的数据项？').then(function() {
        return delTemplate(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
     /** 删除按钮操作 */
    handleLinkDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除模版关系编号为"' + ids + '"的数据项？').then(function() {
        return delTplink(ids);
      }).then(() => {
        this.getLinkList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('template/template/export', {
        ...this.queryParams
      }, `template_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

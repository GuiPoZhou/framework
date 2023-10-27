<template>
  <div class="dataLink">
    <bo-container>
      <template slot="boMain">
        <bo-main>
          <template slot="bosearch">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="关键词">
                    <el-input v-model="form.keyword" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="连接驱动">
                    <el-input v-model="form.dbType" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button size="small" type="primary">搜索</el-button>
                    <el-button size="small">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
          <template slot="tableArea">
            <el-button size="small" type="primary" style="margin-bottom: 0.7rem;">新建</el-button>
            <el-table :data="tableData" style="width: 100%" border :height="innerHeight - 60">
              <el-table-column prop="fullName" label="连接名称" min-width="200" />
              <el-table-column prop="dbType" label="连接驱动" width="150" />
              <el-table-column prop="host" label="主机地址" width="200" />
              <el-table-column prop="port" label="端口" width="60" />
              <el-table-column prop="creatorUser" label="创建人" width="120" />
              <el-table-column prop="creatorTime" label="创建时间" width="120" />
              <el-table-column prop="lastModifyTime" label="最后修改时间" width="120" />
              <el-table-column prop="sortCode" label="排序" width="70" align="center" />
              <el-table-column label="操作" fixed="right" width="100">
                <template slot-scope="scope">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </bo-main>
      </template>
    </bo-container>
  </div>
</template>

<script>
import boContainer from '@/components/Boshland/BoContainer/boContainer.vue'
import BoMain from '@/components/Boshland/BoContainer/boMain.vue'
export default {
  components: { boContainer, BoMain },
  data() {
    return {
      form: {},
      tableData: [],
      innerHeight: 0,
    }
  },
  mounted() {
    this.getInnerHeight()
    document.addEventListener('resize', this.getInnerHeight)
  },
  methods: {
    getInnerHeight() {
      this.innerHeight = window.innerHeight - 190
    },
  }
}
</script>

<style></style>
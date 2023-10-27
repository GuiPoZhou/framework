<template>
    <div class="kevin_drawer">
        <el-drawer :visible.sync="showDrawer" close-on-press-escape destroy-on-close :show-close="false" @close="e_close"
            :wrapperClosable="false" size="80%" custom-class="customerdraw" direction="ltr">
            <div slot="title" class="kevin_drawer_head" ref="kevin_drawer_head">
                <span class="drawertitle">远程数据拉取</span>
                <div class="kevin_top_buttons">
                    <el-button size="small" type="primary" :disabled="selTable.length == 0" @click="e_save">拉取</el-button>
                    <el-button size="small" @click="e_close">取消</el-button>
                </div>
            </div>
            <div class="kevin_drawer_body" ref="kevin_drawer_body" :style="{ height: KevinDrawerBodyHeight + 'px' }">

                <div class="k_d_b_left">
                    <el-tree :data="treeList" :props="defaultProps" @node-click="e_selProject" :highlight-current="true"
                        :default-expand-all="true" icon-class="el-icon-menu"></el-tree>
                </div>
                <div class="k_d_b_center">
                    <el-tree :data="projectModuleList" :props="defaultProps" @node-click="e_selProjectModule"
                        :highlight-current="true" :default-expand-all="true" icon-class="el-icon-menu"></el-tree>
                </div>
                <div class="k_d_b_right">
                    <el-table :data="tableData" style="width: 100%" border :height="KevinDrawerBodyHeight - 40"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="模块名称">
                            <template slot-scope="scope">
                                <span v-if="scope.row.name == 'foundation'">基础模块</span>
                                <span v-if="scope.row.name == 'generic'">通用模块</span>
                                <span v-if="scope.row.name == 'project'">项目独立模块</span>
                                <span v-if="scope.row.name == '复制表单'">复制表单</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="低码类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.remark == 'lowcode_form'">低码表单</span>
                                <span v-if="scope.row.remark == 'lowcode_project'">低码插件</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeKey" label="唯一键" />
                        <el-table-column prop="title" label="标题" />
                        <el-table-column prop="userName" label="最后上传人" />
                    </el-table>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    components: {
    },
    props: {
        localSaveHost: String,

    },
    data() {
        return {
            tableData: [],
            showDrawer: false,
            KevinDrawerBodyHeight: 0,
            treeList: [],
            defaultProps: {
                children: 'childList',
                label: 'name'
            },
            mainTypeId: '',
            selProjectId: '',
            detailIds: [],
            projectModuleList: [],
            selProjectModuleId: '',
            saveLocalInfo: {},
            selTable: []
        }
    },
    mounted() {
        this.getBrowserHeight()
        window.addEventListener('resize', this.getBrowserHeight);
    },
    methods: {
        handleSelectionChange(e) {
            this.selTable = e
        },
        e_save() {
            this.$confirm('确定要将选择的远程表单同步到当前项目？').then(async () => {
                const loading = this.$loading({
                    lock: true,
                    text: '拉取同步中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.7)'
                });

                const savePromises = this.selTable.map(async (item) => {
                    const saveParams = {
                        id: item.codeKey,
                        name: item.name,
                        title: item.title,
                        remark: item.remark,
                        config: item.config
                    };
                    console.log('saveParams', saveParams);
                    return this.$net('/formLayout/v2/saveOrUpdateFormLayoutConfig', 'post', saveParams);
                });

                try {
                    await Promise.all(savePromises); // 等待所有保存操作完成
                    loading.close();
                    this.$emit('pullSuccess');
                } catch (error) {
                    // 处理错误
                    console.error('保存出错', error);
                }
            });
        },

        e_selProjectModule(data) {
            this.selTable = []
            this.tableData = []
            this.selProjectModuleId = data.id
            axios.get(this.localSaveHost + '/open/boshland/getKevinList/getProjectForm?projectModuleId=' + this.selProjectModuleId).then(re => {
                this.tableData = re.data.data
            })
        },
        e_selProject(data) {
            this.selTable = []
            this.tableData = []
            this.selProjectId = data.id
            axios.get(this.localSaveHost + '/open/boshland/getKevinList/getProjectModule?projectId=' + this.selProjectId).then(re => {
                this.projectModuleList = re.data.data
            })
        },
        // 查询项目
        getlocalProject() {
            axios.get(this.localSaveHost + '/open/boshland/getKevinList/getProject').then(re => {
                this.treeList = re.data.data
            })
        },
        init() {
            this.showDrawer = true
            this.getlocalProject()
        },
        getBrowserHeight() {
            let browserHeight = window.innerHeight;
            // 使用 $refs 来访问 ref 为 "kevin_drawer_head" 的元素
            const drawerHeadElement = this.$refs.kevin_drawer_head;

            // 获取元素的实际高度
            if (drawerHeadElement) {
                const height = drawerHeadElement.clientHeight; // 或者 offsetHeight
                console.log('Drawer Head Height:', height);
                this.KevinDrawerBodyHeight = browserHeight - height - 50
            }
        },
        async getLowCodeForm() {
            let re = await this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: this.saveLocalInfo.id })
            this.saveLocalInfo.configStr = JSON.parse(re.data.configStr)
        },
        getDrawerHeadHeight() {

        },
        e_close() {
            this.$emit('close')
        }
    }

}
</script>

<style scoped lang="scss">
.kevin_drawer {
    width: 100%;
    height: 100%;
    overflow: hidden;



    /deep/.el-drawer {
        padding: 0 !important;
        overflow: hidden;
    }

    /deep/.el-drawer__body {
        overflow: hidden !important;
    }

    /deep/.el-form-item__content>div {
        width: 98.5%;
    }

    /deep/.el-drawer__header {
        padding: 0 !important;
        margin: 0 !important;
    }

    .kevin_drawer_head {
        width: 100%;
        height: 3.5rem;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .kevin_top_buttons {
            width: 20%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin-right: 1rem;
        }
    }

    .kevin_drawer_body {
        width: 100%;
        height: 100%;
        background-color: #EBEEF5;
        overflow: hidden;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        .k_d_b_left {
            width: 18%;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 0.7rem;

            /deep/.el-tree-node.is-current>.el-tree-node__content {

                background-color: #4468EE !important;
                color: #FFD55E;
                font-size: 1.2rem;
                font-weight: bold;
                border-radius: 0.2rem;

            }
        }

        .k_d_b_center {
            width: 18%;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            margin: 0 0.7rem;
            padding: 0.7rem;

            /deep/.el-tree-node.is-current>.el-tree-node__content {

                background-color: #4468EE !important;
                color: #FFD55E;
                font-size: 1.2rem;
                font-weight: bold;
                border-radius: 0.2rem;

            }
        }

        .k_d_b_right {
            flex: 1;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 0.7rem;
        }

        .tree_area {
            width: 100%;
            height: 100%;
            overflow: auto;
            scrollbar-width: none;
            /* 隐藏标准滚动条（适用于Firefox） */
            -ms-overflow-style: none;

            /* 隐藏IE和Edge浏览器的滚动条 */
            &::-webkit-scrollbar {
                width: 0;
                /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
            }
        }
    }

    .drawertitle {
        font-size: 1.4rem;
        margin-left: 1rem;
        // background: linear-gradient(to right, #1267CE 33%, #D4D4D4 33%, #D4D4D4 66%, #EB8918 66%);
        // background-clip: text;
        // -webkit-background-clip: text;
        // color: transparent;
        // user-select: none;
        // -webkit-user-select: none;
        // -moz-user-select: none;
        // -ms-user-select: none;
    }
}
</style> 